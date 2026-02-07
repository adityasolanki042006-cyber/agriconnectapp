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

const FeaturesSection = () => {
  const coreFeatures = [
    {
      icon: <Brain className="w-8 h-8 text-purple-500" />,
      title: "AI Crop Disease Detection",
      description: "Upload crop photos and get instant disease diagnosis with treatment recommendations.",
      category: "AI Features"
    },
    {
      icon: <Cloud className="w-8 h-8 text-blue-500" />,
      title: "Weather-Based Farming",
      description: "AI-powered weather analysis and farming suggestions for optimal yield.",
      category: "AI Features"
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-green-500" />,
      title: "Multilingual AI Chatbot",
      description: "Voice and text support in Hindi, English, and regional languages.",
      category: "AI Features"
    },
    {
      icon: <MapPin className="w-8 h-8 text-red-500" />,
      title: "State-wise Pricing",
      description: "Real-time crop prices across all Indian states and major mandis.",
      category: "Core Features"
    },
    {
      icon: <CreditCard className="w-8 h-8 text-indigo-500" />,
      title: "Digital Wallet & UPI",
      description: "Secure payments with integrated digital wallet and UPI support.",
      category: "Business Tools"
    },
    {
      icon: <Truck className="w-8 h-8 text-orange-500" />,
      title: "Live Order Tracking",
      description: "Track your orders from farm to doorstep with real-time updates.",
      category: "Core Features"
    },
    {
      icon: <FileImage className="w-8 h-8 text-pink-500" />,
      title: "Pest Outbreak Maps",
      description: "Interactive maps showing pest outbreaks and prevention measures.",
      category: "AI Features"
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-cyan-500" />,
      title: "Yield Forecasting",
      description: "AI predicts crop yield based on weather, soil, and farming practices.",
      category: "AI Features"
    },
    {
      icon: <Users className="w-8 h-8 text-teal-500" />,
      title: "Farmer-to-Farmer Trading",
      description: "Direct trading between farmers for seeds, equipment, and knowledge.",
      category: "Community"
    },
    {
      icon: <Shield className="w-8 h-8 text-emerald-500" />,
      title: "Crop Insurance Advisor",
      description: "AI-powered insurance recommendations and claim assistance.",
      category: "Business Tools"
    },
    {
      icon: <Languages className="w-8 h-8 text-violet-500" />,
      title: "Multi-language Support",
      description: "Available in 12+ Indian languages with voice recognition.",
      category: "Core Features"
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-500" />,
      title: "Farm Simulation (Digital Twin)",
      description: "Virtual farm modeling to optimize resources and maximize profits.",
      category: "AI Features"
    }
  ];

  const categories = [
    { name: "AI Features", color: "bg-purple-100 text-purple-700", count: 5 },
    { name: "Core Features", color: "bg-blue-100 text-blue-700", count: 3 },
    { name: "Business Tools", color: "bg-green-100 text-green-700", count: 2 },
    { name: "Community", color: "bg-orange-100 text-orange-700", count: 1 }
  ];

  return (
    <section id="features" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full mb-6">
            <Zap className="w-5 h-5 text-blue-600 mr-2" />
            <span className="text-blue-700 font-medium">200+ Features</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Everything Farmers Need in One App
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            From AI-powered crop management to direct marketplace access, AgriConnect 
            provides comprehensive tools to modernize farming and maximize profits.
          </p>

          {/* Category Overview */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {categories.map((category, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-soft">
                <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium mb-3 ${category.color}`}>
                  {category.name}
                </div>
                <div className="text-2xl font-bold text-gray-900">{category.count} Features</div>
                <div className="text-gray-600">Advanced tools available</div>
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
                
                <div className={`inline-flex px-2 py-1 rounded text-xs font-medium mb-3 ${
                  feature.category === 'AI Features' ? 'bg-purple-100 text-purple-700' :
                  feature.category === 'Core Features' ? 'bg-blue-100 text-blue-700' :
                  feature.category === 'Business Tools' ? 'bg-green-100 text-green-700' :
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
            <h3 className="text-3xl font-bold mb-4">Advanced AI-Powered Features</h3>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Cutting-edge technology that brings the future of farming to your fingertips
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Brain className="w-10 h-10 text-white" />
              </div>
              <h4 className="text-xl font-bold mb-3">Smart Crop Analysis</h4>
              <p className="opacity-90">AI analyzes soil conditions, weather patterns, and crop health to provide personalized recommendations for maximum yield.</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-10 h-10 text-white" />
              </div>
              <h4 className="text-xl font-bold mb-3">Precision Farming Maps</h4>
              <p className="opacity-90">Satellite imagery and IoT sensors create detailed farm maps for precise resource allocation and monitoring.</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Zap className="w-10 h-10 text-white" />
              </div>
              <h4 className="text-xl font-bold mb-3">Automated Insights</h4>
              <p className="opacity-90">Real-time notifications about market opportunities, weather alerts, and optimal farming actions.</p>
            </div>
          </div>
        </div>

        {/* Coming Soon Features */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Coming Soon</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "🌍", title: "Global Marketplace", desc: "Export Indian crops worldwide" },
              { icon: "🤖", title: "Automated Farming", desc: "AI-controlled irrigation & harvesting" },
              { icon: "🚁", title: "Drone Monitoring", desc: "Aerial crop surveillance" },
              { icon: "📊", title: "Carbon Credits", desc: "Earn from sustainable practices" }
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