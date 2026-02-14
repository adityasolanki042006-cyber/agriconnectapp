import { useState, useMemo, useCallback } from 'react';
import { Play, Search, Globe, Loader2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';

interface TutorialVideo {
  id: string;
  title: string;
  desc: string;
  language: string;
  thumbnail?: string;
  channel?: string;
}

// Fallback static videos
const STATIC_VIDEOS: TutorialVideo[] = [
  { id: '6xwK0uLbn4U', title: 'Fertilizer Application Methods', desc: 'Learn different techniques for applying fertilizers effectively on your farm', language: 'English' },
  { id: 'np9RbtHX6mA', title: 'Soil Testing Made Easy', desc: 'Understand soil test reports and how to amend soil for better crop nutrition', language: 'English' },
  { id: 'k13UimwG2LQ', title: '4 Easy Composting Methods', desc: 'Transform waste into rich mulch and potting mix with no-dig techniques', language: 'English' },
  { id: 'g-_Ck8LrUSY', title: 'पौधों में कब और कौन सी खाद डालें', desc: 'फूलों के पौधों में सही समय पर सही खाद डालने का तरीका जानें', language: 'हिंदी' },
  { id: 'NlUnV_dESVQ', title: '2 सस्ती खाद से पौधे हरे-भरे', desc: 'सभी पौधों में ऑर्गेनिक और NPK खाद डालकर लगातार फूल खिलाएं', language: 'हिंदी' },
  { id: 'OdRwhrJYSog', title: 'జీవన ఎరువుల తయారీ', desc: 'బయో ఫెర్టిలైజర్ తయారీ మరియు వాడకం గురించి తెలుసుకోండి', language: 'తెలుగు' },
  { id: 'eWdvDRREnFs', title: 'மண்புழு உரம் செய்வது எப்படி', desc: 'வீட்டிலேயே மண்புழு உரம் தயாரிக்கும் முறை', language: 'தமிழ்' },
  { id: 'mIAJpIvJc0M', title: 'खताचा योग्य वापर', desc: 'शेतात खतांचा योग्य वापर कसा करावा ते शिका', language: 'मराठी' },
  { id: 'eKpbLFwLVoI', title: 'ರಸಗೊಬ್ಬರ ಬಳಕೆ ವಿಧಾನ', desc: 'ಬೆಳೆಗಳಿಗೆ ಸರಿಯಾದ ರಸಗೊಬ್ಬರ ಹಾಕುವ ವಿಧಾನ ತಿಳಿಯಿರಿ', language: 'ಕನ್ನಡ' },
  { id: 'rF3TsZyEIUI', title: 'কোন সারের কি কাজ', desc: 'কোন সার কখন প্রয়োগ করবেন তা বিস্তারিত জানুন', language: 'বাংলা' },
  { id: 'ZRfCnSoFL5w', title: 'ਸਬਜ਼ੀਆਂ ਲਈ ਘਰੇਲੂ ਖਾਦ', desc: 'ਸਾਰੀਆਂ ਸਬਜ਼ੀਆਂ ਲਈ ਇੱਕ ਸ਼ਕਤੀਸ਼ਾਲੀ ਘਰੇਲੂ ਖਾਦ ਬਣਾਉਣ ਦਾ ਤਰੀਕਾ', language: 'ਪੰਜਾਬੀ' },
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
  const [youtubeResults, setYoutubeResults] = useState<TutorialVideo[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleYouTubeSearch = useCallback(async () => {
    if (!videoSearch.trim()) return;
    setIsSearching(true);
    setHasSearched(true);
    try {
      const { data, error } = await supabase.functions.invoke('youtube-search', {
        body: { query: videoSearch, language: languageFilter, maxResults: 12 },
      });
      if (error) throw error;
      setYoutubeResults(data.videos || []);
    } catch (err) {
      console.error('YouTube search failed:', err);
      setYoutubeResults([]);
    } finally {
      setIsSearching(false);
    }
  }, [videoSearch, languageFilter]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleYouTubeSearch();
  };

  // When no search has been done, show static videos filtered locally
  const staticFiltered = useMemo(() => {
    if (hasSearched) return [];
    return STATIC_VIDEOS.filter((v) => {
      const matchesLang = languageFilter === 'All' || v.language === languageFilter;
      const q = videoSearch.toLowerCase();
      const matchesSearch = !q || v.title.toLowerCase().includes(q) || v.desc.toLowerCase().includes(q);
      return matchesLang && matchesSearch;
    });
  }, [videoSearch, languageFilter, hasSearched]);

  const displayVideos = hasSearched ? youtubeResults : staticFiltered;

  // Group by language
  const grouped = useMemo(() => {
    const map = new Map<string, TutorialVideo[]>();
    for (const v of displayVideos) {
      if (!map.has(v.language)) map.set(v.language, []);
      map.get(v.language)!.push(v);
    }
    return map;
  }, [displayVideos]);

  return (
    <div className="mt-12 mb-12">
      <div className="text-center mb-8">
        <div className="inline-flex items-center px-4 py-2 bg-red-50 rounded-full mb-4">
          <Play className="w-5 h-5 text-red-600 mr-2" />
          <span className="text-red-700 font-medium">Video Tutorials</span>
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-3">Learn Fertilizer Application Techniques</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">Search YouTube for farming tutorials in your preferred language</p>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8 max-w-3xl mx-auto">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search YouTube... (e.g. NPK fertilizer, organic compost, drip irrigation)"
            value={videoSearch}
            onChange={(e) => setVideoSearch(e.target.value)}
            onKeyDown={handleKeyDown}
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
        <Button onClick={handleYouTubeSearch} disabled={isSearching || !videoSearch.trim()} className="gap-2">
          {isSearching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
          Search
        </Button>
      </div>

      {hasSearched && (
        <div className="text-center mb-4">
          <button
            onClick={() => { setHasSearched(false); setYoutubeResults([]); setVideoSearch(''); }}
            className="text-sm text-primary underline hover:no-underline"
          >
            ← Back to recommended videos
          </button>
        </div>
      )}

      {isSearching ? (
        <div className="text-center py-12">
          <Loader2 className="w-10 h-10 mx-auto mb-3 animate-spin text-primary" />
          <p className="text-muted-foreground">Searching YouTube...</p>
        </div>
      ) : displayVideos.length === 0 ? (
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
                <Badge className={`${badge?.bg || 'bg-muted text-muted-foreground'} text-sm px-4 py-1`}>
                  {badge?.label || language}
                </Badge>
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
                      <h4 className="font-bold text-foreground line-clamp-2">{video.title}</h4>
                      {video.channel && <p className="text-xs text-muted-foreground mt-1">{video.channel}</p>}
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{video.desc}</p>
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
