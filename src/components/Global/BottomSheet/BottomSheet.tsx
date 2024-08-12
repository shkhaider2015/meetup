import React, { createContext, useContext, useState, useRef } from "react";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { useTheme } from "@/theme";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";

type GlobalBottomSheetContextType = {
  openBottomSheet: (content: React.ReactNode, snapPoints?: string[]) => void;
  closeBottomSheet: () => void;
};

const GlobalBottomSheetContext = createContext<
  GlobalBottomSheetContextType | undefined
>(undefined);

export const GlobalBottomSheetProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { backgrounds } = useTheme();
  const [content, setContent] = useState<React.ReactNode>(null);
  const [snapPoints, setSnapPoints] = useState<string[]>([])
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const openBottomSheet = (content: React.ReactNode, snapPoints:string[]=['50%']) => {
    setContent(content);
    setSnapPoints(snapPoints)
    setIsVisible(true)
    bottomSheetModalRef.current?.present();
  };

  const closeBottomSheet = () => {
    setIsVisible(false)
    bottomSheetModalRef.current?.dismiss();
    setContent(null);
  };

  return (
    <GlobalBottomSheetContext.Provider
      value={{ openBottomSheet, closeBottomSheet }}
    >
      {/* {isVisible && <TouchableWithoutFeedback>
          <View style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1
          }} />
        </TouchableWithoutFeedback>
      } */}
      {children}
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          backdropComponent={(props) => <BottomSheetBackdrop {...props} />}
          handleStyle={{
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            borderBottomWidth: 1,
            borderBottomColor: backgrounds.gray100.backgroundColor,
          }}
        >
          {content}
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </GlobalBottomSheetContext.Provider>
  );
};

export const useGlobalBottomSheet = (): GlobalBottomSheetContextType => {
  const context = useContext(GlobalBottomSheetContext);
  if (!context) {
    throw new Error(
      "useGlobalBottomSheet must be used within a GlobalBottomSheetProvider"
    );
  }
  return context;
};
