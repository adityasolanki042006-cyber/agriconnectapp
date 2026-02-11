import { ArrowRight, CheckCircle, TrendingUp, Users2, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import supplyChain from '@/assets/supply-chain.jpg';

const SolutionSection = () => {
  const { t } = useTranslation();

  const solutions = [
    {
      icon: <TrendingUp className="w-8 h-8 text-green-500" />,
      title: t('solutionSection.directAccess'),
      description: t('solutionSection.directAccessDesc'),
      benefit: t('solutionSection.directAccessBenefit')
    },
    {
      icon: <Zap className="w-8 h-8 text-blue-500" />,
      title: t('solutionSection.realtime'),
      description: t('solutionSection.realtimeDesc'),
      benefit: t('solutionSection.realtimeBenefit')
    },
    {
      icon: <Users2 className="w-8 h-8 text-purple-500" />,
      title: t('solutionSection.eliminateMiddlemen'),
      description: t('solutionSection.eliminateMiddlemenDesc'),
      benefit: t('solutionSection.eliminateMiddlemenBenefit')
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-orange-500" />,
      title: t('solutionSection.integratedFertilizers'),
      description: t('solutionSection.integratedFertilizersDesc'),
      benefit: t('solutionSection.integratedFertilizersBenefit')
    }
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-green-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full mb-6">
            <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
            <span className="text-green-700 font-medium">{t('solutionSection.badge')}</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {t('solutionSection.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            {t('solutionSection.desc')}
          </p>
          <div className="bg-gradient-hero text-white rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">{t('solutionSection.valueProposition')}</h3>
            <p className="text-lg opacity-90">{t('solutionSection.valueDesc')}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {solutions.map((solution, index) => (
            <div key={index} className="card-field hover:shadow-xl transition-all duration-500 group hover:-translate-y-2">
              <div className="mb-4 group-hover:scale-110 transition-transform">{solution.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{solution.title}</h3>
              <p className="text-gray-600 mb-4">{solution.description}</p>
              <div className="text-sm font-bold text-green-600 bg-green-100 px-3 py-1 rounded-full inline-block">
                {solution.benefit}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0">
            <div className="relative h-96 lg:h-auto">
              <img src={supplyChain} alt="Farm to market supply chain illustration" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-blue-500/20"></div>
            </div>
            <div className="p-8 md:p-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">{t('solutionSection.howItWorks')}</h3>
              <div className="space-y-6">
                {[
                  { num: '1', title: t('solutionSection.step1Title'), desc: t('solutionSection.step1Desc') },
                  { num: '2', title: t('solutionSection.step2Title'), desc: t('solutionSection.step2Desc') },
                  { num: '3', title: t('solutionSection.step3Title'), desc: t('solutionSection.step3Desc') },
                  { num: '4', title: t('solutionSection.step4Title'), desc: t('solutionSection.step4Desc') },
                ].map((step) => (
                  <div key={step.num} className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-gradient-hero rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">{step.num}</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 mb-1">{step.title}</div>
                      <div className="text-gray-600">{step.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Button onClick={() => scrollToSection('#features')} className="btn-hero group">
                  {t('solutionSection.exploreFeatures')}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="text-center bg-white rounded-xl p-6 shadow-soft">
            <div className="text-4xl font-bold text-green-600 mb-2">₹5L+</div>
            <div className="text-gray-600">{t('solutionSection.additionalIncome')}</div>
          </div>
          <div className="text-center bg-white rounded-xl p-6 shadow-soft">
            <div className="text-4xl font-bold text-blue-600 mb-2">25%</div>
            <div className="text-gray-600">{t('solutionSection.reductionInflation')}</div>
          </div>
          <div className="text-center bg-white rounded-xl p-6 shadow-soft">
            <div className="text-4xl font-bold text-purple-600 mb-2">10K+</div>
            <div className="text-gray-600">{t('solutionSection.farmersBenefiting')}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;