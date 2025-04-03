'use client'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

interface BarChartProps {
  data: {
    labels: string[]
    datasets: {
      label: string
      data: number[]
      backgroundColor: string
      borderColor?: string
      borderWidth?: number
    }[]
  }
  options?: {
    title?: string
    yAxisLabel?: string
    xAxisLabel?: string
  }
}

export default function BarChart({ data, options }: BarChartProps) {
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: !!options?.title,
        text: options?.title,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: !!options?.yAxisLabel,
          text: options?.yAxisLabel,
        },
      },
      x: {
        title: {
          display: !!options?.xAxisLabel,
          text: options?.xAxisLabel,
        },
      },
    },
  }

  return (
    <div className="w-full h-[300px]">
      <Bar options={chartOptions} data={data} />
    </div>
  )
} 