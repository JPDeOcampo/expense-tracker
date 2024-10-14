import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import { logoutService } from "@/service/api/logoutService";
import { useRouter } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";

const Header = () => {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      const response = await logoutService();
      if (response?.ok) {
        router.push("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="w-full flex justify-end pr-14 py-6 bg-secondary-50">
      <Popover placement="bottom-end" showArrow={true}>
        <PopoverTrigger>
          <button className="text-3xl">
            <FaUserCircle />
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
