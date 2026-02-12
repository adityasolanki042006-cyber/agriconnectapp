import { Sprout, Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  const quickLinks = [
    { name: t('footerSection.home'), href: '#home' },
    { name: t('footerSection.features'), href: '#features' },
    { name: t('footerSection.marketplace'), href: '#marketplace' },
    { name: t('footerSection.pricing'), href: '#pricing' },
    { name: t('footerSection.aboutUs'), href: '#about' },
    { name: t('footerSection.contact'), href: '#contact' }
  ];

  const services = [
    { name: t('footerSection.cropMarketplace'), href: '#marketplace' },
    { name: t('footerSection.fertilizerFriend'), href: '#fertilizer' },
    { name: t('footerSection.aiChatbot'), href: '#ai-chat' },
    { name: t('footerSection.priceTracking'), href: '#features' },
    { name: t('footerSection.weatherForecast'), href: '#features' },
    { name: t('footerSection.diseaseDetection'), href: '#features' }
  ];

  const support = [
    { name: t('footerSection.helpCenter'), href: '#' },
    { name: t('footerSection.farmerSupport'), href: '#' },
    { name: t('footerSection.technicalSupport'), href: '#' },
    { name: t('footerSection.trainingVideos'), href: '#' },
    { name: t('footerSection.documentation'), href: '#' },
    { name: t('footerSection.communityForum'), href: '#' }
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-gradient-to-br from-gray-900 via-gray-800 to-green-900 text-white">
      <div className="border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">{t('footerSection.newsletter')}</h3>
            <p className="text-gray-300 max-w-2xl mx-auto">{t('footerSection.newsletterDesc')}</p>
          </div>
          <div className="max-w-md mx-auto">
            <div className="flex space-x-2">
              <Input type="email" placeholder={t('footerSection.emailPlaceholder')} className="bg-white/10 border-white/20 text-white placeholder:text-gray-300" />
              <Button className="btn-hero px-6">{t('footerSection.subscribe')}<ArrowRight className="w-4 h-4 ml-2" /></Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-12 h-12 bg-gradient-hero rounded-xl flex items-center justify-center"><Sprout className="w-7 h-7 text-white" /></div>
              <span className="text-2xl font-bold">AgriConnect</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">{t('footerSection.companyDesc')}</p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3"><MapPin className="w-5 h-5 text-green-400" /><span className="text-gray-300">Delhi, India</span></div>
              <div className="flex items-center space-x-3"><Phone className="w-5 h-5 text-green-400" /><a href="tel:+917828988589" className="text-gray-300 hover:text-white transition-colors">+91 7828988589</a></div>
              <div className="flex items-center space-x-3"><Mail className="w-5 h-5 text-green-400" /><a href="mailto:official.agriconnect@gmail.com" className="text-gray-300 hover:text-white transition-colors">official.agriconnect@gmail.com</a></div>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-6">{t('footerSection.quickLinks')}</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}><button onClick={() => scrollToSection(link.href)} className="text-gray-300 hover:text-white transition-colors">{link.name}</button></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-6">{t('footerSection.ourServices')}</h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}><button onClick={() => scrollToSection(service.href)} className="text-gray-300 hover:text-white transition-colors">{service.name}</button></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-6">{t('footerSection.support')}</h4>
            <ul className="space-y-3">
              {support.map((item, index) => (
                <li key={index}><a href={item.href} className="text-gray-300 hover:text-white transition-colors">{item.name}</a></li>
              ))}
            </ul>
            <div className="mt-8">
              <h5 className="text-sm font-semibold mb-4 text-gray-200">{t('footerSection.followUs')}</h5>
              <div className="flex space-x-3">
                {[
                  { icon: Facebook, href: '#', color: 'hover:text-blue-400' },
                  { icon: Twitter, href: '#', color: 'hover:text-blue-400' },
                  { icon: Instagram, href: '#', color: 'hover:text-pink-400' },
                  { icon: Linkedin, href: '#', color: 'hover:text-blue-500' },
                  { icon: Youtube, href: '#', color: 'hover:text-red-400' }
                ].map((social, index) => (
                  <a key={index} href={social.href} className={`w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-gray-300 ${social.color} transition-colors hover:scale-110 transform`}>
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="md:flex md:items-center md:justify-between">
            <div className="text-center md:text-left"><p className="text-gray-300">{t('footerSection.copyright')}</p></div>
            <div className="mt-4 md:mt-0">
              <div className="flex justify-center md:justify-end space-x-6 text-sm">
                <a href="#" className="text-gray-300 hover:text-white transition-colors">{t('footerSection.privacyPolicy')}</a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">{t('footerSection.termsOfService')}</a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">{t('footerSection.cookiePolicy')}</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button onClick={() => scrollToSection('#home')} className="fixed bottom-6 left-6 w-12 h-12 bg-gradient-hero rounded-full shadow-2xl flex items-center justify-center text-white hover:scale-110 transition-transform z-40">
        <ArrowRight className="w-5 h-5 rotate-[-90deg]" />
      </button>
    </footer>
  );
};

export default Footer;