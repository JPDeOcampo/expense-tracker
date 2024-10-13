"use client";
import { useState } from "react";
import Header from "../header";
import BalanceSpent from "@/components/shared/components/charts/balance-spent";
import GenericModal from "@/components/shared/components/generic-modal";

const Overview = () => {
  const overviewItems = [
    { title: "Total Overall balance", icon: "" },
    { title: "Loan", icon: "" },
    { title: "Investment", icon: "" },
  ];
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  return (
    <div className="card flex flex-col gap-4">
      <div className="w-full flex justify-between">
        <h2 className="card-header">Overview</h2>
        <button className="" onClick={() => setIsModalOpen(true)}>
          Add
        </button>
      </div>
      <ul>
        {overviewItems.map((item, index) => {
          return (
            <li key={index} className="my-2">
              <span className="text-base text-quaternary font-medium">
                {item.title}
              </span>
            </li>
          );
        })}
      </ul>
      <div className="w-full grid grid-cols-2 gap-2">
        <div className="flex flex-col gap-4 p-4 bg-tertiary rounded-md">
          <p className="text-base font-medium text-quaternary">Total Spent</p>
          <p className="text-base font-medium text-primary">140,00</p>
        </div>
        <div className="flex flex-col gap-4 p-4 bg-tertiary rounded-md">
          <p className="text-base font-medium text-quaternary">
            Current Balance
          </p>
          <p className="text-base font-medium text-primary">140,00</p>
        </div>
      </div>
      <GenericModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  );
};
const DashboardContent = () => {
  return (
    <div className="flex flex-col w-full h-full py-6 px-14 gap-4">
      <div className="flex flex-col gap-6">
        <div className="w-full flex justify-end">
          <Header />
        </div>
        <h1 className="text-3xl font-bold text-primary">Dashboard</h1>
      </div>
      <div className="flex flex-col gap-6">
        <div className="w-full h-full grid grid-cols-1 lg:grid-cols-[30%_1fr] gap-6">
          <Overview />
          <BalanceSpent />
        </div>
        <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card">
            <div></div>
          </div>
          <BalanceSpent />
        </div>
        <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card">
            <div></div>
          </div>
          <BalanceSpent />
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
