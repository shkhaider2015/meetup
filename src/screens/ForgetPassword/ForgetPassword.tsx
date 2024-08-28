import { Button, InputField } from '@/components/template';
import { useTheme } from '@/theme';
import { fontFamily } from '@/theme/_config';
import { RootStackParamList } from '@/types/navigation';
import { forgetPasswordSchema } from '@/types/schemas/user';
import { useFormik } from 'formik';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';

const ForgetPasswordScreen = ({ navigation }:ForgetPasswordScreenType) => {
  const { layout, gutters, fonts, colors } = useTheme();

  const formik = useFormik<{ email: string }>({
    initialValues: {
      email: __DEV__ ? 'shakeel7@yopmail.com' : '',
    },
    validationSchema: forgetPasswordSchema,
    onSubmit: (values) => {
      console.log(values);
      navigation.navigate("OTP", {
        id: 'userId',
        email: 'email',
        type: "FORGOT_PASSWORD"
      });
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
          />
            <Text style={[gutters.marginLeft_12, fonts.size_12, fonts.error]}>
          {formik.touched.email && formik.errors.email ?  formik.errors.email
             : ""}
            </Text>
        </View>

        <Button label="Send Code" onPress={formik.handleSubmit} containerStyle={[ gutters.marginTop_32 ]} />
      </View>
    </SafeAreaView>
  );
};


export type ForgetPasswordScreenType = NativeStackScreenProps<RootStackParamList,"ForgetPassword">;

export default ForgetPasswordScreen;
