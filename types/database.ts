export type RouteStatus = 'active' | 'scheduled' | 'completed' | 'cancelled'
export type VehicleStatus = 'available' | 'in_use' | 'maintenance' | 'retired'
export type InventoryStatus = 'in_stock' | 'low_stock' | 'out_of_stock'
export type DeliveryStatus = 'completed' | 'in_progress' | 'delayed' | 'failed'

export interface Location {
  id: string
  name: string
  type: string
  address: string
  coordinates: [number, number]
  created_at: string
  updated_at: string
}

export interface Vehicle {
  id: string
  name: string
  type: string
  capacity: number
  current_location_id: string
  status: VehicleStatus
  last_maintenance_date: string | null
  next_maintenance_date: string | null
  fuel_efficiency: number | null
  created_at: string
  updated_at: string
}

export interface Driver {
  id: string
  user_id: string
  full_name: string
  phone: string
  license_number: string
  current_vehicle_id: string | null
  status: string
  created_at: string
  updated_at: string
}

export interface Product {
  id: string
  name: string
  category: string
  sku: string
  description: string | null
  unit_price: number
  created_at: string
  updated_at: string
}

export interface Inventory {
  id: string
  product_id: string
  location_id: string
  quantity: number
  min_stock: number
  reorder_point: number
  status: InventoryStatus
  last_updated: string
  created_at: string
  updated_at: string
}

export interface Route {
  id: string
  name: string
  start_location_id: string
  end_location_id: string
  vehicle_id: string | null
  driver_id: string | null
  status: RouteStatus
  distance: number | null
  duration: string | null
  schedule: string | null
  eta: string | null
  created_at: string
  updated_at: string
}

export interface RouteWaypoint {
  id: string
  route_id: string
  location_id: string
  sequence: number
  created_at: string
  updated_at: string
}

export interface Delivery {
  id: string
  route_id: string
  product_id: string
  quantity: number
  status: DeliveryStatus
  actual_delivery_time: string | null
  notes: string | null
  created_at: string
  updated_at: string
}

export interface Analytics {
  id: string
  date: string
  total_deliveries: number
  successful_deliveries: number
  average_delivery_time: string | null
  total_distance: number | null
  total_cost: number | null
  created_at: string
  updated_at: string
}

export interface Database {
  public: {
    Tables: {
      locations: {
        Row: Location
        Insert: Omit<Location, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Location, 'id' | 'created_at' | 'updated_at'>>
      }
      vehicles: {
        Row: Vehicle
        Insert: Omit<Vehicle, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Vehicle, 'id' | 'created_at' | 'updated_at'>>
      }
      drivers: {
        Row: Driver
        Insert: Omit<Driver, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Driver, 'id' | 'created_at' | 'updated_at'>>
      }
      products: {
        Row: Product
        Insert: Omit<Product, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Product, 'id' | 'created_at' | 'updated_at'>>
      }
      inventory: {
        Row: Inventory
        Insert: Omit<Inventory, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Inventory, 'id' | 'created_at' | 'updated_at'>>
      }
      routes: {
        Row: Route
        Insert: Omit<Route, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Route, 'id' | 'created_at' | 'updated_at'>>
      }
      route_waypoints: {
        Row: RouteWaypoint
        Insert: Omit<RouteWaypoint, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<RouteWaypoint, 'id' | 'created_at' | 'updated_at'>>
      }
      deliveries: {
        Row: Delivery
        Insert: Omit<Delivery, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Delivery, 'id' | 'created_at' | 'updated_at'>>
      }
      analytics: {
        Row: Analytics
        Insert: Omit<Analytics, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Analytics, 'id' | 'created_at' | 'updated_at'>>
      }
    }
  }
} 