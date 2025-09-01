import { supabase } from '../supabaseClient'

export type Todo = {
  id: number
  user_id: string
  title: string
  completed: boolean
  inserted_at: string
}

export async function fetchTodos() {
  const { data, error } = await supabase
    .from('todos')
    .select('*')
    .order('inserted_at', { ascending: false })
  if (error) throw error
  return data as Todo[]
}

export async function addTodo(userId: string, title: string) {
  const { data, error } = await supabase
    .from('todos')
    .insert({ user_id: userId, title })
    .select()
    .single()
  if (error) throw error
  return data as Todo
}

export async function toggleTodo(id: number, completed: boolean) {
  const { data, error } = await supabase
    .from('todos')
    .update({ completed })
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data as Todo
}

export async function deleteTodo(id: number) {
  const { error } = await supabase.from('todos').delete().eq('id', id)
  if (error) throw error
}
