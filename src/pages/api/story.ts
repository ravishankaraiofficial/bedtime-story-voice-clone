import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    // 1. Setup Environment & Bindings
    const env = (locals as any)?.runtime?.env || {};
    const apiKey = env.GEMINI_API_KEY || import.meta.env.GEMINI_API_KEY;

    if (!apiKey) {
      return new Response(JSON.stringify({ status: "error", message: "GEMINI_API_KEY is not set" }), { status: 500 });
    }

    // 2. Parse Request
    const formData = await request.formData();
    const audioFile = formData.get('audio') as File | null;
    const languageName = (formData.get('languageName') as string) || 'English';
    const userId = (formData.get('userId') as string) || 'guest';
    const isMultiPart = formData.get('isMultiPart') === 'true';
    const moralTheme = formData.get('moralTheme') as string | null;
    
    // Phase 3 Inputs
    const heritageLanguage = formData.get('heritageLanguage') as string | null;
    const siblingNames = formData.get('siblingNames') as string | null;

    // Phase 8 Inputs
    const realWorldChallenge = formData.get('realWorldChallenge') as string | null;
    const interruptionText = formData.get('interruptionText') as string | null;

    // Phase 9 Inputs
    const heritageDialect = formData.get('heritageDialect') as string | null;

    if (!audioFile) {
      return new Response(JSON.stringify({ status: "error", message: "No audio file provided" }), { status: 400 });
    }

    // 3. Zero-Retention Privacy Pipeline
    let arrayBuffer: ArrayBuffer | null = await audioFile.arrayBuffer();
    const bytes = new Uint8Array(arrayBuffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    const base64Data = btoa(binary);
    const mimeType = audioFile.type || 'audio/webm';
    
    arrayBuffer = null; 

    // 4. Build Dynamic Contexts
    let characterContext = "";
    let ageContext = "";
    if (env.DB) {
      try {
        const { results } = await env.DB.prepare("SELECT * FROM character_vaults WHERE user_id = ?").bind(userId).all();
        if (results && results.length > 0) {
          // Phase 9: Character Evolution
          let evolutionContext = "";
          try {
            const evoResults = await env.DB.prepare("SELECT character_experience FROM character_evolution WHERE user_id = ?").bind(userId).all();
            if (evoResults.results && evoResults.results.length > 0) {
              const exp = (evoResults.results[0] as any).character_experience || 0;
              evolutionContext = `\n[CHARACTER MATURITY FACTOR]\nThis character has an experience score of ${exp}. Age up the character's maturity, dialogue complexity, and relationship with the child dynamically.`;
            }
          } catch(e) {}

          characterContext = `\n[CHARACTER VAULT]\nUse these characters if applicable: ${JSON.stringify(results)}\n${evolutionContext}\n`;
          
          // Phase 5: Dynamic Age Calculation
          const char = results[0] as any;
          if (char.birth_month) {
            const birthDate = new Date(char.birth_month);
            const ageMonths = (Date.now() - birthDate.getTime()) / (1000 * 60 * 60 * 24 * 30.44);
            const exactAge = (ageMonths / 12).toFixed(1);
            ageContext = `\n[DYNAMIC AGE FACTOR]\nThe child is exactly ${exactAge} years old. Scale vocabulary complexity, sentence length, and thematic depth appropriately for this precise age.`;
          }
        }
      } catch (err) {}
    }

    let chapterContext = "";
    if (isMultiPart && env.STORY_KV) {
      const previousSummary = await env.STORY_KV.get(`summary_${userId}`);
      if (previousSummary) {
        chapterContext = `\n[MULTI-PART ADVENTURE INSTRUCTION]\nThis is a continuing story.\nPREVIOUS RECAP: ${previousSummary}\nAt the end of this chapter, do NOT resolve the entire journey. End on a gentle, calm cliffhanger.`;
      } else {
        chapterContext = `\n[MULTI-PART ADVENTURE INSTRUCTION]\nThis is chapter one. At the end of this chapter, do NOT resolve the entire journey. End on a gentle, calm cliffhanger.`;
      }
    }

    let moralContext = "";
    if (moralTheme) {
      moralContext = `\n[MORAL CALIBRATION INSTRUCTION]\nWeave the theme of "${moralTheme}" deeply into the narrative. Do not state the moral explicitly. Show the main character naturally applying it.`;
    }

    let bilingualContext = "";
    if (heritageLanguage) {
      let dialectNote = "";
      if (heritageDialect) {
        dialectNote = ` Specifically, utilize the authentic regional idiom patterns and inflection style of the ${heritageDialect} dialect for a grandparent-style oral storytelling feel.`;
      }
      bilingualContext = `\n[BILINGUAL BLENDING INSTRUCTION]\nThe primary narrative must be written in ${languageName}. However, naturally embed contextual vocabulary, greetings, and expressive nouns in ${heritageLanguage}.${dialectNote} Integrate them seamlessly without translating them directly in the text, ensuring the context makes the meaning obvious to a child.`;
    }

    let heroBalancingContext = "";
    if (siblingNames) {
      heroBalancingContext = `\n[HERO BALANCING INSTRUCTION]\nThe following children are the co-main characters: ${siblingNames}.\nYou are strictly required to calculate and allocate exactly 50% of dialogue lines, major actions, and typographic highlights to each child to prevent any bedtime friction. They must cooperate completely equally.`;
    }

    // Phase 8: Context-Aware Calendars
    let festivalContext = "";
    const today = new Date();
    const month = today.getMonth() + 1;
    if (month === 10 || month === 11) {
      festivalContext = `\n[FESTIVAL AWARENESS]\nIt is the Diwali season. Subtly weave themes of light, hope, and small glowing lamps into the background of the story without making it the main plot.`;
    } else if (month === 3) {
      festivalContext = `\n[FESTIVAL AWARENESS]\nIt is the Holi season. Subtly weave themes of spring, colors, and joyous play into the background.`;
    }

    // Phase 8: Dynamic Vocabulary Tiering
    let vocabularyContext = "";
    if (env.DB) {
      try {
        const { results } = await env.DB.prepare("SELECT COUNT(*) as count FROM story_logs WHERE user_id = ? AND created_at >= date('now', '-30 days')").bind(userId).all();
        if (results && results[0] && (results[0] as any).count > 5) {
          vocabularyContext = `\n[DYNAMIC VOCABULARY TIER]\nThe child has been highly engaged recently (consumed >5 stories this month). Increment the vocabulary Lexile level slightly. Introduce 3-5 moderately advanced words.`;
        }
      } catch (e) {}
    }

    // Phase 8: Temporal Branching
    let temporalBranchContext = "";
    if (env.STORY_KV) {
      const pastChoice = await env.STORY_KV.get(`cyoa_choice_${userId}`);
      if (pastChoice) {
        temporalBranchContext = `\n[TEMPORAL CONTINUITY]\nIn a previous night's story, the child made this choice: "${pastChoice}". You MUST briefly reference the consequences of this choice in tonight's world-building to create a sense of a living universe.`;
      }
    }

    // Phase 8: Parental Co-Authoring
    let challengeContext = "";
    if (realWorldChallenge) {
      challengeContext = `\n[PARENTAL GUARDRAIL]\nThe parent has requested a lesson on: "${realWorldChallenge}". Weave this behavioral lesson organically into the narrative as a challenge the main character faces and peacefully resolves, but DO NOT sound preachy.`;
    }

    // Phase 9: Pediatric CBT-I Anchors & Lucid Dream Seeds
    const cbtContext = `\n[CBT-I ANCHORS]\nIf the story involves any childhood fear triggers (e.g., shadows, monsters, the dark), you MUST map them dynamically into protective, empowering, and highly reassuring fantasy metaphors (e.g., shadows are just sleepy blankets).`;
    const lucidDreamContext = `\n[LUCID DREAM SEEDS]\nIn the final 5% text chunk right before the lullaby chant, force inject comforting, positive, and deeply safe imagery nodes (e.g., floating on weightless clouds, warm golden light) to seed a calm subconscious state.`;

    // 5. System Prompt
    const systemPrompt = `You are a gentle bedtime storyteller for a child aged 4 to 6. Listen to the parent's recording and use the characters, places, names, and details they mention. Write a calm, slow-paced, soothing original bedtime story (500-600 words). Use soft, simple language. No scary parts, no conflict, no loud action.
    
IMPORTANT: Respond ENTIRELY in the following language: ${languageName} (unless overridden by Bilingual Blending). 
${characterContext}${ageContext}${chapterContext}${moralContext}${bilingualContext}${heroBalancingContext}${festivalContext}${vocabularyContext}${temporalBranchContext}${challengeContext}${cbtContext}${lucidDreamContext}

[GUIDED YOGA PREPEND]
Before starting the main narrative, you MUST write a 3-minute interactive physical wind-down sequence. Incorporate 2 child-friendly, bed-safe yoga poses (e.g., Child's Pose, Starfish breathing) smoothly tied to the story's theme. Use slow pacing and explicit breath-in/breath-out cues.

[IMAGE GENERATION]
Generate a minimalist, high-contrast vector line art illustration representing the story. Render it using warm gold/amber tones on a dark background. Output raw SVG code.

[LULLABY OUTRO INSTRUCTION]
Create a 4-line rhythmic, rhyming lullaby tailored specifically to tonight's narrative topic. It must use simple AABB or ABAB rhyming schemes, designed to be spoken softly and repetitively.

You MUST respond with valid JSON matching this schema:
{
  "story": "The bedtime story text",
  "svg": "<svg>...</svg>",
  "summary": "If this is a multi-part adventure, provide a 2-sentence summary of the plot so far for state caching. Otherwise, leave empty.",
  "lullaby": "The 4-line lullaby text",
  "advanced_vocabulary": ["array", "of", "3 to 5", "advanced", "literacy", "words", "used in the story"],
  "haptics": [{"time": 12000, "pattern": [200, 100, 200]}],
  "emotions": [{"word_index": 12, "emotion": "floating"}]
}
(For emotions, use 'floating', 'shaking', or 'bouncy' and target exciting or magical words. For haptics, calculate the approx millisecond timestamp the event happens in the audio (assume 1 word = 300ms) and provide a vibration pattern array).`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 50000); 

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            generationConfig: { responseMimeType: "application/json" },
            contents: [{
              parts: [
                { text: systemPrompt },
                { inlineData: { mimeType: mimeType, data: base64Data } }
              ]
            }]
          }),
          signal: controller.signal
        }
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Gemini API error: ${await response.text()}`);
      }

      const data = await response.json();
      const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || '{}';
      
      let parsed;
      try {
        parsed = JSON.parse(rawText);
      } catch (e) {
        throw new Error("Failed to parse Gemini JSON response");
      }

      const storyText = parsed.story || '';
      const svgCode = parsed.svg || '';
      const summary = parsed.summary || '';
      const lullaby = parsed.lullaby || '';
      const vocabList = parsed.advanced_vocabulary || [];
      const hapticsData = parsed.haptics || [];
      const emotionsData = parsed.emotions || [];

      if (!storyText.trim()) throw new Error("Received empty story from Gemini");

      // Save summary
      if (isMultiPart && summary && env.STORY_KV) {
        await env.STORY_KV.put(`summary_${userId}`, summary);
      }

      // Phase 8: Save CYOA Choice with 7-day TTL
      if (interruptionText && env.STORY_KV) {
        await env.STORY_KV.put(`cyoa_choice_${userId}`, interruptionText, { expirationTtl: 604800 });
      }

      // Save Vocab to D1 Analytics Engine
      if (vocabList.length > 0 && env.DB) {
        try {
          const stmt = env.DB.prepare("INSERT INTO vocabulary_logs (id, user_id, word, context_sentence) VALUES (?, ?, ?, ?)");
          const batch = vocabList.map(word => 
            stmt.bind(Math.random().toString(36).substring(2,15), userId, word, "Extracted automatically from story text")
          );
          await env.DB.batch(batch);
          console.log(`[Analytics] Logged ${vocabList.length} advanced vocabulary words to D1.`);
        } catch (e) {
          console.error("Failed to log vocabulary to D1", e);
        }
      }

      // Save Story & SVG to story_logs for PDF Export
      if (env.DB) {
        try {
          await env.DB.prepare("INSERT INTO story_logs (id, user_id, story_text, svg_data) VALUES (?, ?, ?, ?)")
            .bind(Math.random().toString(36).substring(2,15), userId, storyText.trim(), svgCode)
            .run();
          console.log(`[Database] Logged new story to story_logs.`);
        } catch (e) {
          console.error("Failed to log story to D1", e);
        }
      }

      return new Response(
        JSON.stringify({ 
          status: "ok", 
          story: storyText.trim(), 
          svg: svgCode, 
          lullaby,
          haptics: hapticsData,
          emotions: emotionsData
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
      
    } catch (apiError: any) {
      clearTimeout(timeoutId);
      if (apiError.name === 'AbortError') throw new Error("Request to Gemini API timed out after 50 seconds.");
      throw apiError;
    }

  } catch (error: any) {
    return new Response(JSON.stringify({ status: "error", message: error.message || String(error) }), { status: 500 });
  }
};
