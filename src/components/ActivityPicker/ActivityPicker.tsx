import {
  Cat_Fitness,
  Cat_Mountain_Climb,
  Cat_Others,
  Cat_Reading,
  Cat_Shopping,
  Cat_Skateboarding,
  Cat_Sports,
} from "@/assets/icon";
import { useTheme } from "@/theme";
import { fontFamily } from "@/theme/_config";
import { ActivityPickerProps } from "@/types/activityPicker";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { useEffect, useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SvgProps } from "react-native-svg";
import { Button } from "../template";

const ActivityPicker = (props: ActivityPickerProps) => {
  const { open, onClose, onConfirm } = props;

  const [snapPoints] = useState<string[]>(["50%"]);
  const [dummyCat, setDummyCat] = useState(dummyCategories);

  const { backgrounds, fonts, colors, gutters, layout } = useTheme();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    if (open) {
      bottomSheetModalRef.current?.present();
    }
  }, [open]);

  const _onPress = (id: string) => {
    setDummyCat((pS) =>
      pS.map((item) =>
        item.id === id ? { ...item, isSelected: !item.isSelected } : {...item, isSelected: false}
      )
    );
  };

  const _onCancel = () => {
    if (!open) return;
    onClose?.();
    _dismissBottomSheet();
  };

  const _dismissBottomSheet = () => {
    bottomSheetModalRef.current?.dismiss();
  };

  const _onConfirm = () => {
    const selected = dummyCat.find(item => item.isSelected)
    onConfirm?.(selected?.label, selected?.Icon)
    _onCancel();
  }

  return (
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
          borderBottomColor: colors.gray100,
        }}
        onDismiss={() => _onCancel()}
        enableHandlePanningGesture={true}
        enableContentPanningGesture={false}
      >
        <View>
          <Text
            style={[
              fonts.alignCenter,
              fontFamily._500_Medium,
              fonts.size_16,
              fonts.gray800,
              gutters.paddingVertical_12,
            ]}
          >
            Add Activity
          </Text>
          <View
            style={[
              layout.row,
              layout.wrap,
              layout.justifyCenter,
              gutters.paddingVertical_24,
              { columnGap: 16, rowGap: 36 },
            ]}
          >
            {dummyCat.map(({ Icon, ...item }) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  layout.col,
                  layout.itemsCenter,
                  gutters.gap_6,
                  { width: "30%" },
                ]}
                onPress={() => _onPress(item.id)}
              >
                {
                  <Icon
                    color={
                      item.isSelected
                        ? backgrounds.primary.backgroundColor
                        : backgrounds.gray300.backgroundColor
                    }
                  />
                }
                <Text style={[fonts.gray300]}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View
            style={[
              layout.row,
              layout.justifyBetween,
              layout.itemsCenter,
              gutters.paddingHorizontal_10,
            ]}
          >
            <Button
              label="Cancel"
              type="SECONDARY"
              onPress={_onCancel}
              containerStyle={[{ width: "45%", height: 50 }]}
            />
            <Button
              label="Confirm"
              type="PRIMARY"
              onPress={_onConfirm}
              containerStyle={[{ width: "45%", height: 50 }]}
            />
          </View>
        </View>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

const dummyCategories: {
  id: string;
  label: string;
  Icon: React.FC<SvgProps>;
  isSelected: boolean;
}[] = [
  {
    id: "171",
    label: "Shopping",
    Icon: Cat_Shopping,
    isSelected: false,
  },
  {
    id: "172",
    label: "Reading",
    Icon: Cat_Reading,
    isSelected: false,
  },
  {
    id: "173",
    label: "Fitness",
    Icon: Cat_Fitness,
    isSelected: false,
  },
  {
    id: "174",
    label: "Sports",
    Icon: Cat_Sports,
    isSelected: false,
  },
  {
    id: "175",
    label: "Skateboarding",
    Icon: Cat_Skateboarding,
    isSelected: false,
  },
  {
    id: "176",
    label: "Mountain Climb",
    Icon: Cat_Mountain_Climb,
    isSelected: false,
  },
  {
    id: "177",
    label: "Others",
    Icon: Cat_Others,
    isSelected: false,
  },
];

export default ActivityPicker;