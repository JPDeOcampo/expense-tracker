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
import { Spinner } from "@nextui-org/react";
import { IEventExtendedProps } from "@/components/interface/global-interface";
import { updateExpenseService } from "@/service/api/expenseServices/updateExpenseService";
import { updateIncomeService } from "@/service/api/incomeServices/updateIncomeService";
import { categories, paymentMethodItems, frequencyItems } from "../../constant";
import useGlobalHooks from "../../hooks/global-hooks";
import { FocusStateType } from "@/components/interface/global-interface";

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
    updateToast,
    setFormValues,
    user,
    setFocusState,
  } = shareContext;

  const { globalContext } = useGlobalContextHooks();
  const { handleLogout, handleResetErrorFocus } = useGlobalHooks();
  const { fetchIncome } = globalContext;

  const [loading, setLoading] = useState(false);

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
    handleResetErrorFocus();
    setFormValues((prev: Record<string, string>) => ({
      ...prev,
      category: "",
    }));
  }, [updateData, onTabs]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { date, amount, category, frequency, paymentMethod, note } =
      event.currentTarget;

    if (amount.value === "") {
      setFocusState((prev: FocusStateType) => ({
        ...prev,
        errorAmount: true,
      }));
      return;
    } else if (category.value === "") {
      setFocusState((prev: FocusStateType) => ({
        ...prev,
        errorCategory: true,
      }));
      return;
    } else if (frequency?.value === "" && onTabs !== "expense") {
      setFocusState((prev: FocusStateType) => ({
        ...prev,
        errorFrequency: true,
      }));
      return;
    } else if (paymentMethod.value === "") {
      setFocusState((prev: FocusStateType) => ({
        ...prev,
        errorPaymentMethod: true,
      }));
      return;
    }

    setLoading(true);
    const formData: ICombinedDataType = {
      userId: (user as { _id: string })._id,
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
        const response = isUpdate
          ? await updateIncomeService(formData)
          : await AddIncomeService(formData);

        const data = await response?.json();

        if (!isUpdate) {
          fetchIncome((user as { _id: string })._id);
        }
        if (data.invalidToken) {
          updateToast({
            isToast: "alert-error",
            toastId: "alert-error",
            position: "top-center",
            delay: 4000,
            className: "toast-error",
            message: data.message,
          });
          setTimeout(() => {
            handleLogout();
          }, 3000);
          return;
        }
        if (response?.ok) {
          if (isUpdate) {
            fetchIncome((user as { _id: string })._id);
          } else {
            setIncomeData((prev: ICombinedDataType[]) => {
              const updatedData = [
                { ...formData, createdAt: new Date().toISOString() },
                ...prev,
              ];

              // Store the updated data in sessionStorage
              sessionStorage.setItem("income", JSON.stringify(updatedData));

              return updatedData;
            });
          }
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
      } else if (onTabs === "expense") {
        const response = isUpdate
          ? await updateExpenseService(formData)
          : await AddExpenseService(formData);
        const data = await response?.json();
        if (!isUpdate) {
          fetchIncome((user as { _id: string })._id);
        }
        if (data.invalidToken) {
          updateToast({
            isToast: "alert-error",
            toastId: "alert-error",
            position: "top-center",
            delay: 4000,
            className: "toast-error",
            message: data.message,
          });
          setTimeout(() => {
            handleLogout();
          }, 3000);
          return;
        }
        if (response?.ok) {
          setExpenseData((prev: ICombinedDataType[]) => {
            const addNewData = [{ ...formData }, ...prev];

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

            sessionStorage.setItem("expense", JSON.stringify(updatedData));

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
        isRequired={true}
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
        isRequired={true}
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
          isRequired={true}
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
          isRequired={true}
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
            isRequired={true}
          />
          <GroupField
            label="From"
            type="text"
            name="from"
            isFocused={focusState.from}
            handleFocus={handleFocus}
            handleBlur={handleBlur}
            isRequired={true}
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
        isRequired={true}
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
          Cancel
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
              className="pb-0"
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
              className="pb-0"
            >
              <Form
                handleCloseModal={handleCloseModal}
                onTabs="expense"
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
