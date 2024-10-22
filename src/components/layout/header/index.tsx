"use client";
import useShareContextHooks from "@/components/shared/hooks/context-hooks/share-state-hooks";
import { logoutService } from "@/service/api/logoutService";
import { useRouter } from "next/navigation";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from "@nextui-org/react";

const Header = () => {
  const router = useRouter();
  const { shareContext } = useShareContextHooks();
  const { user } = shareContext;

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
  
  const firstLetter = (user as { firstName: string })?.firstName?.charAt(0);
  const email = (user as { email: string })?.email;
  const username = (user as { username: string })?.username;

  return (
    <header className="w-full flex justify-end pr-14 py-6 bg-secondary-50">
      <div className="flex items-center gap-4">
        <Dropdown placement="bottom-start">
          <DropdownTrigger className="cursor-pointer">
            <div className="flex gap-3 items-center">
              <Avatar
                isBordered
                className="bg-primary text-xl text-neutral-light capitalize font-medium cursor-pointer"
                name={firstLetter}
              />
              <div className="flex flex-col">
                <p className="text-base font-semibold text-neutral-dark">
                  {email}
                </p>
                <p className="text-sm font-medium text-quaternary relative -top-1">
                  @{username}
                </p>
              </div>
            </div>
          </DropdownTrigger>
          <DropdownMenu aria-label="User Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-bold">Signed in as</p>
              <p className="font-bold">@{username}</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="logout" color="danger" onClick={handleLogout}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </header>
  );
};

export default Header;
