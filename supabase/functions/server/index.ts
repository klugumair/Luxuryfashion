import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const url = new URL(req.url)
    
    // Health check endpoint
    if (url.pathname === '/make-server/health') {
      return new Response(
        JSON.stringify({ status: 'ok', timestamp: new Date().toISOString() }),
        { 
          headers: { 
            'Content-Type': 'application/json',
            ...corsHeaders 
          }
        }
      )
    }

    // Default response for root path
    if (url.pathname === '/make-server' || url.pathname === '/make-server/') {
      return new Response(
        JSON.stringify({ 
          message: 'Outlander API Server', 
          status: 'running',
          endpoints: ['/health']
        }),
        { 
          headers: { 
            'Content-Type': 'application/json',
            ...corsHeaders 
          }
        }
      )
    }

    // Handle 404 for unknown endpoints
    return new Response(
      JSON.stringify({ error: 'Not Found' }),
      { 
        status: 404,
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders 
        }
      }
    )

  } catch (error) {
    console.error('Server error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal Server Error' }),
      { 
        status: 500,
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders 
        }
      }
    )
  }
})