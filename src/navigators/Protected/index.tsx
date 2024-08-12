import Carousel from "@/screens/Carousel/Carousel";
import { RootStackParamList } from "@/types/navigation";
import { createStackNavigator } from "@react-navigation/stack";
import TabsNavigator from "../TabNavigator";

const Stack = createStackNavigator<RootStackParamList>();

const ProtectedScreens = () => {
    return <Stack.Navigator screenOptions={{ headerShown: false }} >
        <Stack.Screen name="Tabs" component={TabsNavigator} />
        <Stack.Screen name="Carousel" component={Carousel} />
    </Stack.Navigator>
}

export default ProtectedScreens;