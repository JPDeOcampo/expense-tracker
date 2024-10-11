"use client"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { month: "January", balance: 186, spent: 80 },
  { month: "February", balance: 305, spent: 200 },
  { month: "March", balance: 237, spent: 120 },
  { month: "April", balance: 73, spent: 190 },
  { month: "May", balance: 209, spent: 130 },
  { month: "June", balance: 214, spent: 140 },
  { month: "July", balance: 214, spent: 140 },
  { month: "August", balance: 214, spent: 140 },
  { month: "September", balance: 214, spent: 140 },
  { month: "October", balance: 214, spent: 140 },
  { month: "November", balance: 214, spent: 140 },
  { month: "December", balance: 214, spent: 140 },
]

const chartConfig = {
  balance: {
    label: "Balance",
    color: "#2563eb",
  },
  spent: {
    label: "Spent",
    color: "#60a5fa",
  },
} satisfies ChartConfig

const BalanceSpent = () => {
  return (
    <ChartContainer config={chartConfig} className="h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="balance" fill="var(--color-balance)" radius={4} />
        <Bar dataKey="spent" fill="var(--color-spent)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}

export default BalanceSpent;
