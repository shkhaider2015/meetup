import { createStackNavigator } from "@react-navigation/stack";
import { useTheme } from "@/theme";

import type { RootStackParamList } from "@/types/navigation";
import LoginScreen from "@/screens/Login/Login";
import SignupScreen from "@/screens/Signup/Signup";

const Stack = createStackNavigator<RootStackParamList>();

function AuthNavigator() {
  const { variant } = useTheme();

  return (
    <Stack.Navigator key={variant} screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
