import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("AI service not configured");
    }

    console.log("Fetching real vendor data using AI...");

    const systemPrompt = `You are a data provider for an agricultural marketplace in India. Generate realistic vendor data for verified agricultural suppliers and farmers across different Indian states. 

For each vendor, provide:
- name: A realistic Indian business or farmer name
- location: City, State format (use real Indian locations)
- crops: Array of realistic crop names they sell
- contact: Real-looking Indian phone number format (+91-XXXXXXXXXX)
- rating: Number between 4.0 and 5.0
- verified: Always true
- image: Appropriate emoji (🌾, 🚜, 🌱, 🥕, 🌽, 🍅, 🥬, 🧅, 🍇, 🥜, 🍎, 🥥, 🥭, 🌶️)

Return ONLY a valid JSON array of 24 vendor objects. Make the data realistic and diverse across different states, covering all major agricultural regions of India.`;

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [
            {
              role: "system",
              content: systemPrompt
            },
            {
              role: "user",
              content: "Generate 24 realistic verified vendor entries for Indian agricultural marketplace covering diverse states and crop varieties. Return only valid JSON array."
            }
          ],
          temperature: 0.8,
          response_format: { type: "json_object" }
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required. Please add credits to your workspace." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("Lovable AI API error:", response.status, errorText);
      throw new Error("Failed to fetch vendor data from AI");
    }

    const data = await response.json();
    const aiResponse = data.choices?.[0]?.message?.content;

    if (!aiResponse) {
      throw new Error("No response from AI");
    }

    console.log("AI Response received:", aiResponse);

    // Parse the JSON response
    let parsedData;
    try {
      parsedData = JSON.parse(aiResponse);
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError);
      console.error("Raw response:", aiResponse);
      throw new Error("Invalid JSON response from AI");
    }

    // Handle if the response is wrapped in an object or is directly an array
    let vendors = Array.isArray(parsedData) ? parsedData : parsedData.vendors || [];

    if (!Array.isArray(vendors) || vendors.length === 0) {
      throw new Error("No vendor data generated");
    }

    // Add IDs to vendors
    const vendorsWithIds = vendors.map((vendor: any, index: number) => ({
      ...vendor,
      id: index + 1
    }));

    console.log("Successfully generated vendor data:", vendorsWithIds.length, "vendors");

    return new Response(
      JSON.stringify({ vendors: vendorsWithIds }),
      { 
        headers: { 
          ...corsHeaders, 
          "Content-Type": "application/json",
          "Cache-Control": "public, max-age=3600" // Cache for 1 hour
        } 
      }
    );

  } catch (error: any) {
    console.error("Error in fetch-vendor-data:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Failed to fetch vendor data" }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
