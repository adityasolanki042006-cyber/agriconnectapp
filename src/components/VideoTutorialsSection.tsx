import { useState, useMemo } from 'react';
import { Play, Search, Globe } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface TutorialVideo {
  id: string;
  title: string;
  desc: string;
  language: string;
}

const ALL_VIDEOS: TutorialVideo[] = [
  // English
  { id: '6xwK0uLbn4U', title: 'Fertilizer Application Methods', desc: 'Learn different techniques for applying fertilizers effectively on your farm', language: 'English' },
  { id: 'np9RbtHX6mA', title: 'Soil Testing Made Easy', desc: 'Understand soil test reports and how to amend soil for better crop nutrition', language: 'English' },
  { id: 'HYrkcfE62Pg', title: 'Interpret Soil Test Results', desc: 'Learn to read your soil lab results and buy the right fertilizer', language: 'English' },
  { id: 'GP7bliTR1HI', title: 'Balanced NPK 20-20-20 Application', desc: 'See the effects of balanced NPK fertilizer on vegetable crops', language: 'English' },
  { id: 'k13UimwG2LQ', title: '4 Easy Composting Methods', desc: 'Transform waste into rich mulch and potting mix with no-dig techniques', language: 'English' },
  { id: 'fFIXcszNJSY', title: 'Organic Compost Making', desc: 'Dr. Elaine Ingham shows easy science of creating clean organic compost', language: 'English' },
  { id: 'S8M_6oU4C28', title: 'How to Collect Soil Samples', desc: 'Step-by-step guide to collecting representative soil samples at home', language: 'English' },
  { id: 'aC1B2ePY3Ag', title: 'Easy Guide to Fertilizing Tomatoes', desc: 'How often to feed tomato plants and what to use for best results', language: 'English' },
  { id: 'JG_TbQKhFBE', title: 'Accurate Dry Fertilizer Application', desc: 'Tips to minimize yield loss with proper dry fertilizer placement', language: 'English' },
  // Hindi
  { id: 'g-_Ck8LrUSY', title: 'पौधों में कब और कौन सी खाद डालें', desc: 'फूलों के पौधों में सही समय पर सही खाद डालने का तरीका जानें', language: 'हिंदी' },
  { id: 'NlUnV_dESVQ', title: '2 सस्ती खाद से पौधे हरे-भरे', desc: 'सभी पौधों में ऑर्गेनिक और NPK खाद डालकर लगातार फूल खिलाएं', language: 'हिंदी' },
  { id: 'NI-Xq1Lr4Sk', title: 'NPK खाद घर पर कैसे बनाएं', desc: 'यूरिया, DAP और MOP से घर पर NPK 19-19-19 और अन्य खाद बनाएं', language: 'हिंदी' },
  { id: 'xlp-FcdzKKo', title: 'DAP और NPK से पावरफुल खाद', desc: 'Ammonium Phosphate Sulphate fertilizer का सही उपयोग सीखें', language: 'हिंदी' },
  { id: 'izJi49ee_IQ', title: 'घर पर खाद और कीटनाशक बनाएं', desc: 'ऑर्गेनिक फार्मिंग के लिए घर पर ही खाद और कीटनाशक तैयार करें', language: 'हिंदी' },
  { id: '3tuGPD3FfUE', title: 'गन्ने के साथ आलू और टमाटर उगाएं', desc: 'ऑर्गेनिक फार्मिंग से गन्ने के साथ सब्जियां उगाकर लाखों कमाएं', language: 'हिंदी' },
  // Telugu
  { id: 'OdRwhrJYSog', title: 'జీవన ఎరువుల తయారీ', desc: 'బయో ఫెర్టిలైజర్ తయారీ మరియు వాడకం గురించి తెలుసుకోండి', language: 'తెలుగు' },
  { id: 'Jug96Lt7z4k', title: 'గ్రోమోర్ NPK ఎరువుల వాడకం', desc: '10:26:26 మరియు 14:35:14 ఎరువుల మధ్య తేడా మరియు ఉపయోగాలు', language: 'తెలుగు' },
  { id: 'iJKRoFncylo', title: 'వరిలో కలుపు నివారణ', desc: 'వరి పంటలో కలుపు మందులు మరియు ఎరువుల వాడకం', language: 'తెలుగు' },
  // Tamil
  { id: 'eWdvDRREnFs', title: 'மண்புழு உரம் செய்வது எப்படி', desc: 'வீட்டிலேயே மண்புழு உரம் தயாரிக்கும் முறை', language: 'தமிழ்' },
  { id: '0ByAGJax5-c', title: 'காய்கறிகளுக்கு சிறந்த திரவ உரம்', desc: 'தக்காளி, மிளகாய், கத்திரிக்காய்க்கு சிறந்த உரங்கள்', language: 'தமிழ்' },
  { id: 'z1Q11hVJyx0', title: 'பழமரங்களுக்கு இயற்கை உரம்', desc: 'கொய்யா மற்றும் பழமரங்களுக்கு இயற்கை உர பயன்பாடு', language: 'தமிழ்' },
  // Marathi
  { id: 'mIAJpIvJc0M', title: 'खताचा योग्य वापर', desc: 'शेतात खतांचा योग्य वापर कसा करावा ते शिका', language: 'मराठी' },
  { id: '3dWUmVg_Pdw', title: 'सल्फर / गंधक टाकण्याचे फायदे', desc: 'शेतात गंधकाचे महत्त्व आणि महागडी खते वाचवा', language: 'मराठी' },
  { id: 'eWrvCus70xQ', title: 'ट्रायकोडर्मा जैविक बुरशीनाशक', desc: 'बुरशीजन्य रोग नियंत्रणासाठी ट्रायकोडर्माचा वापर', language: 'मराठी' },
  // Kannada
  { id: 'eKpbLFwLVoI', title: 'ರಸಗೊಬ್ಬರ ಬಳಕೆ ವಿಧಾನ', desc: 'ಬೆಳೆಗಳಿಗೆ ಸರಿಯಾದ ರಸಗೊಬ್ಬರ ಹಾಕುವ ವಿಧಾನ ತಿಳಿಯಿರಿ', language: 'ಕನ್ನಡ' },
  { id: 'HDHYClpIKK8', title: 'ಸಮಗ್ರ ಪೋಷಕಾಂಶ ನಿರ್ವಹಣೆ', desc: 'ಬೆಳೆಗಳಿಗೆ ಸಮಗ್ರ ಪೋಷಕಾಂಶ ನಿರ್ವಹಣೆ ಕುರಿತು ಮಾಹಿತಿ', language: 'ಕನ್ನಡ' },
  { id: '8EAsTWQuD00', title: 'ಸಾವಯವ ಗೊಬ್ಬರ ತಯಾರಿಕೆ', desc: 'ಸಾವಯವ ಗೊಬ್ಬರ ಮತ್ತು ಮಣ್ಣಿನ ಆರೋಗ್ಯ ಕಾರ್ಡ್ ಬಗ್ಗೆ ತಿಳಿಯಿರಿ', language: 'ಕನ್ನಡ' },
  // Bengali
  { id: 'rF3TsZyEIUI', title: 'কোন সারের কি কাজ', desc: 'কোন সার কখন প্রয়োগ করবেন তা বিস্তারিত জানুন', language: 'বাংলা' },
  { id: 'eOcV-ThT5YA', title: 'গাছে সার প্রয়োগ পদ্ধতি', desc: 'গাছে কোন সারের কি কাজ এবং কতটুকু প্রয়োগ করবেন', language: 'বাংলা' },
  { id: 'cahe7u5Z__E', title: 'বেলি ফুলের জন্য তরল সার', desc: 'মিশ্র তরল সার দিয়ে প্রচুর ফুল ফোটানোর পদ্ধতি', language: 'বাংলা' },
  // Punjabi
  { id: 'ZRfCnSoFL5w', title: 'ਸਬਜ਼ੀਆਂ ਲਈ ਘਰੇਲੂ ਖਾਦ', desc: 'ਸਾਰੀਆਂ ਸਬਜ਼ੀਆਂ ਲਈ ਇੱਕ ਸ਼ਕਤੀਸ਼ਾਲੀ ਘਰੇਲੂ ਖਾਦ ਬਣਾਉਣ ਦਾ ਤਰੀਕਾ', language: 'ਪੰਜਾਬੀ' },
  { id: '8cgLpLLa8lg', title: 'ਫੁੱਲਾਂ ਦੀ ਖੇਤੀ', desc: 'ਪੰਜਾਬ ਵਿੱਚ ਫੁੱਲਾਂ ਦੀ ਖੇਤੀ ਅਤੇ ਖਾਦ ਪ੍ਰਬੰਧਨ ਬਾਰੇ ਜਾਣਕਾਰੀ', language: 'ਪੰਜਾਬੀ' },
  { id: 'x8FGLdBuTqA', title: 'ਕਣਕ ਦੀ ਵੱਧ ਪੈਦਾਵਾਰ ਲਈ ਖਾਦ', desc: 'ਕਣਕ ਦੀ ਫਸਲ ਤੋਂ ਵੱਧ ਤੋਂ ਵੱਧ ਝਾੜ ਲੈਣ ਲਈ ਖਾਦ ਯੋਜਨਾ', language: 'ਪੰਜਾਬੀ' },
];

