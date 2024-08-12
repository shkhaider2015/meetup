import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useTheme } from "@/theme";

import type { RootStackParamList } from "@/types/navigation";
import AuthNavigator from "./AuthNavigator";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import ProtectedScreens from "./Protected";



function ApplicationNavigator() {
  const { variant, navigationTheme } = useTheme();
   const user = useSelector((state:RootState) => state.user);

  console.log("User in navigator : ", user)

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={navigationTheme}>
        {user.isLoggedIn ? <ProtectedScreens /> : <AuthNavigator />}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default ApplicationNavigator;
