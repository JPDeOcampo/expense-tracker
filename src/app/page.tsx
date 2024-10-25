"use client";
import useShareContextHooks from "@/components/shared/hooks/context-hooks/share-state-hooks";
import Login from "@/components/layout/login";
import Register from "@/components/layout/register";

const App = () => {
  const { shareContext } = useShareContextHooks();
  const { isCreateAccount } = shareContext;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-auto lg:h-lvh w-full">
      <div className="bg-primary w-full h-full flex flex-col items-center justify-center gap-6 p-6">
        <div className="w-56 h-56">
          <img src="/images/graph-people.svg" />
        </div>
        <div>
          <h1 className="text-neutral-light font-bold text-3xl xs:text-4xl lg:text-5xl">
            <span className="text-tertiary">Expense</span> Tracker
          </h1>
        </div>
      </div>
      <div className="w-full h-full flex items-center justify-center p-6">
        {!isCreateAccount ? <Login /> : <Register />}
      </div>
    </div>
  );
};

export default App;
