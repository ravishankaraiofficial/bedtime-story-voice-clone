import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ request, locals }) => {
  try {
    let env: any = {};
    try {
      const cfWorkers = await import('cloudflare:workers');
      env = cfWorkers.env || {};
    } catch (e) {
      try { env = (locals as any)?.runtime?.env || {}; } catch(e) {}
    }
    
    if (!env.DB) {
      // Mock Data if D1 is not connected
      return new Response(JSON.stringify({ 
        status: "ok", 
        prompts: [
          { id: "1", author_id: "demo-user-123", prompt_title: "Brave Little Astronaut", character_data: '{"name": "Leo", "traits": "brave, curious"}', likes: 120 },
          { id: "2", author_id: "demo-user-456", prompt_title: "Sleepy Forest Fairy", character_data: '{"name": "Elara", "traits": "sleepy, magical"}', likes: 85 }
        ] 
      }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    }

    const { results } = await env.DB.prepare(
      "SELECT * FROM public_prompts ORDER BY likes DESC LIMIT 20"
    ).all();

    return new Response(JSON.stringify({ status: "ok", prompts: results }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (error: any) {
    return new Response(
      JSON.stringify({ status: "error", message: error.message || String(error) }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
