// src/pages/api/merch.ts
import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const svgData = body.svg;

    if (!svgData) {
      return new Response(JSON.stringify({ status: "error", message: "No SVG data provided" }), { status: 400 });
    }

    console.log("[Merch Webhook] Packaging inline SVG for Print-on-Demand (Gelato/Printful)...");
    
    // Mock Payload Transmission
    const payload = {
      product_id: "premium-kids-tshirt",
      design_front: svgData, // In production, this would be uploaded to an S3 bucket and linked
      fulfillment_priority: "high"
    };

    return new Response(JSON.stringify({ 
      status: "success", 
      message: "Order queued for print.",
      order_id: "POD-12345" 
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (error: any) {
    return new Response(JSON.stringify({ status: "error", message: error.message }), { status: 500 });
  }
};
