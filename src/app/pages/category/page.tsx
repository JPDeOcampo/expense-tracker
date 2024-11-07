"use client";
import { useState, useEffect, useMemo, Dispatch, SetStateAction } from "react";
import useShareContextHooks from "@/components/shared/hooks/context-hooks/share-state-hooks";
import GenericModal from "@/components/shared/components/generic-modal";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Tooltip,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Checkbox,
} from "@nextui-org/react";
import type { Selection } from "@nextui-org/react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import useGlobalHooks from "@/components/shared/hooks/global-hooks";
import {
  ITableDataType,
  ICombinedDataType,
  IEventExtendedProps,
} from "@/components/interface/global-interface";
import { categories } from "@/components/shared/constant";

const CategoryFilter = ({
  isIncome,
  isExpense,
}: {
  isIncome: boolean;
  isExpense: boolean;
}) => {
  const { shareContext } = useShareContextHooks();
  const { setIsSelectedList, isSelectedList } = shareContext;
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set(["All"]));
  const [isSelectedKeys, setIsSelectedKeys] = useState<boolean>(true);

  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  useEffect(() => {
    if (isSelectedList.category !== "" && isSelectedKeys) {
      setSelectedKeys(new Set([isSelectedList.category]));
      setIsSelectedList({ type: "", category: isSelectedList.category });
    } else {
      setIsSelectedList({ type: "", category: selectedValue });
    }
    setIsSelectedKeys(false);
  }, [selectedKeys]);

  const combinedCategory = isIncome
    ? [{ label: "All", value: "All" }, ...categories.income]
    : isExpense
    ? [{ label: "All", value: "All" }, ...categories.expense]
    : [];

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered" className="capitalize">
          {selectedValue}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Filter by category"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
      >
        {combinedCategory.map((item, i) => (
          <DropdownItem key={item.value} value={item.value}>
            {item.label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

const CategoryList = ({
  isIncome,
  isExpense,
}: {
  isIncome: boolean;
  isExpense: boolean;
}) => {
  const { shareContext } = useShareContextHooks();
  const {
    combinedData,
    currency,
    isGenericModal,
    modalHeader,
    isSelectedList,
  } = shareContext;
  const [displayedData, setDisplayedData] = useState<ICombinedDataType[]>([]);

  const [page, setPage] = useState(1);
  const {
    handleFormatAmount,
    handleEdit,
    handleDelete,
    isModalOpen,
    updateData,
    setIsModalOpen,
    capitalizeFirstLetter,
  } = useGlobalHooks();

  const itemsPerPage = 15;

  useEffect(() => {
    const listData =
      isIncome && !isExpense
        ? combinedData.filter((item) => item.type === "income")
        : isExpense && !isIncome
        ? combinedData.filter((item) => item.type === "expense")
        : combinedData;

    const filteredData =
      (isIncome && isExpense) || isSelectedList.category === "All"
        ? listData
        : listData.filter(
            (item) =>
              item.category ===
              capitalizeFirstLetter(isSelectedList.category ?? "")
          );

    const updatedData = filteredData.map((item: ICombinedDataType) => ({
      ...item,
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
  }, [combinedData, page, currency, isIncome, isExpense, isSelectedList]);

  const hasMore =
    displayedData.length === itemsPerPage &&
    displayedData.length < combinedData.length;

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <>
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
          base: "max-h-[750px] overflow-auto [&>div]:shadow-none [&>div]:pt-0 [&>div]:w-auto",
          table: "",
        }}
      >
        <TableHeader>
          <TableColumn key="type">Type</TableColumn>
          <TableColumn key="category">Category</TableColumn>
          <TableColumn key="frequency">Frequency</TableColumn>
          <TableColumn key="amount">Amount</TableColumn>
          <TableColumn key="paymentMethod">Payment Method</TableColumn>
          <TableColumn key="date">Date</TableColumn>
          <TableColumn key="createdAt">Created</TableColumn>
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
                      <p
                        className={`capitalize text-base text-quaternary ${
                          columnKey === "createdAt" ? "text-secondary-500" : ""
                        }`}
                      >
                        {columnKey === "amount"
                          ? handleFormatAmount(
                              Number(item.amount),
                              String(currency)
                            )
                          : item[columnKey]}
                      </p>
                      {columnKey === "action" && (
                        <div className="flex gap-2">
                          <div className="flex items-center justify-center">
                            <Tooltip content="Edit">
                              <button
                                onClick={() =>
                                  handleEdit(
                                    item.type ?? "",
                                    item as IEventExtendedProps
                                  )
                                }
                              >
                                <span className="text-success-300 text-lg hover:text-neutral-dark80">
                                  <FaEdit />
                                </span>
                              </button>
                            </Tooltip>
                          </div>
                          <div className="flex items-center justify-center">
                            <Tooltip content="Delete">
                              <button
                                onClick={() =>
                                  handleDelete(
                                    item.type ?? "",
                                    item as IEventExtendedProps
                                  )
                                }
                              >
                                <span className="text-danger-300 text-lg hover:text-neutral-dark80">
                                  <MdDelete />
                                </span>
                              </button>
                            </Tooltip>
                          </div>
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
      <GenericModal
        isGenericModal={isGenericModal}
        isModalOpen={isModalOpen}
        header={modalHeader}
        isUpdate={true}
        updateData={updateData}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
};

const Category = () => {
  const { shareContext } = useShareContextHooks();
  const { isSelectedList, setIsSelectedList } = shareContext;
  const [isIncome, setIsIncome] = useState(true);
  const [isExpense, setIsExpense] = useState(true);

  const handleCheckbox = (value: string) => {
    if (value === "income") {
      setIsIncome(!isIncome);
    } else if (value === "expense") {
      setIsExpense(!isExpense);
    }
    setIsSelectedList({ type: "", category: "" });
  };

  useEffect(() => {
    if (isSelectedList.type === "income") {
      setIsIncome(true);
      setIsExpense(false);
    } else if (isSelectedList.type === "expense") {
      setIsIncome(false);
      setIsExpense(true);
    }
  }, [isSelectedList]);
  return (
    <div className="custom-container flex flex-col gap-4">
      <h1 className="text-3xl font-bold text-primary">Categories</h1>
      <div className="card h-auto lg:min-h-[840px]">
        <h2 className="card-header">Category List</h2>
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <Checkbox
              isSelected={isIncome}
              onValueChange={(e) => handleCheckbox("income")}
            >
              Income
            </Checkbox>
            <Checkbox
              isSelected={isExpense}
              onValueChange={(e) => handleCheckbox("expense")}
            >
              Expense
            </Checkbox>
          </div>
          <div>
            {(!isIncome && !isExpense ? null : !isIncome || !isExpense) ? (
              <CategoryFilter isIncome={isIncome} isExpense={isExpense} />
            ) : null}
          </div>
        </div>

        <CategoryList isIncome={isIncome} isExpense={isExpense} />
      </div>
    </div>
  );
};
export default Category;
