import { AppleLogo, GoogleLogo } from "@/assets/icon";
import { Button, InputField } from "@/components/template";
import Checkbox from "@/components/template/Checkbox/Checkbox";
import { useTheme } from "@/theme";
import { fontFamily } from "@/theme/_config";
import { RootStackParamList } from "@/types/navigation";
import { userSignupSchema } from "@/types/schemas/user";
import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import { Keyboard, SafeAreaView, ScrollView, Text, View } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";

const SignupScreen = ({ navigation }: SignupScreenType) => {

  const { fonts, gutters, layout, backgrounds } = useTheme();

  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);

  const formik = useFormik<SignupFormValues>({
    initialValues: {
      full_name: "",
      email: "",
      password: "",
      confirm_password: "",
      terms_and_condition: false,
    },
    validationSchema: userSignupSchema,
    onSubmit: (values) => {
      console.log(values);
      navigation.navigate("Ineterests");
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
            layout.flex_1,
            gutters.paddingHorizontal_24,
            gutters.paddingVertical_24,
          ]}
        >
          <View style={[gutters.paddingRight_16]}>
            <Text style={[fonts.size_24, fonts.gray800, fontFamily._700_Bold]}>
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
              isError={formik.touched.full_name && formik.errors.full_name ? true : false}
            />
            {formik.touched.full_name && formik.errors.full_name ? (
              <Text style={[gutters.marginLeft_12, fonts.size_12, fonts.error]}>
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
              isError={formik.touched.email && formik.errors.email ? true : false}
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
              onSubmitEditing={() => _handleNext(confirmPasswordRef)}
              returnKeyType="next"
              blurOnSubmit={false}
              isError={formik.touched.password && formik.errors.password ? true : false}
            />
            {formik.touched.password && formik.errors.password ? (
              <Text style={[gutters.marginLeft_12, fonts.size_12, fonts.error]}>
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
              isError={formik.touched.confirm_password && formik.errors.confirm_password ? true : false}
            />
            {formik.touched.confirm_password &&
            formik.errors.confirm_password ? (
              <Text style={[gutters.marginLeft_12, fonts.size_12, fonts.error]}>
                {formik.errors.confirm_password}
              </Text>
            ) : null}
          </View>
          <View style={[layout.row, layout.itemsCenter, gutters.marginTop_12]}>
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
              <Text style={[fontFamily._500_Medium, fonts.size_12, fonts.gray500]}>
                I agree to
              </Text>
              <TouchableOpacity activeOpacity={0.7}>
                <Text
                  style={[fonts.primary, fontFamily._500_Medium, fonts.size_12]}
                >
                  Terms and Services
                </Text>
              </TouchableOpacity>
              <Text style={[fontFamily._500_Medium, fonts.size_12, , fonts.gray500]}>and</Text>
              <TouchableOpacity activeOpacity={0.7}>
                <Text
                  style={[fonts.primary, fontFamily._500_Medium, fonts.size_12]}
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
            // onPress={formik.handleSubmit}
            onPress={() => navigation.navigate("Ineterests")}
            containerStyle={[gutters.marginVertical_16]}
          />

          <View
            style={[
              layout.row,
              layout.justifyCenter,
              layout.itemsCenter,
              gutters.marginVertical_16,
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
            />
            <Button
              type="SECONDARY"
              label="Apple"
              Icon={<AppleLogo width={20} />}
              containerStyle={[layout.flex_1]}
            />
          </View>
          <View
            style={[
              layout.row,
              layout.justifyCenter,
              layout.itemsEnd,
              {
                height: 50,
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
interface SignupFormValues {
  full_name: string;
  email: string;
  password: string;
  confirm_password: string;
  terms_and_condition: boolean;
}

export default SignupScreen;
