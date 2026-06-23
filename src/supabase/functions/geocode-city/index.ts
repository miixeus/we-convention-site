const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { city, country } = await req.json();

    if (!city || !country) {
      return new Response(
        JSON.stringify({ error: "City and country are required." }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const apiKey = Deno.env.get("GEOAPIFY_API_KEY");
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "Missing GEOAPIFY_API_KEY." }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const text = encodeURIComponent(`${city}, ${country}`);
    const url =
      `https://api.geoapify.com/v1/geocode/search?text=${text}&format=json&limit=1&type=city&apiKey=${apiKey}`;

    const geoResponse = await fetch(url);
    if (!geoResponse.ok) {
      return new Response(
        JSON.stringify({ error: "Geocoding service unavailable." }),
        {
          status: 502,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }
    const geoJson = await geoResponse.json();

    const result = geoJson?.results?.[0];
    if (!result) {
      return new Response(
        JSON.stringify({ error: "City not found." }),
        {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    return new Response(
      JSON.stringify({
        lat: result.lat,
        lon: result.lon,
        formatted: result.formatted ?? `${city}, ${country}`,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});