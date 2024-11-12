"use client";
import { useRef, useEffect } from "react";
import useShareContextHooks from "@/components/shared/hooks/context-hooks/share-state-hooks";
import { MdOutlineDashboard, MdOutlineCategory } from "react-icons/md";
import { useRouter, usePathname } from "next/navigation";
import { IoCalendarOutline } from "react-icons/io5";
import { MouseEvent } from "react";
import MenuHeader from "@/components/shared/components/menu-header";
import useGlobalHooks from "@/components/shared/hooks/global-hooks";
import Image from "next/image";

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
  const { shareContext } = useShareContextHooks();
  const { setIsMenuDrawer, isMenuDrawer } = shareContext;
  const { handleMenuClick } = useGlobalHooks();

  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: Event) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      const target = event.target as Element;
      if (!target.closest(".menu-drawer")) {
        setIsMenuDrawer(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1024) {
        setIsMenuDrawer(false);
      }
    };

    if (isMenuDrawer) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.body.classList.remove("overflow-hidden");
    };
  }, [isMenuDrawer]);

  return (
    <>
      {isMenuDrawer && (
        <div
          className={`h-full w-full bg-[#33333380] fixed z-20 block inset-0`}
        ></div>
      )}
      <div
        className={`${
          isMenuDrawer ? "w-[240px]" : "w-0"
        } z-40 lg:min-w-[150px] lg:w-[240px] h-full bg-neutral-light fixed inset-0 transition-all duration-300`}
        ref={menuRef}
      >
        <div
          className={`${
            isMenuDrawer ? "flex" : "hidden"
          } lg:flex flex-col gap-4 h-full transition-all`}
        >
          <div className="flex items-center gap-3 lg:gap-0 py-5 px-4 lg:p-0">
            <div className="w-full">
              <MenuHeader />
            </div>
            <div className="lg:hidden flex items-center">
              {/* <Hamburger
                isMenuDrawer={isMenuDrawer}
                handleClick={handleMenuClick}
              /> */}
              <button
                onClick={handleMenuClick}
                className="w-6 h-6 cursor-pointer"
              >
                <Image
                  src="/images/icons/arrow-left.svg"
                  alt="arrow-left"
                  width={500}
                  height={500}
                  style={{ width: "100%", height: "100%" }}
                />
              </button>
            </div>
          </div>
          <div className="flex flex-col">
            <MenuItem
              icon={<MdOutlineDashboard />}
              name="Dashboard"
              route="/pages/dashboard"
            />
            <MenuItem
              icon={<IoCalendarOutline />}
              name="Calendar"
              route="/pages/calendar"
            />
            <MenuItem
              icon={<MdOutlineCategory />}
              name="Category"
              route="/pages/category"
            />
            {/* <MenuItem icon={<MdOutlineCategory />} name="Export" route="ex" /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuDrawer;
