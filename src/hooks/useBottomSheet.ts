import { GlobalBottomSheetContext } from "@/context";
import { GlobalBottomSheetContextType } from "@/types/bottomSheet";
import { useContext } from "react";

export const useGlobalBottomSheet = (): GlobalBottomSheetContextType => {
    const context = useContext(GlobalBottomSheetContext);
    if (!context) {
      throw new Error(
        "useGlobalBottomSheet must be used within a GlobalBottomSheetProvider"
      );
    }
    return context;
  };