import { SafeScreen, InputField, Button } from "@/components/template";
import { useTheme } from "@/theme";
import {
  Keyboard,
  ScrollView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { fontFamily } from "@/theme/_config";
import { AppleLogo, GoogleLogo } from "@/assets/icon";
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";
import { RootStackParamList } from "@/types/navigation";
import { Formik, useFormik } from "formik";
import { userLoginSchema } from "@/types/schemas/user";
import { useEffect, useRef, useState } from "react";
import { Mutation, useMutation } from "@tanstack/react-query";
import { IUserLoginForm } from "@/types/forms"
import { login } from "@/services/users";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { setUser } from "@/store/slices/userSlice";
import Toast from "react-native-toast-message";
import { IUserReducer } from "@/types/reducer";
import { convertImageURLforngRok } from "@/utils";
import { CometChat } from "@cometchat/chat-sdk-react-native";

const LoginScreen = (props: LoginScreenType) => {
  const { navigation } = props;
  const dispatch: AppDispatch = useDispatch();

  const { fonts, gutters, layout, backgrounds } = useTheme();
  const { height } = Dimensions.get("screen");
  const { isPending, mutate } = useMutation({
    mutationFn: (data: IUserLoginForm) => {
      return login(data);
    },
    onSuccess:(data) => {
      console.log("Success : ", data);
      if(!data.isActivated) {
        // User is not activated yet
        Toast.show({
          type: "error",
          text1: "Login Failed",
          text2: "Your account is not activated, Plaese enter activation code"
        })

        setTimeout(() => {
          navigation.navigate("OTP", {
            id: data.id,
            email: data.email,
            type: "ACCOUNT_ACTIVATION"
          })
        }, 500)
        return
      }

      Toast.show({
        type: "success",
        text1: "Successfully logged in"
      })

      const user:IUserReducer = {
        ...data,
        profile_image: convertImageURLforngRok(data.profile_image),
        isLoggedIn: true,
      }

      // CometChat.login(data.cometchat.authToken).then(res => console.log("cometchat successfully Logged In")).catch(err => console.log("CometChat login failed"))

      setTimeout(() => {
        dispatch(
          setUser(user)
        );
      }, 500)
    },
    onError: (error:any) => {
      Toast.show({
        type: "error",
        text1: "Login Failed",
        text2: error?.message || "An unknown error accurred"
      })
    }
  });

  const passwordRef = useRef<TextInput>(null);

  const formik = useFormik<IUserLoginForm>({
    initialValues: {
      email: __DEV__ ? "shakeel7@yopmail.com" : "",
      password: __DEV__ ? "Admin@1735" : "",
    },
    validationSchema: userLoginSchema,
    onSubmit: (values) => {
      console.log(values);
      mutate(values);
    },
  });

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
            gutters.paddingHorizontal_24,
            {
              minHeight: height - 60,
            },
          ]}
        >
          <View style={[layout.flex_1, layout.justifyCenter]}>
            <View style={[gutters.paddingTop_24, gutters.paddingBottom_12]}>
              <Text
                style={[fonts.size_24, fonts.gray800, fontFamily._700_Bold]}
              >
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
                isError={
                  formik.touched.email && formik.errors.email ? true : false
                }
              />
              {formik.touched.email && formik.errors.email ? (
                <Text
                  style={[gutters.marginLeft_12, fonts.size_12, fonts.error]}
                >
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
                isError={
                  formik.touched.password && formik.errors.password
                    ? true
                    : false
                }
              />
              {formik.touched.password && formik.errors.password ? (
                <Text
                  style={[gutters.marginLeft_12, fonts.size_12, fonts.error]}
                >
                  {formik.errors.password}
                </Text>
              ) : null}
            </View>
            <View style={[layout.row, layout.justifyEnd]}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={_navigateToForgetPassword}
              >
                <Text
                  style={[
                    gutters.marginVertical_12,
                    fonts.gray500,
                    fontFamily._400_Regular,
                  ]}
                >
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </View>

            <Button
              label="Login"
              onPress={formik.handleSubmit}
              loading={isPending}
            />

            <View
              style={[
                layout.row,
                layout.justifyCenter,
                layout.itemsCenter,
                gutters.marginVertical_32,
              ]}
            >
              <View
                style={[{ height: 1 }, backgrounds.gray70, layout.flex_1]}
              />
              <Text
                style={[
                  gutters.marginHorizontal_12,
                  fonts.gray250,
                  fonts.size_14,
                ]}
              >
                OR
              </Text>
              <View
                style={[{ height: 1 }, backgrounds.gray70, layout.flex_1]}
              />
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
          </View>

          <View
            style={[
              layout.flex_1,
              layout.row,
              layout.justifyCenter,
              layout.itemsCenter,
              {
                minHeight: 40,
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

export default LoginScreen;
