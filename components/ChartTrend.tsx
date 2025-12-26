'use client'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js'
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend)

export default function ChartTrend({
  data,
}: {
  data: { label: string; value: number }[] // label like '09-01', value in cents
}) {
  const chartData = {
    labels: data.map(d => d.label),
    datasets: [
      {
        label: 'Daily Spend ($)',
        data: data.map(d => Math.round(d.value / 100)),
        tension: 0.3,
      },
    ],
  }

  return (
    <div className="rounded-2xl border bg-white p-4 dark:bg-black">
      <div className="mb-2 font-semibold">Daily Spending Trend!</div>
      {data.length === 0 ? (
        <div className="text-sm text-gray-500 dark:text-gray-400">No data yet!</div>
      ) : (
        <Line data={chartData} />
      )}
    </div>
  )
}
