import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Sprout, Briefcase } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Navigation from '@/components/Navigation';

const ProfileCompletion = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [userType, setUserType] = useState<string>('');
  
  const [farmerData, setFarmerData] = useState({
    city: '',
    state: '',
    pincode: '',
    soil_type: '',
    major_crops: '',
    field_size: '',
    annual_income: '',
    credit_score: '',
  });

  const [businessmanData, setBusinessmanData] = useState({
    city: '',
    state: '',
    pincode: '',
    annual_income: '',
    credit_score: '',
  });

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/signin');
      return;
    }

    if (user) {
      checkProfile();
    }
  }, [user, authLoading, navigate]);

  const checkProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (error) throw error;

      if (!data) {
        navigate('/signin');
        return;
      }

      setUserType(data.user_type);

      // Check if profile is already complete
      if (data.user_type === 'farmer') {
        if (data.city && data.state && data.pincode && data.soil_type && data.major_crops && data.field_size && data.annual_income && data.credit_score) {
          navigate('/dashboard');
          return;
        }
      } else if (data.user_type === 'businessman') {
        if (data.city && data.state && data.pincode && data.annual_income && data.credit_score) {
          navigate('/dashboard');
          return;
        }
      }
    } catch (error) {
      console.error('Error checking profile:', error);
      toast({
        title: 'Error',
        description: 'Failed to load profile data',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFarmerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!farmerData.city || !farmerData.state || !farmerData.pincode || !farmerData.soil_type || !farmerData.major_crops || !farmerData.field_size || !farmerData.annual_income || !farmerData.credit_score) {
      toast({
        title: 'Incomplete Form',
        description: 'Please fill in all fields',
        variant: 'destructive',
      });
      return;
    }

    setSubmitting(true);

    try {
      const cropsArray = farmerData.major_crops.split(',').map(crop => crop.trim()).filter(crop => crop);

      const { error } = await supabase
        .from('users')
        .update({
          city: farmerData.city,
          state: farmerData.state,
          pincode: farmerData.pincode,
          soil_type: farmerData.soil_type,
          major_crops: cropsArray,
          field_size: farmerData.field_size,
          annual_income: farmerData.annual_income,
          credit_score: farmerData.credit_score,
        })
        .eq('id', user?.id);

      if (error) throw error;

      toast({
        title: 'Profile Updated!',
        description: 'Your farmer profile has been completed successfully.',
      });

      navigate('/dashboard');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: 'Error',
        description: 'Failed to update profile. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleBusinessmanSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!businessmanData.city || !businessmanData.state || !businessmanData.pincode || !businessmanData.annual_income || !businessmanData.credit_score) {
      toast({
        title: 'Incomplete Form',
        description: 'Please fill in all fields',
        variant: 'destructive',
      });
      return;
    }

    setSubmitting(true);

    try {
      const { error } = await supabase
        .from('users')
        .update({
          city: businessmanData.city,
          state: businessmanData.state,
          pincode: businessmanData.pincode,
          annual_income: businessmanData.annual_income,
          credit_score: businessmanData.credit_score,
        })
        .eq('id', user?.id);

      if (error) throw error;

      toast({
        title: 'Profile Updated!',
        description: 'Your business profile has been completed successfully.',
      });

      navigate('/dashboard');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: 'Error',
        description: 'Failed to update profile. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Navigation />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <Card className="p-8 shadow-xl">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold mb-2">Complete Your Profile</h1>
                <p className="text-muted-foreground">
                  Help us personalize your experience
                </p>
              </div>
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                {userType === 'farmer' ? (
                  <Sprout className="w-8 h-8 text-primary" />
                ) : (
                  <Briefcase className="w-8 h-8 text-primary" />
                )}
              </div>
            </div>

            {userType === 'farmer' ? (
              <form onSubmit={handleFarmerSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      type="text"
                      placeholder="Enter city"
                      value={farmerData.city}
                      onChange={(e) => setFarmerData({ ...farmerData, city: e.target.value })}
                      disabled={submitting}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      type="text"
                      placeholder="Enter state"
                      value={farmerData.state}
                      onChange={(e) => setFarmerData({ ...farmerData, state: e.target.value })}
                      disabled={submitting}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pincode">Pincode</Label>
                  <Input
                    id="pincode"
                    type="text"
                    placeholder="Enter pincode"
                    value={farmerData.pincode}
                    onChange={(e) => setFarmerData({ ...farmerData, pincode: e.target.value })}
                    disabled={submitting}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="soil_type">Soil Type</Label>
                  <Input
                    id="soil_type"
                    type="text"
                    placeholder="e.g., Clay, Sandy, Loamy"
                    value={farmerData.soil_type}
                    onChange={(e) => setFarmerData({ ...farmerData, soil_type: e.target.value })}
                    disabled={submitting}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="major_crops">Major Crops</Label>
                  <Input
                    id="major_crops"
                    type="text"
                    placeholder="e.g., Wheat, Rice, Corn (separate with commas)"
                    value={farmerData.major_crops}
                    onChange={(e) => setFarmerData({ ...farmerData, major_crops: e.target.value })}
                    disabled={submitting}
                    required
                  />
                  <p className="text-sm text-muted-foreground">Separate multiple crops with commas</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="field_size">Field Size</Label>
                  <Input
                    id="field_size"
                    type="text"
                    placeholder="e.g., 10 acres, 5 hectares"
                    value={farmerData.field_size}
                    onChange={(e) => setFarmerData({ ...farmerData, field_size: e.target.value })}
                    disabled={submitting}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="annual_income">Annual Income</Label>
                  <Select
                    value={farmerData.annual_income}
                    onValueChange={(value) => setFarmerData({ ...farmerData, annual_income: value })}
                    disabled={submitting}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select income range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="less-than-25000">Less than ₹25,000</SelectItem>
                      <SelectItem value="25000-50000">₹25,000 - ₹50,000</SelectItem>
                      <SelectItem value="50000-75000">₹50,000 - ₹75,000</SelectItem>
                      <SelectItem value="75000-100000">₹75,000 - ₹1,00,000</SelectItem>
                      <SelectItem value="more-than-100000">More than ₹1,00,000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="credit_score">Credit Score</Label>
                  <Select
                    value={farmerData.credit_score}
                    onValueChange={(value) => setFarmerData({ ...farmerData, credit_score: value })}
                    disabled={submitting}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select credit score (1-10)" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
                        <SelectItem key={score} value={score.toString()}>
                          {score}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button type="submit" className="w-full" disabled={submitting}>
                  {submitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving Profile...
                    </>
                  ) : (
                    'Complete Profile'
                  )}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleBusinessmanSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      type="text"
                      placeholder="Enter city"
                      value={businessmanData.city}
                      onChange={(e) => setBusinessmanData({ ...businessmanData, city: e.target.value })}
                      disabled={submitting}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      type="text"
                      placeholder="Enter state"
                      value={businessmanData.state}
                      onChange={(e) => setBusinessmanData({ ...businessmanData, state: e.target.value })}
                      disabled={submitting}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pincode">Pincode</Label>
                  <Input
                    id="pincode"
                    type="text"
                    placeholder="Enter pincode"
                    value={businessmanData.pincode}
                    onChange={(e) => setBusinessmanData({ ...businessmanData, pincode: e.target.value })}
                    disabled={submitting}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="annual_income">Annual Income</Label>
                  <Select
                    value={businessmanData.annual_income}
                    onValueChange={(value) => setBusinessmanData({ ...businessmanData, annual_income: value })}
                    disabled={submitting}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select income range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="less-than-25000">Less than ₹25,000</SelectItem>
                      <SelectItem value="25000-50000">₹25,000 - ₹50,000</SelectItem>
                      <SelectItem value="50000-75000">₹50,000 - ₹75,000</SelectItem>
                      <SelectItem value="75000-100000">₹75,000 - ₹1,00,000</SelectItem>
                      <SelectItem value="more-than-100000">More than ₹1,00,000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="credit_score">Credit Score</Label>
                  <Select
                    value={businessmanData.credit_score}
                    onValueChange={(value) => setBusinessmanData({ ...businessmanData, credit_score: value })}
                    disabled={submitting}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select credit score (1-10)" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
                        <SelectItem key={score} value={score.toString()}>
                          {score}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button type="submit" className="w-full" disabled={submitting}>
                  {submitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving Profile...
                    </>
                  ) : (
                    'Complete Profile'
                  )}
                </Button>
              </form>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfileCompletion;
