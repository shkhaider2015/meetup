import { DummyUser } from "@/assets/dummyImages";
import { Tab_Chat_Default, Tab_Chat_Selected, Tab_Explore_Default, Tab_Explore_Selected, Tab_Notifications_Default, Tab_Notifications_Selected, Tab_Post_Default, Tab_Profile_Default, Tab_Profile_Selected } from "@/assets/icon";
import { ExploreHeader } from "@/assets/images";
import { Chat, Explore, Notifications, Post, Profile } from "@/screens";
import { useTheme } from "@/theme";
import { fontFamily, heights } from "@/theme/_config";
import { RootStackParamList } from "@/types/navigation";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RouteProp } from "@react-navigation/native";
import { FC } from "react";
import { Image, View } from "react-native";
import { SvgProps } from "react-native-svg";

const Tab = createBottomTabNavigator<RootStackParamList>();

function TabsNavigator() {
  const { backgrounds } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => tabBarIconOption(route, focused),
        tabBarStyle: {
          backgroundColor: backgrounds.gray00.backgroundColor,
          height: heights.bottomTabBarHeight,
          paddingBottom: 0
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: fontFamily._400_Regular.fontFamily,
          paddingBottom: 10
        },
        tabBarLabelPosition: "below-icon",
        tabBarActiveTintColor: backgrounds.primary.backgroundColor
      })}
    >
      <Tab.Screen name="Explore" component={Explore} options={{
        headerTitle: "",
        headerStyle: {
          backgroundColor: 'white',
          height: heights.tabNavigationHeader
        },
        headerLeft: () => <Image source={ExploreHeader} style={{ width: 200, height: 60 }} />,
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
  let Icon: FC<SvgProps>;

  switch (route.name) {
    case "Explore":
      Icon = focused ? Tab_Explore_Selected : Tab_Explore_Default ;
      break;
    case "Chat":
      Icon = focused ? Tab_Chat_Selected : Tab_Chat_Default ;
      break;
    case "Post":
      Icon = Tab_Post_Default;
      break;
    case "Notifications":
      Icon = focused ? Tab_Notifications_Selected : Tab_Notifications_Default ;
      break;
    case "Profile":
      Icon = focused ? Tab_Profile_Selected : Tab_Profile_Default ;
      break;
    default:
      Icon = focused ? Tab_Explore_Selected : Tab_Explore_Default ;
      break;
  }
  return <Icon />;
};

export default TabsNavigator;
