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
  const [trackingStep, setTrackingStep] = useState(0);

  // Demo order with tracking features
  const demoOrder = {
    id: 'demo-order-001',
    order_number: 'AGR-2025-001',
    tracking_id: 'TRK-AGR-2025-001-XYZ',
    status: 'shipped',
    total_amount: 2450,
    customer_name: 'Demo Farmer',
    customer_email: 'demo@agriconnect.com',
    delivery_address: 'Village Rampur, District Meerut, Uttar Pradesh - 250001',
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    items: [
      {
        id: '1',
        name: 'Organic Wheat Seeds',
        image: '🌾',
        price: 15,
        unit: 'kg',
        quantity: 50
      },
      {
        id: '2',
        name: 'NPK Fertilizer (10:26:26)',
        image: '🧪',
        price: 120,
        unit: 'kg',
        quantity: 10
      },
      {
        id: '3',
        name: 'Premium Tomato Seeds',
        image: '🍅',
        price: 100,
        unit: 'packet',
        quantity: 5
      }
    ]
  };

  const trackingSteps = [
    { label: 'Order Placed', location: 'AgriConnect Warehouse', time: '2 days ago', completed: true },
    { label: 'Processing', location: 'Quality Check Department', time: '1 day ago', completed: true },
    { label: 'Packed', location: 'Packaging Facility', time: '18 hours ago', completed: true },
    { label: 'In Transit', location: 'Delhi Distribution Center', time: '12 hours ago', completed: true },
    { label: 'Out for Delivery', location: 'Meerut Local Hub', time: '2 hours ago', completed: false },
    { label: 'Delivered', location: 'Your Address', time: 'Expected Today', completed: false }
  ];

  const allOrders = orders.length > 0 ? orders : [demoOrder];

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        navigate('/auth');
      } else {
        loadOrders().then(() => setLoading(false));
      }
    }
  }, [user, authLoading]);

  // Animate tracking steps
  useEffect(() => {
    const interval = setInterval(() => {
      setTrackingStep((prev) => (prev + 1) % trackingSteps.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

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
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
                Your Orders
              </h1>
              <Button 
                variant="outline"
                onClick={() => navigate('/order-history')}
                className="hidden md:flex"
              >
                <Package className="w-4 h-4 mr-2" />
                View Full History
              </Button>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Track your orders and manage your purchases
            </p>
          </div>

          <div className="space-y-6">
            {allOrders.map((order) => (
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

                            {/* Enhanced Live Tracking with Animation */}
                            {(order.status === 'processing' || order.status === 'shipped') && (
                              <div className="mt-6 space-y-4">
                                <h4 className="font-semibold text-gray-900">Live Tracking</h4>
                                <div className="relative">
                                  {trackingSteps.map((step, index) => (
                                    <div 
                                      key={index} 
                                      className={`relative flex items-start mb-6 transition-all duration-500 ${
                                        index <= trackingStep ? 'opacity-100 translate-x-0' : 'opacity-40 translate-x-2'
                                      }`}
                                    >
                                      {/* Timeline Line */}
                                      {index < trackingSteps.length - 1 && (
                                        <div 
                                          className={`absolute left-4 top-8 w-0.5 h-12 transition-all duration-500 ${
                                            step.completed ? 'bg-green-500' : 'bg-gray-300'
                                          }`}
                                        />
                                      )}
                                      
                                      {/* Step Icon */}
                                      <div 
                                        className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full transition-all duration-500 ${
                                          step.completed 
                                            ? 'bg-green-500 scale-110 animate-pulse' 
                                            : index === trackingStep 
                                            ? 'bg-blue-500 animate-bounce' 
                                            : 'bg-gray-300'
                                        }`}
                                      >
                                        {step.completed ? (
                                          <CheckCircle className="w-5 h-5 text-white" />
                                        ) : index === trackingStep ? (
                                          <Truck className="w-5 h-5 text-white animate-pulse" />
                                        ) : (
                                          <Clock className="w-4 h-4 text-white" />
                                        )}
                                      </div>

                                      {/* Step Content */}
                                      <div className="ml-4 flex-1">
                                        <div className={`font-medium ${
                                          step.completed ? 'text-green-700' : 
                                          index === trackingStep ? 'text-blue-700' : 
                                          'text-gray-500'
                                        }`}>
                                          {step.label}
                                        </div>
                                        <div className="text-sm text-gray-600 flex items-center mt-1">
                                          <MapPin className="w-3 h-3 mr-1" />
                                          {step.location}
                                        </div>
                                        <div className="text-xs text-gray-500 mt-1">
                                          {step.time}
                                        </div>
                                      </div>

                                      {/* Active Step Indicator */}
                                      {index === trackingStep && !step.completed && (
                                        <div className="ml-auto">
                                          <Badge className="bg-blue-100 text-blue-700 animate-pulse">
                                            Current
                                          </Badge>
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </div>

                                {/* Estimated Delivery */}
                                <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border-l-4 border-green-500">
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <div className="font-semibold text-gray-900">Estimated Delivery</div>
                                      <div className="text-sm text-gray-600 mt-1">Today by 6:00 PM</div>
                                    </div>
                                    <Truck className="w-8 h-8 text-green-600 animate-bounce" />
                                  </div>
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
        </div>
      </div>
    </div>
  );
};

export default Orders;
