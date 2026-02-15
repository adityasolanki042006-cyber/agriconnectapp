import { useState } from 'react';
import { Beaker, Leaf, Plus, Minus, Star, Bot, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAppContext } from '@/context/AppContext';
import Navigation from '@/components/Navigation';
import FloatingAIChat from '@/components/FloatingAIChat';

interface Fertilizer {
  id: number;
  name: string;
  type: string;
  price: number;
  unit: string;
  rating: number;
  suitableFor: string[];
  npkRatio: string;
  organic: boolean;
  brand: string;
  description: string;
  image: string;
}

const FertilizerFriend = () => {
  const { cart, addToCart, updateCartQuantity, getTotalPrice, getTotalItems } = useAppContext();
  const [selectedType, setSelectedType] = useState('All');
  const [selectedCrop, setSelectedCrop] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [youtubeQuery, setYoutubeQuery] = useState('');
  const [showAIRecommendations, setShowAIRecommendations] = useState(false);

  const fertilizers: Fertilizer[] = [
    {
      id: 101,
      name: 'Super NPK Complex',
      type: 'Chemical',
      price: 850,
      unit: '50kg bag',
      rating: 4.6,
      suitableFor: ['Wheat', 'Rice', 'Corn'],
      npkRatio: '12:32:16',
      organic: false,
      brand: 'FertiFarm',
      description: 'High-grade NPK fertilizer for cereal crops',
      image: '🧪'
    },
    {
      id: 102,
      name: 'Organic Compost Plus',
      type: 'Organic',
      price: 450,
      unit: '40kg bag',
      rating: 4.8,
      suitableFor: ['Vegetables', 'Fruits', 'Herbs'],
      npkRatio: '4:3:3',
      organic: true,
      brand: 'GreenGrow',
      description: 'Natural organic compost enriched with micronutrients',
      image: '🌱'
    },
    {
      id: 103,
      name: 'Tomato Special Formula',
      type: 'Specialized',
      price: 320,
      unit: '25kg bag',
      rating: 4.7,
      suitableFor: ['Tomatoes', 'Peppers', 'Eggplant'],
      npkRatio: '10:10:10',
      organic: false,
      brand: 'VeggiMax',
      description: 'Specially formulated for nightshade vegetables',
      image: '🍅'
    },
    {
      id: 104,
      name: 'Bio-Phosphate Enhancer',
      type: 'Organic',
      price: 280,
      unit: '20kg bag',
      rating: 4.4,
      suitableFor: ['Pulses', 'Legumes'],
      npkRatio: '5:20:8',
      organic: true,
      brand: 'BioPulse',
      description: 'Organic phosphate booster for pulse crops',
      image: '🫘'
    },
    {
      id: 105,
      name: 'Rice Growth Accelerator',
      type: 'Chemical',
      price: 550,
      unit: '30kg bag',
      rating: 4.5,
      suitableFor: ['Rice', 'Paddy'],
      npkRatio: '20:10:10',
      organic: false,
      brand: 'RiceMax Pro',
      description: 'Nitrogen-rich formula for paddy fields',
      image: '🌾'
    },
    {
      id: 106,
      name: 'Micro-Nutrient Mix',
      type: 'Supplement',
      price: 180,
      unit: '10kg bag',
      rating: 4.3,
      suitableFor: ['All Crops'],
      npkRatio: '0:0:0 + Micronutrients',
      organic: true,
      brand: 'MicroBoost',
      description: 'Essential micronutrients for all crop types',
      image: '⚗️'
    }
  ];

  const fertilizerTypes = ['All', 'Chemical', 'Organic', 'Specialized', 'Supplement'];
  const cropTypes = ['All', 'Wheat', 'Rice', 'Vegetables', 'Fruits', 'Pulses', 'Tomatoes'];

  const aiRecommendations = [
    {
      crop: 'Tomatoes',
      soil: 'Clay Soil',
      recommendation: 'Tomato Special Formula + Organic Compost Plus',
      reason: 'Clay soil needs organic matter for better drainage, while tomatoes need balanced nutrition'
    },
    {
      crop: 'Rice',
      soil: 'Alluvial Soil',
      recommendation: 'Rice Growth Accelerator + Micro-Nutrient Mix',
      reason: 'High nitrogen for tillering phase, micronutrients for grain filling'
    },
    {
      crop: 'Wheat',
      soil: 'Sandy Loam',
      recommendation: 'Super NPK Complex',
      reason: 'Balanced NPK for optimal wheat growth in well-drained sandy loam'
    }
  ];

  const filteredFertilizers = fertilizers.filter(fertilizer => {
    const matchesType = selectedType === 'All' || fertilizer.type === selectedType;
    const matchesCrop = selectedCrop === 'All' || fertilizer.suitableFor.includes(selectedCrop) || fertilizer.suitableFor.includes('All Crops');
    const matchesSearch = fertilizer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         fertilizer.brand.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesType && matchesCrop && matchesSearch;
  });

  const getCartQuantity = (fertilizerId: number) => {
    return cart.find(item => item.id === String(fertilizerId))?.quantity || 0;
  };

  const handleAddToCart = (fertilizer: Fertilizer) => {
    const product = {
      id: String(fertilizer.id),
      name: fertilizer.name,
      price: fertilizer.price,
      unit: fertilizer.unit,
      image: fertilizer.image,
      category: 'Fertilizers',
      vendor: fertilizer.brand,
      description: fertilizer.description,
      stock_quantity: 100
    };
    addToCart(product);
  };

  const handleUpdateQuantity = (fertilizerId: number, newQuantity: number) => {
    updateCartQuantity(String(fertilizerId), newQuantity);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Navigation />
      <FloatingAIChat />
      
      <div className="pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full mb-6">
              <Beaker className="w-5 h-5 text-green-600 mr-2" />
              <span className="text-green-700 font-medium">AI-Powered Fertilizer Assistant</span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Fertilizer Friend
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get AI-powered fertilizer recommendations based on your crop type and soil conditions
            </p>
          </div>

          {/* AI Recommendations Toggle */}
          <div className="text-center mb-8">
            <Button
              onClick={() => setShowAIRecommendations(!showAIRecommendations)}
              className="btn-hero"
            >
              <Bot className="w-5 h-5 mr-2" />
              {showAIRecommendations ? 'Hide' : 'Show'} AI Recommendations
            </Button>
          </div>

          {/* AI Recommendations */}
          {showAIRecommendations && (
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Bot className="w-6 h-6 text-blue-600 mr-2" />
                AI Fertilizer Recommendations
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                {aiRecommendations.map((rec, index) => (
                  <Card key={index} className="p-4 bg-white">
                    <div className="mb-3">
                      <Badge variant="outline" className="mb-2">{rec.crop}</Badge>
                      <Badge variant="secondary">{rec.soil}</Badge>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">{rec.recommendation}</h4>
                    <p className="text-sm text-gray-600">{rec.reason}</p>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Search and Filters */}
          <div className="bg-white rounded-2xl shadow-soft p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="lg:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Search fertilizers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Fertilizer Type" />
                </SelectTrigger>
                <SelectContent>
                  {fertilizerTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                <SelectTrigger>
                  <SelectValue placeholder="Crop Type" />
                </SelectTrigger>
                <SelectContent>
                  {cropTypes.map(crop => (
                    <SelectItem key={crop} value={crop}>{crop}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            
              {/* YouTube Search (opens YouTube results in new tab) */}
              <div className="lg:col-span-4 mt-4">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const q = youtubeQuery.trim();
                    if (q) window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`, '_blank');
                  }}
                  className="flex items-center gap-2"
                >
                  <Input
                    placeholder="Search YouTube tutorials (e.g. 'Super NPK Complex tutorial')"
                    value={youtubeQuery}
                    onChange={(e) => setYoutubeQuery(e.target.value)}
                  />
                  <Button type="submit" className="btn-hero">
                    Search YouTube
                  </Button>
                </form>
              </div>
            </div>
          </div>

          {/* Fertilizers Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredFertilizers.map((fertilizer) => (
              <Card key={fertilizer.id} className="card-field hover:shadow-xl transition-all duration-300">
                <div className="p-6">
                  {/* Fertilizer Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl">{fertilizer.image}</div>
                    <div className="flex flex-col space-y-2">
                      {fertilizer.organic && (
                        <Badge className="bg-green-100 text-green-700">
                          <Leaf className="w-3 h-3 mr-1" />
                          Organic
                        </Badge>
                      )}
                      <Badge variant="outline">{fertilizer.type}</Badge>
                    </div>
                  </div>

                  {/* Fertilizer Details */}
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{fertilizer.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{fertilizer.description}</p>
                  
                  <div className="mb-3">
                    <div className="text-sm text-gray-600 mb-1">Brand: {fertilizer.brand}</div>
                    <div className="text-sm text-gray-600 mb-1">NPK Ratio: {fertilizer.npkRatio}</div>
                    
                    <div className="flex items-center space-x-2 mb-2">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">{fertilizer.rating}</span>
                    </div>
                  </div>

                  {/* Suitable Crops */}
                  <div className="mb-4">
                    <div className="text-sm font-medium text-gray-900 mb-2">Suitable for:</div>
                    <div className="flex flex-wrap gap-1">
                      {fertilizer.suitableFor.slice(0, 3).map((crop, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {crop}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-2xl font-bold text-gray-900">₹{fertilizer.price}</span>
                      <div className="text-sm text-gray-600">{fertilizer.unit}</div>
                    </div>
                  </div>

                  {/* Add to Cart Controls */}
                  <div className="flex items-center justify-between">
                    {getCartQuantity(fertilizer.id) > 0 ? (
                      <div className="flex items-center space-x-3 w-full">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleUpdateQuantity(fertilizer.id, getCartQuantity(fertilizer.id) - 1)}
                          className="w-8 h-8 p-0"
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        
                        <span className="font-semibold text-lg flex-1 text-center">
                          {getCartQuantity(fertilizer.id)}
                        </span>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleUpdateQuantity(fertilizer.id, getCartQuantity(fertilizer.id) + 1)}
                          className="w-8 h-8 p-0"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    ) : (
                      <Button
                        onClick={() => handleAddToCart(fertilizer)}
                        className="btn-success w-full"
                        size="sm"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add to Cart
                      </Button>
                    )}
                  </div>

                  {/* Tutorials button - opens YouTube search for the specific fertilizer */}
                  <div className="mt-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(fertilizer.name + ' fertilizer tutorial')}`, '_blank')}
                    >
                      Watch Tutorials
                    </Button>
                  </div>

                </div>
              </Card>
            ))}
          </div>

          {/* Cart Summary (if items in cart) */}
          {getTotalItems() > 0 && (
            <div className="fixed bottom-24 right-6 bg-white rounded-2xl shadow-2xl border p-6 z-40 min-w-[300px]">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-bold text-gray-900">Your Cart</h4>
                <Badge className="bg-green-100 text-green-700">
                  {getTotalItems()} items
                </Badge>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-bold">Total: ₹{getTotalPrice()}</span>
                </div>
                
                <Button className="btn-hero w-full">
                  Proceed to Checkout
                </Button>
              </div>
            </div>
          )}

          {/* Benefits Section */}
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <div className="text-center bg-white rounded-xl p-6 shadow-soft">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bot className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">AI Recommendations</h4>
              <p className="text-gray-600">Get personalized fertilizer suggestions based on your crop and soil type</p>
            </div>
            
            <div className="text-center bg-white rounded-xl p-6 shadow-soft">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Organic Options</h4>
              <p className="text-gray-600">Wide range of organic and eco-friendly fertilizers</p>
            </div>
            
            <div className="text-center bg-white rounded-xl p-6 shadow-soft">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Beaker className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Quality Assured</h4>
              <p className="text-gray-600">All fertilizers tested and certified for optimal crop nutrition</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FertilizerFriend;