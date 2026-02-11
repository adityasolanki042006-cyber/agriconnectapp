import { 
  Brain, Cloud, CreditCard, FileImage, Languages, MapPin, 
  MessageSquare, Truck, Users, Zap, Shield, BarChart3
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';

const FeaturesSection = () => {
  const { t } = useTranslation();

  const coreFeatures = [
    { icon: <Brain className="w-8 h-8 text-purple-500" />, title: t('featuresSection.aiCropDisease'), description: t('featuresSection.aiCropDiseaseDesc'), category: t('featuresSection.aiFeatures') },
    { icon: <Cloud className="w-8 h-8 text-blue-500" />, title: t('featuresSection.weatherFarming'), description: t('featuresSection.weatherFarmingDesc'), category: t('featuresSection.aiFeatures') },
    { icon: <MessageSquare className="w-8 h-8 text-green-500" />, title: t('featuresSection.multilingualChatbot'), description: t('featuresSection.multilingualChatbotDesc'), category: t('featuresSection.aiFeatures') },
    { icon: <MapPin className="w-8 h-8 text-red-500" />, title: t('featuresSection.statePricing'), description: t('featuresSection.statePricingDesc'), category: t('featuresSection.coreFeatures') },
    { icon: <CreditCard className="w-8 h-8 text-indigo-500" />, title: t('featuresSection.digitalWallet'), description: t('featuresSection.digitalWalletDesc'), category: t('featuresSection.businessTools') },
    { icon: <Truck className="w-8 h-8 text-orange-500" />, title: t('featuresSection.liveTracking'), description: t('featuresSection.liveTrackingDesc'), category: t('featuresSection.coreFeatures') },
    { icon: <FileImage className="w-8 h-8 text-pink-500" />, title: t('featuresSection.pestMaps'), description: t('featuresSection.pestMapsDesc'), category: t('featuresSection.aiFeatures') },
    { icon: <BarChart3 className="w-8 h-8 text-cyan-500" />, title: t('featuresSection.yieldForecasting'), description: t('featuresSection.yieldForecastingDesc'), category: t('featuresSection.aiFeatures') },
    { icon: <Users className="w-8 h-8 text-teal-500" />, title: t('featuresSection.farmerTrading'), description: t('featuresSection.farmerTradingDesc'), category: t('featuresSection.community') },
    { icon: <Shield className="w-8 h-8 text-emerald-500" />, title: t('featuresSection.cropInsurance'), description: t('featuresSection.cropInsuranceDesc'), category: t('featuresSection.businessTools') },
    { icon: <Languages className="w-8 h-8 text-violet-500" />, title: t('featuresSection.multiLanguage'), description: t('featuresSection.multiLanguageDesc'), category: t('featuresSection.coreFeatures') },
    { icon: <Zap className="w-8 h-8 text-yellow-500" />, title: t('featuresSection.farmSimulation'), description: t('featuresSection.farmSimulationDesc'), category: t('featuresSection.aiFeatures') },
  ];

  const categories = [
    { name: t('featuresSection.aiFeatures'), color: "bg-purple-100 text-purple-700", count: 5 },
    { name: t('featuresSection.coreFeatures'), color: "bg-blue-100 text-blue-700", count: 3 },
    { name: t('featuresSection.businessTools'), color: "bg-green-100 text-green-700", count: 2 },
    { name: t('featuresSection.community'), color: "bg-orange-100 text-orange-700", count: 1 }
  ];

  const getCategoryColor = (category: string) => {
    const cat = categories.find(c => c.name === category);
    return cat?.color || 'bg-gray-100 text-gray-700';
  };

  return (
    <section id="features" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full mb-6">
            <Zap className="w-5 h-5 text-blue-600 mr-2" />
            <span className="text-blue-700 font-medium">{t('featuresSection.badge')}</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">{t('featuresSection.title')}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">{t('featuresSection.desc')}</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {categories.map((category, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-soft">
                <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium mb-3 ${category.color}`}>{category.name}</div>
                <div className="text-2xl font-bold text-gray-900">{category.count} {t('featuresSection.featuresCount')}</div>
                <div className="text-gray-600">{t('featuresSection.advancedTools')}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {coreFeatures.map((feature, index) => (
            <Card key={index} className="card-field hover:shadow-xl transition-all duration-500 group hover:-translate-y-1">
              <div className="p-6">
                <div className="mb-4 group-hover:scale-110 transition-transform">{feature.icon}</div>
                <div className={`inline-flex px-2 py-1 rounded text-xs font-medium mb-3 ${getCategoryColor(feature.category)}`}>{feature.category}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            </Card>
          ))}
        </div>

        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 md:p-12 text-white">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">{t('featuresSection.advancedAITitle')}</h3>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">{t('featuresSection.advancedAIDesc')}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6"><Brain className="w-10 h-10 text-white" /></div>
              <h4 className="text-xl font-bold mb-3">{t('featuresSection.smartCropAnalysis')}</h4>
              <p className="opacity-90">{t('featuresSection.smartCropAnalysisDesc')}</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6"><MapPin className="w-10 h-10 text-white" /></div>
              <h4 className="text-xl font-bold mb-3">{t('featuresSection.precisionFarming')}</h4>
              <p className="opacity-90">{t('featuresSection.precisionFarmingDesc')}</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6"><Zap className="w-10 h-10 text-white" /></div>
              <h4 className="text-xl font-bold mb-3">{t('featuresSection.automatedInsights')}</h4>
              <p className="opacity-90">{t('featuresSection.automatedInsightsDesc')}</p>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">{t('featuresSection.comingSoon')}</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "🌍", title: t('featuresSection.globalMarketplace'), desc: t('featuresSection.globalMarketplaceDesc') },
              { icon: "🤖", title: t('featuresSection.automatedFarming'), desc: t('featuresSection.automatedFarmingDesc') },
              { icon: "🚁", title: t('featuresSection.droneMonitoring'), desc: t('featuresSection.droneMonitoringDesc') },
              { icon: "📊", title: t('featuresSection.carbonCredits'), desc: t('featuresSection.carbonCreditsDesc') }
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-soft opacity-75 hover:opacity-100 transition-opacity">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;