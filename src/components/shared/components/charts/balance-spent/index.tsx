"use client";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import useShareContext from "@/components/shared/hooks/share-state-hooks";

const chartConfig = {
  balance: {
    label: "Balance",
    color: "#2563eb",
  },
  spent: {
    label: "Spent",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

const BalanceSpent = () => {
  const { combinedData } = useShareContext();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const chartData = months.map((month) => {
    let totalIncome = 0;
    let totalExpenses = 0;

    const monthIndex = months.indexOf(month);

    const monthlyEntries = combinedData.filter(
      (entry: any) => new Date(entry.date).getMonth() === monthIndex
    );

    monthlyEntries.forEach((entry: any) => {
      if (entry.type === "income") {
        totalIncome += entry.amount;
      } else if (entry.type === "expense") {
        totalExpenses += entry.amount;
      }
    });

    return {
      month: month,
      balance: totalIncome - totalExpenses,
      spent: totalExpenses,
    };
  });

  return (
    <div className="card">
      <h2 className="card-header">Balance vs Spent</h2>
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
    </div>
  );
};

export default BalanceSpent;
