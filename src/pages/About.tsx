import { Target, Heart, Award, Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Navigation from '@/components/Navigation';
import FloatingAIChat from '@/components/FloatingAIChat';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(t('about.successMessage'));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navigation />
      <FloatingAIChat />

      <div className="pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {t('about.title')}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('about.subtitle')}
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card className="card-field p-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('about.ourMission')}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t('about.missionText')}
              </p>
            </Card>

            <Card className="card-field p-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <Heart className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('about.ourVision')}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t('about.visionText')}
              </p>
            </Card>
          </div>

          {/* Our Story */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">{t('about.ourStory')}</h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                {t('about.storyPara1')}
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                {t('about.storyPara2')}
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                {t('about.storyPara3')}
              </p>
            </div>
          </div>


          {/* Impact Stats */}
          <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 mb-16 text-white">
            <h2 className="text-3xl font-bold text-center mb-12">{t('about.ourImpact')}</h2>
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">10,000+</div>
                <div className="text-green-100">{t('about.farmersConnected')}</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">₹50L+</div>
                <div className="text-green-100">{t('about.farmerIncomeIncreased')}</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">100+</div>
                <div className="text-green-100">{t('about.citiesServed')}</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">25%</div>
                <div className="text-green-100">{t('about.avgPriceImprovement')}</div>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">{t('about.getInTouch')}</h2>

              <div className="space-y-6 mb-8">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{t('about.phone')}</div>
                    <div className="text-gray-600">+91 98765 43210</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{t('about.email')}</div>
                    <div className="text-gray-600">hello@agriconnect.in</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{t('about.address')}</div>
                    <div className="text-gray-600">
                      Tech Hub, Sector 18<br />
                      Gurugram, Haryana 122015
                    </div>
                  </div>
                </div>
              </div>

              {/* Awards */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900 flex items-center">
                  <Award className="w-6 h-6 text-yellow-600 mr-2" />
                  {t('about.recognition')}
                </h3>
                <div className="space-y-2 text-gray-600">
                  <div>{t('about.awards.award1')}</div>
                  <div>{t('about.awards.award2')}</div>
                  <div>{t('about.awards.award3')}</div>
                </div>
              </div>
            </div>

            <Card className="card-field p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('about.sendMessage')}</h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input placeholder={t('about.firstName')} required />
                  <Input placeholder={t('about.lastName')} required />
                </div>

                <Input type="email" placeholder={t('about.emailAddress')} required />
                <Input placeholder={t('about.subject')} required />

                <Textarea
                  placeholder={t('about.yourMessage')}
                  className="min-h-[120px]"
                  required
                />

                <Button type="submit" className="btn-hero w-full">
                  <Send className="w-5 h-5 mr-2" />
                  {t('about.send')}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;