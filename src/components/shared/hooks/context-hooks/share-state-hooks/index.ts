import { useContext } from "react";
import { ShareContext } from "../../../context/share-state";


const useShareContextHooks = () => {
  const shareContext = useContext(ShareContext);
  

  if (!shareContext) {
    throw new Error("ShareContext must be used within a ShareProvider");
  }
  
 

  return { shareContext };
};

export default useShareContextHooks;
