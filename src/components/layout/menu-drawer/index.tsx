"use client";
import ValidateContainer from "@/components/shared/components/validate-container";
import { MdOutlineDashboard, MdOutlineCategory } from "react-icons/md";
import { useRouter, usePathname } from "next/navigation";

const MenuItem = ({ icon, name, route }: any) => {
  const router = useRouter();
  const pathname = usePathname();
  const handleMenuLink = ({ e, route }: any) => {
    e.preventDefault();
    router.push(route);
  };
  console.log(route === pathname, route, pathname)
  return (
    <a
      className={`flex gap-2 items-center py-2 px-4 font-semibold cursor-pointer ${
        route === pathname
          ? "border-l-5 border-tertiary-500 bg-primary-500 text-neutral-light"
          : "hover:text-primary"
      }`}
      onClick={(e) => handleMenuLink({ e, route })}
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
            icon={<MdOutlineCategory />}
            name="Categories"
            route="cat"
          />
          <MenuItem icon="" name="Export" route="ex" />
        </div>
      </div>
    </ValidateContainer>
  );
};

export default MenuDrawer;
