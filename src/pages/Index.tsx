import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import ProblemSection from '@/components/ProblemSection';
import SolutionSection from '@/components/SolutionSection';
import FeaturesSection from '@/components/FeaturesSection';
import MarketplaceSection from '@/components/MarketplaceSection';
import FertilizerSection from '@/components/FertilizerSection';
import AIChatbotSection from '@/components/AIChatbotSection';
import PricingSection from '@/components/PricingSection';
import Footer from '@/components/Footer';
import FloatingAIChat from '@/components/FloatingAIChat';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <FloatingAIChat />
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <FeaturesSection />
      <MarketplaceSection />
      <FertilizerSection />
      <AIChatbotSection />
      <PricingSection />
      <Footer />
    </div>
  );
};

export default Index;
