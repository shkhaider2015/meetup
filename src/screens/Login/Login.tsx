import { SafeScreen, InputField, Button } from "@/components/template";
import { useTheme } from "@/theme";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { fontFamily } from "@/theme/_config";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AppleLogo, GoogleLogo } from "@/assets/icon";

const LoginScreen = () => {
  const { fonts, gutters, layout, backgrounds } = useTheme();
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
            <InputField placeholder="Email Address" />
          </View>
          <View style={[gutters.marginTop_12]}>
            <InputField placeholder="Password" inputType="PASSWORD" />
          </View>
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

          <Button label="Login" />
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
              layout.itemsCenter,
              gutters.marginVertical_24,
            ]}
          >
            <Text style={[fonts.gray500, fontFamily._400_Regular]}>
              Don't have an account?
            </Text>
            <TouchableOpacity>
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

export default LoginScreen;
