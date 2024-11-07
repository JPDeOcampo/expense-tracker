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
  Tooltip,
} from "@nextui-org/react";
import { EyeIcon } from "../../../../public/images";
import useGlobalHooks from "@/components/shared/hooks/global-hooks";
import { ICombinedDataType } from "@/components/interface/global-interface";
import { ITableDataType } from "@/components/interface/global-interface";
import { useRouter } from "next/navigation";

interface IType extends ICombinedDataType {
  type: string;
  category: string;
  count: number;
  // forEach(callback: (item: IType) => void): void;
}

const Overview = () => {
  const { shareContext } = useShareContextHooks();
  const { overAllIncomeData, currentBalance, overAllExpenseData, currency } =
    shareContext;

  const { handleFormatAmount } = useGlobalHooks();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <div className="card flex flex-col justify-between gap-4">
      <div className="w-full flex justify-between">
        <h2 className="card-header">Overview</h2>
        <button className="custom-btn" onClick={() => setIsModalOpen(true)}>
          <span className="text-neutral-light">
            <FaPlus />
          </span>
        </button>
      </div>
      <div className="w-full flex flex-col justify-center items-center">
        <h3 className="text-4xl font-bold text-quaternary">
          {handleFormatAmount(currentBalance as number, currency as string)}
        </h3>
        <p className="text-secondary-500 text-base font-semibold">
          Current Balance
        </p>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-4 p-4 bg-tertiary rounded-md">
          <p className="text-base font-semibold text-quaternary">Total Spent</p>
          <p className="text-xl font-medium text-primary">
            {handleFormatAmount(
              overAllExpenseData as number,
              currency as string
            )}
          </p>
        </div>
        <div className="flex flex-col gap-4 p-4 bg-tertiary rounded-md">
          <p className="text-base font-semibold text-quaternary">Total Asset</p>
          <p className="text-xl font-medium text-primary">
            {handleFormatAmount(
              overAllIncomeData as number,
              currency as string
            )}
          </p>
        </div>
      </div>
      <div className="hidden">
        <GenericModal
          isGenericModal={"add-item"}
          isModalOpen={isModalOpen}
          header={"Add new item"}
          setIsModalOpen={setIsModalOpen}
        />
      </div>
    </div>
  );
};

const Category = () => {
  const { shareContext } = useShareContextHooks();
  const { combinedData, setIsSelectedList } = shareContext;
  const [displayedData, setDisplayedData] = useState<ICombinedDataType[]>([]);
  const [page, setPage] = useState(1);
  const router = useRouter();
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
      formattedOutput.sort(
        (
          a: { type: string; category: string; count: number },
          b: { type: string; category: string; count: number }
        ) => b.count - a.count
      );
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
  const handleView = (type: string, category: string) => {
    setIsSelectedList({ type, category });
    router.push(`/pages/category`);
  };
  return (
    <div className="card h-auto lg:min-h-[500px]">
      <h2 className="card-header">Most Category</h2>
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
          base: "max-h-[520px] overflow-auto [&>div]:shadow-none [&>div]:pt-0",
          table: "",
        }}
      >
        <TableHeader>
          <TableColumn key="type">Type</TableColumn>
          <TableColumn key="category">Category</TableColumn>
          <TableColumn key="count">Item no.</TableColumn>
          <TableColumn key="action">Action</TableColumn>
        </TableHeader>
        {displayedData.length === 0 ? (
          <TableBody emptyContent={"No category record."}>{[]}</TableBody>
        ) : (
          <TableBody>
            {displayedData.map((item: ICombinedDataType, i) => (
              <TableRow key={i}>
                {(columnKey) => (
                  <TableCell className="h-6">
                    <div>
                      <p className="capitalize text-base text-quaternary">
                        {item[columnKey as keyof ICombinedDataType]}
                      </p>
                      {columnKey === "action" && (
                        <div>
                          <Tooltip content="View">
                            <button
                              onClick={() =>
                                handleView(item["type"] ?? "", item["category"])
                              }
                            >
                              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <EyeIcon />
                              </span>
                            </button>
                          </Tooltip>
                        </div>
                      )}
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        )}
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
      createdAt: item.createdAt
        ? new Date(item.createdAt).toLocaleString()
        : "",
    }));

    const sortedData = updatedData.sort((a, b) => {
      return (
        new Date(b.createdAt ?? "").getTime() -
        new Date(a.createdAt ?? "").getTime()
      );
    }) as ITableDataType[];

    const newData = sortedData.slice(0, page * itemsPerPage);

    setDisplayedData(newData);
  }, [combinedData, page, currency]);

  const hasMore = displayedData.length < combinedData.length;
  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div className="card h-auto lg:min-h-[500px]">
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
          base: "max-h-[520px] overflow-auto [&>div]:shadow-none [&>div]:pt-0 [&>div]:min-w-[768px] [&>div]:2xl:min-w-0",
          table: "",
        }}
      >
        <TableHeader>
          <TableColumn key="type">Type</TableColumn>
          <TableColumn key="category">Category</TableColumn>
          <TableColumn key="amount">Amount</TableColumn>
          <TableColumn key="date">Date</TableColumn>
          <TableColumn key="createdAt">Created</TableColumn>
        </TableHeader>
        {displayedData.length === 0 ? (
          <TableBody emptyContent={"No transaction history."}>{[]}</TableBody>
        ) : (
          <TableBody>
            {displayedData.map((item: ICombinedDataType, i) => (
              <TableRow key={i}>
                {(columnKey) => (
                  <TableCell className="h-6">
                    <p
                      className={`capitalize text-base text-quaternary ${
                        columnKey === "createdAt" ? "text-secondary-500" : ""
                      }`}
                    >
                      {item[columnKey]}
                    </p>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </div>
  );
};

const DashboardContent = () => {
  return (
    <div className="flex flex-col w-full h-full gap-8">
      <h1 className="text-3xl font-bold text-primary">Dashboard</h1>
      <div className="flex flex-col gap-6">
        <div className="w-full h-full grid grid-cols-1 xl:grid-cols-[35%_1fr] gap-6">
          <Overview />
          <BalanceSpent />
        </div>
        <div className="w-full h-full grid grid-cols-1 xl:grid-cols-2 gap-6">
          <Category />
          <RecentTransaction />
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
