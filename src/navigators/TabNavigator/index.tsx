import { DummyUser } from "@/assets/dummyImages";
import { ExploreHeader } from "@/assets/images";
import {
  ChatIcon,
  ExploreIcon,
  ITabIcon,
  NotificationsIcon,
  PostIcon,
  ProfileIcon,
} from "@/components/TabIcons";
import { Chat, Explore, Notifications, Post, Profile } from "@/screens";
import { RootStackParamList } from "@/types/navigation";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RouteProp } from "@react-navigation/native";
import { FC } from "react";
import { Image, View } from "react-native";

const Tab = createBottomTabNavigator<RootStackParamList>();

function TabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => tabBarIconOption(route, focused),
        tabBarStyle: {
          backgroundColor: "white",
          height: 80,
          paddingBottom: 0
        },
        tabBarLabelStyle: {
          fontSize: 13,
          fontWeight: 'bold',
          paddingBottom: 10
        },
        tabBarLabelPosition: "below-icon",
      })}
    >
      <Tab.Screen name="Explore" component={Explore} options={{
        headerTitle: "",
        headerStyle: {
          backgroundColor: 'white',
        },
        headerLeft: () => <Image source={ExploreHeader} />,
        headerRight: () => <Image source={DummyUser} style={{ marginRight: 10, width: 40, height: 40}}  />
      }} />
      <Tab.Screen name="Chat" component={Chat} />
      <Tab.Screen name="Post" component={Post} />
      <Tab.Screen name="Notifications" component={Notifications} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

const tabBarIconOption = (
  route: RouteProp<RootStackParamList, keyof RootStackParamList>,
  focused: boolean
) => {
  let Icon: FC<ITabIcon>;
  let iconSize = 35;
  let lightColor = focused ? "#fe435045" : "#cbd8ffb3";
  let darkColor = focused ? "#ff3745" : "#222222";

  switch (route.name) {
    case "Explore":
      Icon = ExploreIcon;
      break;
    case "Chat":
      Icon = ChatIcon;
      break;
    case "Post":
      Icon = PostIcon;
      iconSize = 64;
      break;
    case "Notifications":
      Icon = NotificationsIcon;
      break;
    case "Profile":
      Icon = ProfileIcon;
      break;
    default:
      Icon = ExploreIcon;
      break;
  }
  return <Icon size={iconSize} lightColor={lightColor} darkColor={darkColor} />;
};

export default TabsNavigator;
