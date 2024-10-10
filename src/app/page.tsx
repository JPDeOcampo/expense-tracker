"use client";
import { useContext } from "react";
import { ShareContext } from "@/components/layout/shared/context/share-state";
import Login from "@/components/layout/login";
import Register from "@/components/layout/register";

const App = () => {
  const { isCreateAccount } = useContext<any>(ShareContext);

  return (
    <div className="grid grid-cols-2 h-full w-full">
      <div className="bg-tertiary"></div>
      <div className="w-full h-full flex items-center justify-center bg-secondary-50">
        {!isCreateAccount ? <Login /> : <Register />}
      </div>
    </div>
  );
};

export default App;
