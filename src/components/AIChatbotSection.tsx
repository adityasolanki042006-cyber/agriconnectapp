import { useState } from 'react';
import { MessageCircle, Mic, Send, User, Bot, Languages, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useTranslation } from 'react-i18next';

interface ChatMessage {
  id: number;
  type: 'user' | 'bot';
  message: string;
  timestamp: string;
}

const AIChatbotSection = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 1, type: 'bot', message: 'नमस्ते! मैं AgriConnect का AI असिस्टेंट हूं। मैं आपकी खेती, बाजार की कीमतों, और कृषि की समस्याओं में मदद कर सकता हूं। आप मुझसे हिंदी या अंग्रेजी में बात कर सकते हैं।', timestamp: '10:30 AM' },
    { id: 2, type: 'bot', message: 'Hello! I\'m AgriConnect AI Assistant. I can help you with farming advice, market prices, crop diseases, weather forecasts, and more. How can I assist you today?', timestamp: '10:30 AM' }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'pa', name: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
    { code: 'mr', name: 'मराठी', flag: '🇮🇳' },
    { code: 'bn', name: 'বাংলা', flag: '🇮🇳' },
    { code: 'te', name: 'తెలుగు', flag: '🇮🇳' }
  ];

  const sampleQuestions = [
    "What's the current price of tomatoes?",
    "मेरी फसल में कीड़े लग गए हैं, क्या करूं?",
    "Best time to plant wheat in Punjab?",
    "आज का मौसम कैसा रहेगा?",
    "How to get better fertilizer deals?",
    "बाजार में सबसे ज्यादा मांग किसकी है?"
  ];

  const predefinedResponses = [
    "Current tomato prices: Delhi ₹28/kg, Mumbai ₹32/kg, Bangalore ₹25/kg.",
    "कीड़ों की समस्या के लिए: 1) नीम का तेल छिड़कें, 2) जैविक कीटनाशक का उपयोग करें।",
    "Best wheat planting time in Punjab: October 15 - November 15.",
    "आज का मौसम: सुबह धूप, दोपहर में हल्की बादल। तापमान: 25-32°C।",
    "Fertilizer deals available: DAP at ₹1,250/bag (10% off), Urea at ₹280/bag.",
    "आज सबसे ज्यादा मांग: टमाटर (+15%), प्याज (+8%), आलू (+12%)।"
  ];

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    const userMessage: ChatMessage = { id: messages.length + 1, type: 'user', message: newMessage, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages(prev => [...prev, userMessage]);
    setTimeout(() => {
      const randomResponse = predefinedResponses[Math.floor(Math.random() * predefinedResponses.length)];
      setMessages(prev => [...prev, { id: messages.length + 2, type: 'bot', message: randomResponse, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    }, 1000);
    setNewMessage('');
  };

  const toggleVoice = () => {
    setIsListening(!isListening);
    if (!isListening) {
      setTimeout(() => { setIsListening(false); setNewMessage("मेरी टमाटर की फसल में पीले पत्ते दिख रहे हैं"); }, 3000);
    }
  };

  return (
    <section id="ai-chat" className="py-20 bg-gradient-to-b from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full mb-6">
            <Bot className="w-5 h-5 text-blue-600 mr-2" />
            <span className="text-blue-700 font-medium">{t('aiChatbot.badge')}</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">{t('aiChatbot.title')}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">{t('aiChatbot.desc')}</p>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {languages.map((lang) => (
              <button key={lang.code} onClick={() => setSelectedLanguage(lang.code)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${selectedLanguage === lang.code ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-blue-50'}`}>
                <span>{lang.flag}</span><span className="text-sm font-medium">{lang.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="bg-white shadow-2xl rounded-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"><Bot className="w-6 h-6 text-white" /></div>
                  <div><h3 className="text-white font-semibold">AgriConnect AI</h3><p className="text-white/80 text-sm">{t('aiChatbot.online')}</p></div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/20"><Languages className="w-5 h-5" /></Button>
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/20"><Volume2 className="w-5 h-5" /></Button>
                </div>
              </div>
            </div>

            <div className="h-96 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex items-start space-x-2 max-w-xs lg:max-w-md ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${message.type === 'user' ? 'bg-blue-600' : 'bg-green-600'}`}>
                      {message.type === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
                    </div>
                    <div className={`p-3 rounded-lg ${message.type === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'}`}>
                      <p className="text-sm leading-relaxed">{message.message}</p>
                      <p className={`text-xs mt-1 ${message.type === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>{message.timestamp}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="px-4 py-2 border-t bg-gray-50">
              <p className="text-sm text-gray-600 mb-2">{t('aiChatbot.quickQuestions')}</p>
              <div className="flex flex-wrap gap-2">
                {sampleQuestions.slice(0, 3).map((question, index) => (
                  <button key={index} onClick={() => setNewMessage(question)} className="text-xs bg-white border border-gray-200 rounded-full px-3 py-1 hover:bg-blue-50 hover:border-blue-200 transition-colors">
                    {question.length > 30 ? question.substring(0, 30) + '...' : question}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 border-t bg-white">
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={toggleVoice} className={`${isListening ? 'bg-red-100 border-red-300' : ''}`}>
                  <Mic className={`w-4 h-4 ${isListening ? 'text-red-600' : 'text-gray-600'}`} />
                </Button>
                <Input value={newMessage} onChange={(e) => setNewMessage(e.target.value)}
                  placeholder={selectedLanguage === 'hi' ? t('aiChatbot.typePlaceholderHi') : t('aiChatbot.typePlaceholder')}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} className="flex-1" />
                <Button onClick={handleSendMessage} disabled={!newMessage.trim()} className="btn-hero px-6"><Send className="w-4 h-4" /></Button>
              </div>
              {isListening && (
                <div className="flex items-center justify-center mt-2 text-red-600">
                  <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse mr-2"></div>
                  <span className="text-sm">{t('aiChatbot.listening')}</span>
                </div>
              )}
            </div>
          </Card>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="text-center bg-white rounded-xl p-6 shadow-soft">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4"><Languages className="w-8 h-8 text-blue-600" /></div>
              <h4 className="font-bold text-gray-900 mb-2">{t('aiChatbot.multilingualSupport')}</h4>
              <p className="text-gray-600">{t('aiChatbot.multilingualSupportDesc')}</p>
            </div>
            <div className="text-center bg-white rounded-xl p-6 shadow-soft">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"><Mic className="w-8 h-8 text-green-600" /></div>
              <h4 className="font-bold text-gray-900 mb-2">{t('aiChatbot.voiceRecognition')}</h4>
              <p className="text-gray-600">{t('aiChatbot.voiceRecognitionDesc')}</p>
            </div>
            <div className="text-center bg-white rounded-xl p-6 shadow-soft">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4"><Bot className="w-8 h-8 text-purple-600" /></div>
              <h4 className="font-bold text-gray-900 mb-2">{t('aiChatbot.availability')}</h4>
              <p className="text-gray-600">{t('aiChatbot.availabilityDesc')}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-6 left-6 z-50">
        <Button onClick={() => setIsOpen(!isOpen)} className="w-14 h-14 rounded-full btn-hero shadow-2xl hover:scale-110 transition-transform">
          <MessageCircle className="w-6 h-6" />
        </Button>
      </div>
    </section>
  );
};

export default AIChatbotSection;