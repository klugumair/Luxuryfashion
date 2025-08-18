// Simple Supabase Edge Function for Outlander
import { serve } from "https://deno.land/std@0.177.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
}

console.log("Outlander edge function started")

serve(async (req) => {
  const { url, method } = req

  // Handle CORS preflight requests
  if (method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  console.log(`${method} ${url}`)

  try {
    const { pathname } = new URL(url)

    // Health check endpoint
    if (pathname === '/health' || pathname === '/') {
      return new Response(
        JSON.stringify({ 
          status: 'ok', 
          service: 'Outlander API',
          timestamp: new Date().toISOString(),
          version: '1.0.0'
        }),
        { 
          status: 200,
          headers: { 
            'Content-Type': 'application/json',
            ...corsHeaders 
          }
        }
      )
    }

    // API endpoint for future use
    if (pathname === '/api') {
      return new Response(
        JSON.stringify({ 
          message: 'Outlander API is running',
          endpoints: ['/health', '/api']
        }),
        { 
          status: 200,
          headers: { 
            'Content-Type': 'application/json',
            ...corsHeaders 
          }
        }
      )
    }

    // 404 for unknown endpoints
    return new Response(
      JSON.stringify({ 
        error: 'Endpoint not found',
        availableEndpoints: ['/health', '/api']
      }),
      { 
        status: 404,
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders 
        }
      }
    )

  } catch (error) {
    console.error('Error in edge function:', error)
    
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        message: error.message
      }),
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