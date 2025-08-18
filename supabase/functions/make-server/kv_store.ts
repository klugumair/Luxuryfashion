// Simple KV store for Supabase
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const getSupabaseClient = () => {
  const supabaseUrl = Deno.env.get('SUPABASE_URL')
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Missing required Supabase environment variables')
  }
  
  return createClient(supabaseUrl, supabaseServiceKey)
}

export const kvStore = {
  async set(key: string, value: any): Promise<void> {
    const supabase = getSupabaseClient()
    const { error } = await supabase
      .from('kv_store_bf16095b')
      .upsert({ key, value })
    
    if (error) {
      console.error('KV Store set error:', error)
      throw new Error(`Failed to set key "${key}": ${error.message}`)
    }
  },

  async get(key: string): Promise<any> {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase
      .from('kv_store_bf16095b')
      .select('value')
      .eq('key', key)
      .single()
    
    if (error && error.code !== 'PGRST116') { // PGRST116 is "not found"
      console.error('KV Store get error:', error)
      throw new Error(`Failed to get key "${key}": ${error.message}`)
    }
    
    return data?.value || null
  },

  async delete(key: string): Promise<void> {
    const supabase = getSupabaseClient()
    const { error } = await supabase
      .from('kv_store_bf16095b')
      .delete()
      .eq('key', key)
    
    if (error) {
      console.error('KV Store delete error:', error)
      throw new Error(`Failed to delete key "${key}": ${error.message}`)
    }
  }
}