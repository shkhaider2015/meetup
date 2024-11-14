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
import dayjs, { Dayjs } from "dayjs";
import { fontFamily } from "@/theme/_config";
import LimitTimePicker from "react-native-limit-timepicker";
import { ItemT } from "react-native-limit-timepicker/lib/typescript/src/wheel_scroll/ScrollPicker";
import { Button } from "../template";
import _ from "lodash";

const DatePicker = (props: DatePickerProps) => {
  const { open = false, type = "DATE", onCancel, onChange, onConfirm } = props;

  const [date, setDate] = useState(dayjs());
  const [time, setTime] = useState({
    hours: 0,
    minutes: 0,
    period: 'am'
  });
  const [snapPoints] = useState<string[]>(type === "TIME" ? ["40%"] : ["65%"]);

  const { backgrounds, fonts, colors, gutters, layout, variant } = useTheme();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    if (open) {
      bottomSheetModalRef.current?.present();
    }
  }, [open]);

  const _onChange = (param: { date: DateType }) => {
    onChange?.(dayjs(param.date).toDate());
    setDate(dayjs(param.date));
  };
  const _onChangeHours = (item: ItemT | undefined, index: number) => {
    if(!open) return
    let hours = Number(item?.toString())
    if(_.isNaN()) return;
    setTime(pS => ({
      ...pS,
      hours: hours
    }))
    // return
    
  };
  const _onChangeMinutes = (item: ItemT | undefined, index: number) => {
    if(!open) return
    let minutes = Number(item?.toString())
    if(_.isNaN()) return;
    setTime(pS => ({
      ...pS,
      minutes: minutes
    }))
    // return
    
  };
  const _onChangePeriod = (item: ItemT | undefined, index: number) => {
    if(!open) return
    let period = item?.toString()
    if(!period) return;
    setTime(pS => ({
      ...pS,
      period: period
    }))
  };

  const _onConfirm = () => {
    if(!open) return
    if(type === "TIME") {
      let today = dayjs().minute(time.minutes).second(0)
      if(time.period == "PM") {
        today = today.hour(time.hours + 12);
      } else {
        today = today.hour(time.hours);
      }
      onConfirm?.(today)
    } else {
      onConfirm?.(date);
    }
    _onCancel();
  };

  const _onCancel = () => {
    if(!open) return
    onCancel?.();
    _dismissBottomSheet();
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
          borderBottomColor: colors.gray100,
        }}
        onDismiss={() => _onCancel()}
        enableHandlePanningGesture={true}
        enableContentPanningGesture={false}
      >
        <View style={[{ height: "100%" }, backgrounds.gray00]}>
          <Text
            style={[
              fonts.size_16,
              fonts.gray800,
              fontFamily._500_Medium,
              fonts.alignCenter,
              type === "TIME"
                ? gutters.paddingVertical_14
                : gutters.paddingVertical_8,
            ]}
          >
            {type === "TIME" ? "Select Time" : "Select Date"}
          </Text>

          {type === "TIME" ? (
            <LimitTimePicker
              onChangeHour={_onChangeHours}
              onChangeMinute={_onChangeMinutes}
              onChangePeriod={_onChangePeriod}
              scrollHourStyle={{
                backgroundColor: colors.gray00
              }}
              time={new Date()}
              containerStyle={{
                paddingHorizontal: 40,
                backgroundColor: colors.gray00
              }}
              scrollPeriodStyle={{
                backgroundColor: 'red'
              }}
              hourTextStyle={{
                color: colors.gray200,
                backgroundColor: colors.gray00,
                width: '100%',
                height: '100%',
                textAlign: 'center'
              }}
              minuteTextStyle={{
                color: colors.gray200,
                backgroundColor: colors.gray00,
                width: '100%',
                height: '100%',
                textAlign: 'center'
              }}
              periodTextStyle={{
                color: colors.gray200,
                backgroundColor: colors.gray00,
                width: '100%',
                height: '100%',
                textAlign: 'center'
              }}
              activeHourTextStyle={{
                color: colors.primary,
                backgroundColor: colors.gray00,
                width: '100%',
                height: '100%',
                textAlign: 'center'
              }}
              activeMinuteTextStyle={{
                color: colors.primary,
                backgroundColor: colors.gray00,
                width: '100%',
                height: '100%',
                textAlign: 'center'
              }}
              activePeriodTextStyle={{
                color: colors.primary,
                backgroundColor: colors.gray00,
                width: '100%',
                height: '100%',
                textAlign: 'center'
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
                backgroundColor: variant === "dark" ? colors.gray100 : "#e9eef5",
                paddingTop: 15,
                paddingBottom: 15,
              }}
              weekDaysTextStyle={{
                ...fontFamily._600_SemiBold,
                ...fonts.size_16,
                ...fonts.gray800,
              }}
              headerTextStyle={{
                ...fontFamily._600_SemiBold,
                ...fonts.gray800
              }}
            />
          )}
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

const styles = StyleSheet.create({});

export default DatePicker;
