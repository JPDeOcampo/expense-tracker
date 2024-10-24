"use client";
import { useState, FormEvent, useEffect } from "react";
import useShareContextHooks from "../../hooks/context-hooks/share-state-hooks";
import useGlobalContextHooks from "../../hooks/context-hooks/global-context-hooks";
import GroupField from "../group-field";
import { Tabs, Tab, Card, CardBody, Button } from "@nextui-org/react";
import { AddIncomeService } from "@/service/api/incomeServices/AddIncomeService";
import { AddExpenseService } from "@/service/api/expenseServices/AddExpenseService";
import { ICombinedDataType } from "@/components/interface/global-interface";
import useTotalHooks from "../../hooks/total-hooks";
import { ITransaction } from "@/components/interface/global-interface";
import { Spinner } from "@nextui-org/react";
import { IEventExtendedProps } from "@/components/interface/global-interface";
import { updateExpenseService } from "@/service/api/expenseServices/updateExpenseService";

interface FormProps {
  onTabs: string;
  handleCloseModal: () => void;
  isUpdate?: boolean;
  updateData?: IEventExtendedProps;
}

const Form = ({
  onTabs,
  handleCloseModal,
  isUpdate,
  updateData,
}: FormProps) => {
  const { shareContext } = useShareContextHooks();
  const {
    focusState,
    handleFocus,
    handleBlur,
    setIncomeData,
    setExpenseData,
    setOverAllIncomeData,
    setOverAllExpenseData,
    setCurrentBalance,
    incomeData,
    currentBalance,
    updateToast,
    setFormValues,
  } = shareContext;
  const { getTotalAmount } = useTotalHooks();
  const { globalContext } = useGlobalContextHooks();
  const { fetchIncome } = globalContext;

  const [loading, setLoading] = useState(false);

  const categories = {
    income: [
      { label: "Allowance", value: "allowance" },
      { label: "Salary", value: "salary" },
      { label: "Petty cash", value: "petty cash" },
      { label: "Bonus", value: "bonus" },
      { label: "Other", value: "other" },
    ],
    expense: [
      { label: "Food", value: "food" },
      { label: "Transport", value: "transport" },
      { label: "Social Life", value: "social life" },
      { label: "Culture", value: "culture" },
      { label: "Apparel", value: "apparel" },
      { label: "Beauty", value: "beauty" },
      { label: "Health", value: "health" },
      { label: "Education", value: "education" },
      { label: "Gift", value: "gift" },
      { label: "Other", value: "other" },
    ],
  };

  const paymentMethodItems = [
    { label: "Bank", value: "bank" },
    { label: "Cash", value: "cash" },
    { label: "Card", value: "card" },
  ];

  const frequencyItems = [
    { label: "Daily", value: "daily" },
    { label: "Weekly", value: "weekly" },
    { label: "Monthly", value: "monthly" },
    { label: "Other", value: "other" },
  ];

  const { _id, date, amount, paymentMethod, frequency, category, note } =
    updateData ?? {};

  useEffect(() => {
    if (isUpdate) {
      setFormValues((prev: Record<string, string>) => ({
        ...prev,
        date: date?.split("T")[0] ?? "",
        amount: (amount ?? "").toString(),
        category: category ?? "",
        frequency: frequency ?? "",
        paymentMethod: paymentMethod ?? "",
        note: note ?? "",
      }));
    }
  }, [updateData]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const { date, amount, category, frequency, paymentMethod, note } =
      event.currentTarget;

    const formData: ICombinedDataType = {
      date: date.value,
      amount: amount.value,
      note: note.value,
      frequency: frequency?.value ?? "",
      category: category?.value ?? "",
      paymentMethod: paymentMethod?.value ?? "",
      _id: isUpdate ? _id : "",
    };

    if (onTabs === "income") {
      formData.frequency = frequency.value;
      formData.category = category.value;
      formData.paymentMethod = paymentMethod.value;
    } else if (onTabs === "expense") {
      formData.category = category.value;
      formData.paymentMethod = paymentMethod.value;
    } else {
      formData.to = category.value;
      formData.from = paymentMethod.value;
    }

    try {
      if (onTabs === "income") {
        const response = await AddIncomeService(formData);

        if (response?.ok) {
          setIncomeData((prev: ICombinedDataType[]) => {
            const updatedData = [
              { ...formData, createdAt: new Date().toISOString() },
              ...prev,
            ];
            const newData = [{ ...formData }];
            // Calculate overall income and expense
            const overAllIncome = getTotalAmount(updatedData as ITransaction[]);
            const updateCurrentBalance = getTotalAmount(
              newData as ITransaction[]
            );

            // Store the updated data in sessionStorage
            sessionStorage.setItem("income", JSON.stringify(updatedData));

            // Update state with overall income and expense
            setOverAllIncomeData(overAllIncome);
            sessionStorage.setItem(
              "overAllIncome",
              JSON.stringify(overAllIncome)
            );

            const addNewBalance = (currentBalance ?? 0) + updateCurrentBalance;
            // Update state with current balance
            setCurrentBalance(addNewBalance);
            sessionStorage.setItem(
              "currentBalance",
              JSON.stringify(addNewBalance)
            );

            return updatedData;
          });
          setLoading(false);
          updateToast({
            isToast: "alert-success",
            toastId: "alert-success",
            position: "top-center",
            delay: 4000,
            className: "toast-success",
            message: "Successfully added!",
          });

          handleCloseModal();
        }
      } else if (onTabs === "expense") {
        const response = isUpdate
          ? await updateExpenseService(formData)
          : await AddExpenseService(formData);
        const data = await response?.json();
        if (!isUpdate) {
          fetchIncome();
        }
        if (response?.ok) {
          setExpenseData((prev: ICombinedDataType[]) => {
            const addNewData = [
              { ...formData, createdAt: new Date().toISOString() },
              ...prev,
            ];

            const updateData = prev.map((expense) => {
              if (expense._id === _id) {
                return {
                  ...expense,
                  ...formData,
                  updatedAt: new Date().toISOString(),
                };
              }
              return expense;
            });

            const updatedData = isUpdate ? updateData : addNewData;

            const overAllExpense = getTotalAmount(
              updatedData as ITransaction[]
            );
            sessionStorage.setItem("expense", JSON.stringify(updatedData));

            const overAllIncome = getTotalAmount(incomeData as ITransaction[]);
            const subtractExpense = overAllIncome - overAllExpense;

            setOverAllExpenseData(overAllExpense);
            sessionStorage.setItem(
              "overAllExpense",
              JSON.stringify(overAllExpense)
            );

            // Update state with current balance
            setCurrentBalance(subtractExpense);
            sessionStorage.setItem(
              "currentBalance",
              JSON.stringify(subtractExpense)
            );

            return updatedData;
          });
          setLoading(false);
          updateToast({
            isToast: "alert-success",
            toastId: "alert-success",
            position: "top-center",
            delay: 4000,
            className: "toast-success",
            message: data.message,
          });

          handleCloseModal();
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <GroupField
        label="Date"
        type="date"
        name="date"
        isFocused={focusState.date}
        handleFocus={handleFocus}
        handleBlur={handleBlur}
      />

      <GroupField
        label="Amount"
        name="amount"
        type="number"
        placeholder="0.00"
        isFocused={focusState.amount}
        handleFocus={handleFocus}
        handleBlur={handleBlur}
        isCustomNumber={true}
      />
      {(onTabs === "income" || onTabs === "expense") && (
        <GroupField
          label="Category"
          name="category"
          items={categories[onTabs]}
          isFocused={focusState.category}
          handleFocus={handleFocus}
          handleBlur={handleBlur}
          isAutoComplete={true}
          selectedItem={category}
        />
      )}
      {onTabs === "income" && (
        <GroupField
          label="Frequency"
          name="frequency"
          items={frequencyItems}
          isFocused={focusState.frequency}
          handleFocus={handleFocus}
          handleBlur={handleBlur}
          isAutoComplete={true}
          selectedItem={frequency}
        />
      )}
      {onTabs === "transfer" && (
        <>
          <GroupField
            label="To"
            type="text"
            name="to"
            isFocused={focusState.to}
            handleFocus={handleFocus}
            handleBlur={handleBlur}
          />
          <GroupField
            label="From"
            type="text"
            name="from"
            isFocused={focusState.from}
            handleFocus={handleFocus}
            handleBlur={handleBlur}
          />
        </>
      )}

      <GroupField
        label="Payment Method"
        type="text"
        name="paymentMethod"
        items={paymentMethodItems}
        isFocused={focusState.paymentMethod}
        handleFocus={handleFocus}
        handleBlur={handleBlur}
        isAutoComplete={true}
        selectedItem={paymentMethod}
      />
      <GroupField
        label="Note"
        type="text"
        name="note"
        isFocused={focusState.note}
        handleFocus={handleFocus}
        handleBlur={handleBlur}
      />
      <div className="w-full flex gap-3 mt-4 justify-end">
        <Button color="danger" variant="light" onClick={handleCloseModal}>
          Close
        </Button>
        <Button color="primary" type="submit">
          Save{" "}
          {loading && <Spinner className="button-spinner" color="default" />}
        </Button>
      </div>
    </form>
  );
};
const GenericTabs = ({
  handleCloseModal,
  isUpdate,
  updateData,
}: {
  handleCloseModal: () => void;
  isUpdate: boolean;
  updateData?: IEventExtendedProps;
}) => {
  const { shareContext } = useShareContextHooks();
  const { selectedTabs, setSelectedTabs } = shareContext;

  return (
    <div className="flex flex-col w-full">
      <Card className="w-full shadow-none">
        <CardBody className="overflow-hidden p-0">
          <Tabs
            fullWidth
            size="md"
            aria-label="Tabs form"
            selectedKey={selectedTabs}
            onSelectionChange={(newSelected) =>
              setSelectedTabs(newSelected as string)
            }
          >
            <Tab
              key="income"
              title="Income"
              isDisabled={isUpdate && selectedTabs !== "income"}
            >
              <Form
                handleCloseModal={handleCloseModal}
                onTabs={"income"}
                isUpdate={isUpdate}
                updateData={updateData}
              />
            </Tab>
            <Tab
              key="expense"
              title="Expense"
              isDisabled={isUpdate && selectedTabs !== "expense"}
            >
              <Form
                handleCloseModal={handleCloseModal}
                onTabs="expense"
                isUpdate={isUpdate}
                updateData={updateData}
              />
            </Tab>
            <Tab
              key="transfer"
              title="Transfer"
              isDisabled={isUpdate && selectedTabs !== "transfer"}
            >
              <Form
                handleCloseModal={handleCloseModal}
                onTabs="transfer"
                isUpdate={isUpdate}
                updateData={updateData}
              />
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
};

export default GenericTabs;
