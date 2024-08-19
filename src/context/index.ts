import { GlobalBottomSheetContextType } from "@/types/bottomSheet";
import { LoaderContextProps } from "@/types/loader";
import { createContext } from "react";

export const GlobalBottomSheetContext = createContext<
  GlobalBottomSheetContextType | undefined
>(undefined);

export const LoaderContext = createContext<LoaderContextProps>({
  isLoading: false,
  showLoader: () => {},
  hideLoader: () => {},
});
