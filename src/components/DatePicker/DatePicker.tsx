import { useTheme } from "@/theme";
import { DatePicker as DatePickerProps } from "@/types/datePicker";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";
import DateTimePicker from "react-native-ui-datepicker";
import {
    DateType,
} from "react-native-ui-datepicker/lib/typescript/src/types";
// import DateTimePicker, {
//   DateTimePickerEvent,
// } from "@react-native-community/datetimepicker";

const DatePicker = (props: DatePickerProps) => {
  const { open = false, onClose, onChange } = props;

  const [date, setDate] = useState(new Date(1598051730000));

  const { backgrounds } = useTheme();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    if (open) {
      bottomSheetModalRef.current?.present();
    }
  }, [open]);

  const _onChange = (
    param: { date: DateType }
  ) => {
    onChange?.("string");
  };
  const _handleClose = () => {
    onClose?.();
  };

  const _dismissBottomSheet = () => {
    bottomSheetModalRef.current?.dismiss();
  };

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={["50%"]}
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
        onDismiss={() => _handleClose()}
      >
        <View>
          <DateTimePicker mode="single" date={date} timePicker={true} onChange={(param) => _onChange(param)} />
        </View>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

export default DatePicker;