const LANGUAGES = ['All', 'English', 'हिंदी', 'తెలుగు', 'தமிழ்', 'मराठी', 'ಕನ್ನಡ', 'বাংলা', 'ਪੰਜਾਬੀ'];

const LANGUAGE_BADGES: Record<string, { bg: string; label: string }> = {
  'English': { bg: 'bg-blue-100 text-blue-800', label: '🇬🇧 English' },
  'हिंदी': { bg: 'bg-orange-100 text-orange-800', label: '🇮🇳 हिंदी' },
  'తెలుగు': { bg: 'bg-yellow-100 text-yellow-800', label: '🇮🇳 తెలుగు' },
  'தமிழ்': { bg: 'bg-red-100 text-red-800', label: '🇮🇳 தமிழ்' },
  'मराठी': { bg: 'bg-emerald-100 text-emerald-800', label: '🇮🇳 मराठी' },
  'ಕನ್ನಡ': { bg: 'bg-violet-100 text-violet-800', label: '🇮🇳 ಕನ್ನಡ' },
  'বাংলা': { bg: 'bg-teal-100 text-teal-800', label: '🇮🇳 বাংলা' },
  'ਪੰਜਾਬੀ': { bg: 'bg-amber-100 text-amber-800', label: '🇮🇳 ਪੰਜਾਬੀ' },
};

