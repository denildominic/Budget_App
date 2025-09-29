'use client'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
ChartJS.register(ArcElement, Tooltip, Legend)

export default function ChartByCategory({
  data,
}: {
  data: { label: string; value: number; color: string }[]
}) {
  const total = data.reduce((s, d) => s + d.value, 0)
  const chartData = {
    labels: data.map(d => d.label),
    datasets: [
      {
        data: data.map(d => Math.round(d.value / 100)), // cents → dollars
        backgroundColor: data.map(d => d.color),
        borderWidth: 0,
      },
    ],
  }

  return (
    <div className="rounded-2xl border bg-white p-4 dark:bg-black">
      <div className="mb-2 font-semibold">Spending by Category</div>
      {total === 0 ? (
        <div className="text-sm text-gray-500 dark:text-gray-400">No data yet</div>
      ) : (
        <Doughnut data={chartData} />
      )}
    </div>
  )
}
