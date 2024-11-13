"use client";
import { useState, useMemo, useEffect } from "react";
import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import type { Selection } from "@nextui-org/react";
import useShareContextHooks from "@/components/shared/hooks/context-hooks/share-state-hooks";

const YearFilter = () => {
  const { shareContext } = useShareContextHooks();
  const { defaultCombinedData, setFilterYear, selectedKeys, setSelectedKeys } = shareContext;

  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  const currentYear = new Date().getFullYear();

  const [years, setYears] = useState<(string | number)[]>([]);
  const [startYear, setStartYear] = useState<number>(currentYear);
  const [endYear, setEndYear] = useState<number>(currentYear);

  useEffect(() => {
    const yearsFromData = defaultCombinedData.map((entry) =>
      new Date(entry.date).getFullYear()
    );

    const minYear = Math.min(...yearsFromData);
    const maxYear = Math.max(...yearsFromData);

    setStartYear(minYear);
    setEndYear(maxYear);
  }, [defaultCombinedData]);

  useEffect(() => {
    const yearArray: (number | string)[] = [];
 
    for (let year = startYear; year <= endYear; year++) {
      yearArray.push(year);
    }
    yearArray.unshift("All");
    setYears(yearArray);
    // setSelectedKeys(new Set([currentYear]));
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
        {years.map((item) => (
          <DropdownItem key={item} value={item}>
            {item}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default YearFilter;
