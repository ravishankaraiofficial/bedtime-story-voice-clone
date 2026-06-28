// src/utils/localLlm.ts
// Phase 7: Edge ML (WebGPU local LLM fallback for Airplane Mode)

import { CreateMLCEngine } from "@mlc-ai/web-llm";

export class LocalLLMEngine {
  private engine: any = null;
  private isInitializing: boolean = false;
  private currentProgress: number = 0;

  constructor(private modelId: string = "TinyLlama-1.1B-Chat-v1.0-q4f32_1-MLC") {}

  // Triggered explicitly by the 'Download Offline Mode' toggle in Settings
  async initOfflineMode(progressCallback?: (progress: string) => void) {
    if (this.engine) return;
    if (this.isInitializing) return;

    this.isInitializing = true;
    try {
      if (progressCallback) progressCallback("Starting WebGPU Engine initialization...");
      
      this.engine = await CreateMLCEngine(this.modelId, {
        initProgressCallback: (progress) => {
          this.currentProgress = progress.progress;
          console.log(`[LocalLLM] Download Progress: ${(progress.progress * 100).toFixed(2)}%`);
          if (progressCallback) progressCallback(progress.text);
        }
      });
      
      console.log("[LocalLLM] Engine Ready for Airplane Mode.");
      if (progressCallback) progressCallback("Offline Mode Ready!");
    } catch (e) {
      console.error("[LocalLLM] WebGPU Init Error:", e);
      if (progressCallback) progressCallback("Failed to initialize offline mode. Check device compatibility.");
    } finally {
      this.isInitializing = false;
    }
  }

  async generateFallbackStory(prompt: string): Promise<string> {
    if (!this.engine) {
      throw new Error("Local LLM not initialized. Please connect to Wi-Fi and toggle Offline Mode.");
    }
    
    console.log("[LocalLLM] Generating offline story using TinyLlama-1.1B...");
    
    const messages = [
      { role: "system", content: "You are a gentle storyteller. Tell a 200 word bedtime story." },
      { role: "user", content: prompt }
    ];

    const reply = await this.engine.chat.completions.create({
      messages,
      temperature: 0.7,
      max_tokens: 400
    });

    return reply.choices[0].message.content || "";
  }
}

export const localLLM = new LocalLLMEngine();
