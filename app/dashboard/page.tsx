'use client'

import { useState } from 'react'
import {
  TruckIcon,
  CubeIcon,
  ChartBarIcon,
  MapIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  PlusIcon,
  WrenchScrewdriverIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline'

const stats = [
  {
    name: 'Active Routes',
    value: '12',
    change: '+2',
    changeType: 'increase',
    icon: MapIcon,
  },
  {
    name: 'Total Inventory',
    value: '2,345',
    change: '+123',
    changeType: 'increase',
    icon: CubeIcon,
  },
  {
    name: 'Active Vehicles',
    value: '8',
    change: '-1',
    changeType: 'decrease',
    icon: TruckIcon,
  },
  {
    name: 'Delivery Success Rate',
    value: '98.5%',
    change: '+0.5%',
    changeType: 'increase',
    icon: ChartBarIcon,
  },
]

const recentActivity = [
  {
    id: 1,
    type: 'route',
    description: 'New route created: Warehouse A to Store B',
    timestamp: '2 minutes ago',
    icon: MapIcon,
  },
  {
    id: 2,
    type: 'inventory',
    description: 'Inventory updated: +50 units of Product X',
    timestamp: '15 minutes ago',
    icon: CubeIcon,
  },
  {
    id: 3,
    type: 'vehicle',
    description: 'Vehicle V123 completed maintenance',
    timestamp: '1 hour ago',
    icon: WrenchScrewdriverIcon,
  },
  {
    id: 4,
    type: 'delivery',
    description: 'Delivery completed: Order #12345',
    timestamp: '2 hours ago',
    icon: CheckCircleIcon,
  },
]

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState('week')

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard Overview</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => setTimeRange('day')}
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              timeRange === 'day'
                ? 'bg-primary-100 text-primary-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Day
          </button>
          <button
            onClick={() => setTimeRange('week')}
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              timeRange === 'week'
                ? 'bg-primary-100 text-primary-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Week
          </button>
          <button
            onClick={() => setTimeRange('month')}
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              timeRange === 'month'
                ? 'bg-primary-100 text-primary-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Month
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6"
          >
            <dt>
              <div className="absolute rounded-md bg-primary-500 p-3">
                <stat.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">{stat.name}</p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              <p
                className={`ml-2 flex items-baseline text-sm font-semibold ${
                  stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {stat.changeType === 'increase' ? (
                  <ArrowTrendingUpIcon className="h-5 w-5 flex-shrink-0 self-center text-green-500" aria-hidden="true" />
                ) : (
                  <ArrowTrendingDownIcon className="h-5 w-5 flex-shrink-0 self-center text-red-500" aria-hidden="true" />
                )}
                <span className="sr-only">{stat.changeType === 'increase' ? 'Increased' : 'Decreased'} by</span>
                {stat.change}
              </p>
            </dd>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-base font-semibold leading-6 text-gray-900">Recent Activity</h3>
            <div className="mt-5 flow-root">
              <ul role="list" className="-mb-8">
                {recentActivity.map((activity, activityIdx) => (
                  <li key={activity.id}>
                    <div className="relative pb-8">
                      {activityIdx !== recentActivity.length - 1 ? (
                        <span className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                      ) : null}
                      <div className="relative flex space-x-3">
                        <div>
                          <span className="h-8 w-8 rounded-full bg-primary-500 flex items-center justify-center ring-8 ring-white">
                            <activity.icon className="h-5 w-5 text-white" aria-hidden="true" />
                          </span>
                        </div>
                        <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                          <div>
                            <p className="text-sm text-gray-500">{activity.description}</p>
                            <p className="text-xs text-gray-400">{activity.timestamp}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-base font-semibold leading-6 text-gray-900">Quick Actions</h3>
            <div className="mt-5 grid grid-cols-2 gap-4">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                Create Route
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                Add Inventory
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                Schedule Maintenance
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                Generate Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 