import { Phone, Mail, MapPin, Clock, MessageCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const ContactSupport = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t('contactSupport.back')}
        </Button>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">{t('contactSupport.title')}</h1>
          <p className="text-lg text-muted-foreground">{t('contactSupport.subtitle')}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Phone Card */}
          <div className="bg-card border border-border rounded-2xl p-8 text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Phone className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">{t('contactSupport.callUs')}</h2>
            <p className="text-muted-foreground mb-4">{t('contactSupport.callDesc')}</p>
            <a href="tel:+917828988589" className="text-2xl font-bold text-primary hover:underline">
              +91 7828988589
            </a>
            <div className="flex items-center justify-center mt-4 text-sm text-muted-foreground">
              <Clock className="w-4 h-4 mr-2" />
              {t('contactSupport.availability')}
            </div>
          </div>

          {/* Email Card */}
          <div className="bg-card border border-border rounded-2xl p-8 text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">{t('contactSupport.emailUs')}</h2>
            <p className="text-muted-foreground mb-4">{t('contactSupport.emailDesc')}</p>
            <a href="mailto:official.agriconnect@gmail.com" className="text-lg font-bold text-primary hover:underline break-all">
              official.agriconnect@gmail.com
            </a>
            <div className="flex items-center justify-center mt-4 text-sm text-muted-foreground">
              <MessageCircle className="w-4 h-4 mr-2" />
              {t('contactSupport.responseTime')}
            </div>
          </div>
        </div>

        {/* Office Info */}
        <div className="mt-12 bg-card border border-border rounded-2xl p-8 text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <MapPin className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-2">{t('contactSupport.office')}</h2>
          <p className="text-muted-foreground">Delhi, India</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactSupport;
