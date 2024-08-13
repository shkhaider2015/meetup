import React, { useState, useRef } from "react";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { useTheme } from "@/theme";
import { GlobalBottomSheetContext } from "@/context";

export const GlobalBottomSheetProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { backgrounds } = useTheme();
  const [content, setContent] = useState<React.ReactNode>(null);
  const [snapPoints, setSnapPoints] = useState<string[]>([]);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const openBottomSheet = (
    content: React.ReactNode,
    snapPoints: string[] = ["50%"]
  ) => {
    setContent(content);
    setSnapPoints(snapPoints);
    bottomSheetModalRef.current?.present();
  };

  const closeBottomSheet = () => {
    bottomSheetModalRef.current?.dismiss();
    setContent(null);
  };

  return (
    <GlobalBottomSheetContext.Provider
      value={{ openBottomSheet, closeBottomSheet }}
    >
      {children}
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          backdropComponent={(props) => (
            <BottomSheetBackdrop
              appearsOnIndex={0}
              disappearsOnIndex={-1}
              pressBehavior={"close"}
              {...props}
            />
          )}
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