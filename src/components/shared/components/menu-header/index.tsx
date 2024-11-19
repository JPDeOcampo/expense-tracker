import React from "react";
import Image from "next/image";
const MenuHeader = () => {
  return (
    <div className="lg:py-6 lg:px-4 w-full flex items-center gap-2">
      <div className="w-9 lg:w-10 h-9 lg:h-10 shrink-0 relative -top-[6px]">
        <Image
          src="/images/piggy-bank.svg"
          alt="piggy-bank"
          width={500}
          height={500}
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      <h1 className="text-neutral-light font-bold text-2xl md:text-3xl">
        <span className="text-tertiary-500">Ex</span>
        <span className="text-primary">Tracker</span>
      </h1>
    </div>
  );
};

export default MenuHeader;
