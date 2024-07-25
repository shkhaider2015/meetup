import InputField from "@/components/template/InputField/InputField";
import { SafeScreen } from "@/components/template";
import { useTheme } from "@/theme";
import { SafeAreaView, ScrollView, Text, View } from "react-native";

const LoginScreen = () => {
  const { fonts, gutters } = useTheme();
  return (
    <SafeScreen>
      <ScrollView style={[gutters.paddingHorizontal_16]}>
        <View>
          <Text style={[fonts.size_32, fonts.bold, fonts.gray800]}>
            Welcome back! Glad to see you, again!
          </Text>
        </View>

    <View style={[ gutters.marginTop_40 ]} >
        <InputField />
    </View>
      </ScrollView>
    </SafeScreen>
  );
};

export default LoginScreen;
