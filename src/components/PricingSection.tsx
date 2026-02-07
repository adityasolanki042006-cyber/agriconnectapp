import { Check, Star, Users, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const PricingSection = () => {
  const plans = [
    {
      name: "Farmer Basic",
      price: "Free",
      period: "Forever",
      description: "Perfect for individual farmers starting their digital journey",
      badge: "Most Popular",
      badgeColor: "bg-green-100 text-green-700",
      features: [
        "Access to marketplace",
        "Basic crop price alerts",
        "Weather forecasts",
        "AI chatbot (50 queries/month)",
        "Community forums",
        "Basic tutorials",
        "Mobile app access"
      ],
      buttonText: "Start Free",
      buttonVariant: "outline",
      highlighted: false
    },
    {
      name: "Farmer Pro",
      price: "₹199",
      period: "/month",
      description: "Advanced features for serious farmers to maximize profits",
      badge: "Best Value",
      badgeColor: "bg-blue-100 text-blue-700",
      features: [
        "Everything in Basic",
        "Unlimited AI queries",
        "Advanced price analytics",
        "Disease detection (unlimited)",
        "Yield forecasting",
        "Premium support",
        "Early access to new features",
        "Direct buyer connections",
        "Fertilizer recommendations"
      ],
      buttonText: "Upgrade to Pro",
      buttonVariant: "default",
      highlighted: true
    },
    {
      name: "Farm Enterprise",
      price: "₹999",
      period: "/month",
      description: "Comprehensive solution for large farms and agricultural businesses",
      badge: "Enterprise",
      badgeColor: "bg-purple-100 text-purple-700",
      features: [
        "Everything in Pro",
        "Multi-farm management",
        "Team collaboration tools",
        "Custom integrations",
        "Dedicated account manager",
        "Advanced analytics dashboard",
        "Bulk trading capabilities",
        "White-label solutions",
        "Priority customer support"
      ],
      buttonText: "Contact Sales",
      buttonVariant: "outline",
      highlighted: false
    }
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="pricing" className="py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full mb-6">
            <Star className="w-5 h-5 text-blue-600 mr-2" />
            <span className="text-blue-700 font-medium">Simple Pricing</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Choose Your Farming Journey
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Start free and upgrade as you grow. No hidden fees, no complex contracts. 
            Just transparent pricing that scales with your farming success.
          </p>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 mb-12">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-green-600" />
              <span className="text-gray-600">10,000+ Active Farmers</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-500 fill-current" />
              <span className="text-gray-600">4.8/5 Rating</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-blue-600" />
              <span className="text-gray-600">99.9% Uptime</span>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative p-8 ${
                plan.highlighted 
                  ? 'ring-2 ring-blue-500 shadow-2xl scale-105' 
                  : 'shadow-soft hover:shadow-xl'
              } transition-all duration-300 hover:-translate-y-2`}
            >
              {/* Badge */}
              {plan.badge && (
                <Badge className={`absolute -top-3 left-1/2 transform -translate-x-1/2 ${plan.badgeColor}`}>
                  {plan.badge}
                </Badge>
              )}

              {/* Header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                
                <div className="flex items-baseline justify-center">
                  <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600 ml-1">{plan.period}</span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Button 
                onClick={() => scrollToSection('#contact')}
                variant={plan.buttonVariant as "default" | "outline"}
                className={`w-full ${plan.highlighted ? 'btn-hero' : ''}`}
                size="lg"
              >
                {plan.buttonText}
              </Button>
            </Card>
          ))}
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Is the basic plan really free?</h4>
              <p className="text-gray-600 mb-6">Yes! Our basic plan is completely free forever. No credit card required, no hidden fees.</p>
              
              <h4 className="font-semibold text-gray-900 mb-2">Can I switch plans anytime?</h4>
              <p className="text-gray-600">Absolutely! Upgrade or downgrade your plan anytime. Changes take effect immediately.</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">What payment methods do you accept?</h4>
              <p className="text-gray-600 mb-6">We accept UPI, credit/debit cards, net banking, and mobile wallets.</p>
              
              <h4 className="font-semibold text-gray-900 mb-2">Do you offer refunds?</h4>
              <p className="text-gray-600">Yes, we offer a 30-day money-back guarantee for all paid plans.</p>
            </div>
          </div>
        </div>

        {/* Enterprise CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Need a Custom Solution?</h3>
            <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
              Large farming operations, cooperatives, and agricultural businesses need specialized solutions. 
              Let's discuss your requirements.
            </p>
            <Button 
              onClick={() => scrollToSection('#contact')}
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              size="lg"
            >
              Schedule a Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;