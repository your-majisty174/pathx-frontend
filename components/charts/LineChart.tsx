'use client'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

interface LineChartProps {
  data: {
    labels: string[]
    datasets: {
      label: string
      data: number[]
      borderColor: string
      backgroundColor: string
      tension?: number
    }[]
  }
  options?: {
    title?: string
    yAxisLabel?: string
    xAxisLabel?: string
  }
}

export default function LineChart({ data, options }: LineChartProps) {
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
      <Line options={chartOptions} data={data} />
    </div>
  )
} 