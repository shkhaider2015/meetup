import { SafeScreen, InputField, Button } from "@/components/template";
import { useTheme } from "@/theme";
import { ScrollView, Text, View } from "react-native";
import { fontFamily } from "@/theme/_config";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AppleLogo, GoogleLogo } from "@/assets/icon";
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";
import { RootStackParamList } from "@/types/navigation";
import { Formik, useFormik } from "formik";
import { userLoginSchema } from "@/types/schemas/user";

const LoginScreen = (props: LoginScreenType) => {
  const { navigation } = props;
  const { fonts, gutters, layout, backgrounds } = useTheme();

  const formik = useFormik<LoginFormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: userLoginSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const _navigateToSignup = () => {
    navigation.navigate("Signup");
  };
  const _navigateToForgetPassword = () => {
    navigation.navigate("ForgetPassword");
  };

  return (
    <SafeScreen>
      <ScrollView>
        <View
          style={[
            layout.flex_1,
            gutters.paddingHorizontal_24,
            gutters.paddingVertical_24,
          ]}
        >
          <View style={[gutters.paddingTop_24, gutters.paddingBottom_12]}>
            <Text style={[fonts.size_24, fonts.gray800, fontFamily._700_Bold]}>
              Welcome back! Glad to see you, Again!
            </Text>
          </View>

          <View style={[gutters.marginTop_40]}>
            <InputField
              placeholder="Email Address"
              onChangeText={formik.handleChange("email")}
              onBlur={formik.handleBlur("email")}
              value={formik.values.email}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {formik.touched.email && formik.errors.email ? (
              <Text style={[gutters.marginLeft_12, fonts.size_12, fonts.error]}>
                {formik.errors.email}
              </Text>
            ) : null}
          </View>
          <View style={[gutters.marginTop_12]}>
            <InputField
              placeholder="Password"
              inputType="PASSWORD"
              onChangeText={formik.handleChange("password")}
              onBlur={formik.handleBlur("password")}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <Text style={[gutters.marginLeft_12, fonts.size_12, fonts.error]}>
                {formik.errors.password}
              </Text>
            ) : null}
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={_navigateToForgetPassword}
          >
            <Text
              style={[
                { textAlign: "right" },
                gutters.marginVertical_12,
                fonts.gray500,
                fontFamily._400_Regular,
              ]}
            >
              Forgot Password?
            </Text>
          </TouchableOpacity>

          <Button label="Login" onPress={formik.handleSubmit} />

          <View
            style={[
              layout.row,
              layout.justifyCenter,
              layout.itemsCenter,
              gutters.marginVertical_32,
            ]}
          >
            <View style={[{ height: 1 }, backgrounds.gray70, layout.flex_1]} />
            <Text
              style={[
                gutters.marginHorizontal_12,
                fonts.gray250,
                fonts.size_14,
              ]}
            >
              OR
            </Text>
            <View style={[{ height: 1 }, backgrounds.gray70, layout.flex_1]} />
          </View>
          <Button
            type="SECONDARY"
            label="Login With Google"
            Icon={<GoogleLogo width={20} />}
          />
          <Button
            type="SECONDARY"
            label="Login With Apple"
            Icon={<AppleLogo width={20} />}
            containerStyle={[gutters.marginVertical_12]}
          />
          <View
            style={[
              layout.row,
              layout.justifyCenter,
              layout.itemsEnd,
              {
                height: 100,
              },
            ]}
          >
            <Text style={[fonts.gray500, fontFamily._400_Regular]}>
              Don't have an account?
            </Text>
            <TouchableOpacity onPress={_navigateToSignup}>
              <Text
                style={[
                  fonts.primary,
                  fontFamily._600_SemiBold,
                  {
                    marginLeft: 6,
                  },
                ]}
              >
                Register Account?
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeScreen>
  );
};

type LoginScreenType = NativeStackScreenProps<RootStackParamList, "Login">;

interface LoginFormValues {
  email: string;
  password: string;
}

export default LoginScreen;
