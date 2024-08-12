import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { Example, Startup } from "@/screens";
import { useTheme } from "@/theme";

import type { RootStackParamList } from "@/types/navigation";
import TabsNavigator from "./TabNavigator";
import AuthNavigator from "./AuthNavigator";
import { IUserReducer } from "@/types/templates/user";
import { getItem } from "@/storage";
import { USER } from "@/constants";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import ProtectedScreens from "./Protected";

const Stack = createStackNavigator<RootStackParamList>();

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
