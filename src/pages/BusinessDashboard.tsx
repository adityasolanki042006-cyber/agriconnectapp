import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  Loader2, Briefcase, Mail, Phone, Calendar, CheckCircle2, XCircle,
  TrendingUp, ShoppingCart, Package, Users, BarChart3, IndianRupee, MapPin, CreditCard
} from 'lucide-react';
import Navigation from '@/components/Navigation';

interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  user_type: string;
  created_at: string;
  city: string | null;
  state: string | null;
  pincode: string | null;
  annual_income: string | null;
  credit_score: string | null;
}

interface OrderStats {
  totalOrders: number;
  totalSpent: number;
  pendingOrders: number;
  completedOrders: number;
}

const BusinessDashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [orderStats, setOrderStats] = useState<OrderStats>({
    totalOrders: 0,
    totalSpent: 0,
    pendingOrders: 0,
    completedOrders: 0,
  });

  const calculateProfileCompletion = (profile: UserProfile) => {
    const fields = [
      { name: 'Full Name', value: profile.full_name, required: true },
      { name: 'Email', value: profile.email, required: true },
      { name: 'Phone', value: profile.phone, required: true },
      { name: 'City', value: profile.city, required: true },
      { name: 'State', value: profile.state, required: true },
      { name: 'Pincode', value: profile.pincode, required: true },
      { name: 'Annual Income', value: profile.annual_income, required: true },
      { name: 'Credit Score', value: profile.credit_score, required: true },
    ];

    const filledFields = fields.filter(field => {
      return field.value && field.value.toString().trim() !== '';
    });

    const percentage = Math.round((filledFields.length / fields.length) * 100);

    return {
      percentage,
      totalFields: fields.length,
      filledFields: filledFields.length,
      fields: fields.map(field => ({
        ...field,
        filled: field.value && field.value.toString().trim() !== ''
      }))
    };
  };

  const formatIncome = (income: string | null) => {
    if (!income) return 'Not provided';
    const map: Record<string, string> = {
      'less-than-25000': 'Less than ₹25,000',
      '25000-50000': '₹25,000 - ₹50,000',
      '50000-75000': '₹50,000 - ₹75,000',
      '75000-100000': '₹75,000 - ₹1,00,000',
      'more-than-100000': 'More than ₹1,00,000',
    };
    return map[income] || income;
  };

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/signin');
      return;
    }

    if (user) {
      fetchProfile();
      fetchOrderStats();
    }
  }, [user, authLoading, navigate]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user?.id)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        // Redirect farmers to the farmer dashboard
        if (data.user_type === 'farmer') {
          navigate('/dashboard');
          return;
        }
        setProfile(data);
      } else {
        const newProfile: UserProfile = {
          id: user?.id || '',
          full_name: user?.user_metadata?.full_name || '',
          email: user?.email || '',
          phone: user?.user_metadata?.phone || '',
          user_type: user?.user_metadata?.user_type || 'businessman',
          created_at: new Date().toISOString(),
          city: null,
          state: null,
          pincode: null,
          annual_income: null,
          credit_score: null,
        };
        setProfile(newProfile);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      if (user) {
        setProfile({
          id: user.id,
          full_name: user.user_metadata?.full_name || '',
          email: user.email || '',
          phone: user.user_metadata?.phone || '',
          user_type: 'businessman',
          created_at: new Date().toISOString(),
          city: null,
          state: null,
          pincode: null,
          annual_income: null,
          credit_score: null,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchOrderStats = async () => {
    try {
      const { data: orders, error } = await supabase
        .from('orders')
        .select('status, total_amount')
        .eq('customer_id', user?.id);

      if (error) throw error;

      if (orders) {
        setOrderStats({
          totalOrders: orders.length,
          totalSpent: orders.reduce((sum, o) => sum + Number(o.total_amount), 0),
          pendingOrders: orders.filter(o => o.status === 'pending').length,
          completedOrders: orders.filter(o => o.status === 'delivered' || o.status === 'completed').length,
        });
      }
    } catch (error) {
      console.error('Error fetching order stats:', error);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="container mx-auto px-4 py-16 text-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  const completionData = calculateProfileCompletion(profile);
  const isIncomplete = completionData.percentage < 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Navigation />
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold">Business Hub</h1>
                  <p className="text-muted-foreground">Welcome, {profile.full_name || 'Business Owner'}!</p>
                </div>
              </div>
            </div>
            <Badge variant="outline" className="text-sm px-4 py-2 w-fit border-primary/30">
              <Briefcase className="w-4 h-4 mr-2" />
              Business Account
            </Badge>
          </div>

          {/* Incomplete Profile Warning */}
          {isIncomplete && (
            <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg flex items-center justify-between flex-wrap gap-3">
              <p className="text-sm text-yellow-700 dark:text-yellow-300 flex items-center gap-2">
                <XCircle className="w-4 h-4" />
                Your business profile is incomplete. Complete it to unlock all features.
              </p>
              <Button
                onClick={() => navigate('/profile-completion')}
                size="sm"
                variant="outline"
              >
                Complete Now
              </Button>
            </div>
          )}

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="p-5 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Orders</p>
                  <p className="text-2xl font-bold mt-1">{orderStats.totalOrders}</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <ShoppingCart className="w-5 h-5 text-primary" />
                </div>
              </div>
            </Card>

            <Card className="p-5 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Spent</p>
                  <p className="text-2xl font-bold mt-1">₹{orderStats.totalSpent.toLocaleString('en-IN')}</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <IndianRupee className="w-5 h-5 text-green-600" />
                </div>
              </div>
            </Card>

            <Card className="p-5 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold mt-1">{orderStats.pendingOrders}</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                  <Package className="w-5 h-5 text-yellow-600" />
                </div>
              </div>
            </Card>

            <Card className="p-5 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold mt-1">{orderStats.completedOrders}</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-blue-600" />
                </div>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Business Profile Card */}
            <Card className="lg:col-span-2 p-6 shadow-xl">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-primary" />
                Business Profile
              </h2>

              {/* Profile Completion */}
              <div className="mb-6 p-4 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg border border-primary/20">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold">Profile Completion</h3>
                    <p className="text-xs text-muted-foreground">
                      {completionData.filledFields} of {completionData.totalFields} fields
                    </p>
                  </div>
                  <Badge
                    variant={completionData.percentage === 100 ? 'default' : 'secondary'}
                    className="text-sm px-3 py-1"
                  >
                    {completionData.percentage}%
                  </Badge>
                </div>
                <Progress value={completionData.percentage} className="h-2 mb-3" />
                <div className="grid grid-cols-2 gap-2">
                  {completionData.fields.map((field, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-2 text-xs ${
                        field.filled ? 'text-foreground' : 'text-muted-foreground'
                      }`}
                    >
                      {field.filled ? (
                        <CheckCircle2 className="w-3 h-3 text-green-600 flex-shrink-0" />
                      ) : (
                        <XCircle className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                      )}
                      <span>{field.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bio Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="font-medium text-sm">{profile.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">Phone</p>
                    <p className="font-medium text-sm">{profile.phone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">Location</p>
                    <p className={`font-medium text-sm ${!profile.city ? 'text-muted-foreground italic' : ''}`}>
                      {profile.city && profile.state && profile.pincode
                        ? `${profile.city}, ${profile.state} - ${profile.pincode}`
                        : 'Not provided'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <IndianRupee className="w-5 h-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">Annual Revenue</p>
                    <p className={`font-medium text-sm ${!profile.annual_income ? 'text-muted-foreground italic' : ''}`}>
                      {formatIncome(profile.annual_income)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <CreditCard className="w-5 h-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">Credit Score</p>
                    <p className={`font-medium text-sm ${!profile.credit_score ? 'text-muted-foreground italic' : ''}`}>
                      {profile.credit_score ? `${profile.credit_score}/10` : 'Not provided'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <Calendar className="w-5 h-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">Member Since</p>
                    <p className="font-medium text-sm">
                      {new Date(profile.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Quick Actions Sidebar */}
            <div className="space-y-6">
              <Card className="p-6 shadow-xl">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Quick Actions
                </h2>
                <div className="space-y-3">
                  <Button
                    onClick={() => navigate('/marketplace')}
                    className="w-full justify-start"
                    variant="outline"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Browse Marketplace
                  </Button>
                  <Button
                    onClick={() => navigate('/orders')}
                    className="w-full justify-start"
                    variant="outline"
                  >
                    <Package className="w-4 h-4 mr-2" />
                    Manage Orders
                  </Button>
                  <Button
                    onClick={() => navigate('/order-history')}
                    className="w-full justify-start"
                    variant="outline"
                  >
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Order History
                  </Button>
                  <Button
                    onClick={() => navigate('/farmers')}
                    className="w-full justify-start"
                    variant="outline"
                  >
                    <Users className="w-4 h-4 mr-2" />
                    View Farmers
                  </Button>
                  <Button
                    onClick={() => navigate('/search')}
                    className="w-full justify-start"
                    variant="outline"
                  >
                    <Package className="w-4 h-4 mr-2" />
                    Search Products
                  </Button>
                </div>
              </Card>

              {isIncomplete && (
                <Card className="p-6 shadow-xl border-primary/20 bg-primary/5">
                  <h3 className="font-bold mb-2">Complete Your Profile</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    A complete profile helps suppliers connect with you and improves your business visibility.
                  </p>
                  <Button
                    onClick={() => navigate('/profile-completion')}
                    className="w-full"
                    size="sm"
                  >
                    Complete Profile
                  </Button>
                </Card>
              )}

              <Card className="p-6 shadow-xl">
                <h3 className="font-bold mb-2 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-primary" />
                  Business Tips
                </h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    Connect directly with farmers for fresh produce
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    Track your orders and manage inventory
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    Get competitive prices on bulk orders
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDashboard;
