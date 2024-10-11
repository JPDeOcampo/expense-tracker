"use client";
import { useContext } from "react";
import { ShareContext } from "@/components/shared/context/share-state";
import Login from "@/components/layout/login";
import Register from "@/components/layout/register";

const App = () => {
  const { isCreateAccount } = useContext<any>(ShareContext);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-auto lg:h-lvh w-full">
      <div className="bg-primary"></div>
      <div className="w-full h-full flex items-center justify-center">
        {!isCreateAccount ? <Login /> : <Register />}
      </div>
    </div>
  );
};

export default App;
