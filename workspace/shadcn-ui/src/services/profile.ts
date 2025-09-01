import { supabase } from '../supabaseClient'

export type Profile = {
  id: string
  username: string | null
  email: string | null
  updated_at: string | null
}

export async function getOrCreateProfile(userId: string, email: string | null) {
  // Try to fetch
  const { data: existing, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .maybeSingle()

  if (error) throw error
  if (existing) return existing as Profile

  // Create minimal profile
  const { data, error: insertErr } = await supabase
    .from('profiles')
    .insert({ id: userId, email })
    .select()
    .single()

  if (insertErr) throw insertErr
  return data as Profile
}

export async function updateUsername(userId: string, username: string) {
  const { data, error } = await supabase
    .from('profiles')
    .update({ username })
    .eq('id', userId)
    .select()
    .single()

  if (error) throw error
  return data as Profile
}
