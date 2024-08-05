import { Home } from '@/screens';
import AboutScreen from '@/screens/About/About';
import Chat from '@/screens/Chat/Chat';
import Explore from '@/screens/Explore/Explore';
import Notifications from '@/screens/Notification/Notification';
import Post from '@/screens/Post/Post';
import Profile from '@/screens/Profile/Profile';
import { RootStackParamList } from '@/types/navigation';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator<RootStackParamList>();

function TabsNavigator() {
  return (
    <Tab.Navigator screenOptions={{
        headerShown: false
    }} >
      <Tab.Screen name="Explore" component={Explore} />
      <Tab.Screen name="Chat" component={Chat} />
      <Tab.Screen name="Post" component={Post} />
      <Tab.Screen name="Notifications" component={Notifications} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export default TabsNavigator;