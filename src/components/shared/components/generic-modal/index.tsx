"use client";
import { useState, FormEvent, useEffect } from "react";
import useShareContextHooks from "@/components/shared/hooks/context-hooks/share-state-hooks";
import { Dispatch, SetStateAction } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
} from "@nextui-org/react";
import GenericTabs from "../generic-tabs";
import { Spinner } from "@nextui-org/react";
import useGlobalHooks from "@/components/shared/hooks/global-hooks";
import GenericForm from "../generic-form";
import { updateProfileService } from "@/service/api/updateProfileService";
import { FocusStateType } from "@/components/interface/global-interface";
import { IUserTypes } from "@/components/interface/global-interface";
interface IPropTypes {
  isGenericModal: string;
  isModalOpen: boolean;
  header: string;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

const MyProfile = ({ handleCloseModal }: { handleCloseModal: () => void }) => {
  const { shareContext } = useShareContextHooks();
  const {
    isError,
    setFocusState,
    updateToast,
    user,
    setUser,
    setFormValues,
    formValues,
  } = shareContext;

  const [loading, setLoading] = useState<boolean>(false);

  const { handleResetFormValues, handleResetErrorFocus, handleSetError } =
    useGlobalHooks();

  const firstName = (user as { firstName: string })?.firstName;
  const lastName = (user as { lastName: string })?.lastName;
  const email = (user as { email: string })?.email;
  const username = (user as { username: string })?.username;

  useEffect(() => {
    setFormValues((prev: Record<string, string>) => ({
      ...prev,
      firstName: firstName,
      lastName: lastName,
      email: email,
      username: username,
    }));
  }, []);

  const hasChange =
    formValues.firstName !== firstName ||
    formValues.lastName !== lastName ||
    formValues.email !== email ||
    formValues.username !== username;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    handleResetErrorFocus();

    const formData = new FormData(event.currentTarget);

    const validateEmail = formValues.email !== email ? formData.get("email") as string : undefined;
    
    const data: IUserTypes = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      username: formData.get("username") as string,
    };
    
    if (validateEmail) {
      data.email = validateEmail;
    }

    try {
      const response = await updateProfileService(data);

      if (response?.invalidEmail) {
        setFocusState((prev: FocusStateType) => ({
          ...prev,
          errorEmailRegister: true,
        }));
        handleSetError("email-error", response?.message);
      } else {
        handleCloseModal();
        handleResetFormValues();
        updateToast({
          isToast: "alert-success",
          toastId: "alert-success",
          position: "top-center",
          delay: 4000,
          className: "toast-success",
          message: "Successfully updated!",
        });
        setUser((prev: IUserTypes[]) => {
          const updatedData = { ...prev, ...data };
          sessionStorage.setItem("user", JSON.stringify(updatedData));
          console.log(updatedData);
          return updatedData;
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="flex flex-col gap-4 py-4" onSubmit={handleSubmit}>
      <GenericForm isProfileUpdate={true} />
      <div className="w-full flex gap-3 mt-4 justify-end">
        <Button color="danger" variant="light" onClick={handleCloseModal}>
          Close
        </Button>
        <Button color="primary" type="submit" disabled={hasChange}>
          Save{" "}
          {loading && <Spinner className="button-spinner" color="default" />}
        </Button>
      </div>
    </form>
  );
};

const ChangePassword = ({
  handleCloseModal,
}: {
  handleCloseModal: () => void;
}) => {
  const { shareContext } = useShareContextHooks();
  const { isError, updateToast, user, setFormValues } = shareContext;

  const [loading, setLoading] = useState<boolean>(false);

  const { handleResetFormValues, handleResetErrorFocus, handleSetError } =
    useGlobalHooks();

  const handleSubmit = () => {};
  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <GenericForm isProfileUpdate={true} isChangePass={true} />
      <div className="w-full flex gap-3 mt-4 justify-end">
        <Button color="danger" variant="light" onClick={handleCloseModal}>
          Close
        </Button>
        <Button color="primary" type="submit">
          Save{" "}
          {loading && <Spinner className="button-spinner" color="default" />}
        </Button>
      </div>
    </form>
  );
};

const GenericModal = ({
  isGenericModal,
  isModalOpen,
  header,
  setIsModalOpen,
}: IPropTypes) => {
  const { handleResetFormValues, handleResetErrorFocus, handleSetError } =
    useGlobalHooks();

  const handleCloseModal = () => {
    setIsModalOpen(false);
    handleResetFormValues();
    handleResetErrorFocus();
  };
  return (
    <div className="flex flex-col gap-2">
      <Modal
        isOpen={isModalOpen}
        placement={"center"}
        onOpenChange={() => handleCloseModal()}
        aria-modal="true"
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {header}
              </ModalHeader>
              <ModalBody>
                {isGenericModal === "add-item" ? (
                  <GenericTabs handleCloseModal={handleCloseModal} />
                ) : isGenericModal === "My Profile" ? (
                  <MyProfile handleCloseModal={handleCloseModal} />
                ) : isGenericModal === "Change Password" ? (
                  <ChangePassword handleCloseModal={handleCloseModal} />
                ) : null}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default GenericModal;
