"use client";
import { useState } from "react";
import useShareContextHooks from "@/components/shared/hooks/context-hooks/share-state-hooks";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  DropdownSection,
} from "@nextui-org/react";
import GenericModal from "@/components/shared/components/generic-modal";
import useGlobalHooks from "@/components/shared/hooks/global-hooks";

const Header = () => {
  const { shareContext } = useShareContextHooks();
  const { user, setCurrency, currency } = shareContext;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { handleLogout } = useGlobalHooks();
  const [isGenericModal, setIsGenericModal] = useState<string>("");

  const firstName = (user as { firstName: string })?.firstName;
  const firstLetter = firstName?.charAt(0);
  const lastName = (user as { lastName: string })?.lastName;
  const email = (user as { email: string })?.email;
  const username = (user as { username: string })?.username;

  return (
    <>
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
                    {firstName} {lastName}
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
                <p className="font-bold">{email}</p>
              </DropdownItem>
              <DropdownItem
                key="settings"
                onClick={() => {
                  setIsGenericModal("My Profile");
                  setIsModalOpen(true);
                }}
              >
                My Profile
              </DropdownItem>
              <DropdownItem
                key="change-pass"
                color="warning"
                onClick={() => {
                  setIsGenericModal("Change Password");
                  setIsModalOpen(true);
                }}
              >
                Change Password
              </DropdownItem>
              <DropdownSection aria-label="Delete Account" showDivider>
                <DropdownItem
                  key="delete"
                  color="danger"
                  className="text-secondary"
                  onClick={() => {
                    setIsGenericModal("Delete Account");
                    setIsModalOpen(true);
                  }}
                >
                  Delete Account
                </DropdownItem>
              </DropdownSection>
              <DropdownSection aria-label="Configurations" showDivider>
                <DropdownItem
                  isReadOnly
                  key="currency"
                  className="cursor-default"
                  endContent={
                    <select
                      className="z-10 outline-none w-16 py-0.5 rounded-md text-tiny group-data-[hover=true]:border-default-500 border-small border-default-300 dark:border-default-200 bg-transparent text-default-500"
                      id="theme"
                      name="theme"
                      onChange={(e) => setCurrency(e.target.value)}
                    >
                      <option value="PHP">PHP</option>
                      <option value="USD">USD</option>
                    </select>
                  }
                >
                  Currency
                </DropdownItem>
                <DropdownItem
                  isReadOnly
                  key="theme"
                  className="cursor-default"
                  endContent={
                    <select
                      className="z-10 outline-none w-16 py-0.5 rounded-md text-tiny group-data-[hover=true]:border-default-500 border-small border-default-300 dark:border-default-200 bg-transparent text-default-500"
                      id="theme"
                      name="theme"
                    >
                      <option onClick={()=>{}}>Light</option>
                      <option>Dark</option>
                    </select>
                  }
                >
                  Theme
                </DropdownItem>
              </DropdownSection>
              <DropdownItem key="logout" color="danger" onClick={handleLogout}>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </header>
      <GenericModal
        isGenericModal={isGenericModal}
        header={isGenericModal}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
};

export default Header;
