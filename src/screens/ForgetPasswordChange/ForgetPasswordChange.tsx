import { Button, InputField } from '@/components/template';
import { useTheme } from '@/theme';
import { fontFamily } from '@/theme/_config';
import { RootStackParamList } from '@/types/navigation';
import { forgetPasswordChangeSchema } from '@/types/schemas/user';
import { useFormik } from 'formik';
import { useRef } from 'react';
import { Keyboard, SafeAreaView, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';

const ForgetPasswordChangeScreen = ({ navigation }:ForgetPasswordChangeScreenType) => {
  const { layout, gutters, fonts, colors } = useTheme();

 const confirmPasswordRef = useRef<TextInput>(null);

  const formik = useFormik<{ newPassword: string, confirmNewPassword: string }>({
    initialValues: {
      newPassword:  '',
      confirmNewPassword:  ''
    },
    validationSchema: forgetPasswordChangeSchema,
    onSubmit: (values) => {
      console.log(values);
      navigation.navigate("ForgetPasswordComplete");
    },
  });

  const _handleNext = (nextRef: React.RefObject<TextInput>) => {
    nextRef.current?.focus();
  };

  return (
    <SafeAreaView>
      <View style={[gutters.paddingHorizontal_24, gutters.paddingVertical_32]}>
        <Text style={[fonts.gray800, fontFamily._600_SemiBold, fonts.size_32]}>
        Create New Password
        </Text>

        <Text style={[fonts.gray400, fonts.size_16, { lineHeight: 28 }]}>
        Your new password must be unique from those previously used.
        </Text>

        <View style={[gutters.marginTop_40]}>
              <InputField
                placeholder="New Password"
                inputType="PASSWORD"
                onChangeText={formik.handleChange("newPassword")}
                onBlur={formik.handleBlur("newPassword")}
                value={formik.values.newPassword}
                onSubmitEditing={() => _handleNext(confirmPasswordRef)}
                returnKeyType="next"
                blurOnSubmit={false}
                isError={
                  formik.touched.newPassword && formik.errors.newPassword
                    ? true
                    : false
                }
              />
                <Text
                  style={[gutters.marginLeft_12, fonts.size_12, fonts.error]}
                  >
                  {formik.touched.newPassword && formik.errors.newPassword ? (
                  formik.errors.newPassword
                ) : ""}
                </Text>
            </View>
            <View style={[ gutters.marginTop_12 ]} >
              <InputField
                ref={confirmPasswordRef}
                placeholder="Confirm Password"
                inputType="PASSWORD"
                onChangeText={formik.handleChange("confirmNewPassword")}
                onBlur={formik.handleBlur("confirmNewPassword")}
                value={formik.values.confirmNewPassword}
                onSubmitEditing={() => Keyboard.dismiss()}
                isError={
                  formik.touched.confirmNewPassword &&
                  formik.errors.confirmNewPassword
                    ? true
                    : false
                }
              />
               
                <Text
                  style={[gutters.marginLeft_12, fonts.size_12, fonts.error]}
                >
                  {(formik.touched.confirmNewPassword &&
              formik.errors.confirmNewPassword )?
                  formik.errors.confirmNewPassword
                 : ""}
                </Text>
            </View>

        <Button label="Update" onPress={formik.handleSubmit} containerStyle={[ gutters.marginTop_32 ]} />
      </View>
    </SafeAreaView>
  );
};


export type ForgetPasswordChangeScreenType = NativeStackScreenProps<RootStackParamList,"ForgetPasswordChange">;

export default ForgetPasswordChangeScreen;
