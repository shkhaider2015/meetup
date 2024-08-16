import Carousel from "@/screens/Carousel/Carousel";
import { RootStackParamList } from "@/types/navigation";
import { createStackNavigator } from "@react-navigation/stack";
import TabsNavigator from "../TabNavigator";
import { Interests } from "@/screens";

const Stack = createStackNavigator<RootStackParamList>();

const ProtectedScreens = () => {
  const isFirstTimeLoggedIn = false;
  return (
    <Stack.Navigator
      initialRouteName={isFirstTimeLoggedIn ? "Ineterests" : "Tabs"}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Tabs" component={TabsNavigator} />
      <Stack.Screen name="Carousel" component={Carousel} />
      <Stack.Screen name="Ineterests" component={Interests} />
    </Stack.Navigator>
  );
};

export default ProtectedScreens;
