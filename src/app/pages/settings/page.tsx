"use client";
import { useContext } from "react";
import { ShareContext } from "@/components/shared/context/share-state";

const Calendar = () => {
  const { combinedData } = useContext(ShareContext) ?? { combinedData: [] }; 


  return (
    <div className="custom-container flex flex-col gap-4">
      <h1 className="text-3xl font-bold text-primary">Settings</h1>
      <div className="bg-neutral-light p-4 rounded-md">
     
      </div>
    </div>
  );
};
export default Calendar;
