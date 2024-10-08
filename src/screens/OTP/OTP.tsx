import {
  View,
  KeyboardAvoidingView,
  Text,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Button, InputField, SafeScreen } from '@/components/template';
import { useTheme } from '@/theme';
import { fontFamily, heights } from '@/theme/_config';
import { OtpInput } from 'react-native-otp-entry';
import { useEffect, useState } from 'react';
import { CounterProps, OTPScreenType, stateType } from '@/types/screens/otp';
import { useMutation } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import {
  accountVarification,
  forgetPasswordOTP,
  resendCode,
} from '@/services/users/auth';
import { useLoader } from '@/hooks';
import _ from 'lodash';

function OTP({ navigation, route }: OTPScreenType) {
  const { id: user_id, email, type } = route.params;
  const screenHiegt = Dimensions.get('screen').height - heights.bottomTabBarHeight
  const { colors, variant, layout, gutters, fonts, components, backgrounds } =
    useTheme();

  const [state, setState] = useState<stateType>('IDLE');
  const [error, setError] = useState<string>();
  const [code, setCode] = useState<string>('');
  const { showLoader, hideLoader } = useLoader();

  // APIs
  const { isPending, mutate } = useMutation({
    mutationFn: (code: string) => {
      return accountVarification(user_id, code);
    },
    onSuccess: () => {
      hideLoader();
      Toast.show({
        type: 'success',
        text1: 'Account varified successfully, You can now login',
      });
      setTimeout(() => {
        navigation.navigate('Login');
      }, 1000);
    },
    onError: (error) => {
      hideLoader();
      setState('FINISH');
      setError(error.message || 'something wrong happened');
    },
  });

  const { isPending: resendIsPending, mutate: resendMutate } = useMutation({
    mutationFn: (type:"FORGET_PASSWORD" | "ACTIVATE_ACCOUNT") => {
      return resendCode(user_id, type);
    },
    onSuccess: () => {
      hideLoader();
      setState('START');
      Toast.show({
        type: 'success',
        text1: 'Resend activation code sent successfully',
        text2: 'Please check your inbox for more details',
      });
    },
    onError: (error) => {
      hideLoader();
      setState('FINISH');
      setError(error.message || 'something wrong happened');
    },
  });

  const { isPending:fp_Peding, mutate:fp_Mutation } = useMutation({
    mutationFn: (code: string) => {
      return forgetPasswordOTP(user_id, code);
    },
    onSuccess: () => {
      hideLoader();
      setTimeout(() => {
        navigation.navigate("ForgetPasswordChange", {
          user_id
        });
      }, 300);
    },
    onError: (error) => {
      hideLoader();
      setState('FINISH');
      setError(error.message || 'something wrong happened');
    },
  });

  useEffect(() => {
    if (!_.isEmpty(user_id) && !_.isEmpty(email)) {
      setState('START');
    }
  }, [user_id, email]);

  const _resend = () => {
    setError(undefined);
  showLoader();
    if(type === "FORGOT_PASSWORD") {
      resendMutate("FORGET_PASSWORD");
    } else {
      resendMutate("ACTIVATE_ACCOUNT");
    }

  };

  const _onSumit = () => {
    if (_.isEmpty(code)) {
      setError('Enter Code');
      return;
    }
    if(type === "FORGOT_PASSWORD") {
      fp_Mutation(code)
      return
    }
    setError(undefined);
    showLoader();
    mutate(code);
  };

  return (
    <SafeScreen>
      <ScrollView style={{
        minHeight: screenHiegt
      }} >
        <View
          style={[
            // layout.flex_1,
            gutters.paddingHorizontal_24,
            gutters.paddingTop_80,
            layout.itemsCenter,
          ]}
        >
          <View style={[gutters.paddingVertical_24, { width: '100%' }]}>
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
              Verification code has been sent to{' '}
              <Text style={[fonts.primary, fontFamily._600_SemiBold]}>
                {email}
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
              // onTextChange={val => setCode(val)}
              onFilled={(val) => setCode(val)}
              textInputProps={{
                accessibilityLabel: 'One-Time Password',
              }}
              theme={{
                pinCodeContainerStyle: {
                  backgroundColor: colors.gray00,
                  borderColor: colors.gray200,
                },
                pinCodeTextStyle: {
                  color: colors.gray800
                },
                focusStickStyle: {
                  backgroundColor: colors.primary,
                },
                focusedPinCodeContainerStyle: {
                  borderColor: colors.primary,
                },
                filledPinCodeContainerStyle: {
                  backgroundColor: colors.primary04
                }
              }}
              disabled={isPending || resendIsPending}
            />

            {/* Error Message */}
            {!_.isEmpty(error) && (
              <Text
                style={[
                  fonts.size_14,
                  fonts.error,
                  gutters.marginTop_10,
                  fonts.alignCenter,
                ]}
              >
                {error || 'The code you entered is invalid or expired'}
              </Text>
            )}
          </View>
          <View style={[{ height: 80 }, layout.justifyEnd]}>
            {state === 'FINISH' && (
              <View
                style={[
                  layout.row,
                  layout.itemsCenter,
                  layout.justifyCenter,
                  gutters.gap_4,
                ]}
              >
                <Text style={[fonts.alignCenter, fonts.gray500]}>
                  {' '}
                  Haven't received OTP yet?
                </Text>
                <TouchableOpacity
                  disabled={isPending || resendIsPending}
                  onPress={_resend}
                  style={[{ marginTop: 3 }]}
                >
                  <Text style={[fontFamily._600_SemiBold, fonts.primary]}>
                    Resend
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {state === 'START' && (
              <Text
                style={[fonts.alignCenter, gutters.marginTop_6, fonts.gray500]}
              >
                You can resend OTP after{' '}
                <Counter state={state} setState={setState} /> second(s)
              </Text>
            )}
          </View>

          <Button
            type="PRIMARY"
            label="Activate"
            disabled={_.isEmpty(code)}
            containerStyle={[gutters.marginTop_40, { width: '90%' }]}
            onPress={_onSumit}
          />
        </View>
      </ScrollView>
    </SafeScreen>
  );
}

const Counter = ({ state, setState }: CounterProps) => {
  const [counter, setCounter] = useState<number>(180);

  useEffect(() => {
    if (counter > 0) {
      const timer = setTimeout(() => {
        setCounter(counter - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }
    if (counter === 0) setState('FINISH');
  }, [counter]);
  33;
  return <Text>{counter > 0 ? counter : ''}</Text>;
};

const styles = StyleSheet.create({
  container: {},
  pinCodeContainer: {},
  pinCodeText: {
  },
  focusStick: {},
  activePinCodeContainer: {},
});

export default OTP;
