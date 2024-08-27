import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useTheme } from "@/theme";
import AuthNavigator from "./AuthNavigator";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import ProtectedScreens from "./Protected";

function ApplicationNavigator() {
  const { navigationTheme } = useTheme();
  const user = useSelector((state: RootState) => state.user);

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={navigationTheme}>
        {user.isLoggedIn ? <ProtectedScreens /> : <AuthNavigator />}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default ApplicationNavigator;
