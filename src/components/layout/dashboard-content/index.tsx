"use client";
import { useState, useContext, useEffect } from "react";
import { ShareContext } from "@/components/shared/context/share-state";
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

const Overview = () => {
  const { overAllIncomeData, currentBalance, overAllExpenseData } =
    useContext<any>(ShareContext);
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
        <button
          className="custom-btn"
          onClick={() => setIsModalOpen(true)}
        >
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

const RecentTransaction = () => {
  const { combinedData, currency } = useContext<any>(ShareContext);
  const [displayedData, setDisplayedData] = useState([]);
  const [page, setPage] = useState(1);
  const { handleFormatAmount } = useGlobalHooks();

  const itemsPerPage = 9;

  useEffect(() => {
    const updatedData = combinedData.map((item: any) => ({
      ...item,
      amount: handleFormatAmount(item.amount, currency),
      date: new Date(item.date).toISOString().split("T")[0],
    }));
    const newData = updatedData.slice(0, page * itemsPerPage);
    setDisplayedData(newData);
  }, [combinedData, page]);

  const hasMore = displayedData.length < combinedData.length;
  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  const sortedData = displayedData.sort((a: any, b: any) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div className="card">
      <Table
        isHeaderSticky
        aria-label="transaction-history"
        bottomContent={
          hasMore ? (
            <div className="flex w-full justify-center">
              <Button  className="custom-btn" variant="flat" onPress={loadMore}>
                Load More
              </Button>
            </div>
          ) : null
        }
        classNames={{
          base: "max-h-[520px] overflow-auto",
          table: "min-h-[420px]",
        }}
      >
        <TableHeader>
          <TableColumn key="type">Type</TableColumn>
          <TableColumn key="category">Category</TableColumn>
          <TableColumn key="amount">Amount</TableColumn>
          <TableColumn key="date">Date</TableColumn>
        </TableHeader>
        <TableBody>
          {sortedData.map((item: any) => (
            <TableRow key={item._id}>
              {(columnKey) => (
                <TableCell>
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
          <div className="card">
            <div></div>
          </div>
          <RecentTransaction />
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
