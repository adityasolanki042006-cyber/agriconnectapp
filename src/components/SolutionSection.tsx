import { ArrowRight, CheckCircle, TrendingUp, Users2, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import supplyChain from '@/assets/supply-chain.jpg';

const SolutionSection = () => {
  const solutions = [
    {
      icon: <TrendingUp className="w-8 h-8 text-green-500" />,
      title: "Direct Market Access",
      description: "Connect farmers directly to mandis and buyers for better prices.",
      benefit: "30% higher income"
    },
    {
      icon: <Zap className="w-8 h-8 text-blue-500" />,
      title: "Real-time Pricing",
      description: "Live market rates and demand insights across all major mandis.",
      benefit: "Informed decisions"
    },
    {
      icon: <Users2 className="w-8 h-8 text-purple-500" />,
      title: "Eliminate Middlemen",
      description: "Sell grains and crops directly through our verified platform.",
      benefit: "Zero commission fees"
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-orange-500" />,
      title: "Integrated Fertilizers",
      description: "Easy access to quality fertilizers at competitive prices.",
      benefit: "20% cost savings"
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
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full mb-6">
            <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
            <span className="text-green-700 font-medium">Our Solution</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            AgriConnect: Bridging the Gap
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            We connect farmers directly to markets, eliminate middlemen, and provide 
            AI-powered tools to maximize profits while fighting inflation.
          </p>

          {/* Key Value Proposition */}
          <div className="bg-gradient-hero text-white rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              Farm → AgriConnect → Market → Right Price ✓
            </h3>
            <p className="text-lg opacity-90">
              Direct selling reduces *mahangai* (inflation) in high-demand regions while ensuring farmers get fair prices.
            </p>
          </div>
        </div>

        {/* Solutions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {solutions.map((solution, index) => (
            <div 
              key={index}
              className="card-field hover:shadow-xl transition-all duration-500 group hover:-translate-y-2"
            >
              <div className="mb-4 group-hover:scale-110 transition-transform">
                {solution.icon}
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {solution.title}
              </h3>
              
              <p className="text-gray-600 mb-4">
                {solution.description}
              </p>
              
              <div className="text-sm font-bold text-green-600 bg-green-100 px-3 py-1 rounded-full inline-block">
                {solution.benefit}
              </div>
            </div>
          ))}
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Image Side */}
            <div className="relative h-96 lg:h-auto">
              <img 
                src={supplyChain} 
                alt="Farm to market supply chain illustration"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-blue-500/20"></div>
            </div>
            
            {/* Content Side */}
            <div className="p-8 md:p-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                How AgriConnect Works
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-hero rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">1</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">Upload Your Crop</div>
                    <div className="text-gray-600">Farmer uploads crop details with photos and quantity.</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-hero rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">2</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">Get Live Market Prices</div>
                    <div className="text-gray-600">AI shows real-time prices across all mandis and demand centers.</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-hero rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">3</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">Choose Best Option</div>
                    <div className="text-gray-600">Select direct sale or marketplace based on highest profit potential.</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-hero rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">4</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">Track & Get Paid</div>
                    <div className="text-gray-600">Real-time tracking from pickup to delivery with secure payments.</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <Button 
                  onClick={() => scrollToSection('#features')}
                  className="btn-hero group"
                >
                  Explore All Features
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Impact Stats */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="text-center bg-white rounded-xl p-6 shadow-soft">
            <div className="text-4xl font-bold text-green-600 mb-2">₹5L+</div>
            <div className="text-gray-600">Additional income per farmer annually</div>
          </div>
          
          <div className="text-center bg-white rounded-xl p-6 shadow-soft">
            <div className="text-4xl font-bold text-blue-600 mb-2">25%</div>
            <div className="text-gray-600">Reduction in food inflation</div>
          </div>
          
          <div className="text-center bg-white rounded-xl p-6 shadow-soft">
            <div className="text-4xl font-bold text-purple-600 mb-2">10K+</div>
            <div className="text-gray-600">Farmers already benefiting</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;