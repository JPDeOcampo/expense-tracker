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
import { updatePasswordService } from "@/service/api/updatePassword";
import {
  FocusStateType,
  IUserTypes,
  IEventExtendedProps,
} from "@/components/interface/global-interface";
import { deleteAccountService } from "@/service/api/deleteAccountService";
import { deleteExpenseService } from "@/service/api/expenseServices/deleteExpenseService";
import useGlobalContextHooks from "../../hooks/context-hooks/global-context-hooks";
import { deleteIncomeService } from "@/service/api/incomeServices/deleteIncomeService";

interface IPropTypes {
  isGenericModal?: string | null;
  isModalOpen?: boolean;
  header?: string | null;
  setIsModalOpen?: Dispatch<SetStateAction<boolean>>;
  isUpdate?: boolean;
  updateData?: IEventExtendedProps;
  handleCloseModal?: () => void;
}

const MyProfile = ({ handleCloseModal }: { handleCloseModal: () => void }) => {
  const { shareContext } = useShareContextHooks();
  const {
    setFocusState,
    updateToast,
    user,
    setUser,
    setFormValues,
    formValues,
  } = shareContext;

  const [loading, setLoading] = useState<boolean>(false);

  const { handleResetFormValues, handleResetErrorFocus } = useGlobalHooks();

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

    const validateEmail =
      formValues.email !== email
        ? (formData.get("email") as string)
        : undefined;

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
        updateToast({
          isToast: "alert-error",
          toastId: "alert-error",
          position: "top-center",
          delay: 4000,
          className: "toast-error",
          message: response?.message,
        });
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
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <GenericForm
        isProfileUpdate={true}
        isFirstNameReq={true}
        isLastNameReq={true}
        isEmailReq={true}
      />
      <div className="w-full flex gap-3 mt-4 justify-end">
        <Button color="danger" variant="light" onClick={handleCloseModal}>
          Cancel
        </Button>
        {hasChange ? (
          <Button color="primary" type="submit">
            Save{" "}
            {loading && <Spinner className="button-spinner" color="default" />}
          </Button>
        ) : (
          <Button color="primary" type="submit" isDisabled>
            Save{" "}
            {loading && <Spinner className="button-spinner" color="default" />}
          </Button>
        )}
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
  const { updateToast, setFocusState } = shareContext;

  const [loading, setLoading] = useState<boolean>(false);

  const { handleResetFormValues, handleResetErrorFocus } = useGlobalHooks();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    handleResetErrorFocus();

    const formData = new FormData(event.currentTarget);

    const data: IUserTypes = {
      oldPassword: formData.get("password") as string,
      newPassword: formData.get("newPassword") as string,
      reEnterPassword: formData.get("reEnterPassword") as string,
    };

    try {
      const response = await updatePasswordService(data);

      if (response?.invalidPassword) {
        setFocusState((prev: FocusStateType) => ({
          ...prev,
          errorOldPassword: true,
        }));
        updateToast({
          isToast: "alert-error",
          toastId: "alert-error",
          position: "top-center",
          delay: 4000,
          className: "toast-error",
          message: response?.message,
        });
      } else if (response?.invalidMatchPassword) {
        setFocusState((prev: FocusStateType) => ({
          ...prev,
          errorReEnterPassword: true,
        }));
        updateToast({
          isToast: "alert-error",
          toastId: "alert-error",
          position: "top-center",
          delay: 4000,
          className: "toast-error",
          message: response?.message,
        });
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
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <GenericForm
        isProfileUpdate={true}
        isChangePass={true}
        isPasswordReq={true}
        isReEnterReq={true}
      />
      <div className="w-full flex gap-3 mt-4 justify-end">
        <Button color="danger" variant="light" onClick={handleCloseModal}>
          Cancel
        </Button>
        <Button color="primary" type="submit">
          Save{" "}
          {loading && <Spinner className="button-spinner" color="default" />}
        </Button>
      </div>
    </form>
  );
};

const DeleteAccount = ({
  handleCloseModal,
}: {
  handleCloseModal: () => void;
}) => {
  const { shareContext } = useShareContextHooks();
  const { updateToast, setFocusState } = shareContext;

  const [loading, setLoading] = useState<boolean>(false);

  const { handleResetFormValues, handleResetErrorFocus, handleLogout } =
    useGlobalHooks();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    handleResetErrorFocus();

    const formData = new FormData(event.currentTarget);

    const data: IUserTypes = {
      password: formData.get("password") as string,
      reEnterPassword: formData.get("reEnterPassword") as string,
    };

    try {
      const response = await deleteAccountService(data);

      if (response?.invalidPassword) {
        setFocusState((prev: FocusStateType) => ({
          ...prev,
          errorPassword: true,
        }));
        updateToast({
          isToast: "alert-error",
          toastId: "alert-error",
          position: "top-center",
          delay: 4000,
          className: "toast-error",
          message: response?.message,
        });
      } else if (response?.invalidMatchPassword) {
        setFocusState((prev: FocusStateType) => ({
          ...prev,
          errorReEnterPassword: true,
        }));
        updateToast({
          isToast: "alert-error",
          toastId: "alert-error",
          position: "top-center",
          delay: 4000,
          className: "toast-error",
          message: response?.message,
        });
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
        handleLogout();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <p className="text-base text-quaternary mb-2">
        Please enter your password to delete this account.
      </p>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <GenericForm
          isDeleteAccount={true}
          isPasswordReq={true}
          isReEnterReq={true}
        />
        <div className="w-full flex gap-3 mt-4 justify-end">
          <Button color="danger" variant="light" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button color="primary" type="submit">
            Delete{" "}
            {loading && <Spinner className="button-spinner" color="default" />}
          </Button>
        </div>
      </form>
    </>
  );
};

const DeleteModal = ({ handleCloseModal, updateData }: IPropTypes) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { shareContext } = useShareContextHooks();
  const { updateToast, user } = shareContext;
  const { globalContext } = useGlobalContextHooks();
  const { fetchIncome } = globalContext;
  const keysToDisplay = [
    "type",
    "date",
    "amount",
    "category",
    "to",
    "from",
    "frequency",
    "paymentMethod",
    "note",
  ];
  const keyIndexMap = keysToDisplay.reduce(
    (acc: { [key: string]: number }, key, index) => {
      acc[key] = index;
      return acc;
    },
    {}
  );
  const handleDelete = async (id: string | undefined) => {
    if (!id) return;
    setLoading(true);
    try {
      const response =
        updateData?.type === "income"
          ? await deleteIncomeService(id)
          : await deleteExpenseService(id);
      const data = await response?.json();
      if (response?.ok) {
        setLoading(false);
        fetchIncome((user as { _id: string })._id);
        updateToast({
          isToast: "alert-success",
          toastId: "alert-success",
          position: "top-center",
          delay: 4000,
          className: "toast-success",
          message: data.message,
        });
        handleCloseModal?.();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col gap-4">
      <p className="text-base text-quaternary">
        Are you sure you want to delete the item below?
      </p>
      <ul className="bg-secondary p-4 rounded-md h-50 overflow-y-auto">
        {updateData &&
          Object.entries(updateData)
            .filter(([key]) => keysToDisplay.includes(key))
            .sort(([keyA], [keyB]) => keyIndexMap[keyA] - keyIndexMap[keyB])
            .map(([key, value], i) => {
              return (
                <li key={i}>
                  <span className="capitalize text-sm font-semibold text-quaternary">
                    {key}:
                  </span>
                  <span className="capitalize text-sm text-quaternary">
                    {" "}
                    {value}{" "}
                  </span>
                </li>
              );
            })}
      </ul>
      <div className="w-full flex gap-3 mt-4 justify-end">
        <Button color="danger" variant="light" onClick={handleCloseModal}>
          Close
        </Button>
        <Button
          color="primary"
          type="submit"
          onClick={() => handleDelete(updateData?._id)}
        >
          Delete{" "}
          {loading && <Spinner className="button-spinner" color="default" />}
        </Button>
      </div>
    </div>
  );
};
const GenericModal = ({
  isGenericModal,
  isModalOpen,
  header,
  isUpdate,
  updateData,
  setIsModalOpen,
}: IPropTypes) => {
  const { handleResetFormValues, handleResetErrorFocus } = useGlobalHooks();

  const handleCloseModal = () => {
    setIsModalOpen?.(false);
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
        scrollBehavior={"inside"}
        className="pr-3 py-4"
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {header}
              </ModalHeader>
              <ModalBody className="pr-3">
                {isGenericModal === "add-item" ? (
                  <GenericTabs
                    handleCloseModal={handleCloseModal}
                    isUpdate={isUpdate ?? false}
                    updateData={updateData}
                  />
                ) : isGenericModal === "my-profile" ? (
                  <MyProfile handleCloseModal={handleCloseModal} />
                ) : isGenericModal === "change-password" ? (
                  <ChangePassword handleCloseModal={handleCloseModal} />
                ) : isGenericModal === "delete-account" ? (
                  <DeleteAccount handleCloseModal={handleCloseModal} />
                ) : isGenericModal === "delete-item" ? (
                  <DeleteModal
                    handleCloseModal={handleCloseModal}
                    updateData={updateData}
                  />
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
