import { useContext } from "react";
import { GlobalContext } from "@/components/shared/context/global-provider";

const useGlobalContextHooks = () => {
  const globalContext = useContext(GlobalContext);

  if (!globalContext) {
    throw new Error("GlobalContext must be used within a GlobalProvider");
  }

  return { globalContext };
};

export default useGlobalContextHooks;
