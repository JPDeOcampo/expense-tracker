"use client";
import ValidateContainer from "@/components/shared/components/validate-container";
import { MdOutlineDashboard, MdOutlineCategory } from "react-icons/md";
import { useRouter, usePathname } from "next/navigation";
import { IoIosSettings } from "react-icons/io";
import { MouseEvent } from 'react';


interface MenuItemProps {
    icon: JSX.Element; // Adjust if your icon is a string or a specific component
    name: string;
    route: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, name, route }) => {
    const router = useRouter();
    const pathname = usePathname();

    const handleMenuLink = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        router.push(route);
    };

  return (
    <a
      className={`flex gap-2 items-center py-2 font-semibold cursor-pointer ${
        route === pathname
          ? "border-l-5 border-tertiary-500 bg-primary text-neutral-light pl-3 pr-4"
          : "hover:text-primary px-4"
      }`}
      onClick={handleMenuLink}
    >
      <span className="text-xl">{icon}</span>
      <span className="text-base">{name}</span>
    </a>
  );
};

const MenuDrawer = () => {
  return (
    <ValidateContainer>
      <div
        className={`w-[12%] h-full bg-neutral-light flex flex-col gap-4 fixed inset-0`}
      >
        <div className="py-6 px-4">
          <h1>XTracker</h1>
        </div>
        <div className="flex flex-col">
          <MenuItem
            icon={<MdOutlineDashboard />}
            name="Dashboard"
            route="/pages/dashboard"
          />
          <MenuItem
            icon={<MdOutlineCategory />}
            name="Calendar"
            route="/pages/calendar"
          />
          <MenuItem
            icon={<IoIosSettings />}
            name="Settings"
            route="/pages/settings"
          />
          {/* <MenuItem icon={<MdOutlineCategory />} name="Export" route="ex" /> */}
        </div>
      </div>
    </ValidateContainer>
  );
};

export default MenuDrawer;
