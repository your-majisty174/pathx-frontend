import { supabase } from '../supabase'
import { Database } from '@/types/database'
import { create, update, remove, getById, getAll } from './base'

type Route = Database['public']['Tables']['routes']['Row']
type RouteInsert = Database['public']['Tables']['routes']['Insert']
type RouteUpdate = Database['public']['Tables']['routes']['Update']

export async function createRoute(data: RouteInsert) {
  return create('routes', data)
}

export async function updateRoute(id: string, data: RouteUpdate) {
  return update('routes', id, data)
}

export async function deleteRoute(id: string) {
  return remove('routes', id)
}

export async function getRoute(id: string) {
  return getById('routes', id)
}

export async function getRoutes(options?: {
  orderBy?: { column: string; ascending?: boolean }
  limit?: number
  offset?: number
  status?: Route['status']
}) {
  let query = supabase.from('routes').select(`
    *,
    start_location:locations!start_location_id(*),
    end_location:locations!end_location_id(*),
    vehicle:vehicles(*),
    driver:drivers(*),
    waypoints:route_waypoints(
      *,
      location:locations(*)
    )
  `)

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

export async function addWaypoint(routeId: string, locationId: string, sequence: number) {
  const { data, error } = await supabase
    .from('route_waypoints')
    .insert({
      route_id: routeId,
      location_id: locationId,
      sequence,
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateWaypointSequence(routeId: string, waypointId: string, sequence: number) {
  const { data, error } = await supabase
    .from('route_waypoints')
    .update({ sequence })
    .eq('id', waypointId)
    .eq('route_id', routeId)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function removeWaypoint(routeId: string, waypointId: string) {
  const { error } = await supabase
    .from('route_waypoints')
    .delete()
    .eq('id', waypointId)
    .eq('route_id', routeId)

  if (error) throw error
}

export async function optimizeRoute(routeId: string) {
  // This would typically call an external route optimization service
  // For now, we'll just update the route status
  return update('routes', routeId, { status: 'active' })
}

export async function getRouteAnalytics(routeId: string) {
  const { data, error } = await supabase
    .from('deliveries')
    .select(`
      *,
      product:products(*)
    `)
    .eq('route_id', routeId)

  if (error) throw error
  return data
} 