import { useState } from 'react';
import { Beaker, Leaf, Shield, TrendingUp, Camera, Plus, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTranslation } from 'react-i18next';

const FertilizerSection = () => {
  const { t } = useTranslation();
  const [soilData, setSoilData] = useState({ pH: '', nitrogen: '', phosphorus: '', potassium: '' });
  const [cropType, setCropType] = useState('');
  const [recommendation, setRecommendation] = useState<any>(null);

  const fertilizerProducts = [
    { id: 1, name: 'Urea (46% N)', price: 280, unit: '50kg bag', rating: 4.5, benefits: ['Quick nitrogen release', 'Promotes leaf growth', 'Water soluble'], suitable: ['Wheat', 'Rice', 'Maize'], image: '🌾' },
    { id: 2, name: 'DAP (18-46-0)', price: 1250, unit: '50kg bag', rating: 4.7, benefits: ['High phosphorus', 'Root development', 'Early growth'], suitable: ['Cotton', 'Soybean', 'Groundnut'], image: '🌱' },
    { id: 3, name: 'NPK (10-26-26)', price: 850, unit: '50kg bag', rating: 4.6, benefits: ['Balanced nutrition', 'All growth stages', 'Improved yield'], suitable: ['Vegetables', 'Fruits', 'Flowers'], image: '🥕' },
    { id: 4, name: 'Potash (MOP)', price: 920, unit: '50kg bag', rating: 4.4, benefits: ['Disease resistance', 'Water efficiency', 'Quality improvement'], suitable: ['Potato', 'Sugarcane', 'Banana'], image: '🍌' },
    { id: 5, name: 'Organic Vermicompost', price: 450, unit: '40kg bag', rating: 4.8, benefits: ['100% organic', 'Soil health', 'Eco-friendly'], suitable: ['All crops', 'Kitchen garden', 'Flowers'], image: '🪱' },
    { id: 6, name: 'Calcium Nitrate', price: 680, unit: '25kg bag', rating: 4.3, benefits: ['Prevents blossom rot', 'Strong cell walls', 'Quick absorption'], suitable: ['Tomato', 'Capsicum', 'Leafy vegetables'], image: '🍅' }
  ];

  const categories = [
    { name: t('fertilizerHome.allFertilizers'), count: 50, icon: '🌿' },
    { name: t('fertilizerHome.nitrogenCat'), count: 12, icon: '💚' },
    { name: t('fertilizerHome.phosphorusCat'), count: 8, icon: '🔥' },
    { name: t('fertilizerHome.potassiumCat'), count: 10, icon: '💙' },
    { name: t('fertilizerHome.organicCat'), count: 15, icon: '🌱' },
    { name: t('fertilizerHome.micronutrients'), count: 5, icon: '⭐' }
  ];

  const handleSoilAnalysis = () => {
    setTimeout(() => {
      setRecommendation({ fertilizer: 'NPK 12-32-16', quantity: '2.5 bags per acre', timing: 'Apply during sowing and 30 days after germination', reason: 'Your soil has low phosphorus levels. This fertilizer will boost root development and early growth.', cost: '₹2,125 per acre' });
    }, 1500);
  };

  return (
    <section id="fertilizer" className="py-20 bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full mb-6">
            <Beaker className="w-5 h-5 text-green-600 mr-2" />
            <span className="text-green-700 font-medium">{t('fertilizerHome.badge')}</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">{t('fertilizerHome.title')}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">{t('fertilizerHome.desc')}</p>
        </div>

        <Tabs defaultValue="recommend" className="mb-16">
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto mb-12">
            <TabsTrigger value="recommend">{t('fertilizerHome.aiRecommend')}</TabsTrigger>
            <TabsTrigger value="shop">{t('fertilizerHome.shopNow')}</TabsTrigger>
            <TabsTrigger value="analysis">{t('fertilizerHome.soilTest')}</TabsTrigger>
          </TabsList>

          <TabsContent value="recommend">
            <Card className="max-w-2xl mx-auto p-8">
              <div className="text-center mb-8">
                <Leaf className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('fertilizerHome.getRecommendation')}</h3>
                <p className="text-gray-600">{t('fertilizerHome.getRecommendationDesc')}</p>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('fertilizerHome.cropTypeLabel')}</label>
                  <Input value={cropType} onChange={(e) => setCropType(e.target.value)} placeholder={t('fertilizerHome.cropTypePlaceholder')} />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div><label className="block text-sm font-medium text-gray-700 mb-2">{t('fertilizerHome.soilPH')}</label><Input value={soilData.pH} onChange={(e) => setSoilData({...soilData, pH: e.target.value})} placeholder="6.5" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-2">{t('fertilizerHome.nitrogen')}</label><Input value={soilData.nitrogen} onChange={(e) => setSoilData({...soilData, nitrogen: e.target.value})} placeholder="180" /></div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div><label className="block text-sm font-medium text-gray-700 mb-2">{t('fertilizerHome.phosphorus')}</label><Input value={soilData.phosphorus} onChange={(e) => setSoilData({...soilData, phosphorus: e.target.value})} placeholder="45" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-2">{t('fertilizerHome.potassium')}</label><Input value={soilData.potassium} onChange={(e) => setSoilData({...soilData, potassium: e.target.value})} placeholder="120" /></div>
                </div>
                <Button onClick={handleSoilAnalysis} className="btn-hero w-full" disabled={!cropType || !soilData.pH}>
                  <Beaker className="w-5 h-5 mr-2" />{t('fertilizerHome.getAIRecommendation')}
                </Button>
                {recommendation && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 mt-6">
                    <h4 className="font-bold text-green-800 mb-4">{t('fertilizerHome.aiRecommendationTitle')}</h4>
                    <div className="space-y-3">
                      <div><strong>{t('fertilizerHome.fertilizerLabel')}:</strong> {recommendation.fertilizer}</div>
                      <div><strong>{t('fertilizerHome.quantityLabel')}:</strong> {recommendation.quantity}</div>
                      <div><strong>{t('fertilizerHome.applicationLabel')}:</strong> {recommendation.timing}</div>
                      <div><strong>{t('fertilizerHome.costLabel')}:</strong> {recommendation.cost}</div>
                      <div className="text-green-700 bg-green-100 p-3 rounded"><strong>{t('fertilizerHome.whyLabel')}:</strong> {recommendation.reason}</div>
                    </div>
                    <Button className="btn-success mt-4"><ShoppingBag className="w-4 h-4 mr-2" />{t('fertilizerHome.buyNow')}</Button>
                  </div>
                )}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="shop">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {fertilizerProducts.map((product) => (
                <Card key={product.id} className="card-field hover:shadow-xl transition-all duration-300">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-4xl">{product.image}</div>
                      <Badge variant="secondary" className="bg-green-100 text-green-700">{product.rating} ⭐</Badge>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                    <div className="text-2xl font-bold text-gray-900 mb-4">₹{product.price}<span className="text-sm text-gray-600 font-normal">/{product.unit}</span></div>
                    <div className="space-y-3 mb-6">
                      <div><div className="text-sm font-medium text-gray-700 mb-1">{t('fertilizerHome.benefits')}</div><div className="flex flex-wrap gap-1">{product.benefits.map((benefit, index) => (<Badge key={index} variant="outline" className="text-xs">{benefit}</Badge>))}</div></div>
                      <div><div className="text-sm font-medium text-gray-700 mb-1">{t('fertilizerHome.suitableFor')}</div><div className="text-sm text-gray-600">{product.suitable.join(', ')}</div></div>
                    </div>
                    <Button className="btn-success w-full"><Plus className="w-4 h-4 mr-2" />{t('fertilizerHome.addToCartBtn')}</Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analysis">
            <Card className="max-w-2xl mx-auto p-8">
              <div className="text-center mb-8">
                <Camera className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('fertilizerHome.digitalSoilTesting')}</h3>
                <p className="text-gray-600">{t('fertilizerHome.digitalSoilTestingDesc')}</p>
              </div>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center mb-6">
                <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">{t('fertilizerHome.uploadSoilPhoto')}</p>
                <Button variant="outline"><Camera className="w-4 h-4 mr-2" />{t('fertilizerHome.uploadPhoto')}</Button>
              </div>
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-800 mb-2">{t('fertilizerHome.soilPhotoTips')}</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• {t('fertilizerHome.tip1')}</li>
                    <li>• {t('fertilizerHome.tip2')}</li>
                    <li>• {t('fertilizerHome.tip3')}</li>
                    <li>• {t('fertilizerHome.tip4')}</li>
                  </ul>
                </div>
                <Button className="btn-hero w-full"><Shield className="w-5 h-5 mr-2" />{t('fertilizerHome.professionalTest')}</Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">{t('fertilizerHome.browseByCategory')}</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-soft text-center hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-3">{category.icon}</div>
                <h4 className="font-medium text-gray-900 mb-1">{category.name}</h4>
                <p className="text-sm text-gray-600">{category.count} {t('fertilizerHome.products')}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"><TrendingUp className="w-8 h-8 text-green-600" /></div>
            <h4 className="font-bold text-gray-900 mb-2">{t('fertilizerHome.yieldOptimization')}</h4>
            <p className="text-gray-600">{t('fertilizerHome.yieldOptimizationDesc')}</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4"><Shield className="w-8 h-8 text-blue-600" /></div>
            <h4 className="font-bold text-gray-900 mb-2">{t('fertilizerHome.verifiedQuality')}</h4>
            <p className="text-gray-600">{t('fertilizerHome.verifiedQualityDesc')}</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4"><Leaf className="w-8 h-8 text-purple-600" /></div>
            <h4 className="font-bold text-gray-900 mb-2">{t('fertilizerHome.ecoFriendly')}</h4>
            <p className="text-gray-600">{t('fertilizerHome.ecoFriendlyDesc')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FertilizerSection;