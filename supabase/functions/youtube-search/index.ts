import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query, language, maxResults = 12 } = await req.json();

    if (!query) {
      return new Response(
        JSON.stringify({ error: 'Query is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const YOUTUBE_API_KEY = Deno.env.get('YOUTUBE_API_KEY');
    if (!YOUTUBE_API_KEY) {
      return new Response(
        JSON.stringify({ error: 'YouTube API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Map language names to ISO codes for relevanceLanguage
    const langMap: Record<string, string> = {
      'English': 'en', 'हिंदी': 'hi', 'తెలుగు': 'te', 'தமிழ்': 'ta',
      'मराठी': 'mr', 'ಕನ್ನಡ': 'kn', 'বাংলা': 'bn', 'ਪੰਜਾਬੀ': 'pa',
      'ગુજરાતી': 'gu', 'മലയാളം': 'ml',
    };

    const params = new URLSearchParams({
      part: 'snippet',
      q: query + ' farming agriculture fertilizer',
      type: 'video',
      maxResults: String(Math.min(maxResults, 25)),
      key: YOUTUBE_API_KEY,
      videoEmbeddable: 'true',
      safeSearch: 'strict',
    });

    if (language && language !== 'All' && langMap[language]) {
      params.set('relevanceLanguage', langMap[language]);
    }

    const url = `https://www.googleapis.com/youtube/v3/search?${params}`;
    console.log('YouTube search:', query, language);

    const response = await fetch(url);
    if (!response.ok) {
      const errText = await response.text();
      console.error('YouTube API error:', response.status, errText);
      return new Response(
        JSON.stringify({ error: 'YouTube API request failed' }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();

    const videos = (data.items || []).map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      desc: item.snippet.description?.substring(0, 150) || '',
      thumbnail: item.snippet.thumbnails?.medium?.url || '',
      channel: item.snippet.channelTitle,
      publishedAt: item.snippet.publishedAt,
      language: language && language !== 'All' ? language : 'English',
    }));

    return new Response(
      JSON.stringify({ videos, totalResults: data.pageInfo?.totalResults || 0 }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('YouTube search error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
