"use client";
import { useState, useMemo, useEffect, Dispatch, SetStateAction } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import type { Selection } from "@nextui-org/react";
import useShareContextHooks from "@/components/shared/hooks/context-hooks/share-state-hooks";
import { ICombinedDataType } from "@/components/interface/global-interface";

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

const YearFilter = ({
  setFilterYear,
}: {
  setFilterYear: Dispatch<SetStateAction<string | number>>;
}) => {
  const { shareContext } = useShareContextHooks();
  const { combinedData } = shareContext;
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set(["All"]));

  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  const currentYear = new Date().getFullYear();

  const [years, setYears] = useState<number[]>([]);
  const [startYear, setStartYear] = useState<number>(currentYear);
  const [endYear, setEndYear] = useState<number>(currentYear);

  useEffect(() => {
    const yearsFromData = combinedData.map((entry) =>
      new Date(entry.date).getFullYear()
    );

    const minYear = Math.min(...yearsFromData);
    const maxYear = Math.max(...yearsFromData);

    setStartYear(minYear);
    setEndYear(maxYear);
  }, [combinedData]);

  useEffect(() => {
    const yearArray: number[] = [];
    for (let year = startYear; year <= endYear; year++) {
      yearArray.push(year);
    }
    setYears(yearArray);
    setSelectedKeys(new Set([currentYear]));
  }, [startYear, endYear]);

  useEffect(() => {
    const selectedKey = Array.from(selectedKeys)[0];
    setFilterYear(selectedKey);
  }, [selectedKeys]);

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered" className="capitalize">
          {selectedValue}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Single selection example"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
      >
        {years.map((item, i) => (
          <DropdownItem key={item} value={item}>
            {item}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};
const BalanceSpent = () => {
  const { shareContext } = useShareContextHooks();
  const { combinedData } = shareContext;
  const [filterYear, setFilterYear] = useState<string | number>('');
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

    const monthlyEntries = combinedData.filter((entry: ICombinedDataType) => {
      const entryDate = new Date(entry.date);
      return (
        entryDate.getMonth() === monthIndex &&
        entryDate.getFullYear() === Number(filterYear)
      );
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
        <YearFilter setFilterYear={setFilterYear} />
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
