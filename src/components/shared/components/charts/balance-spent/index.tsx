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
import useShareContextHooks from "@/components/shared/hooks/context-hooks/share-state-hooks";
import { ICombinedDataType } from "@/components/interface/global-interface";
import YearFilter from "../../filter-year";
import { months } from "@/components/shared/constant";

const chartConfig = {
  balance: {
    label: "Balance",
    color: "#003366",
  },
  spent: {
    label: "Spent",
    color: "#b2e1d6",
  },
} satisfies ChartConfig;

interface IEntry {
  type?: string;
  amount: string | number;
}

const BalanceSpent = () => {
  const { shareContext } = useShareContextHooks();
  const { combinedData, filterYear } = shareContext;

  const toNumber = (value: string | number): number => {
    const num = typeof value === "number" ? value : parseFloat(value);
    return isNaN(num) ? 0 : num;
  };

  const chartData = months.map((month) => {
    let totalIncome = 0;
    let totalExpenses = 0;

    const monthIndex = months.indexOf(month);

    const monthlyEntries = combinedData.filter((entry: ICombinedDataType) => {
      const entryDate = new Date(entry.date);
      if (filterYear === String("All") || filterYear === "") {
        return entryDate.getMonth() === monthIndex && entryDate.getFullYear();
      } else {
        return (
          entryDate.getMonth() === monthIndex &&
          entryDate.getFullYear() === Number(filterYear)
        );
      }
    });

    monthlyEntries.forEach((entry: IEntry) => {
      if (entry.type === "income") {
        totalIncome += toNumber(entry.amount);
      } else if (entry.type === "expense") {
        totalExpenses += toNumber(entry.amount);
      }
    });

    // Ensure totals are not negative
    totalIncome = Math.max(totalIncome, 0);
    totalExpenses = Math.max(totalExpenses, 0);

    // Calculate balance
    const balance = totalIncome - totalExpenses;

    return { month, balance: Math.max(balance, 0), spent: totalExpenses };
  });

  return (
    <div className="card">
      <div className="flex w-full justify-between">
        <h2 className="card-header">Balance vs Spent</h2>
        <YearFilter />
      </div>

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
