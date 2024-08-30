import { Button, InputField } from '@/components/template';
import { forgetPasswordApply } from '@/services/users/auth';
import { useTheme } from '@/theme';
import { fontFamily } from '@/theme/_config';
import { RootStackParamList } from '@/types/navigation';
import { forgetPasswordSchema } from '@/types/schemas/user';
import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import Toast from 'react-native-toast-message';

const ForgetPasswordScreen = ({ navigation }: ForgetPasswordScreenType) => {
  const { layout, gutters, fonts, colors } = useTheme();

  const { isPending, mutate } = useMutation({
    mutationFn: (email: string) => {
      return forgetPasswordApply(email);
    },
    onSuccess: (data) => {
      console.log("Data : ", data);
      
      navigation.navigate('OTP', {
        id: data?.payload?.userId,
        email: formik.values.email,
        type: 'FORGOT_PASSWORD',
      });
    },
    onError: (error) => {
      Toast.show({
        type: 'error',
        text1: error?.message || 'Something wrong happen',
      });
    },
  });
  const formik = useFormik<{ email: string }>({
    initialValues: {
      email: __DEV__ ? 'shakeel29@yopmail.com' : '',
    },
    validationSchema: forgetPasswordSchema,
    onSubmit: (values) => {
      console.log(values);
      mutate(values.email)
    },
  });

  return (
    <SafeAreaView>
      <View style={[gutters.paddingHorizontal_24, gutters.paddingVertical_32]}>
        <Text style={[fonts.gray800, fontFamily._600_SemiBold, fonts.size_32]}>
          Forget Password?
        </Text>

        <Text style={[fonts.gray400, fonts.size_16, { lineHeight: 28 }]}>
          Don't worry! It occurs. Please enter the email address linked with
          your account.
        </Text>

        <View style={[gutters.marginTop_40]}>
          <InputField
            placeholder="Email Address"
            onChangeText={formik.handleChange('email')}
            onBlur={formik.handleBlur('email')}
            value={formik.values.email}
            returnKeyType="next"
            keyboardType="email-address"
            autoCapitalize="none"
            blurOnSubmit={false}
            isError={formik.touched.email && formik.errors.email ? true : false}
            disable={isPending}
          />
          <Text style={[gutters.marginLeft_12, fonts.size_12, fonts.error]}>
            {formik.touched.email && formik.errors.email
              ? formik.errors.email
              : ''}
          </Text>
        </View>

        <Button
          label="Send Code"
          onPress={formik.handleSubmit}
          containerStyle={[gutters.marginTop_32]}
          loading={isPending}
        />
      </View>
    </SafeAreaView>
  );
};

export type ForgetPasswordScreenType = NativeStackScreenProps<
  RootStackParamList,
  'ForgetPassword'
>;

export default ForgetPasswordScreen;
