import { useContext } from "react";
import { ShareContext } from "../../context/share-state";
import { GlobalContext } from "../../context/global-provider";

const useContextHooks = () => {
  const shareContext = useContext(ShareContext);
  const globalContext = useContext(GlobalContext);

  if (!shareContext) {
    throw new Error("ShareContext must be used within a ShareProvider");
  }
  
  // if (!globalContext) {
  //   throw new Error("GlobalContext must be used within a GlobalProvider");
  // }

  return { shareContext, globalContext };
};

export default useContextHooks;
