import { useContext } from "react";
import { ShareContext } from "../../context/share-state";

const useShareContext = () => {
  const context = useContext(ShareContext);
  if (!context) {
    throw new Error("ShareContext must be used within a ShareProvider");
  }
  return context;
};

export default useShareContext;