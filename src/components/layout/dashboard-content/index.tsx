"use client";
import { useState, useEffect } from "react";
import useShareContextHooks from "@/components/shared/hooks/context-hooks/share-state-hooks";
import BalanceSpent from "@/components/shared/components/charts/balance-spent";
import GenericModal from "@/components/shared/components/generic-modal";
import { FaPlus } from "react-icons/fa";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@nextui-org/react";
import useGlobalHooks from "@/components/shared/hooks/global-hooks";
import { ICombinedDataType } from "@/components/interface/global-interface";
import { ITableDataType } from "@/components/interface/global-interface";

interface IType extends ICombinedDataType {
  type: string;
  category: string;
  count: string | number;
  forEach(callback: (item: IType) => void): void;
}

const Overview = () => {
  const { shareContext } = useShareContextHooks();
  const { overAllIncomeData, currentBalance, overAllExpenseData } =
    shareContext;

  const overviewItems = [
    { title: "Total Overall balance", value: overAllIncomeData, icon: "" },
    { title: "Loan", value: "", icon: "" },
    { title: "Investment", value: "", icon: "" },
  ];

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <div className="card flex flex-col gap-4">
      <div className="w-full flex justify-between">
        <h2 className="card-header">Overview</h2>
        <button className="custom-btn" onClick={() => setIsModalOpen(true)}>
          <span className="text-neutral-light">
            <FaPlus />
          </span>
        </button>
      </div>
      <ul>
        {overviewItems.map((item, index) => {
          return (
            <li key={index} className="my-2 flex justify-between w-full">
              <span className="text-base text-quaternary font-medium">
                {item.title}
              </span>
              <span className="text-base text-quaternary font-medium">
                {item.value}
              </span>
            </li>
          );
        })}
      </ul>
      <div className="w-full grid grid-cols-2 gap-2">
        <div className="flex flex-col gap-4 p-4 bg-tertiary rounded-md">
          <p className="text-base font-medium text-quaternary">Total Spent</p>
          <p className="text-base font-medium text-primary">
            {overAllExpenseData}
          </p>
        </div>
        <div className="flex flex-col gap-4 p-4 bg-tertiary rounded-md">
          <p className="text-base font-medium text-quaternary">
            Current Balance
          </p>
          <p className="text-base font-medium text-primary">{currentBalance}</p>
        </div>
      </div>
      <GenericModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  );
};


const Category = () => {
  const { shareContext } = useShareContextHooks();
  const { combinedData } = shareContext;
  const [displayedData, setDisplayedData] = useState<ICombinedDataType[]>([]);
  const [page, setPage] = useState(1);

  const itemsPerPage = 9;

  useEffect(() => {
    const countCategories = (data: IType[]) => {
      const categoryCount: { [key: string]: { [key: string]: number } } = {
        income: {},
        expense: {},
      };
      data.forEach((item: IType) => {
        const type = item.type;
        const category = item.category;

        if (categoryCount[type]) {
          categoryCount[type][category] =
            (categoryCount[type][category] || 0) + 1;
        }
      });

 
      const formattedOutput = [];

      for (const [category, count] of Object.entries(categoryCount.income)) {
        formattedOutput.push({
          type: "income",
          category: category,
          count: count,
        });
      }

      for (const [category, count] of Object.entries(categoryCount.expense)) {
        formattedOutput.push({
          type: "expense",
          category: category,
          count: count,
        });
      }
      formattedOutput.sort((a: any, b: any) => b.count - a.count);
      return formattedOutput;
    };
    const countCat = countCategories(combinedData as IType[]);
    const newData = countCat.slice(0, page * itemsPerPage);

    setDisplayedData(newData as IType[]);
  }, [combinedData, page]);

  const hasMore = displayedData.length > combinedData.length;
  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div className="card">
      <h2 className="card-header">Transaction History</h2>
      <Table
        isHeaderSticky
        aria-label="transaction-history"
        bottomContent={
          hasMore ? (
            <div className="flex w-full justify-center">
              <Button className="custom-btn" variant="flat" onPress={loadMore}>
                Load More
              </Button>
            </div>
          ) : null
        }
        classNames={{
          base: "max-h-[520px] overflow-auto [&>div]:shadow-none",
          table: "min-h-[320px]",
        }}
      >
        <TableHeader>
          <TableColumn key="type">Type</TableColumn>
          <TableColumn key="category">Category</TableColumn>
          <TableColumn key="count">Item no.</TableColumn>
        </TableHeader>
        <TableBody>
          {displayedData.map((item: ICombinedDataType) => (
            <TableRow key={item._id}>
              {(columnKey) => (
                <TableCell className="h-6">
                  <p className="capitalize text-base text-quaternary">
                    {item[columnKey as keyof ICombinedDataType]}
                  </p>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

const RecentTransaction = () => {
  const { shareContext } = useShareContextHooks();
  const { combinedData, currency } = shareContext;
  const [displayedData, setDisplayedData] = useState<ICombinedDataType[]>([]);
  const [page, setPage] = useState(1);
  const { handleFormatAmount } = useGlobalHooks();

  const itemsPerPage = 9;

  useEffect(() => {
    const updatedData = combinedData.map((item: ICombinedDataType) => ({
      ...item,
      amount: handleFormatAmount(Number(item.amount), String(currency)),
      date: new Date(item.date).toISOString().split("T")[0],
    }));
    const newData = updatedData.slice(0, page * itemsPerPage);
    setDisplayedData(newData);
  }, [combinedData, page]);

  const hasMore = displayedData.length < combinedData.length;
  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  const sortedData = displayedData.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  }) as ITableDataType[];

  return (
    <div className="card">
      <h2 className="card-header">Transaction History</h2>
      <Table
        isHeaderSticky
        aria-label="transaction-history"
        bottomContent={
          hasMore ? (
            <div className="flex w-full justify-center">
              <Button className="custom-btn" variant="flat" onPress={loadMore}>
                Load More
              </Button>
            </div>
          ) : null
        }
        classNames={{
          base: "max-h-[520px] overflow-auto [&>div]:shadow-none",
          table: "min-h-[320px]",
        }}
      >
        <TableHeader>
          <TableColumn key="type">Type</TableColumn>
          <TableColumn key="category">Category</TableColumn>
          <TableColumn key="amount">Amount</TableColumn>
          <TableColumn key="date">Date</TableColumn>
        </TableHeader>
        <TableBody>
          {sortedData.map((item: ITableDataType) => (
            <TableRow key={item._id}>
              {(columnKey) => (
                <TableCell className="h-6">
                  <p className="capitalize text-base text-quaternary">
                    {item[columnKey]}
                  </p>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

const DashboardContent = () => {
  return (
    <div className="flex flex-col w-full h-full gap-4">
      <h1 className="text-3xl font-bold text-primary">Dashboard</h1>
      <div className="flex flex-col gap-6">
        <div className="w-full h-full grid grid-cols-1 lg:grid-cols-[30%_1fr] gap-6">
          <Overview />
          <BalanceSpent />
        </div>
        <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Category />
          <RecentTransaction />
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
