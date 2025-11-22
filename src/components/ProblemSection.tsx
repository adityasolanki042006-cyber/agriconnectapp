import { AlertTriangle, TrendingDown, Users, CloudRain, IndianRupee } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const ProblemSection = () => {
  const { t } = useLanguage();
  
  const problems = [
    {
      icon: <TrendingDown className="w-8 h-8 text-red-500" />,
      title: t('problem.wrongPricing'),
      description: t('problem.wrongPricingDesc'),
      stat: t('problem.wrongPricingStat')
    },
    {
      icon: <Users className="w-8 h-8 text-orange-500" />,
      title: t('problem.middlemen'),
      description: t('problem.middlemenDesc'),
      stat: t('problem.middlemenStat')
    },
    {
      icon: <CloudRain className="w-8 h-8 text-blue-500" />,
      title: t('problem.weather'),
      description: t('problem.weatherDesc'),
      stat: t('problem.weatherStat')
    },
    {
      icon: <IndianRupee className="w-8 h-8 text-purple-500" />,
      title: t('problem.inflation'),
      description: t('problem.inflationDesc'),
      stat: t('problem.inflationStat')
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-red-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-red-100 rounded-full mb-6">
            <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
            <span className="text-red-700 font-medium">{t('problem.badge')}</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {t('problem.title')}
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('problem.subtitle')}
          </p>
        </div>

        {/* Problems Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {problems.map((problem, index) => (
            <div 
              key={index}
              className="card-field hover:shadow-lg transition-all duration-300 group"
            >
              <div className="mb-4">
                {problem.icon}
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {problem.title}
              </h3>
              
              <p className="text-gray-600 mb-4">
                {problem.description}
              </p>
              
              <div className="text-sm font-bold text-red-600 bg-red-100 px-3 py-1 rounded-full inline-block">
                {problem.stat}
              </div>
            </div>
          ))}
        </div>

        {/* Visual Impact */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                {t('problem.dilemma')}
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex-shrink-0 mt-1"></div>
                  <div>
                    <div className="font-semibold text-gray-900">{t('problem.marketAccess')}</div>
                    <div className="text-gray-600">{t('problem.marketAccessDesc')}</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-orange-500 rounded-full flex-shrink-0 mt-1"></div>
                  <div>
                    <div className="font-semibold text-gray-900">{t('problem.infoGap')}</div>
                    <div className="text-gray-600">{t('problem.infoGapDesc')}</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-purple-500 rounded-full flex-shrink-0 mt-1"></div>
                  <div>
                    <div className="font-semibold text-gray-900">{t('problem.supplyChain')}</div>
                    <div className="text-gray-600">{t('problem.supplyChainDesc')}</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-r from-red-400 to-orange-400 rounded-2xl p-8 text-center text-white">
                <div className="text-6xl font-bold mb-4">₹2.5L</div>
                <div className="text-xl font-semibold mb-2">{t('problem.annualLoss')}</div>
                <div className="text-red-100">{t('problem.perFamily')}</div>
              </div>
              
              {/* Floating stats */}
              <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-4 text-center">
                <div className="text-2xl font-bold text-gray-900">85%</div>
                <div className="text-sm text-gray-600">{t('problem.smallFarmers')}</div>
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-4 text-center">
                <div className="text-2xl font-bold text-gray-900">60%</div>
                <div className="text-sm text-gray-600">{t('problem.population')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;