import {
  Brain,
  Cloud,
  CreditCard,
  FileImage,
  Languages,
  MapPin,
  MessageSquare,
  Truck,
  Users,
  Zap,
  Shield,
  BarChart3
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';

const FeaturesSection = () => {
  const { t } = useTranslation();

  const coreFeatures = [
    {
      icon: <Brain className="w-8 h-8 text-purple-500" />,
      title: t('featuresSection.aiCropDisease.title'),
      description: t('featuresSection.aiCropDisease.description'),
      category: t('featuresSection.categories.aiFeatures')
    },
    {
      icon: <Cloud className="w-8 h-8 text-blue-500" />,
      title: t('featuresSection.weatherBased.title'),
      description: t('featuresSection.weatherBased.description'),
      category: t('featuresSection.categories.aiFeatures')
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-green-500" />,
      title: t('featuresSection.multilingualChatbot.title'),
      description: t('featuresSection.multilingualChatbot.description'),
      category: t('featuresSection.categories.aiFeatures')
    },
    {
      icon: <MapPin className="w-8 h-8 text-red-500" />,
      title: t('featuresSection.stateWisePricing.title'),
      description: t('featuresSection.stateWisePricing.description'),
      category: t('featuresSection.categories.coreFeatures')
    },
    {
      icon: <CreditCard className="w-8 h-8 text-indigo-500" />,
      title: t('featuresSection.digitalWallet.title'),
      description: t('featuresSection.digitalWallet.description'),
      category: t('featuresSection.categories.businessTools')
    },
    {
      icon: <Truck className="w-8 h-8 text-orange-500" />,
      title: t('featuresSection.liveOrderTracking.title'),
      description: t('featuresSection.liveOrderTracking.description'),
      category: t('featuresSection.categories.coreFeatures')
    },
    {
      icon: <FileImage className="w-8 h-8 text-pink-500" />,
      title: t('featuresSection.pestOutbreakMaps.title'),
      description: t('featuresSection.pestOutbreakMaps.description'),
      category: t('featuresSection.categories.aiFeatures')
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-cyan-500" />,
      title: t('featuresSection.yieldForecasting.title'),
      description: t('featuresSection.yieldForecasting.description'),
      category: t('featuresSection.categories.aiFeatures')
    },
    {
      icon: <Users className="w-8 h-8 text-teal-500" />,
      title: t('featuresSection.farmerTrading.title'),
      description: t('featuresSection.farmerTrading.description'),
      category: t('featuresSection.categories.community')
    },
    {
      icon: <Shield className="w-8 h-8 text-emerald-500" />,
      title: t('featuresSection.cropInsurance.title'),
      description: t('featuresSection.cropInsurance.description'),
      category: t('featuresSection.categories.businessTools')
    },
    {
      icon: <Languages className="w-8 h-8 text-violet-500" />,
      title: t('featuresSection.multiLanguage.title'),
      description: t('featuresSection.multiLanguage.description'),
      category: t('featuresSection.categories.coreFeatures')
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-500" />,
      title: t('featuresSection.farmSimulation.title'),
      description: t('featuresSection.farmSimulation.description'),
      category: t('featuresSection.categories.aiFeatures')
    }
  ];

  const categories = [
    { name: t('featuresSection.categories.aiFeatures'), color: "bg-purple-100 text-purple-700", count: 5 },
    { name: t('featuresSection.categories.coreFeatures'), color: "bg-blue-100 text-blue-700", count: 3 },
    { name: t('featuresSection.categories.businessTools'), color: "bg-green-100 text-green-700", count: 2 },
    { name: t('featuresSection.categories.community'), color: "bg-orange-100 text-orange-700", count: 1 }
  ];

  return (
    <section id="features" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full mb-6">
            <Zap className="w-5 h-5 text-blue-600 mr-2" />
            <span className="text-blue-700 font-medium">{t('featuresSection.badge')}</span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {t('featuresSection.title')}
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            {t('featuresSection.description')}
          </p>

          {/* Category Overview */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {categories.map((category, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-soft">
                <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium mb-3 ${category.color}`}>
                  {category.name}
                </div>
                <div className="text-2xl font-bold text-gray-900">{category.count} {t('featuresSection.features')}</div>
                <div className="text-gray-600">{t('featuresSection.advancedTools')}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {coreFeatures.map((feature, index) => (
            <Card
              key={index}
              className="card-field hover:shadow-xl transition-all duration-500 group hover:-translate-y-1"
            >
              <div className="p-6">
                <div className="mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>

                <div className={`inline-flex px-2 py-1 rounded text-xs font-medium mb-3 ${feature.category === t('featuresSection.categories.aiFeatures') ? 'bg-purple-100 text-purple-700' :
                    feature.category === t('featuresSection.categories.coreFeatures') ? 'bg-blue-100 text-blue-700' :
                      feature.category === t('featuresSection.categories.businessTools') ? 'bg-green-100 text-green-700' :
                        'bg-orange-100 text-orange-700'
                  }`}>
                  {feature.category}
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </Card>
          ))}
        </div>

        {/* Advanced Features Showcase */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 md:p-12 text-white">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">{t('featuresSection.advancedAI.title')}</h3>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              {t('featuresSection.advancedAI.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Brain className="w-10 h-10 text-white" />
              </div>
              <h4 className="text-xl font-bold mb-3">{t('featuresSection.advancedAI.smartCrop.title')}</h4>
              <p className="opacity-90">{t('featuresSection.advancedAI.smartCrop.desc')}</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-10 h-10 text-white" />
              </div>
              <h4 className="text-xl font-bold mb-3">{t('featuresSection.advancedAI.precisionMaps.title')}</h4>
              <p className="opacity-90">{t('featuresSection.advancedAI.precisionMaps.desc')}</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Zap className="w-10 h-10 text-white" />
              </div>
              <h4 className="text-xl font-bold mb-3">{t('featuresSection.advancedAI.automatedInsights.title')}</h4>
              <p className="opacity-90">{t('featuresSection.advancedAI.automatedInsights.desc')}</p>
            </div>
          </div>
        </div>

        {/* Coming Soon Features */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">{t('featuresSection.comingSoon.title')}</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "🌍", title: t('featuresSection.comingSoon.globalMarket.title'), desc: t('featuresSection.comingSoon.globalMarket.desc') },
              { icon: "🤖", title: t('featuresSection.comingSoon.automatedFarming.title'), desc: t('featuresSection.comingSoon.automatedFarming.desc') },
              { icon: "🚁", title: t('featuresSection.comingSoon.droneMonitoring.title'), desc: t('featuresSection.comingSoon.droneMonitoring.desc') },
              { icon: "📊", title: t('featuresSection.comingSoon.carbonCredits.title'), desc: t('featuresSection.comingSoon.carbonCredits.desc') }
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