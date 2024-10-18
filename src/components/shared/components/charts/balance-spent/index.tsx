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
import useContextHooks from "@/components/shared/hooks/context-hooks";
import { ICombinedDataType } from "@/components/interface/global-interface";

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
interface IEntry {
  type: string;
  amount: string | number;
}

const BalanceSpent = () => {
  const { shareContext } = useContextHooks();
  const { combinedData } = shareContext;

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
  
  const toNumber = (value: string | number): number => {
    const num = typeof value === "number" ? value : parseFloat(value);
    return isNaN(num) ? 0 : num; 
  };
  
  const chartData = months.map((month) => {
    let totalIncome = 0;
    let totalExpenses = 0;
  
    const monthIndex = months.indexOf(month);
  
    const monthlyEntries = combinedData.filter(
      (entry: ICombinedDataType) =>
        new Date(entry.date).getMonth() === monthIndex
    );
  
    monthlyEntries.forEach((entry: IEntry) => {
      if (entry.type === "income") {
        totalIncome += toNumber(entry.amount); 
      } else if (entry.type === "expense") {
        totalExpenses += toNumber(entry.amount);
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
