import { AppleLogo, GoogleLogo } from "@/assets/icon";
import { Button, InputField } from "@/components/template";
import Checkbox from "@/components/template/Checkbox/Checkbox";
import { signup } from "@/services/users";
import { useTheme } from "@/theme";
import { fontFamily, heights } from "@/theme/_config";
import { ISignupForm } from "@/types/forms";
import { RootStackParamList } from "@/types/navigation";
import { userSignupSchema } from "@/types/schemas/user";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import {
  Keyboard,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";
import Toast from "react-native-toast-message";

const SignupScreen = ({ navigation }: SignupScreenType) => {
  const { fonts, gutters, layout, backgrounds } = useTheme();
  const { height } = Dimensions.get("screen");

  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);

  const {isPending, mutate } = useMutation({
    mutationFn: (data: ISignupForm) => {
      return signup(data);
    },
    onSuccess(data:any) {
      console.log("Success : ", data);
      const userId = data?.payload?.id || "" ;
      const email = data?.payload?.email || "";

      Toast.show({
        type: "success",
        text1: "Account created successfully",
        text2: data?.message
      })
      setTimeout(() => {
        navigation.navigate("OTP", {
          id: userId,
          email: email,
          type: "ACCOUNT_ACTIVATION"
        });
      }, 200)
    },
    onError: (error) => {
      console.log("Error on query", error);
      Toast.show({
        type: "error",
        text1: "Account creation failed",
        text2: error.message || "An unknown error accured"
      })
    }
  });

  const formik = useFormik<ISignupForm>({
    initialValues: {
      full_name: __DEV__ ? "Shakeel 7" : "",
      email: __DEV__ ? "shakeel7@yopmail.com" : "",
      password: __DEV__ ? "Admin@1735" : "",
      confirm_password: __DEV__ ? "Admin@1735" : "",
      terms_and_condition: __DEV__ ? true : false,
    },
    validationSchema: userSignupSchema,
    onSubmit: (values) => {
      console.log(values);
      mutate(values)
      // Toast.show({
      //   type: "success",
      //   text1: "Your account has been created successfully",
      //   text2: "Activation link has been sent to your email",
      // });
      // navigation.goBack();
    },
  });

  const _handleNext = (nextRef: React.RefObject<TextInput>) => {
    nextRef.current?.focus();
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View
          style={[
            gutters.paddingHorizontal_24,
            {
              minHeight: height - 130,
            },
          ]}
        >
          <View style={[layout.flex_1, layout.justifyCenter]}>
            <View style={[gutters.paddingRight_16]}>
              <Text
                style={[fonts.size_24, fonts.gray800, fontFamily._700_Bold]}
              >
                Hello! Register to get started
              </Text>
            </View>

            <View style={[gutters.marginTop_40]}>
              <InputField
                placeholder="Full Name"
                onChangeText={formik.handleChange("full_name")}
                onBlur={formik.handleBlur("full_name")}
                value={formik.values.full_name}
                onSubmitEditing={() => _handleNext(emailRef)}
                returnKeyType="next"
                blurOnSubmit={false}
                isError={
                  formik.touched.full_name && formik.errors.full_name
                    ? true
                    : false
                }
              />
              {formik.touched.full_name && formik.errors.full_name ? (
                <Text
                  style={[gutters.marginLeft_12, fonts.size_12, fonts.error]}
                >
                  {formik.errors.full_name}
                </Text>
              ) : null}
            </View>

            <View style={[gutters.marginTop_12]}>
              <InputField
                ref={emailRef}
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
                onSubmitEditing={() => _handleNext(confirmPasswordRef)}
                returnKeyType="next"
                blurOnSubmit={false}
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
            <View style={[gutters.marginTop_12]}>
              <InputField
                ref={confirmPasswordRef}
                placeholder="Confirm Password"
                inputType="PASSWORD"
                onChangeText={formik.handleChange("confirm_password")}
                onBlur={formik.handleBlur("confirm_password")}
                value={formik.values.confirm_password}
                onSubmitEditing={() => Keyboard.dismiss()}
                isError={
                  formik.touched.confirm_password &&
                  formik.errors.confirm_password
                    ? true
                    : false
                }
              />
              {formik.touched.confirm_password &&
              formik.errors.confirm_password ? (
                <Text
                  style={[gutters.marginLeft_12, fonts.size_12, fonts.error]}
                >
                  {formik.errors.confirm_password}
                </Text>
              ) : null}
            </View>
            <View
              style={[layout.row, layout.itemsCenter, gutters.marginTop_16]}
            >
              <Checkbox
                onChange={(val) =>
                  formik.setFieldValue("terms_and_condition", val)
                }
                onBlur={() => formik.handleBlur("terms_and_condition")}
                checked={formik.values.terms_and_condition}
              />
              <View
                style={[
                  layout.row,
                  layout.justifyStart,
                  layout.itemsCenter,
                  { columnGap: 3, marginLeft: 5 },
                ]}
              >
                <Text
                  style={[fontFamily._500_Medium, fonts.size_12, fonts.gray500]}
                >
                  I agree to
                </Text>
                <TouchableOpacity activeOpacity={0.7}>
                  <Text
                    style={[
                      fonts.primary,
                      fontFamily._500_Medium,
                      fonts.size_12,
                    ]}
                  >
                    Terms and Services
                  </Text>
                </TouchableOpacity>
                <Text
                  style={[
                    fontFamily._500_Medium,
                    fonts.size_12,
                    ,
                    fonts.gray500,
                  ]}
                >
                  and
                </Text>
                <TouchableOpacity activeOpacity={0.7}>
                  <Text
                    style={[
                      fonts.primary,
                      fontFamily._500_Medium,
                      fonts.size_12,
                    ]}
                  >
                    Privacy Policy.
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {formik.touched.terms_and_condition &&
            formik.errors.terms_and_condition ? (
              <Text style={[gutters.marginLeft_24, fonts.size_12, fonts.error]}>
                {formik.errors.terms_and_condition}
              </Text>
            ) : null}
            <Button
              label="Sign Up"
              onPress={formik.handleSubmit}
              containerStyle={[gutters.marginVertical_16]}
              loading={isPending}
              disabled={isPending}
            />

            <View
              style={[
                layout.row,
                layout.justifyCenter,
                layout.itemsCenter,
                gutters.marginVertical_16,
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
            <View
              style={[
                layout.row,
                layout.justifyBetween,
                layout.itemsCenter,
                { columnGap: 10 },
              ]}
            >
              <Button
                type="SECONDARY"
                label="Google"
                Icon={<GoogleLogo width={20} />}
                containerStyle={[layout.flex_1]}
                disabled={isPending}
                onPress={async () => {
                  fetch('https://871f-103-196-160-178.ngrok-free.app/', {
                    method: 'GET',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                  })
                    .then(response => {
                      if (!response.ok) {
                        throw new Error('Network response was not ok');
                      }
                      return  response.json();
                    })
                    .then(data => console.log(data.json()))
                    .catch(error => {
                      console.error('Fetch error:', error);
                    });
                }}
              />
              <Button
                type="SECONDARY"
                label="Apple"
                Icon={<AppleLogo width={20} />}
                containerStyle={[layout.flex_1]}
                disabled={isPending}
                
              />
            </View>
          </View>

          <View
            style={[
              layout.flex_1,
              layout.row,
              layout.justifyCenter,
              layout.itemsCenter,
              {
                minHeight: 50,
              },
            ]}
          >
            <Text style={[fonts.gray500, fontFamily._400_Regular]}>
              Already have an account?
            </Text>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  fonts.primary,
                  fontFamily._600_SemiBold,
                  {
                    marginLeft: 6,
                  },
                ]}
              >
                Login Now
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

type SignupScreenType = NativeStackScreenProps<RootStackParamList, "Signup">;

export default SignupScreen;
