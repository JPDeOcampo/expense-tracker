"use client";
import useContextHooks from "@/components/shared/hooks/context-hooks";
import Login from "@/components/layout/login";
import Register from "@/components/layout/register";

const App = () => {
  const { shareContext } = useContextHooks();
  const { isCreateAccount } = shareContext;

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
