import { SafeScreen, InputField, Button } from "@/components/template";
import { useTheme } from "@/theme";
import { Keyboard, ScrollView, Text, TextInput, View } from "react-native";
import { fontFamily } from "@/theme/_config";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AppleLogo, GoogleLogo } from "@/assets/icon";
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";
import { RootStackParamList } from "@/types/navigation";
import { Formik, useFormik } from "formik";
import { userLoginSchema } from "@/types/schemas/user";
import { useEffect, useRef, useState } from "react";

const LoginScreen = (props: LoginScreenType) => {
  const { navigation } = props;


  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const { fonts, gutters, layout, backgrounds } = useTheme();

  const passwordRef = useRef<TextInput>(null)

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

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const _navigateToSignup = () => {
    navigation.navigate("Signup");
  };
  const _navigateToForgetPassword = () => {
    navigation.navigate("ForgetPassword");
  };

  const _handleNext = (nextRef: React.RefObject<TextInput>) => {
    nextRef.current?.focus();
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
              onSubmitEditing={() => _handleNext(passwordRef)}
              returnKeyType="next"
              keyboardType="email-address"
              autoCapitalize="none"
              blurOnSubmit={false}
            />
            {formik.touched.email && formik.errors.email ? (
              <Text style={[gutters.marginLeft_12, fonts.size_12, fonts.error]}>
                {formik.errors.email}
              </Text>
            ) : null}
          </View>
          <View style={[gutters.marginTop_12]}>
            <InputField
              ref={passwordRef}
              placeholder="Password"
              inputType="PASSWORD"
              onChangeText={formik.handleChange("password")}
              onBlur={formik.handleBlur("password")}
              value={formik.values.password}
              onSubmitEditing={() => Keyboard.dismiss()}
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
