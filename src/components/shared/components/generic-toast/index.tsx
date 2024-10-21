import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";
import { IToastTypes } from "@/components/interface/global-interface";

const GenericToast = ({ isToast, message }: IToastTypes) => {
  const handleToastClose = () => {
    toast.dismiss();
  };

  return (
    <>
      {isToast === "default" ? (
        <div className="border-l-4 border-red-500 bg-neutral-light p-4">
          <p className="text-base text-quaternary">{message}</p>
        </div>
      ) : isToast === "alert-success" ? (
        <>
          <div className="flex items-center gap-4">
            <div>
              <FaCheckCircle />
            </div>
            <div className="flex items-center justify-between w-full gap-4">
              <p className="text-p2 text-neutral-light">{message}</p>
              <button
                onClick={() => handleToastClose()}
                className="bg-transparent border-0 text-xl hover:text-primary-50"
              >
                <IoClose className="fill-neutral-light hover:fill-neutral-light80" />
              </button>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default GenericToast;
