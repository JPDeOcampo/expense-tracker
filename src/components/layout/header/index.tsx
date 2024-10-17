"use client";
import { useContext } from "react";
import { ShareContext } from "@/components/shared/context/share-state";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import { logoutService } from "@/service/api/logoutService";
import { useRouter } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";

const Header = () => {
  const router = useRouter();

  const { user } = useContext<any>(ShareContext);

  const handleLogout = async () => {
    try {
      const response = await logoutService();
      if (response?.ok) {
        router.push("/");
        sessionStorage.clear();
      }
    } catch (error) {
      console.error(error);
    }
  };
  const firstLetter = user?.firstName?.charAt(0);
  return (
    <header className="w-full flex justify-end pr-14 py-6 bg-secondary-50">
      <Popover placement="bottom-end" showArrow={true}>
        <PopoverTrigger>
          <button className="bg-primary rounded-full w-10 h-10 flex items-center justify-center overflow-hidden">
            <p className="text-xl text-neutral-light capitalize font-medium">
              {firstLetter}
            </p>
          </button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="px-1 py-2">
            <div className="text-base">
              <button
                className="text-base text-tertiary"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </header>
  );
};

export default Header;