const VideoTutorialsSection = () => {
  const [videoSearch, setVideoSearch] = useState('');
  const [languageFilter, setLanguageFilter] = useState('All');

  const filteredVideos = useMemo(() => {
    return ALL_VIDEOS.filter((video) => {
      const matchesLanguage = languageFilter === 'All' || video.language === languageFilter;
      const query = videoSearch.toLowerCase();
      const matchesSearch = !query || video.title.toLowerCase().includes(query) || video.desc.toLowerCase().includes(query);
      return matchesLanguage && matchesSearch;
    });
  }, [videoSearch, languageFilter]);

  // Group by language for display
  const grouped = useMemo(() => {
    const map = new Map<string, TutorialVideo[]>();
    for (const v of filteredVideos) {
      if (!map.has(v.language)) map.set(v.language, []);
      map.get(v.language)!.push(v);
    }
    return map;
  }, [filteredVideos]);

  return (
    <div className="mt-12 mb-12">
      <div className="text-center mb-8">
        <div className="inline-flex items-center px-4 py-2 bg-red-50 rounded-full mb-4">
          <Play className="w-5 h-5 text-red-600 mr-2" />
          <span className="text-red-700 font-medium">Video Tutorials</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Learn Fertilizer Application Techniques</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">Watch expert tutorials on soil testing, composting, fertilizer methods, and more</p>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8 max-w-2xl mx-auto">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search videos... (e.g. NPK, compost, soil)"
            value={videoSearch}
            onChange={(e) => setVideoSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={languageFilter} onValueChange={setLanguageFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <Globe className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent>
            {LANGUAGES.map((lang) => (
              <SelectItem key={lang} value={lang}>{lang === 'All' ? 'All Languages' : lang}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filteredVideos.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <Play className="w-12 h-12 mx-auto mb-3 opacity-40" />
          <p className="text-lg font-medium">No videos found</p>
          <p className="text-sm">Try a different search term or language</p>
        </div>
      ) : (
        Array.from(grouped.entries()).map(([language, videos]) => {
          const badge = LANGUAGE_BADGES[language];
          return (
            <div key={language} className="mb-10">
              <div className="flex items-center gap-3 mb-5">
                <Badge className={`${badge?.bg} text-sm px-4 py-1`}>{badge?.label || language}</Badge>
                <span className="text-sm text-muted-foreground">({videos.length} videos)</span>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((video) => (
                  <Card key={video.id} className="overflow-hidden hover:shadow-xl transition-all duration-300">
                    <div className="aspect-video">
                      <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${video.id}`}
                        title={video.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-gray-900">{video.title}</h4>
                      </div>
                      <p className="text-sm text-gray-600">{video.desc}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default VideoTutorialsSection;
