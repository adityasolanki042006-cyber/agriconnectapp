import { Check, Star, Users, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from 'react-i18next';

const PricingSection = () => {
  const { t } = useTranslation();

  const plans = [
    {
      name: t('pricingSection.farmerBasic'),
      price: t('pricingSection.free'),
      period: t('pricingSection.forever'),
      description: t('pricingSection.farmerBasicDesc'),
      badge: t('pricingSection.mostPopular'),
      badgeColor: "bg-green-100 text-green-700",
      features: [
        t('pricingSection.features.marketplace'),
        t('pricingSection.features.priceAlerts'),
        t('pricingSection.features.weather'),
        t('pricingSection.features.chatbot50'),
        t('pricingSection.features.forums'),
        t('pricingSection.features.tutorials'),
        t('pricingSection.features.mobileApp')
      ],
      buttonText: t('pricingSection.startFree'),
      buttonVariant: "outline",
      highlighted: false
    },
    {
      name: t('pricingSection.farmerPro'),
      price: "₹199",
      period: "/month",
      description: t('pricingSection.farmerProDesc'),
      badge: t('pricingSection.bestValue'),
      badgeColor: "bg-blue-100 text-blue-700",
      features: [
        t('pricingSection.features.everythingBasic'),
        t('pricingSection.features.unlimitedAI'),
        t('pricingSection.features.advancedAnalytics'),
        t('pricingSection.features.diseaseDetection'),
        t('pricingSection.features.yieldForecasting'),
        t('pricingSection.features.premiumSupport'),
        t('pricingSection.features.earlyAccess'),
        t('pricingSection.features.buyerConnections'),
        t('pricingSection.features.fertilizerRec')
      ],
      buttonText: t('pricingSection.upgradePro'),
      buttonVariant: "default",
      highlighted: true
    },
    {
      name: t('pricingSection.farmEnterprise'),
      price: "₹999",
      period: "/month",
      description: t('pricingSection.farmEnterpriseDesc'),
      badge: t('pricingSection.enterprise'),
      badgeColor: "bg-purple-100 text-purple-700",
      features: [
        t('pricingSection.features.everythingPro'),
        t('pricingSection.features.multiFarm'),
        t('pricingSection.features.teamTools'),
        t('pricingSection.features.customIntegrations'),
        t('pricingSection.features.accountManager'),
        t('pricingSection.features.advancedDashboard'),
        t('pricingSection.features.bulkTrading'),
        t('pricingSection.features.whiteLabel'),
        t('pricingSection.features.prioritySupport')
      ],
      buttonText: t('pricingSection.contactSales'),
      buttonVariant: "outline",
      highlighted: false
    }
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="pricing" className="py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full mb-6">
            <Star className="w-5 h-5 text-blue-600 mr-2" />
            <span className="text-blue-700 font-medium">{t('pricingSection.badge')}</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">{t('pricingSection.title')}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">{t('pricingSection.desc')}</p>
          <div className="flex flex-wrap justify-center items-center gap-8 mb-12">
            <div className="flex items-center space-x-2"><Users className="w-5 h-5 text-green-600" /><span className="text-gray-600">{t('pricingSection.activeFarmers')}</span></div>
            <div className="flex items-center space-x-2"><Star className="w-5 h-5 text-yellow-500 fill-current" /><span className="text-gray-600">{t('pricingSection.rating')}</span></div>
            <div className="flex items-center space-x-2"><Zap className="w-5 h-5 text-blue-600" /><span className="text-gray-600">{t('pricingSection.uptime')}</span></div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative p-8 ${plan.highlighted ? 'ring-2 ring-blue-500 shadow-2xl scale-105' : 'shadow-soft hover:shadow-xl'} transition-all duration-300 hover:-translate-y-2`}>
              {plan.badge && (<Badge className={`absolute -top-3 left-1/2 transform -translate-x-1/2 ${plan.badgeColor}`}>{plan.badge}</Badge>)}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <div className="flex items-baseline justify-center"><span className="text-5xl font-bold text-gray-900">{plan.price}</span><span className="text-gray-600 ml-1">{plan.period}</span></div>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start space-x-3"><Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" /><span className="text-gray-700">{feature}</span></li>
                ))}
              </ul>
              <Button onClick={() => scrollToSection('#contact')} variant={plan.buttonVariant as "default" | "outline"} className={`w-full ${plan.highlighted ? 'btn-hero' : ''}`} size="lg">{plan.buttonText}</Button>
            </Card>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">{t('pricingSection.faq')}</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">{t('pricingSection.faq1Q')}</h4>
              <p className="text-gray-600 mb-6">{t('pricingSection.faq1A')}</p>
              <h4 className="font-semibold text-gray-900 mb-2">{t('pricingSection.faq2Q')}</h4>
              <p className="text-gray-600">{t('pricingSection.faq2A')}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">{t('pricingSection.faq3Q')}</h4>
              <p className="text-gray-600 mb-6">{t('pricingSection.faq3A')}</p>
              <h4 className="font-semibold text-gray-900 mb-2">{t('pricingSection.faq4Q')}</h4>
              <p className="text-gray-600">{t('pricingSection.faq4A')}</p>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">{t('pricingSection.customSolution')}</h3>
            <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">{t('pricingSection.customSolutionDesc')}</p>
            <Button onClick={() => scrollToSection('#contact')} variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20" size="lg">{t('pricingSection.scheduleDemo')}</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;