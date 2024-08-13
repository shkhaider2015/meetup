import { useTheme } from "@/theme";
import { DatePicker as DatePickerProps } from "@/types/datePicker";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { useEffect, useRef, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import DateTimePicker from "react-native-ui-datepicker";
import { DateType } from "react-native-ui-datepicker/lib/typescript/src/types";
import dayjs from "dayjs";
import { fontFamily } from "@/theme/_config";
import LimitTimePicker from "react-native-limit-timepicker";
import { ItemT } from "react-native-limit-timepicker/lib/typescript/src/wheel_scroll/ScrollPicker";

const DatePicker = (props: DatePickerProps) => {
  const { open = false, type = "DATE", onClose, onChange } = props;

  const [date, setDate] = useState(dayjs());
  const [snapPoints] = useState<string[]>(type === "TIME" ? ['35%'] : ['55%'] );

  const { backgrounds, fonts, colors, gutters, layout } = useTheme();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    if (open) {
      bottomSheetModalRef.current?.present();
    }
  }, [open]);

  const _onChange = (param: { date: DateType }) => {
    onChange?.("string");
  };
  const _onChangeTime = (item: ItemT | undefined, index: number) => {};

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
        onDismiss={() => _handleClose()}
        enableHandlePanningGesture={true}
        enableContentPanningGesture={false}
      >
        <View style={{ height: "100%" }}>
          <Text
            style={[
              fonts.size_16,
              fonts.gray800,
              fontFamily._500_Medium,
              fonts.alignCenter,
              type === "TIME" ? gutters.paddingVertical_14 : gutters.paddingVertical_8,
            ]}
          >
            {type === "TIME" ? "Select Time" : "Select Date"}
          </Text>

          {type === "TIME" ? (
            <LimitTimePicker
              customMinutesData={[0, 15, 30, 45]}
              onChangeHour={_onChangeTime}
              onChangeMinute={_onChangeTime}
              onChangePeriod={_onChangeTime}
              time={new Date()}
              containerStyle={{
                paddingHorizontal: 40,
              }}
              hourTextStyle={{
                color: colors.gray200,
              }}
              minuteTextStyle={{
                color: colors.gray200,
              }}
              periodTextStyle={{
                color: colors.gray200,
              }}
              activeHourTextStyle={{
                color: colors.primary,
              }}
              activeMinuteTextStyle={{
                color: colors.primary,
              }}
              activePeriodTextStyle={{
                color: colors.primary,
              }}
              itemHeight={50}
              wrapperHeight={150}
            />
          ) : (
            <DateTimePicker
              mode="single"
              date={date}
              timePicker={false}
              onChange={(param) => _onChange(param)}
              displayFullDays={true}
              calendarTextStyle={{
                ...fonts.gray300,
                ...fonts.size_16,
                ...fontFamily._400_Regular,
              }}
              selectedTextStyle={{ ...fonts.gray00, ...fontFamily._500_Medium }}
              selectedItemColor={colors.primary}
              headerContainerStyle={{ ...gutters.paddingVertical_10 }}
              weekDaysContainerStyle={{
                backgroundColor: "#e9eef5",
                paddingTop: 15,
                paddingBottom: 15,
              }}
              weekDaysTextStyle={{
                ...fontFamily._600_SemiBold,
                ...fonts.size_16,
                ...fonts.gray800,
              }}
            />
          )}
        </View>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({});

export default DatePicker;
