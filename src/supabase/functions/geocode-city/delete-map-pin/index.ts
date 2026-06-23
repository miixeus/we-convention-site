import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function extractStoragePath(photoUrl: string | null | undefined) {
  if (!photoUrl) return null;

  const marker = "/storage/v1/object/public/map-photos/";
  const idx = photoUrl.indexOf(marker);
  if (idx === -1) return null;

  return decodeURIComponent(photoUrl.slice(idx + marker.length));
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { pinId, deleteToken } = await req.json();

    if (!pinId || !deleteToken) {
      return new Response(
        JSON.stringify({ error: "pinId and deleteToken are required." }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { data: pin, error: fetchError } = await supabaseAdmin
      .from("map_pins")
      .select("id, photo_url, delete_token")
      .eq("id", pinId)
      .single();

    if (fetchError || !pin) {
      return new Response(
        JSON.stringify({ error: "Pin not found." }),
        {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    if (pin.delete_token !== deleteToken) {
      return new Response(
        JSON.stringify({ error: "Invalid delete token." }),
        {
          status: 403,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const storagePath = extractStoragePath(pin.photo_url);
    if (storagePath) {
      await supabaseAdmin.storage.from("map-photos").remove([storagePath]);
    }

    const { error: deleteError } = await supabaseAdmin
      .from("map_pins")
      .delete()
      .eq("id", pinId);

    if (deleteError) {
      return new Response(
        JSON.stringify({ error: deleteError.message }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
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