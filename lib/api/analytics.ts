import { supabase } from '../supabase'
import { Database } from '@/types/database'
import { create, update, remove, getById, getAll } from './base'

type Analytics = Database['public']['Tables']['analytics']['Row']
type AnalyticsInsert = Database['public']['Tables']['analytics']['Insert']
type AnalyticsUpdate = Database['public']['Tables']['analytics']['Update']

export async function getDailyAnalytics(date: string) {
  const { data, error } = await supabase
    .from('analytics')
    .select()
    .eq('date', date)
    .single()

  if (error) throw error
  return data
}

export async function getAnalyticsRange(startDate: string, endDate: string) {
  const { data, error } = await supabase
    .from('analytics')
    .select()
    .gte('date', startDate)
    .lte('date', endDate)
    .order('date', { ascending: true })

  if (error) throw error
  return data
}

export async function getDeliveryMetrics(startDate: string, endDate: string) {
  const { data, error } = await supabase
    .from('deliveries')
    .select(`
      *,
      route:routes(*),
      product:products(*)
    `)
    .gte('created_at', startDate)
    .lte('created_at', endDate)

  if (error) throw error

  // Calculate metrics
  const totalDeliveries = data.length
  const successfulDeliveries = data.filter((d) => d.status === 'completed').length
  const delayedDeliveries = data.filter((d) => d.status === 'delayed').length
  const failedDeliveries = data.filter((d) => d.status === 'failed').length

  const totalDistance = data.reduce((sum, d) => sum + (d.route.distance ?? 0), 0)
  const totalCost = data.reduce((sum, d) => sum + (d.quantity * d.product.unit_price), 0)

  return {
    totalDeliveries,
    successfulDeliveries,
    delayedDeliveries,
    failedDeliveries,
    successRate: (successfulDeliveries / totalDeliveries) * 100,
    totalDistance,
    totalCost,
    deliveries: data,
  }
}

export async function getRouteEfficiency(startDate: string, endDate: string) {
  const { data, error } = await supabase
    .from('routes')
    .select(`
      *,
      deliveries(*)
    `)
    .gte('created_at', startDate)
    .lte('created_at', endDate)

  if (error) throw error

  // Calculate efficiency metrics for each route
  const routeMetrics = data.map((route) => {
    const routeDeliveries = route.deliveries
    const completedDeliveries = routeDeliveries.filter((d) => d.status === 'completed')
    const totalDistance = route.distance ?? 0
    const totalDeliveries = routeDeliveries.length

    return {
      routeId: route.id,
      routeName: route.name,
      totalDeliveries,
      completedDeliveries: completedDeliveries.length,
      successRate: (completedDeliveries.length / totalDeliveries) * 100,
      totalDistance,
      averageDistancePerDelivery: totalDistance / totalDeliveries,
    }
  })

  return routeMetrics
}

export async function getDriverPerformance(startDate: string, endDate: string) {
  const { data, error } = await supabase
    .from('drivers')
    .select(`
      *,
      routes(
        *,
        deliveries(*)
      )
    `)
    .gte('created_at', startDate)
    .lte('created_at', endDate)

  if (error) throw error

  // Calculate performance metrics for each driver
  const driverMetrics = data.map((driver) => {
    const driverRoutes = driver.routes
    const totalDeliveries = driverRoutes.reduce(
      (sum, route) => sum + route.deliveries.length,
      0
    )
    const completedDeliveries = driverRoutes.reduce(
      (sum, route) =>
        sum + route.deliveries.filter((d) => d.status === 'completed').length,
      0
    )
    const totalDistance = driverRoutes.reduce(
      (sum, route) => sum + (route.distance ?? 0),
      0
    )

    return {
      driverId: driver.id,
      driverName: driver.full_name,
      totalRoutes: driverRoutes.length,
      totalDeliveries,
      completedDeliveries,
      successRate: (completedDeliveries / totalDeliveries) * 100,
      totalDistance,
      averageDistancePerDelivery: totalDistance / totalDeliveries,
    }
  })

  return driverMetrics
}

export async function getVehicleUtilization(startDate: string, endDate: string) {
  const { data, error } = await supabase
    .from('vehicles')
    .select(`
      *,
      routes(
        *,
        deliveries(*)
      )
    `)
    .gte('created_at', startDate)
    .lte('created_at', endDate)

  if (error) throw error

  // Calculate utilization metrics for each vehicle
  const vehicleMetrics = data.map((vehicle) => {
    const vehicleRoutes = vehicle.routes
    const totalDeliveries = vehicleRoutes.reduce(
      (sum, route) => sum + route.deliveries.length,
      0
    )
    const totalDistance = vehicleRoutes.reduce(
      (sum, route) => sum + (route.distance ?? 0),
      0
    )
    const totalTimeInUse = vehicleRoutes.reduce((sum, route) => {
      const duration = route.duration ? new Date(route.duration).getTime() : 0
      return sum + duration
    }, 0)

    return {
      vehicleId: vehicle.id,
      vehicleName: vehicle.name,
      totalRoutes: vehicleRoutes.length,
      totalDeliveries,
      totalDistance,
      totalTimeInUse,
      averageDistancePerDelivery: totalDistance / totalDeliveries,
      fuelEfficiency: vehicle.fuel_efficiency,
    }
  })

  return vehicleMetrics
} 