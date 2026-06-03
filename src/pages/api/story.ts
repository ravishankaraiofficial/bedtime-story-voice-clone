import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    // 1. Get API Key safely
    let cloudflareEnv: any;
    try {
      cloudflareEnv = (locals as any)?.runtime?.env;
    } catch (e) {
      cloudflareEnv = undefined;
    }
    const apiKey = cloudflareEnv?.GEMINI_API_KEY || import.meta.env.GEMINI_API_KEY;

    if (!apiKey) {
      return new Response(
        JSON.stringify({ status: "error", message: "GEMINI_API_KEY is not set" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // 2. Parse FormData to get audio file
    const formData = await request.formData();
    const audioFile = formData.get('audio') as File | null;
    
    if (!audioFile) {
      return new Response(
        JSON.stringify({ status: "error", message: "No audio file provided" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // 3. Size check: 20MB limit (20 * 1024 * 1024 = 20971520 bytes)
    if (audioFile.size > 20971520) {
      return new Response(
        JSON.stringify({ status: "error", message: "Recording too long, please keep it under 2 minutes." }),
        { status: 413, headers: { "Content-Type": "application/json" } }
      );
    }

    // 4. Convert Blob to Base64 without using Node's Buffer
    const arrayBuffer = await audioFile.arrayBuffer();
    const bytes = new Uint8Array(arrayBuffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    const base64Data = btoa(binary);
    const mimeType = audioFile.type || 'audio/webm';

    const systemPrompt = "You are a gentle bedtime storyteller for a child aged 4 to 6. Listen to the parent's recording and use the characters, places, names, and details they mention. Write a calm, slow-paced, soothing original bedtime story that takes about 4 minutes to read aloud (roughly 500 to 600 words). Use soft, simple language. No scary parts, no conflict, no loud action. The story should gradually slow down and end with the main character feeling sleepy and drifting peacefully to sleep. Respond with ONLY the story text — no title, no preamble, no notes.";

    // 5. Setup 30-second timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    try {
      // 6. Call Gemini API
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [
                { text: systemPrompt },
                {
                  inlineData: {
                    mimeType: mimeType,
                    data: base64Data
                  }
                }
              ]
            }]
          }),
          signal: controller.signal
        }
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errData = await response.text();
        throw new Error(`Gemini API error: ${errData}`);
      }

      const data = await response.json();
      const storyText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

      if (!storyText.trim()) {
        throw new Error("Received empty response from Gemini");
      }

      // 7. Return the story
      return new Response(
        JSON.stringify({
          status: "ok",
          story: storyText.trim()
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
      
    } catch (apiError: any) {
      clearTimeout(timeoutId);
      if (apiError.name === 'AbortError') {
        throw new Error("Request to Gemini API timed out after 30 seconds.");
      }
      throw apiError;
    }

  } catch (error: any) {
    return new Response(
      JSON.stringify({ status: "error", message: error.message || String(error) }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
