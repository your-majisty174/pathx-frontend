import { useState, useEffect } from 'react'
import * as routesApi from '../api/routes'
import * as inventoryApi from '../api/inventory'
import * as analyticsApi from '../api/analytics'

// Routes hooks
export function useRoutes(options?: {
  status?: 'active' | 'scheduled' | 'completed' | 'cancelled'
  limit?: number
  offset?: number
}) {
  const [routes, setRoutes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchRoutes() {
      try {
        const data = await routesApi.getRoutes(options)
        setRoutes(data)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchRoutes()
  }, [options?.status, options?.limit, options?.offset])

  return { routes, loading, error }
}

export function useRoute(id: string) {
  const [route, setRoute] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchRoute() {
      try {
        const data = await routesApi.getRoute(id)
        setRoute(data)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchRoute()
  }, [id])

  return { route, loading, error }
}

// Inventory hooks
export function useInventory(options?: {
  locationId?: string
  productId?: string
  status?: 'in_stock' | 'low_stock' | 'out_of_stock'
  limit?: number
  offset?: number
}) {
  const [inventory, setInventory] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchInventory() {
      try {
        const data = await inventoryApi.getInventory(options)
        setInventory(data)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchInventory()
  }, [options?.locationId, options?.productId, options?.status, options?.limit, options?.offset])

  return { inventory, loading, error }
}

export function useLowStockItems(locationId?: string) {
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchLowStockItems() {
      try {
        const data = await inventoryApi.getLowStockItems(locationId)
        setItems(data)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchLowStockItems()
  }, [locationId])

  return { items, loading, error }
}

// Analytics hooks
export function useDailyAnalytics(date: string) {
  const [analytics, setAnalytics] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        const data = await analyticsApi.getDailyAnalytics(date)
        setAnalytics(data)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchAnalytics()
  }, [date])

  return { analytics, loading, error }
}

export function useDeliveryMetrics(startDate: string, endDate: string) {
  const [metrics, setMetrics] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchMetrics() {
      try {
        const data = await analyticsApi.getDeliveryMetrics(startDate, endDate)
        setMetrics(data)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchMetrics()
  }, [startDate, endDate])

  return { metrics, loading, error }
}

export function useRouteEfficiency(startDate: string, endDate: string) {
  const [efficiency, setEfficiency] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchEfficiency() {
      try {
        const data = await analyticsApi.getRouteEfficiency(startDate, endDate)
        setEfficiency(data)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchEfficiency()
  }, [startDate, endDate])

  return { efficiency, loading, error }
}

export function useDriverPerformance(startDate: string, endDate: string) {
  const [performance, setPerformance] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchPerformance() {
      try {
        const data = await analyticsApi.getDriverPerformance(startDate, endDate)
        setPerformance(data)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchPerformance()
  }, [startDate, endDate])

  return { performance, loading, error }
}

export function useVehicleUtilization(startDate: string, endDate: string) {
  const [utilization, setUtilization] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchUtilization() {
      try {
        const data = await analyticsApi.getVehicleUtilization(startDate, endDate)
        setUtilization(data)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchUtilization()
  }, [startDate, endDate])

  return { utilization, loading, error }
} 