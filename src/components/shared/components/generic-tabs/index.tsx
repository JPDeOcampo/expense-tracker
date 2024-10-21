"use client";
import { useState, FormEvent } from "react";
import useShareContextHooks from "../../hooks/context-hooks/share-state-hooks";
import GroupField from "../group-field";
import { Tabs, Tab, Card, CardBody, Button } from "@nextui-org/react";
import { AddIncomeService } from "@/service/api/incomeServices/AddIncomeService";
import { AddExpenseService } from "@/service/api/expenseServices/AddExpenseService";
import { ICombinedDataType } from "@/components/interface/global-interface";

interface FormProps {
  onTabs: string;
  handleCloseModal: () => void;
}

const Form = ({ onTabs, handleCloseModal }: FormProps) => {
  const { shareContext } = useShareContextHooks();
  const { focusState, handleFocus, handleBlur, setIncomeData, setExpenseData } =
    shareContext;

  const categories = {
    income: [
      { label: "Allowance", value: "allowance" },
      { label: "Salary", value: "salary" },
      { label: "Petty cash", value: "petty_cash" },
      { label: "Bonus", value: "bonus" },
      { label: "Other", value: "other" },
    ],
    expense: [
      { label: "Food", value: "food" },
      { label: "Transport", value: "transport" },
      { label: "Social Life", value: "social_life" },
      { label: "Culture", value: "culture" },
      { label: "Apparel", value: "apparel" },
      { label: "Beauty", value: "beauty" },
      { label: "Health", value: "health" },
      { label: "Education", value: "education" },
      { label: "Gift", value: "gift" },
      { label: "Other", value: "other" },
    ],
  };

  const paymentMethod = [
    { label: "Bank", value: "bank" },
    { label: "Cash", value: "cash" },
    { label: "Card", value: "card" },
  ];

  const frequency = [
    { label: "Daily", value: "daily" },
    { label: "Weekly", value: "weekly" },
    { label: "Monthly", value: "monthly" },
    { label: "Other", value: "other" },
  ];

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { date, amount, category, frequency, paymentMethod, note } =
      event.currentTarget;

    const formData: ICombinedDataType = {
      date: date.value,
      amount: amount.value,
      note: note.value,
      frequency: frequency?.value ?? "",
      category: category?.value ?? "",
      paymentMethod: paymentMethod?.value ?? "",
      userId: "",
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
            sessionStorage.setItem("income", JSON.stringify(updatedData));
            return updatedData;
          });
        }
      } else if (onTabs === "expense") {
        const response = await AddExpenseService(formData);
        if (response?.ok) {
          setExpenseData((prev: ICombinedDataType[]) => {
            const updatedData = [
              { ...formData, createdAt: new Date().toISOString() },
              ...prev,
            ];
            sessionStorage.setItem("expense", JSON.stringify(updatedData));
            return updatedData;
          });
        }
      }
    } catch (error) {
      console.error(error);
    }
    console.log("Form Data:", formData);
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
        />
      )}
      {onTabs === "income" && (
        <GroupField
          label="Frequency"
          name="frequency"
          items={frequency}
          isFocused={focusState.frequency}
          handleFocus={handleFocus}
          handleBlur={handleBlur}
          isAutoComplete={true}
        />
      )}

      <GroupField
        label="Payment Method"
        type="text"
        name="paymentMethod"
        items={paymentMethod}
        isFocused={focusState.paymentMethod}
        handleFocus={handleFocus}
        handleBlur={handleBlur}
        isAutoComplete={true}
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
        <Button color="primary" onClick={handleCloseModal} type="submit">
          Save
        </Button>
      </div>
    </form>
  );
};
const GenericTabs = ({
  handleCloseModal,
}: {
  handleCloseModal: () => void;
}) => {
  const [selected, setSelected] = useState<string>("expense");

  return (
    <div className="flex flex-col w-full">
      <Card className="w-full shadow-none">
        <CardBody className="overflow-hidden p-0">
          <Tabs
            fullWidth
            size="md"
            aria-label="Tabs form"
            selectedKey={selected}
            onSelectionChange={(newSelected) =>
              setSelected(newSelected as string)
            }
          >
            <Tab key="income" title="Income">
              <Form handleCloseModal={handleCloseModal} onTabs="income" />
            </Tab>
            <Tab key="expense" title="Expense">
              <Form handleCloseModal={handleCloseModal} onTabs="expense" />
            </Tab>
            <Tab key="transfer" title="Transfer">
              <Form handleCloseModal={handleCloseModal} onTabs="transfer" />
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
};

export default GenericTabs;
