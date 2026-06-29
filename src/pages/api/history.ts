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
    
    // Parse userId from URL or default to 'demo-user-123'
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId') || 'demo-user-123';

    if (!env.DB) {
      return new Response(JSON.stringify({ status: "error", message: "Database not configured" }), { status: 500 });
    }

    // Fetch the last 7 stories (could represent 7 days)
    const { results } = await env.DB.prepare(
      "SELECT * FROM story_logs WHERE user_id = ? ORDER BY created_at DESC LIMIT 7"
    ).bind(userId).all();

    return new Response(JSON.stringify({ status: "ok", history: results }), {
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
