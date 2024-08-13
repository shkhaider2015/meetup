export type GlobalBottomSheetContextType = {
    openBottomSheet: (content: React.ReactNode, snapPoints?: string[]) => void;
    closeBottomSheet: () => void;
  };