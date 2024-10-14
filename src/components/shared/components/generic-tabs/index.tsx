"use client";
import { useState, useContext } from "react";
import { ShareContext } from "../../context/share-state";
import GroupField from "../group-field";
import {
  Autocomplete,
  AutocompleteItem,
  Tabs,
  Tab,
  Input,
  Card,
  CardBody,
  Button,
} from "@nextui-org/react";

import { AddIncomeService } from "@/service/api/incomeServices/AddIncomeService";

const Form = ({ onTabs, handleCloseModal }: any) => {
  const { focusState, handleFocus, handleBlur } = useContext<any>(ShareContext);
  const category = [
    { label: "Allowance", value: "allowance" },
    { label: "Salary", value: "salary" },
    { label: "Petty cash", value: "Petty cash" },
    { label: "Bonus", value: "bonus" },
    { label: "Other", value: "Other" },
  ];
  const paymentMethod = [
    { label: "Bank", value: "bank" },
    { label: "Cash", value: "cash" },
  ];
  const frequency = [
    { label: "Daily", value: "daily" },
    { label: "Weekly", value: "weekly" },
    { label: "Monthly", value: "monthly" },
    { label: "Other", value: "other" },
  ];
  const handleSubmitIncome = async (event: any) => {
    event.preventDefault();

    const formData = {
      date: event.target.date.value,
      amount: event.target.amount.value,
      category: event.target.category.value,
      frequency: event.target.frequency.value,
      paymentMethod: event.target.paymentMethod.value,
      note: event.target.note.value,
    };
    console.log(formData)

    try {
      const response = await AddIncomeService(formData);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
    console.log("Form Data:", formData);
  };
  console.log(onTabs)
  return (
    <form className="flex flex-col gap-4" onSubmit={onTabs === 'income'? handleSubmitIncome : onTabs === 'expense' ? handleSubmitIncome : handleSubmitIncome}>
      <GroupField
        label="Date"
        type="date"
        name="date"
        isFocused={focusState.date}
        handleFocus={handleFocus}
        handleBlur={handleBlur}
      />
      <div className="group-input">
        <label className="text-base text-quaternary">Amount</label>
        <Input
          type="number"
          name="amount"
          placeholder="0.00"
          className={`custom-input-number rounded-md ${
            focusState.amount
              ? "border border-quaternary"
              : "border border-secondary"
          }`}
          onFocus={() => handleFocus("amount")}
          onBlur={() => handleBlur("amount")}
          startContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small">$</span>
            </div>
          }
        />
      </div>
      <div className="group-input">
        <label className="text-base text-quaternary">Category</label>
        <Autocomplete
          className={`custom-auto-complete rounded-md ${
            focusState.category
              ? "border border-quaternary"
              : "border border-secondary"
          }`}
          name="category"
          onFocus={() => handleFocus("category")}
          onBlur={() => handleBlur("category")}
        >
          {category.map((item) => (
            <AutocompleteItem key={item.value} value={item.value}>
              {item.label}
            </AutocompleteItem>
          ))}
        </Autocomplete>
      </div>
      <div className="group-input">
        <label className="text-base text-quaternary">Frequency</label>
        <Autocomplete
          className={`custom-auto-complete rounded-md ${
            focusState.frequency
              ? "border border-quaternary"
              : "border border-secondary"
          }`}
          name="frequency"
          onFocus={() => handleFocus("frequency")}
          onBlur={() => handleBlur("frequency")}
        >
          {frequency.map((item) => (
            <AutocompleteItem key={item.value} value={item.value}>
              {item.label}
            </AutocompleteItem>
          ))}
        </Autocomplete>
      </div>
      <div className="group-input">
        <label className="text-base text-quaternary">Payment Method</label>
        <Autocomplete
          className={`custom-auto-complete rounded-md ${
            focusState.paymentMethod
              ? "border border-quaternary"
              : "border border-secondary"
          }`}
          name="paymentMethod"
          onFocus={() => handleFocus("paymentMethod")}
          onBlur={() => handleBlur("paymentMethod")}
        >
          {paymentMethod.map((item) => (
            <AutocompleteItem key={item.value} value={item.value}>
              {item.label}
            </AutocompleteItem>
          ))}
        </Autocomplete>
      </div>

      <GroupField
        label="Note"
        type="text"
        name="note"
        isFocused={focusState.note}
        handleFocus={handleFocus}
        handleBlur={handleBlur}
      />
      <div className="w-full flex gap-3">
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
  const [selected, setSelected] = useState<any>("expense");

  return (
    <div className="flex flex-col w-full">
      <Card className="w-full shadow-none">
        <CardBody className="overflow-hidden p-0">
          <Tabs
            fullWidth
            size="md"
            aria-label="Tabs form"
            selectedKey={selected}
            onSelectionChange={setSelected}
          >
            <Tab key="income" title="Income">
              <Form handleCloseModal={handleCloseModal} onTabs="income"/>
            </Tab>
            <Tab key="expense" title="Expense">
              <Form handleCloseModal={handleCloseModal} onTabs="expense"/>
            </Tab>
            <Tab key="transfer" title="Transfer">
              <Form handleCloseModal={handleCloseModal} onTabs="transfer"/>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
};

export default GenericTabs;
