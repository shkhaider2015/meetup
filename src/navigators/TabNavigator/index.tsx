import { Home } from '@/screens';
import AboutScreen from '@/screens/About/About';
import { RootStackParamList } from '@/types/navigation';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator<RootStackParamList>();

function TabsNavigator() {
  return (
    <Tab.Navigator screenOptions={{
        headerShown: false
    }} >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="About" component={AboutScreen} />
    </Tab.Navigator>
  );
}

export default TabsNavigator;