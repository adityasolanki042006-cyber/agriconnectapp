import { useState } from 'react';
import { Lightbulb, TrendingUp, Users, Package, DollarSign, BarChart3, CheckCircle2, AlertCircle, Zap, Target } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import FloatingAIChat from '@/components/FloatingAIChat';
import { useTranslation } from 'react-i18next';

interface Tip {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tips: string[];
}

const BusinessTips = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const businessTips: Tip[] = [
    {
      id: 1,
      title: 'Build Strong Relationships with Farmers',
      description: 'Establish long-term partnerships with reliable farmers for consistent supply.',
      icon: <Users className="w-6 h-6" />,
      category: 'relationships',
      difficulty: 'beginner',
      tips: [
        'Visit farmers regularly to understand their needs and concerns',
        'Offer fair prices that ensure farmer profitability',
        'Provide advance payments or secure contracts',
        'Share market insights and demand forecasts',
        'Provide technical support and quality inputs',
      ],
    },
    {
      id: 2,
      title: 'Optimize Inventory Management',
      description: 'Keep track of stock levels to prevent waste and ensure availability.',
      icon: <Package className="w-6 h-6" />,
      category: 'inventory',
      difficulty: 'intermediate',
      tips: [
        'Use FIFO (First In, First Out) method for perishables',
        'Monitor expiry dates and rotate stock regularly',
        'Set minimum and maximum stock levels',
        'Forecast demand based on seasonal trends',
        'Maintain proper storage conditions to reduce spoilage',
      ],
    },
    {
      id: 3,
      title: 'Master Pricing Strategy',
      description: 'Set competitive prices while maintaining healthy profit margins.',
      icon: <DollarSign className="w-6 h-6" />,
      category: 'pricing',
      difficulty: 'intermediate',
      tips: [
        'Calculate cost of goods + operational expenses + desired profit margin',
        'Monitor competitor pricing regularly',
        'Offer bulk discounts for large orders',
        'Consider seasonal price variations',
        'Use dynamic pricing for high-demand items',
      ],
    },
    {
      id: 4,
      title: 'Expand Your Market Reach',
      description: 'Grow your customer base by reaching new markets and segments.',
      icon: <TrendingUp className="w-6 h-6" />,
      category: 'growth',
      difficulty: 'advanced',
      tips: [
        'Identify underserved market segments',
        'Partner with retailers and wholesalers',
        'Use online platforms to reach wider audience',
        'Attend agricultural trade shows and exhibitions',
        'Build a strong brand with quality assurance',
      ],
    },
    {
      id: 5,
      title: 'Leverage Digital Tools',
      description: 'Use technology to streamline operations and improve efficiency.',
      icon: <Zap className="w-6 h-6" />,
      category: 'technology',
      difficulty: 'beginner',
      tips: [
        'Use accounting software to track finances',
        'Maintain digital records of transactions',
        'Use WhatsApp or SMS for customer communication',
        'Track orders and deliveries with mobile apps',
        'Collect customer feedback through digital channels',
      ],
    },
    {
      id: 6,
      title: 'Understand Quality Standards',
      description: 'Maintain high quality to build trust and ensure customer satisfaction.',
      icon: <CheckCircle2 className="w-6 h-6" />,
      category: 'quality',
      difficulty: 'beginner',
      tips: [
        'Implement quality checks at every stage',
        'Follow local and national food safety standards',
        'Train staff on proper handling procedures',
        'Get certifications (ISO, organic, etc.) where applicable',
        'Maintain cold chain for perishable products',
      ],
    },
    {
      id: 7,
      title: 'Financial Planning & Cash Flow',
      description: 'Manage cash flow effectively to ensure business sustainability.',
      icon: <BarChart3 className="w-6 h-6" />,
      category: 'finance',
      difficulty: 'intermediate',
      tips: [
        'Prepare a monthly budget and track expenses',
        'Maintain a cash reserve for emergencies',
        'Negotiate favorable payment terms with suppliers',
        'Invoice customers promptly and follow up on payments',
        'Keep separate business and personal accounts',
      ],
    },
    {
      id: 8,
      title: 'Risk Management & Insurance',
      description: 'Protect your business from unforeseen circumstances.',
      icon: <AlertCircle className="w-6 h-6" />,
      category: 'risk',
      difficulty: 'advanced',
      tips: [
        'Get crop insurance to protect against natural disasters',
        'Maintain liability insurance for operations',
        'Diversify suppliers to reduce dependency',
        'Keep business records for legal compliance',
        'Create backup plans for supply chain disruptions',
      ],
    },
    {
      id: 9,
      title: 'Customer Service Excellence',
      description: 'Build loyalty through exceptional customer service.',
      icon: <Target className="w-6 h-6" />,
      category: 'customer',
      difficulty: 'beginner',
      tips: [
        'Respond to customer inquiries within 24 hours',
        'Resolve complaints quickly and professionally',
        'Provide accurate product information',
        'Offer flexible payment and delivery options',
        'Build long-term relationships with key customers',
      ],
    },
    {
      id: 10,
      title: 'Seasonal Business Planning',
      description: 'Plan ahead for seasonal fluctuations in demand and supply.',
      icon: <Lightbulb className="w-6 h-6" />,
      category: 'planning',
      difficulty: 'intermediate',
      tips: [
        'Identify peak and off-season periods for your products',
        'Build inventory before peak seasons',
        'Develop alternative products for off-seasons',
        'Plan marketing campaigns in advance',
        'Adjust pricing based on seasonal demand',
      ],
    },
  ];

  const categories = [
    { id: 'all', label: 'All Tips' },
    { id: 'relationships', label: 'Relationships' },
    { id: 'inventory', label: 'Inventory' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'growth', label: 'Growth' },
    { id: 'technology', label: 'Technology' },
    { id: 'quality', label: 'Quality' },
    { id: 'finance', label: 'Finance' },
    { id: 'risk', label: 'Risk' },
    { id: 'customer', label: 'Customer' },
    { id: 'planning', label: 'Planning' },
  ];

  const filteredTips = selectedCategory === 'all' 
    ? businessTips 
    : businessTips.filter(tip => tip.category === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navigation />
      <FloatingAIChat />

      <div className="pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Lightbulb className="w-10 h-10 text-yellow-500 mr-3" />
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">Business Tips & Strategies</h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Grow your business with proven strategies, best practices, and expert insights tailored for agricultural businesses
            </p>
          </div>

          {/* Category Filter */}
          <div className="mb-8 bg-white rounded-2xl shadow-soft p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter by Category</h3>
            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => (
                <Button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  variant={selectedCategory === cat.id ? 'default' : 'outline'}
                  className={selectedCategory === cat.id ? 'btn-hero' : ''}
                >
                  {cat.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Tips Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredTips.map((tip) => (
              <Card key={tip.id} className="card-field hover:shadow-xl transition-all duration-300 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                    {tip.icon}
                  </div>
                  <Badge className={getDifficultyColor(tip.difficulty)}>
                    {tip.difficulty.charAt(0).toUpperCase() + tip.difficulty.slice(1)}
                  </Badge>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2">{tip.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{tip.description}</p>

                <div className="space-y-2 mb-4">
                  <h4 className="text-sm font-semibold text-gray-800">Key Points:</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    {tip.tips.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button variant="outline" className="w-full text-sm" size="sm">
                  Learn More
                </Button>
              </Card>
            ))}
          </div>

          {/* No Results */}
          {filteredTips.length === 0 && (
            <div className="text-center py-12">
              <Lightbulb className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No tips found</h3>
              <p className="text-gray-600">Try selecting a different category</p>
            </div>
          )}

          {/* Featured Section */}
          <div className="mt-12 bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Quick Success Checklist</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6" />
                  <span>Build strong farmer relationships</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6" />
                  <span>Maintain quality standards consistently</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6" />
                  <span>Track inventory and expenses</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6" />
                  <span>Offer competitive pricing</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6" />
                  <span>Leverage digital tools</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6" />
                  <span>Manage cash flow wisely</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6" />
                  <span>Plan for seasonal changes</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6" />
                  <span>Protect your business with insurance</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessTips;
