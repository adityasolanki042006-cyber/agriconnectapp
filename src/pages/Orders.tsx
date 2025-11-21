import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, MapPin, Clock, CheckCircle, Truck, Eye, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAppContext } from '@/context/AppContext';
import { useAuth } from '@/context/AuthContext';
import Navigation from '@/components/Navigation';
import FloatingAIChat from '@/components/FloatingAIChat';

const Orders = () => {
  const navigate = useNavigate();
  const { orders, loadOrders } = useAppContext();
  const { user, loading: authLoading } = useAuth();
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        navigate('/auth');
      } else {
        loadOrders().then(() => setLoading(false));
      }
    }
  }, [user, authLoading]);

  const getStatusProgress = (status: string) => {
    switch (status) {
      case 'pending': return 20;
      case 'processing': return 40;
      case 'shipped': return 70;
      case 'delivered': return 100;
      case 'cancelled': return 0;
      default: return 0;
    }
  };

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Package className="w-4 h-4" />;
      case 'processing': return <Clock className="w-4 h-4" />;
      case 'shipped': return <Truck className="w-4 h-4" />;
      case 'delivered': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <Package className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
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
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Your Orders
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Track your orders and manage your purchases
            </p>
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No orders yet</h3>
              <p className="text-gray-600 mb-6">Start shopping to see your orders here</p>
              <Button className="btn-hero" onClick={() => navigate('/marketplace')}>
                Browse Marketplace
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <Card key={order.id} className="card-field">
                  <div className="p-6">
                    {/* Order Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                      <div className="mb-4 md:mb-0">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          Order #{order.order_number}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>Placed: {new Date(order.created_at).toLocaleDateString()}</span>
                          <span>•</span>
                          <span>Total: ₹{Number(order.total_amount).toFixed(2)}</span>
                          <span>•</span>
                          <span>{order.items?.length || 0} items</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge className={getStatusColor(order.status)}>
                          {getStatusIcon(order.status)}
                          <span className="ml-1 capitalize">{order.status}</span>
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          {selectedOrder === order.id ? 'Hide' : 'View'} Details
                        </Button>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-6">
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Order Progress</span>
                        <span>{order.status === 'delivered' ? 'Delivered' : 'In Progress'}</span>
                      </div>
                      <Progress value={getStatusProgress(order.status)} className="h-2" />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>Placed</span>
                        <span>Processing</span>
                        <span>Shipped</span>
                        <span>Delivered</span>
                      </div>
                    </div>

                    {/* Order Details (Expandable) */}
                    {selectedOrder === order.id && (
                      <div className="border-t pt-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          {/* Items */}
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-4">Items Ordered</h4>
                            <div className="space-y-3">
                              {order.items?.map((item) => (
                                <div key={item.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                  <div className="text-2xl">{item.image}</div>
                                  <div className="flex-1">
                                    <div className="font-medium text-gray-900">{item.name}</div>
                                    <div className="text-sm text-gray-600">
                                      ₹{item.price}/{item.unit} × {item.quantity}
                                    </div>
                                  </div>
                                  <div className="font-semibold text-gray-900">
                                    ₹{item.price * item.quantity}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Order Info */}
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-4">Order Information</h4>
                            <div className="space-y-3">
                              <div className="flex items-center space-x-3">
                                <MapPin className="w-5 h-5 text-gray-400" />
                                <div>
                                  <div className="font-medium text-gray-900">Delivery Address</div>
                                  <div className="text-sm text-gray-600">{order.delivery_address}</div>
                                </div>
                              </div>
                              <div className="flex items-center space-x-3">
                                <Package className="w-5 h-5 text-gray-400" />
                                <div>
                                  <div className="font-medium text-gray-900">Tracking ID</div>
                                  <div className="text-sm text-gray-600">{order.tracking_id}</div>
                                </div>
                              </div>
                            </div>

                            {/* Live Tracking Simulation */}
                            {(order.status === 'processing' || order.status === 'shipped') && (
                              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                                <div className="flex items-center space-x-3 mb-3">
                                  <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
                                  <span className="font-medium text-blue-900">Order in Transit</span>
                                </div>
                                <div className="text-sm text-blue-800">
                                  📍 Your order is being processed and will be shipped soon
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
