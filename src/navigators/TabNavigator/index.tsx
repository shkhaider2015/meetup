import { DummyUser } from "@/assets/dummyImages";
import {
  Cat_Cooking,
  ChevronLeft,
  MenuHr,
  Search,
  Signout,
  Star,
  Tab_Chat_Default,
  Tab_Chat_Selected,
  Tab_Explore_Default,
  Tab_Explore_Selected,
  Tab_Notifications_Default,
  Tab_Notifications_Selected,
  Tab_Post_Default,
  Tab_Profile_Default,
  Tab_Profile_Selected,
} from "@/assets/icon";
import { ExploreHeader, MeetupIcon } from "@/assets/images";
import { useGlobalBottomSheet, useLoader } from "@/components/Global";
import { Button } from "@/components/template";
import { Chat, Explore, Notifications, Post, Profile } from "@/screens";
import { logout } from "@/services/users/fetchOne";
import { AppDispatch } from "@/store";
import { clearUser } from "@/store/slices/userSlice";
import { useTheme } from "@/theme";
import { fontFamily, heights } from "@/theme/_config";
import { RootStackParamList } from "@/types/navigation";
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import { FC } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SvgProps } from "react-native-svg";
import { useDispatch } from "react-redux";
import PostNavigator from "../Post";

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
          paddingBottom: 0,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: fontFamily._400_Regular.fontFamily,
          paddingBottom: 10,
        },
        tabBarLabelPosition: "below-icon",
        tabBarActiveTintColor: backgrounds.primary.backgroundColor,
        tabBarHideOnKeyboard: true
      })}
    >
      <Tab.Screen name="Explore" component={Explore} options={exploreOptions} />
      <Tab.Screen name="Chat" component={Chat} />
      <Tab.Screen name="Post" component={PostNavigator} options={postOptions} />
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={notificationOptions}
      />
      <Tab.Screen name="Profile" component={Profile} options={profileOptions} />
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
      Icon = focused ? Tab_Explore_Selected : Tab_Explore_Default;
      break;
    case "Chat":
      Icon = focused ? Tab_Chat_Selected : Tab_Chat_Default;
      break;
    case "Post":
      Icon = Tab_Post_Default;
      break;
    case "Notifications":
      Icon = focused ? Tab_Notifications_Selected : Tab_Notifications_Default;
      break;
    case "Profile":
      Icon = focused ? Tab_Profile_Selected : Tab_Profile_Default;
      break;
    default:
      Icon = focused ? Tab_Explore_Selected : Tab_Explore_Default;
      break;
  }
  return <Icon />;
};

const exploreOptions: BottomTabNavigationOptions = {
  headerTitle: "",
  headerStyle: {
    backgroundColor: "white",
    height: heights.tabNavigationHeader,
  },
  headerLeftContainerStyle: {
    paddingLeft: 10,
  },
  headerRightContainerStyle: {
    paddingRight: 20,
    alignContent: "center",
    marginTop: 8,
  },
  headerLeft: () => (
    <Image source={ExploreHeader} style={{ width: 200, height: 60 }} />
  ),
  headerRight: () => (
    <Image source={DummyUser} style={{ width: 40, height: 40 }} />
  ),
};

const notificationOptions: BottomTabNavigationOptions = {
  headerTitle: "Notifications",
  headerTitleAlign: "center",
  headerStyle: {
    backgroundColor: "white",
    height: heights.tabNavigationHeader,
  },
  headerLeftContainerStyle: {
    paddingLeft: 20,
  },
  headerRightContainerStyle: {
    paddingRight: 20,
  },
  headerTitleStyle: {
    fontFamily: fontFamily._500_Medium.fontFamily,
    fontSize: 16,
  },
  headerLeft: () => (
    <Image source={MeetupIcon} style={{ width: 40, height: 35 }} />
  ),
  headerRight: () => {
    return (
      <View>
        <Button
          Icon={<Search width={17} height={17} />}
          type="SECONDARY"
          isCirculer
          containerStyle={[{ width: 35, height: 35 }]}
        />
      </View>
    );
  },
};

const profileOptions: BottomTabNavigationOptions = {
  headerLeft: () => {
    const navigation = useNavigation();

    // To be removed
    return (
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <ChevronLeft />
      </TouchableOpacity>
    );
  },
  headerRight: () => {
    const { openBottomSheet, closeBottomSheet } = useGlobalBottomSheet();
    const { showLoader, hideLoader } = useLoader();
    const dispatch: AppDispatch = useDispatch();
    const { mutate } = useMutation({
      mutationFn: () => {
        return logout();
      },
      onSuccess: () => {
        hideLoader();
        closeBottomSheet();
        setTimeout(() => {
          dispatch(clearUser());
        }, 300);
      },
      onError: () => {
        hideLoader();
      },
    });

    const _logout = () => {
      showLoader();
      mutate();
    };

    const handleOpenBottomSheet = () => {
      openBottomSheet(
        <View
          style={{
            flex: 1,
            justifyContent: "flex-start",
            paddingHorizontal: 35,
            paddingTop: 30,
          }}
        >
          <TouchableOpacity
            style={{
              flexDirection: "row",
              columnGap: 30,
              alignItems: "center",
            }}
            onPress={_logout}
          >
            <Signout width={25} height={25} color={"#000000"} />
            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                fontFamily: "Poppins Regular",
                color: "#000000",
              }}
            >
              Logout
            </Text>
          </TouchableOpacity>
        </View>,
        ["15%"]
      );
    };

    return (
      <Button
        Icon={<MenuHr width={17} height={17} />}
        type="SECONDARY"
        isCirculer={true}
        containerStyle={[{ width: 35, height: 35, borderColor: "#000000" }]}
        onPress={handleOpenBottomSheet}
      />
    );
  },
  headerTitle: (props) => (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        columnGap: 5,
      }}
    >
      <Text
        style={{
          fontFamily: fontFamily._700_Bold.fontFamily,
          fontSize: 17,
          color: "#000000",
        }}
      >
        Larabeu
      </Text>
      <Star />
    </View>
  ),
  headerStyle: {
    backgroundColor: "white",
    height: heights.tabNavigationHeader,
  },
  headerLeftContainerStyle: {
    paddingLeft: 20,
  },
  headerRightContainerStyle: {
    paddingRight: 20,
  },
  headerTitleAlign: "center",
};

const postOptions: BottomTabNavigationOptions = {
  headerShown: false,
};

export default TabsNavigator;
