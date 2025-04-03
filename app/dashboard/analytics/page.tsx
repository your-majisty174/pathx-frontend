'use client'

import { useState } from 'react'
import {
  ChartBarIcon,
  TruckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
} from '@heroicons/react/24/outline'
import dynamic from 'next/dynamic'

// Dynamically import chart components to avoid SSR issues
const LineChart = dynamic(() => import('@/components/charts/LineChart'), { ssr: false })
const BarChart = dynamic(() => import('@/components/charts/BarChart'), { ssr: false })
const PieChart = dynamic(() => import('@/components/charts/PieChart'), { ssr: false })

const metrics = [
  {
    name: 'Total Deliveries',
    value: '1,234',
    change: '+12.5%',
    changeType: 'increase',
    icon: TruckIcon,
  },
  {
    name: 'Average Delivery Time',
    value: '2.5h',
    change: '-0.3h',
    changeType: 'decrease',
    icon: ClockIcon,
  },
  {
    name: 'Delivery Success Rate',
    value: '98.5%',
    change: '+0.5%',
    changeType: 'increase',
    icon: ChartBarIcon,
  },
  {
    name: 'Cost per Delivery',
    value: '$45.20',
    change: '-$2.30',
    changeType: 'decrease',
    icon: CurrencyDollarIcon,
  },
]

const deliveryData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Deliveries',
      data: [65, 59, 80, 81, 56, 55, 40],
      borderColor: '#3B82F6',
      tension: 0.4,
    },
  ],
}

const routeEfficiencyData = {
  labels: ['Route A', 'Route B', 'Route C', 'Route D', 'Route E'],
  datasets: [
    {
      label: 'Efficiency Score',
      data: [85, 92, 78, 95, 88],
      backgroundColor: '#3B82F6',
    },
  ],
}

const deliveryStatusData = {
  labels: ['Completed', 'In Progress', 'Delayed', 'Failed'],
  datasets: [
    {
      data: [65, 20, 10, 5],
      backgroundColor: ['#10B981', '#F59E0B', '#EF4444', '#6B7280'],
    },
  ],
}

export default function Analytics() {
  const [timeRange, setTimeRange] = useState('week')

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Analytics Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Monitor and analyze your logistics performance metrics.
          </p>
        </div>
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

      {/* Key Metrics */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <div
            key={metric.name}
            className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6"
          >
            <dt>
              <div className="absolute rounded-md bg-primary-500 p-3">
                <metric.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">{metric.name}</p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">{metric.value}</p>
              <p
                className={`ml-2 flex items-baseline text-sm font-semibold ${
                  metric.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {metric.changeType === 'increase' ? (
                  <ArrowTrendingUpIcon className="h-5 w-5 flex-shrink-0 self-center text-green-500" aria-hidden="true" />
                ) : (
                  <ArrowTrendingDownIcon className="h-5 w-5 flex-shrink-0 self-center text-red-500" aria-hidden="true" />
                )}
                <span className="sr-only">{metric.changeType === 'increase' ? 'Increased' : 'Decreased'} by</span>
                {metric.change}
              </p>
            </dd>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Delivery Trends */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-base font-semibold leading-6 text-gray-900 mb-4">Delivery Trends</h3>
          <div className="h-80">
            <LineChart data={deliveryData} />
          </div>
        </div>

        {/* Route Efficiency */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-base font-semibold leading-6 text-gray-900 mb-4">Route Efficiency</h3>
          <div className="h-80">
            <BarChart data={routeEfficiencyData} />
          </div>
        </div>

        {/* Delivery Status Distribution */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-base font-semibold leading-6 text-gray-900 mb-4">Delivery Status Distribution</h3>
          <div className="h-80">
            <PieChart data={deliveryStatusData} />
          </div>
        </div>

        {/* Additional Analytics */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-base font-semibold leading-6 text-gray-900 mb-4">Performance Insights</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Peak Delivery Hours</span>
              <span className="text-sm font-medium text-gray-900">10:00 AM - 2:00 PM</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Most Efficient Route</span>
              <span className="text-sm font-medium text-gray-900">Route D (95% efficiency)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Average Fuel Efficiency</span>
              <span className="text-sm font-medium text-gray-900">8.5 km/l</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Customer Satisfaction</span>
              <span className="text-sm font-medium text-gray-900">4.8/5.0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 