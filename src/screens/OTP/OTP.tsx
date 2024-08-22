import {
  View,
  KeyboardAvoidingView,
  Text,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { InputField, SafeScreen } from "@/components/template";
import { useTheme } from "@/theme";
import { fontFamily, heights } from "@/theme/_config";
import { OtpInput } from "react-native-otp-entry";
import { useEffect, useState } from "react";
import { CounterProps, OTPScreenType, stateType } from "@/types/screens/otp";
import { useMutation } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { accountVarification } from "@/services/users/auth";
import { useLoader } from "@/hooks";

function OTP({ navigation }: OTPScreenType) {
  const { colors, variant, layout, gutters, fonts, components, backgrounds } =
    useTheme();

  const [state, setState] = useState<stateType>("IDLE");
  const { showLoader, hideLoader } = useLoader();

  const {isError, isPending, mutate} = useMutation({
	mutationFn: (code:string) => {
		return accountVarification(code)
	},
	onSuccess: () => {
		hideLoader()
		Toast.show({
			type: "success",
			text1: "Account varified successfully, You can now login"
		})
		setTimeout(() => {
			navigation.navigate("Login")
		}, 200)
	},
	onError: () => {
		hideLoader()
		setState("FINISH")
	}
  })

  useEffect(() => {
    setState("START");
  }, []);

  const _resend = () => {
	setState("START")
  };

  const _onSumit = (code:string) => {
	showLoader()
	mutate(code)
  };

  return (
    <SafeScreen>
      <KeyboardAvoidingView
        // style={[layout.flex_1]}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View
          style={[
            // layout.flex_1,
            gutters.paddingHorizontal_24,
            gutters.paddingTop_80,
            layout.itemsCenter,
          ]}
        >
          <View style={[gutters.paddingVertical_24, { width: "100%" }]}>
            <Text
              style={[
                fonts.size_32,
                fonts.gray800,
                fontFamily._700_Bold,
                fonts.alignCenter,
                { height: 100 },
              ]}
            >
              Verification Code
            </Text>
            <Text
              style={[
                fonts.size_16,
                fonts.gray400,
                fontFamily._400_Regular,
                gutters.marginTop_16,
              ]}
            >
              Verification code has been sent to{" "}
              <Text style={[fonts.primary, fontFamily._600_SemiBold]}>
                shkhaider2015@gmail.com
              </Text>
            </Text>
            <Text
              style={[fonts.size_16, fonts.gray800, fontFamily._600_SemiBold]}
            >
              Please enter 6 digits verification code!
            </Text>
          </View>
          <View>
            <OtpInput
              type="numeric"
              numberOfDigits={6}
              focusColor="green"
              autoFocus={true}
              focusStickBlinkingDuration={500}
              onFilled={_onSumit}
              textInputProps={{
                accessibilityLabel: "One-Time Password",
              }}
              theme={{
                pinCodeContainerStyle: {
                  backgroundColor: colors.gray00,
                  borderColor: colors.gray200,
                },
                pinCodeTextStyle: styles.pinCodeText,
                focusStickStyle: {
                  backgroundColor: colors.primary,
                },
                focusedPinCodeContainerStyle: {
                  borderColor: colors.primary,
                },
              }}
            />

            {/* Error Message */}
			{
				isError && <Text
				style={[
				  fonts.size_14,
				  fonts.error,
				  gutters.marginTop_10,
				  fonts.alignCenter,
				]}
			  >
				The code you entered is invalid or expired
			  </Text>
			}
            
          </View>
          <View style={[{ height: 80 }, layout.justifyEnd]}>
              {state === "FINISH" && (
            <View style={[layout.row, layout.itemsCenter, layout.justifyCenter, gutters.gap_4]}>
              <Text style={[fonts.alignCenter, fonts.gray500]}>
                {" "}
                Haven't received OTP yet?
              </Text>
                <TouchableOpacity onPress={_resend} style={[{marginTop: 3}]} >
                  <Text
                    style={[fontFamily._600_SemiBold, fonts.primary]}
                  >
                    Resend
                  </Text>
                </TouchableOpacity>
            </View>
              )}

            {state === "START" && (
              <Text
                style={[fonts.alignCenter, gutters.marginTop_6, fonts.gray500]}
              >
                You can resend OTP after{" "}
                <Counter state={state} setState={setState} /> second(s)
              </Text>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeScreen>
  );
}

const Counter = ({ state, setState }: CounterProps) => {
  const [counter, setCounter] = useState<number>(10);

  useEffect(() => {
    if (counter > 0) {
      const timer = setTimeout(() => {
        setCounter(counter - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }
    if (counter === 0) setState("FINISH");
  }, [counter]);
  33;
  return <Text>{counter > 0 ? counter : ""}</Text>;
};

const styles = StyleSheet.create({
  container: {},
  pinCodeContainer: {},
  pinCodeText: {},
  focusStick: {},
  activePinCodeContainer: {},
});

export default OTP;
