import type { APIRoute } from 'astro';

async function createWavFile(pcmBase64: string): Promise<Uint8Array> {
  // Use data URI fetch to convert base64 to ArrayBuffer robustly (edge-compatible, fast)
  const base64Url = `data:application/octet-stream;base64,${pcmBase64}`;
  const response = await fetch(base64Url);
  const arrayBuffer = await response.arrayBuffer();
  const pcmBytes = new Uint8Array(arrayBuffer);
  const pcmLength = pcmBytes.length;
  
  // Create buffer for WAV header (44 bytes) + PCM data
  const wavFile = new Uint8Array(44 + pcmLength);
  const view = new DataView(wavFile.buffer);

  function writeString(offset: number, string: string) {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  }

  // RIFF chunk descriptor
  writeString(0, 'RIFF');
  view.setUint32(4, 36 + pcmLength, true); // ChunkSize
  writeString(8, 'WAVE');

  // fmt sub-chunk
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true); // Subchunk1Size (16 for PCM)
  view.setUint16(20, 1, true); // AudioFormat (1 for PCM)
  view.setUint16(22, 1, true); // NumChannels (1 for Mono)
  view.setUint32(24, 24000, true); // SampleRate (24000 Hz)
  view.setUint32(28, 24000 * 1 * 2, true); // ByteRate (SampleRate * NumChannels * BitsPerSample/8)
  view.setUint16(32, 1 * 2, true); // BlockAlign (NumChannels * BitsPerSample/8)
  view.setUint16(34, 16, true); // BitsPerSample (16-bit)

  // data sub-chunk
  writeString(36, 'data');
  view.setUint32(40, pcmLength, true);

  // Copy PCM data bytes efficiently
  wavFile.set(pcmBytes, 44);

  return wavFile;
}

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

    // 2. Parse request body
    const body = await request.json();
    const text = body.text;
    
    if (!text || typeof text !== 'string') {
      return new Response(
        JSON.stringify({ status: "error", message: "No story text provided" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // 3. Setup 120-second timeout (40s is too short for a 500-word story)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 120000);

    try {
      // 4. Call Gemini TTS API
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{ text: text }]
            }],
            generationConfig: {
              responseModalities: ["AUDIO"],
              speechConfig: {
                voiceConfig: {
                  prebuiltVoiceConfig: {
                    voiceName: "Aoede" // Calm, warm, soothing voice
                  }
                }
              }
            }
          }),
          signal: controller.signal
        }
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errData = await response.text();
        throw new Error(`Gemini TTS API error: ${errData}`);
      }

      const data = await response.json();
      const audioBase64 = data.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

      if (!audioBase64) {
        throw new Error("Received empty audio response from Gemini");
      }

      // 5. Convert raw PCM base64 to WAV byte stream
      const wavBytes = await createWavFile(audioBase64);

      // 6. Return as audio/wav
      return new Response(wavBytes, {
        status: 200,
        headers: {
          "Content-Type": "audio/wav",
          "Content-Length": wavBytes.byteLength.toString(),
        }
      });
      
    } catch (apiError: any) {
      clearTimeout(timeoutId);
      if (apiError.name === 'AbortError') {
        throw new Error("Request to Gemini TTS API timed out after 120 seconds.");
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
