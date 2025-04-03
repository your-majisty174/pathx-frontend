'use client'

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from 'chart.js'
import { Pie } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

interface PieChartProps {
  data: ChartData<'pie'>
  options?: ChartOptions<'pie'>
}

export default function PieChart({ data, options }: PieChartProps) {
  const chartOptions: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
      },
      title: {
        display: !!options?.plugins?.title?.text,
        text: options?.plugins?.title?.text,
      },
    },
    ...options,
  }

  return (
    <div className="w-full h-[300px]">
      <Pie options={chartOptions} data={data} />
    </div>
  )
} 