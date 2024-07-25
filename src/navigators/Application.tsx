import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { Example, Startup } from "@/screens";
import { useTheme } from "@/theme";

import type { RootStackParamList } from "@/types/navigation";
import TabsNavigator from "./TabNavigator";
import AuthNavigator from "./AuthNavigator";

const Stack = createStackNavigator<RootStackParamList>();

function ApplicationNavigator() {
  const { variant, navigationTheme } = useTheme();
  const isLogin = false;

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={navigationTheme}>
        {isLogin ? <TabsNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default ApplicationNavigator;
