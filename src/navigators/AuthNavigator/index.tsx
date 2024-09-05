import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import { useTheme } from '@/theme';

import type { RootStackParamList } from '@/types/navigation';
import LoginScreen from '@/screens/Login/Login';
import SignupScreen from '@/screens/Signup/Signup';
import ForgetPasswordScreen from '@/screens/ForgetPassword/ForgetPassword';
import { Button } from '@/components/template';
import { ChevronLeft } from '@/assets/icon';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Interests from '@/screens/Ineterests/Interests';
import OTP from '@/screens/OTP/OTP';
import ForgetPasswordChangeScreen from '@/screens/ForgetPasswordChange/ForgetPasswordChange';
import ForgetPasswordCompleteScreen from '@/screens/ForgetPasswordComplete/ForgetPasswordComplete';
import { heights } from '@/theme/_config';

const Stack = createStackNavigator<RootStackParamList>();

function AuthNavigator() {
  const navigation = useNavigation();
  const { variant, gutters, backgrounds, layout } = useTheme();

  const _goBack = () => {
    navigation.goBack();
  };

  return (
    <Stack.Navigator screenOptions={{headerShown: true, headerStyle: {
      backgroundColor: 'white',
      height: heights.tabNavigationHeader,
    },}} key={variant} initialRouteName="Login">
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
          headerTitle: "",
          headerLeft: () => (
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
          headerTitle: "",
          headerLeft: () => (
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
        name="OTP"
        component={OTP}
        options={{
          headerTitle: "",
          headerLeft: () => (
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
        name="ForgetPasswordChange"
        component={ForgetPasswordChangeScreen}
        options={{
          headerTitle: "",
          headerLeft: () => (
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
        name="ForgetPasswordComplete"
        component={ForgetPasswordCompleteScreen}
        options={{
          headerTitle: "",
          headerLeft: () => (
            <View
              style={[gutters.paddingHorizontal_24, gutters.paddingVertical_12]}
            >
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
