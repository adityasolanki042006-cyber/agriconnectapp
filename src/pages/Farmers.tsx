import { useState, useEffect, useMemo } from 'react';
import { Star, MapPin, Phone, MessageCircle, Verified, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Navigation from '@/components/Navigation';
import FloatingAIChat from '@/components/FloatingAIChat';
import { useAppContext } from '@/context/AppContext';
import { useTranslation } from 'react-i18next';
import { translateCrop, translateLocation, translateStatus } from '@/utils/translationHelpers';

const Farmers = () => {
  const { vendors } = useAppContext();
  const { t, i18n } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCrop, setSelectedCrop] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedFarmer, setSelectedFarmer] = useState<number | null>(null);
  const [, forceUpdate] = useState({});

  useEffect(() => {
    const handleLanguageChange = () => forceUpdate({});
    window.addEventListener('languagechange', handleLanguageChange);
    i18n.on('languageChanged', handleLanguageChange);
    return () => {
      window.removeEventListener('languagechange', handleLanguageChange);
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  // Extract unique crops and states
  const { uniqueCrops, uniqueStates } = useMemo(() => {
    const cropsSet = new Set<string>();
    const statesSet = new Set<string>();
    
    vendors.forEach(farmer => {
      farmer.crops.forEach(crop => cropsSet.add(crop));
      statesSet.add(farmer.state);
    });
    
    return {
      uniqueCrops: Array.from(cropsSet).sort(),
      uniqueStates: Array.from(statesSet).sort(),
    };
  }, [vendors]);

  const filtered = vendors.filter(f => {
    const matchesSearch = (
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.crops.join(' ').toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    const matchesCrop = !selectedCrop || f.crops.includes(selectedCrop);
    const matchesState = !selectedState || f.state === selectedState;
    
    return matchesSearch && matchesCrop && matchesState;
  });

  const contactFarmer = (farmer: any) => alert(`Contacting ${farmer.name} at ${farmer.contact}`);

  // Calculate statistics based on filtered farmers
  const stats = useMemo(() => {
    if (filtered.length === 0) {
      return { farmerCount: 0, totalLand: 0, avgPH: 0, avgRating: 0, availableCrops: [] };
    }
    
    const totalLand = filtered.reduce((sum, f) => sum + f.areaInHectares, 0);
    const avgPH = filtered.reduce((sum, f) => sum + f.soilPH, 0) / filtered.length;
    const avgRating = filtered.reduce((sum, f) => sum + f.rating, 0) / filtered.length;
    const cropsSet = new Set<string>();
    filtered.forEach(f => f.crops.forEach(c => cropsSet.add(c)));
    
    return {
      farmerCount: filtered.length,
      totalLand: totalLand.toFixed(1),
      avgPH: avgPH.toFixed(2),
      avgRating: avgRating.toFixed(1),
      availableCrops: Array.from(cropsSet).slice(0, 5),
    };
  }, [filtered]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Navigation />
      <FloatingAIChat />

      <div className="pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">{t('farmers') || 'Farmers'}</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Connect directly with trusted farmers and producers.</p>
          </div>

          <div className="bg-white rounded-2xl shadow-soft p-6 mb-8">
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search farmers, locations, crops..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Crop</label>
                  <select
                    value={selectedCrop}
                    onChange={(e) => setSelectedCrop(e.target.value)}
                    className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">All Crops</option>
                    {uniqueCrops.map((crop) => (
                      <option key={crop} value={crop}>
                        {translateCrop(crop)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Filter by State</label>
                  <select
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">All States</option>
                    {uniqueStates.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>

                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCrop('');
                    setSelectedState('');
                  }}
                  className="w-full"
                >
                  Reset Filters
                </Button>
              </div>
            </div>
          </div>

          {filtered.length > 0 && (
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 mb-8 border border-green-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Summary of Selected Farmers</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                  <div className="text-3xl font-bold text-green-600">{stats.farmerCount}</div>
                  <div className="text-sm text-gray-600 mt-1">Farmers Found</div>
                </div>
                <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                  <div className="text-3xl font-bold text-blue-600">{stats.totalLand}</div>
                  <div className="text-sm text-gray-600 mt-1">Hectares Total</div>
                </div>
                <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                  <div className="text-3xl font-bold text-orange-600">{stats.avgPH}</div>
                  <div className="text-sm text-gray-600 mt-1">Avg Soil pH</div>
                </div>
                <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                  <div className="text-3xl font-bold text-yellow-600 flex items-center justify-center">⭐ {stats.avgRating}</div>
                  <div className="text-sm text-gray-600 mt-1">Avg Rating</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="text-sm font-semibold text-gray-900 mb-2">Top Crops</div>
                  <div className="flex flex-wrap gap-1">
                    {stats.availableCrops.map((crop) => (
                      <Badge key={crop} variant="secondary" className="text-xs">
                        {translateCrop(crop)}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((farmer) => (
              <Card key={farmer.id} className="card-field hover:shadow-xl transition-all duration-300">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="text-4xl">{farmer.image}</div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 flex items-center">
                          {farmer.name}
                          {farmer.verified && <Verified className="w-4 h-4 text-blue-600 ml-2" />}
                        </h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span>{translateLocation(farmer.location)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 mb-4">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-semibold text-gray-900 ml-1">{farmer.rating}</span>
                    </div>
                    <span className="text-gray-300">•</span>
                    <Badge variant="secondary">{translateStatus(farmer.verified ? 'Verified' : 'Pending')}</Badge>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Main Crops</h4>
                    <div className="flex flex-wrap gap-2">
                      {farmer.crops.slice(0,3).map((c:any,i:number)=>(
                        <Badge key={i} variant="outline" className="text-xs">{translateCrop(c)}</Badge>
                      ))}
                      {farmer.crops.length > 3 && <Badge variant="outline" className="text-xs">+{farmer.crops.length-3} more</Badge>}
                    </div>
                  </div>

                  <div className="mb-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-2 mb-1">
                      <Phone className="w-4 h-4" />
                      <span>{farmer.contact}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-2">{farmer.city}, {farmer.state}</div>
                  </div>

                  <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-100">
                    <h4 className="font-semibold text-gray-800 text-sm mb-2">Farm Details</h4>
                    <div className="text-xs space-y-1 text-gray-700">
                      <div className="flex justify-between">
                        <span>Land Area:</span>
                        <span className="font-medium">{farmer.areaInHectares} hectares</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Soil pH:</span>
                        <span className="font-medium">{farmer.soilPH}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => contactFarmer(farmer)} className="flex-1">
                      <MessageCircle className="w-4 h-4 mr-2" />Contact
                    </Button>
                    <Button size="sm" onClick={() => setSelectedFarmer(selectedFarmer === farmer.id ? null : farmer.id)} className="btn-hero flex-1">
                      View Inventory
                    </Button>
                  </div>

                  {selectedFarmer === farmer.id && (
                    <div className="mt-4 pt-4 border-t">
                      <h4 className="font-semibold text-gray-900 mb-3">Current Inventory</h4>
                      <div className="space-y-2">
                        {farmer.crops.map((crop:any, index:number) => (
                          <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                            <span className="text-sm font-medium">{translateCrop(crop)}</span>
                            <div className="text-right">
                              <div className="text-sm font-semibold text-green-600">Available</div>
                              <div className="text-xs text-gray-500">₹{20 + index * 5}/kg</div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-3">
                        <Button className="w-full btn-success" size="sm">Place Bulk Order</Button>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No farmers found</h3>
              <p className="text-gray-600">Try adjusting your search or filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Farmers;
