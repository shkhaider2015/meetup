import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useTheme } from "@/theme";
import AuthNavigator from "./AuthNavigator";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import ProtectedScreens from "./Protected";
import { useEffect, useState } from "react";

function ApplicationNavigator() {
  const { navigationTheme } = useTheme();
  const user = useSelector((state: RootState) => state.user);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if(user.isLoggedIn !== isLoggedIn) {
      setIsLoggedIn(user.isLoggedIn)
    }
  }, [user])

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={navigationTheme}>
        {isLoggedIn ? <ProtectedScreens /> : <AuthNavigator />}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default ApplicationNavigator;
