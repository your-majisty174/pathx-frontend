import { supabase } from '../supabase'
import { Database } from '@/types/database'
import { handleSupabaseError, handleApiError } from '../errors/handleError'

type TableName = keyof Database['public']['Tables']

export async function create<T extends TableName>(
  table: T,
  data: Database['public']['Tables'][T]['Insert']
) {
  try {
    const { data: result, error } = await supabase
      .from(table)
      .insert(data)
      .select()
      .single()

    if (error) handleSupabaseError(error)
    return result
  } catch (error) {
    handleApiError(error)
  }
}

export async function update<T extends TableName>(
  table: T,
  id: string,
  data: Database['public']['Tables'][T]['Update']
) {
  try {
    const { data: result, error } = await supabase
      .from(table)
      .update(data)
      .eq('id', id)
      .select()
      .single()

    if (error) handleSupabaseError(error)
    if (!result) throw new Error(`No record found with id ${id}`)
    return result
  } catch (error) {
    handleApiError(error)
  }
}

export async function remove<T extends TableName>(table: T, id: string) {
  try {
    const { error } = await supabase
      .from(table)
      .delete()
      .eq('id', id)

    if (error) handleSupabaseError(error)
  } catch (error) {
    handleApiError(error)
  }
}

export async function getById<T extends TableName>(
  table: T,
  id: string
): Promise<Database['public']['Tables'][T]['Row']> {
  try {
    const { data, error } = await supabase
      .from(table)
      .select()
      .eq('id', id)
      .single()

    if (error) handleSupabaseError(error)
    if (!data) throw new Error(`No record found with id ${id}`)
    return data
  } catch (error) {
    handleApiError(error)
  }
}

export async function getAll<T extends TableName>(
  table: T,
  options?: {
    orderBy?: { column: string; ascending?: boolean }
    limit?: number
    offset?: number
  }
): Promise<Database['public']['Tables'][T]['Row'][]> {
  try {
    let query = supabase.from(table).select()

    if (options?.orderBy) {
      query = query.order(options.orderBy.column, {
        ascending: options.orderBy.ascending ?? true,
      })
    }

    if (options?.limit) {
      query = query.limit(options.limit)
    }

    if (options?.offset) {
      query = query.range(options.offset, (options.offset ?? 0) + (options.limit ?? 10) - 1)
    }

    const { data, error } = await query

    if (error) handleSupabaseError(error)
    return data ?? []
  } catch (error) {
    handleApiError(error)
  }
} 