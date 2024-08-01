import InputField from "@/components/template/InputField/InputField";
import { SafeScreen } from "@/components/template";
import { useTheme } from "@/theme";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { fontFamily } from "@/theme/_config";

const LoginScreen = () => {
  const { fonts, gutters } = useTheme();
  return (
    <SafeScreen>
      <ScrollView style={[gutters.paddingHorizontal_16]}>
        <View>
          <Text style={[fonts.size_32,fonts.gray800, fontFamily._700_Bold ]}>
            Welcome back! Glad to see you, again!
          </Text>
        </View>

    <View style={[ gutters.marginTop_40 ]} >
        <InputField />
    </View>
    <View style={[ gutters.marginTop_40 ]} >
        <InputField inputType="PASSWORD" />
    </View>
      </ScrollView>
    </SafeScreen>
  );
};

export default LoginScreen;
