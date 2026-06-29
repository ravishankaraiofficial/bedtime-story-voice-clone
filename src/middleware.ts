import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();
  
  // We only want to bust the cache for HTML documents, 
  // allowing CSS, JS, and Images to be cached normally via their content hashes.
  const contentType = response.headers.get('content-type') || '';
  if (contentType.includes('text/html')) {
    // Create a new response to safely mutate headers
    const headers = new Headers(response.headers);
    headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    headers.set('Pragma', 'no-cache');
    headers.set('Expires', '0');
    
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: headers
    });
  }
  
  return response;
});
