import { supabase } from '../supabase'
import { Database } from '@/types/database'
import { create, update, remove, getById, getAll } from './base'

type Inventory = Database['public']['Tables']['inventory']['Row']
type InventoryInsert = Database['public']['Tables']['inventory']['Insert']
type InventoryUpdate = Database['public']['Tables']['inventory']['Update']

export async function createInventoryItem(data: InventoryInsert) {
  return create('inventory', data)
}

export async function updateInventoryItem(id: string, data: InventoryUpdate) {
  return update('inventory', id, data)
}

export async function deleteInventoryItem(id: string) {
  return remove('inventory', id)
}

export async function getInventoryItem(id: string) {
  return getById('inventory', id)
}

export async function getInventory(options?: {
  orderBy?: { column: string; ascending?: boolean }
  limit?: number
  offset?: number
  locationId?: string
  productId?: string
  status?: Inventory['status']
}) {
  let query = supabase.from('inventory').select(`
    *,
    product:products(*),
    location:locations(*)
  `)

  if (options?.locationId) {
    query = query.eq('location_id', options.locationId)
  }

  if (options?.productId) {
    query = query.eq('product_id', options.productId)
  }

  if (options?.status) {
    query = query.eq('status', options.status)
  }

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

  if (error) throw error
  return data
}

export async function updateStockLevel(
  productId: string,
  locationId: string,
  quantity: number
) {
  const { data, error } = await supabase
    .from('inventory')
    .update({
      quantity,
      last_updated: new Date().toISOString(),
      status: quantity > 0 ? 'in_stock' : 'out_of_stock',
    })
    .eq('product_id', productId)
    .eq('location_id', locationId)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getLowStockItems(locationId?: string) {
  let query = supabase
    .from('inventory')
    .select(`
      *,
      product:products(*),
      location:locations(*)
    `)
    .lte('quantity', supabase.raw('reorder_point'))

  if (locationId) {
    query = query.eq('location_id', locationId)
  }

  const { data, error } = await query

  if (error) throw error
  return data
}

export async function getInventoryAnalytics(locationId: string) {
  const { data, error } = await supabase
    .from('inventory')
    .select(`
      *,
      product:products(*)
    `)
    .eq('location_id', locationId)

  if (error) throw error

  // Calculate analytics
  const totalItems = data.length
  const lowStockItems = data.filter((item) => item.quantity <= item.reorder_point).length
  const outOfStockItems = data.filter((item) => item.quantity === 0).length
  const totalValue = data.reduce(
    (sum, item) => sum + item.quantity * item.product.unit_price,
    0
  )

  return {
    totalItems,
    lowStockItems,
    outOfStockItems,
    totalValue,
    items: data,
  }
} 