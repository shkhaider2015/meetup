import { createStackNavigator } from "@react-navigation/stack";
import { useTheme } from "@/theme";

import type { RootStackParamList } from "@/types/navigation";
import LoginScreen from "@/screens/Login/Login";
import SignupScreen from "@/screens/Signup/Signup";
import ForgetPasswordScreen from "@/screens/ForgetPassword/ForgetPassword";
import { Button } from "@/components/template";
import { ChevronLeft } from "@/assets/icon";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Interests from "@/screens/Ineterests/Interests";

const Stack = createStackNavigator<RootStackParamList>();

function AuthNavigator() {
  const navigation = useNavigation();
  const { variant, gutters, backgrounds, layout } = useTheme();

  const _goBack = () => {
    navigation.goBack();
  };

  return (
    <Stack.Navigator key={variant}>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{
          header: () => (
            <View
              style={[gutters.paddingHorizontal_24, gutters.paddingVertical_12]}
            >
              <Button
                Icon={<ChevronLeft />}
                isCirculer={true}
                type="SECONDARY"
                onPress={_goBack}
              />
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="ForgetPassword"
        component={ForgetPasswordScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Ineterests"
        component={Interests}
        options={{
          header: () => (
            <View
              style={[
                gutters.paddingHorizontal_24,
                gutters.paddingVertical_12,
                backgrounds.primary04,
                layout.row,
                layout.itemsEnd,
                {
                  height: 130,
                },
              ]}
            >
              <Button
                Icon={<ChevronLeft />}
                isCirculer={true}
                type="SECONDARY"
                onPress={_goBack}
              />
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
