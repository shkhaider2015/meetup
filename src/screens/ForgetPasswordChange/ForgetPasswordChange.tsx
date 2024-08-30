import { Button, InputField } from '@/components/template';
import { forgetPassword } from '@/services/users/auth';
import { useTheme } from '@/theme';
import { fontFamily } from '@/theme/_config';
import { RootStackParamList } from '@/types/navigation';
import { forgetPasswordChangeSchema } from '@/types/schemas/user';
import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import { useRef } from 'react';
import { Keyboard, SafeAreaView, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import Toast from 'react-native-toast-message';

const ForgetPasswordChangeScreen = ({
  navigation,
  route
}: ForgetPasswordChangeScreenType) => {
  const { user_id } = route.params
  const { layout, gutters, fonts, colors } = useTheme();

  const confirmPasswordRef = useRef<TextInput>(null);

  const { mutate } = useMutation({
    mutationFn: (values:{ newPassword: string; confirmNewPassword: string }) => {
      return forgetPassword(user_id, values.newPassword, values.confirmNewPassword)
    },
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Password Chage Successfully",
        text2: "You can ow login with newly created password"
      })

      setTimeout(() => {
        navigation.navigate('ForgetPasswordComplete', {
          type : "ForgetPassword"
        });
      }, 500)
    },
    onError:(error) => {
      Toast.show({
        type: "error",
        text1: "Password Chage Failed",
        text2: error?.message || "Something wrong happened"
      })
    }
  })
  const formik = useFormik<{ newPassword: string; confirmNewPassword: string }>(
    {
      initialValues: {
        newPassword: '',
        confirmNewPassword: '',
      },
      validationSchema: forgetPasswordChangeSchema,
      onSubmit: (values) => {
        console.log(values);
        mutate(values)
      },
    },
  );

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
            onChangeText={formik.handleChange('newPassword')}
            onBlur={formik.handleBlur('newPassword')}
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
          <Text style={[gutters.marginLeft_12, fonts.size_12, fonts.error]}>
            {formik.touched.newPassword && formik.errors.newPassword
              ? formik.errors.newPassword
              : ''}
          </Text>
        </View>
        <View style={[gutters.marginTop_12]}>
          <InputField
            ref={confirmPasswordRef}
            placeholder="Confirm Password"
            inputType="PASSWORD"
            onChangeText={formik.handleChange('confirmNewPassword')}
            onBlur={formik.handleBlur('confirmNewPassword')}
            value={formik.values.confirmNewPassword}
            onSubmitEditing={() => Keyboard.dismiss()}
            isError={
              formik.touched.confirmNewPassword &&
              formik.errors.confirmNewPassword
                ? true
                : false
            }
          />

          <Text style={[gutters.marginLeft_12, fonts.size_12, fonts.error]}>
            {formik.touched.confirmNewPassword &&
            formik.errors.confirmNewPassword
              ? formik.errors.confirmNewPassword
              : ''}
          </Text>
        </View>

        <Button
          label="Update"
          onPress={formik.handleSubmit}
          containerStyle={[gutters.marginTop_32]}
        />
      </View>
    </SafeAreaView>
  );
};

export type ForgetPasswordChangeScreenType = NativeStackScreenProps<
  RootStackParamList,
  'ForgetPasswordChange'
>;

export default ForgetPasswordChangeScreen;
