import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Package,
  Search,
  Filter,
  Calendar,
  DollarSign,
  TrendingDown,
  TrendingUp,
  ArrowUpDown,
  Eye,
  Download,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAppContext } from '@/context/AppContext';
import { useAuth } from '@/context/AuthContext';
import Navigation from '@/components/Navigation';
import FloatingAIChat from '@/components/FloatingAIChat';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { useTranslation } from 'react-i18next';

const OrderHistory = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { orders, loadOrders } = useAppContext();
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'date' | 'amount' | 'status'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');

  // Demo orders for display
  const demoOrders = [
    {
      id: 'demo-1',
      order_number: 'AGR-2025-001',
      tracking_id: 'TRK-AGR-2025-001-XYZ',
      status: 'shipped',
      total_amount: 2450,
      customer_name: 'Demo Farmer',
      created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      items: [{ name: 'Organic Wheat Seeds', quantity: 50 }]
    },
    {
      id: 'demo-2',
      order_number: 'AGR-2025-002',
      tracking_id: 'TRK-AGR-2025-002-ABC',
      status: 'delivered',
      total_amount: 1850,
      customer_name: 'Demo Farmer',
      created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      items: [{ name: 'NPK Fertilizer', quantity: 10 }]
    },
    {
      id: 'demo-3',
      order_number: 'AGR-2025-003',
      tracking_id: 'TRK-AGR-2025-003-DEF',
      status: 'processing',
      total_amount: 3200,
      customer_name: 'Demo Farmer',
      created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      items: [{ name: 'Premium Tomato Seeds', quantity: 20 }]
    },
    {
      id: 'demo-4',
      order_number: 'AGR-2024-098',
      tracking_id: 'TRK-AGR-2024-098-GHI',
      status: 'delivered',
      total_amount: 5600,
      customer_name: 'Demo Farmer',
      created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      items: [{ name: 'Mixed Seeds Package', quantity: 15 }]
    },
    {
      id: 'demo-5',
      order_number: 'AGR-2024-089',
      tracking_id: 'TRK-AGR-2024-089-JKL',
      status: 'cancelled',
      total_amount: 1200,
      customer_name: 'Demo Farmer',
      created_at: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
      items: [{ name: 'Organic Pesticide', quantity: 5 }]
    }
  ];

  const allOrders = orders.length > 0 ? orders : demoOrders;

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        navigate('/auth');
      } else {
        loadOrders().then(() => setLoading(false));
      }
    }
  }, [user, authLoading]);

  // Filter and sort orders
  const filteredAndSortedOrders = useMemo(() => {
    let filtered = [...allOrders];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(order =>
        order.order_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.tracking_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.items?.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    // Date range filter
    if (dateFrom) {
      filtered = filtered.filter(order =>
        new Date(order.created_at) >= new Date(dateFrom)
      );
    }
    if (dateTo) {
      filtered = filtered.filter(order =>
        new Date(order.created_at) <= new Date(dateTo)
      );
    }

    // Amount range filter
    if (minAmount) {
      filtered = filtered.filter(order =>
        Number(order.total_amount) >= Number(minAmount)
      );
    }
    if (maxAmount) {
      filtered = filtered.filter(order =>
        Number(order.total_amount) <= Number(maxAmount)
      );
    }

    // Sort
    filtered.sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case 'date':
          comparison = new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
          break;
        case 'amount':
          comparison = Number(a.total_amount) - Number(b.total_amount);
          break;
        case 'status':
          comparison = a.status.localeCompare(b.status);
          break;
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [allOrders, searchTerm, statusFilter, sortBy, sortOrder, dateFrom, dateTo, minAmount, maxAmount]);

  // Calculate statistics
  const stats = useMemo(() => {
    const total = filteredAndSortedOrders.length;
    const totalSpent = filteredAndSortedOrders.reduce((sum, order) => sum + Number(order.total_amount), 0);
    const avgOrder = total > 0 ? totalSpent / total : 0;
    const statusCounts = filteredAndSortedOrders.reduce((acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return { total, totalSpent, avgOrder, statusCounts };
  }, [filteredAndSortedOrders]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-blue-100 text-blue-700';
      case 'processing': return 'bg-yellow-100 text-yellow-700';
      case 'shipped': return 'bg-purple-100 text-purple-700';
      case 'delivered': return 'bg-green-100 text-green-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setDateFrom('');
    setDateTo('');
    setMinAmount('');
    setMaxAmount('');
    setSortBy('date');
    setSortOrder('desc');
  };

  const exportToCSV = () => {
    const headers = ['Order Number', 'Date', 'Status', 'Amount', 'Items', 'Tracking ID'];
    const rows = filteredAndSortedOrders.map(order => [
      order.order_number,
      new Date(order.created_at).toLocaleDateString(),
      order.status,
      `₹${order.total_amount}`,
      order.items?.length || 0,
      order.tracking_id
    ]);

    const csv = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `order-history-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navigation />
      <FloatingAIChat />

      <div className="pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              {t('orderHistory.title')}
            </h1>
            <p className="text-xl text-gray-600">
              {t('orderHistory.subtitle')}
            </p>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{t('orderHistory.totalOrders')}</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <Package className="w-8 h-8 text-blue-600" />
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{t('orderHistory.totalSpent')}</p>
                  <p className="text-2xl font-bold text-gray-900">₹{stats.totalSpent.toFixed(2)}</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{t('orderHistory.avgOrderValue')}</p>
                  <p className="text-2xl font-bold text-gray-900">₹{stats.avgOrder.toFixed(2)}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{t('orderHistory.sortOptions.status')}</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.statusCounts['delivered'] || 0}</p>
                </div>
                <TrendingDown className="w-8 h-8 text-orange-600" />
              </div>
            </Card>
          </div>

          {/* Filters Section */}
          <Card className="p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                {t('orderHistory.filtersSearch')}
              </h2>
              <Button variant="outline" size="sm" onClick={clearFilters}>
                {t('orderHistory.clearAll')}
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Search */}
              <div>
                <Label>{t('orderHistory.search')}</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder={t('orderHistory.searchPlaceholder')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Status Filter */}
              <div>
                <Label>{t('orderHistory.status')}</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('orderHistory.allStatuses')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t('orderHistory.allStatuses')}</SelectItem>
                    <SelectItem value="pending">{t('orders.statuses.pending')}</SelectItem>
                    <SelectItem value="processing">{t('orders.statuses.processing')}</SelectItem>
                    <SelectItem value="shipped">{t('orders.statuses.shipped')}</SelectItem>
                    <SelectItem value="delivered">{t('orders.statuses.delivered')}</SelectItem>
                    <SelectItem value="cancelled">{t('orders.statuses.cancelled')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Date From */}
              <div>
                <Label>{t('orderHistory.dateFrom')}</Label>
                <Input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                />
              </div>

              {/* Date To */}
              <div>
                <Label>{t('orderHistory.dateTo')}</Label>
                <Input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                />
              </div>

              {/* Min Amount */}
              <div>
                <Label>{t('orderHistory.minAmount')}</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={minAmount}
                  onChange={(e) => setMinAmount(e.target.value)}
                />
              </div>

              {/* Max Amount */}
              <div>
                <Label>{t('orderHistory.maxAmount')}</Label>
                <Input
                  type="number"
                  placeholder="10000"
                  value={maxAmount}
                  onChange={(e) => setMaxAmount(e.target.value)}
                />
              </div>

              {/* Sort By */}
              <div>
                <Label>{t('orderHistory.sortBy')}</Label>
                <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date">{t('orderHistory.sortOptions.date')}</SelectItem>
                    <SelectItem value="amount">{t('orderHistory.sortOptions.amount')}</SelectItem>
                    <SelectItem value="status">{t('orderHistory.sortOptions.status')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Sort Order */}
              <div>
                <Label>{t('orderHistory.sortOrder')}</Label>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                >
                  <ArrowUpDown className="w-4 h-4 mr-2" />
                  {sortOrder === 'asc' ? t('orderHistory.ascending') : t('orderHistory.descending')}
                </Button>
              </div>
            </div>
          </Card>

          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-gray-600">
              {t('orderHistory.showing')} {filteredAndSortedOrders.length} {t('orderHistory.of')} {allOrders.length} {t('orderHistory.orders')}
            </p>
            <Button variant="outline" onClick={exportToCSV}>
              <Download className="w-4 h-4 mr-2" />
              {t('orderHistory.exportCSV')}
            </Button>
          </div>

          {/* Orders Table */}
          <Card>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('orders.orderNumber')}</TableHead>
                    <TableHead>{t('orderHistory.date')}</TableHead>
                    <TableHead>{t('orderHistory.status')}</TableHead>
                    <TableHead>{t('orders.items')}</TableHead>
                    <TableHead>{t('orderHistory.amount')}</TableHead>
                    <TableHead>{t('orderHistory.tracking')}</TableHead>
                    <TableHead className="text-right">{t('orderHistory.actions')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAndSortedOrders.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-12">
                        <Package className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-600">{t('orderHistory.noOrdersFound')}</p>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredAndSortedOrders.map((order) => (
                      <TableRow key={order.id} className="hover:bg-gray-50 transition-colors">
                        <TableCell className="font-medium">{order.order_number}</TableCell>
                        <TableCell>
                          <div className="flex items-center text-sm">
                            <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                            {new Date(order.created_at).toLocaleDateString()}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(order.status)}>
                            {t(`orders.statuses.${order.status}`)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm text-gray-600">
                            {order.items?.length || 0} {t('orders.items')}
                          </div>
                        </TableCell>
                        <TableCell className="font-semibold">
                          ₹{Number(order.total_amount).toFixed(2)}
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">
                          {order.tracking_id}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate('/orders')}
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            {t('orderHistory.viewDetails')}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
