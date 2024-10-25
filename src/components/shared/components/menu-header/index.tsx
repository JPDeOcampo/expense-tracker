import React from "react";

const MenuHeader = () => {
  return (
    <div className="lg:py-6 lg:px-4 w-full flex items-center gap-2">
      <div className="w-9 lg:w-10 h-9 lg:h-10 shrink-0 relative -top-[2px]">
        <img src="/images/piggy-bank.svg" />
      </div>

      <h1 className="text-neutral-light font-bold text-2xl md:text-3xl">
        <span className="text-tertiary-500">Ex</span>
        <span className="text-primary">Tracker</span>
      </h1>
    </div>
  );
};

export default MenuHeader;
