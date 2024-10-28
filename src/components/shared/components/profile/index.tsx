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
import { Currency } from "lucide-react";

const Profile = () => {
  const { shareContext } = useShareContextHooks();
  const {
    user,
    setCurrency,
    currency,
    isGenericModal,
    setIsGenericModal,
    modalHeader,
    setModalHeader,
  } = shareContext;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { handleLogout } = useGlobalHooks();
  const firstName = (user as { firstName: string })?.firstName;
  const firstLetter = firstName?.charAt(0);
  const lastName = (user as { lastName: string })?.lastName;
  const email = (user as { email: string })?.email;
  const username = (user as { username: string })?.username;

  return (
    <>
      <div className="flex items-center gap-4">
        <Dropdown placement="bottom-start">
          <DropdownTrigger className="cursor-pointer">
            <div className="flex gap-3 items-center">
              <Avatar
                isBordered
                className="bg-primary text-xl text-neutral-light capitalize font-medium cursor-pointer"
                name={firstLetter}
              />
              <div className="hidden lg:flex md:flex-col">
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
              <p className="font-bold truncate w-[200px]">{email}</p>
            </DropdownItem>
            <DropdownItem
              key="settings"
              onClick={() => {
                setIsGenericModal("my-profile");
                setIsModalOpen(true);
                setModalHeader("My Profile");
              }}
            >
              My Profile
            </DropdownItem>
            <DropdownItem
              key="change-pass"
              color="warning"
              onClick={() => {
                setIsGenericModal("change-password");
                setIsModalOpen(true);
                setModalHeader("Change Password");
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
                  setIsGenericModal("delete-account");
                  setIsModalOpen(true);
                  setModalHeader("Delete Account");
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
                   id="currency"
                    name="currency"
                    onChange={(e) => setCurrency(e.target.value)}
                    defaultValue={currency ?? ""}
                  >
                    <option value="PHP">PHP</option>
                    <option value="USD" selected>USD</option>
                    <option value="EUR">EUR</option>
                    <option value="JPY">JPY</option>
                    <option value="GBP">GBP</option>
                    <option value="AUD">AUD</option>
                    <option value="CAD">CAD</option>
                    <option value="CHF">CHF</option>
                    <option value="CNY">CNY</option>
                    <option value="SEK">SEK</option>
                    <option value="NZD">NZD</option>
                    <option value="MXN">MXN</option>
                    <option value="SGD">SGD</option>
                    <option value="HKD">HKD</option>
                    <option value="NOK">NOK</option>
                    <option value="KRW">KRW</option>
                    <option value="RUB">RUB</option>
                    <option value="INR">INR</option>
                    <option value="BRL">BRL</option>
                    <option value="ZAR">ZAR</option>
                    <option value="TRY">TRY</option>
                  </select>
                }
              >
                Currency
              </DropdownItem>
              {/* <DropdownItem
                isReadOnly
                key="theme"
                className="cursor-default"
                endContent={
                  <select
                    className="z-10 outline-none w-16 py-0.5 rounded-md text-tiny group-data-[hover=true]:border-default-500 border-small border-default-300 dark:border-default-200 bg-transparent text-default-500"
                    id="theme"
                    name="theme"
                  >
                    <option onClick={() => {}}>Light</option>
                    <option>Dark</option>
                  </select>
                }
              >
                Theme
              </DropdownItem> */}
            </DropdownSection>
            <DropdownItem key="logout" color="danger" onClick={handleLogout}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <div className="hidden">
        <GenericModal
          isGenericModal={isGenericModal}
          header={modalHeader}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      </div>
    </>
  );
};

export default Profile;
