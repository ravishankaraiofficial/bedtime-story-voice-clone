import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ locals }) => {
  try {
    // 1. Read API Key safely: from Cloudflare runtime env if available, otherwise fallback to local .env
    const cloudflareEnv = (locals as any)?.runtime?.env;
    const apiKey = cloudflareEnv?.GEMINI_API_KEY || import.meta.env.GEMINI_API_KEY;

    if (!apiKey) {
      return new Response(
        JSON.stringify({ status: "error", message: "GEMINI_API_KEY is not set" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // 2. Call Gemini 2.5 Flash
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: "Reply with exactly: Gemini is connected" }]
          }]
        })
      }
    );

    if (!response.ok) {
      const errData = await response.text();
      throw new Error(`Gemini API error: ${errData}`);
    }

    const data = await response.json();
    const geminiReply = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

    // 3. Return JSON
    return new Response(
      JSON.stringify({
        status: "ok",
        geminiReply: geminiReply.trim()
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    // 4. On failure
    return new Response(
      JSON.stringify({ status: "error", message: error.message || String(error) }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
