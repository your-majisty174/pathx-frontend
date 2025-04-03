'use client'

import { useState } from 'react'
import {
  MapIcon,
  PencilIcon,
  TrashIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline'

interface Route {
  id: string
  name: string
  startLocation: string
  endLocation: string
  distance: string
  duration: string
  vehicle: string
  driver: string
  status: 'active' | 'scheduled' | 'completed'
}

export default function Routes() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null)
  const [routes, setRoutes] = useState<Route[]>([
    {
      id: '1',
      name: 'Downtown Delivery',
      startLocation: 'Warehouse A',
      endLocation: 'Store B',
      distance: '12.5 km',
      duration: '45 min',
      vehicle: 'Truck 123',
      driver: 'John Doe',
      status: 'active',
    },
    {
      id: '2',
      name: 'Suburban Route',
      startLocation: 'Distribution Center',
      endLocation: 'Store C',
      distance: '25.3 km',
      duration: '1h 15min',
      vehicle: 'Van 456',
      driver: 'Jane Smith',
      status: 'scheduled',
    },
  ])

  const handleCreateRoute = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement route creation
    setIsCreateModalOpen(false)
  }

  const handleEditRoute = (route: Route) => {
    setSelectedRoute(route)
    // TODO: Implement route editing
  }

  const handleDeleteRoute = (routeId: string) => {
    // TODO: Implement route deletion
    setRoutes(routes.filter((route) => route.id !== routeId))
  }

  const handleOptimizeRoute = (routeId: string) => {
    // TODO: Implement route optimization
    console.log('Optimizing route:', routeId)
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Routes</h1>
          <p className="text-gray-600">Manage and optimize delivery routes</p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <MapIcon className="w-5 h-5" />
          Create Route
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {routes.map((route) => (
          <div
            key={route.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2">
                <MapIcon className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-900">
                  {route.name}
                </h2>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditRoute(route)}
                  className="text-gray-600 hover:text-blue-600"
                >
                  <PencilIcon className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDeleteRoute(route.id)}
                  className="text-gray-600 hover:text-red-600"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Start Location</p>
                <p className="font-medium">{route.startLocation}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">End Location</p>
                <p className="font-medium">{route.endLocation}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Distance</p>
                  <p className="font-medium">{route.distance}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Duration</p>
                  <p className="font-medium">{route.duration}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Vehicle</p>
                <p className="font-medium">{route.vehicle}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Driver</p>
                <p className="font-medium">{route.driver}</p>
              </div>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  route.status === 'active'
                    ? 'bg-green-100 text-green-800'
                    : route.status === 'scheduled'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {route.status.charAt(0).toUpperCase() + route.status.slice(1)}
              </span>
              <button
                onClick={() => handleOptimizeRoute(route.id)}
                className="text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                <SparklesIcon className="w-4 h-4" />
                Optimize
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Route Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Create New Route</h2>
            <form onSubmit={handleCreateRoute} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Route Name
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Start Location
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  End Location
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Vehicle
                </label>
                <select
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                >
                  <option value="">Select a vehicle</option>
                  <option value="truck-123">Truck 123</option>
                  <option value="van-456">Van 456</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Driver
                </label>
                <select
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                >
                  <option value="">Select a driver</option>
                  <option value="john-doe">John Doe</option>
                  <option value="jane-smith">Jane Smith</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 text-gray-700 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Create Route
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
} 