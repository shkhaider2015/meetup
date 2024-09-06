import { DummyUser } from '@/assets/dummyImages';
import {
  Cat_Cooking,
  ChevronLeft,
  Key,
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
} from '@/assets/icon';
import { ExploreHeader, MeetupIcon } from '@/assets/images';
import { Button } from '@/components/template';
import { Chat, Explore, Notifications, Post, Profile } from '@/screens';
import { logout } from '@/services/users/auth';
import { AppDispatch, RootState } from '@/store';
import { clearUser } from '@/store/slices/userSlice';
import { useTheme } from '@/theme';
import { fontFamily, heights } from '@/theme/_config';
import { NavigationHookProps, RootStackParamList } from '@/types/navigation';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { useMutation } from '@tanstack/react-query';
import { FC } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { useDispatch, useSelector } from 'react-redux';
import PostNavigator from '../Post';
import { useGlobalBottomSheet, useLoader } from '@/hooks';
import { Platform } from 'react-native';
import Toast from 'react-native-toast-message';

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
          paddingBottom: Platform.OS === 'android' ? 10 : 35,
        },
        tabBarLabelPosition: 'below-icon',
        tabBarActiveTintColor: backgrounds.primary.backgroundColor,
        tabBarHideOnKeyboard: true,
        headerStyle: {
          backgroundColor: 'white',
          height: heights.tabNavigationHeader,
          // borderWidth: 1,
          // borderColor: 'red'
        },
      })}
    >
      <Tab.Screen name="Explore" component={Explore} options={exploreOptions} />
      <Tab.Screen name="Chat" component={Chat} options={chatOptions} />
      <Tab.Screen
        name="PostTab"
        component={PostNavigator}
        options={postOptions}
      />
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
  focused: boolean,
) => {
  let Icon: FC<SvgProps>;

  switch (route.name) {
    case 'Explore':
      Icon = focused ? Tab_Explore_Selected : Tab_Explore_Default;
      break;
    case 'Chat':
      Icon = focused ? Tab_Chat_Selected : Tab_Chat_Default;
      break;
    case 'PostTab':
      Icon = Tab_Post_Default;
      break;
    case 'Notifications':
      Icon = focused ? Tab_Notifications_Selected : Tab_Notifications_Default;
      break;
    case 'Profile':
      Icon = focused ? Tab_Profile_Selected : Tab_Profile_Default;
      break;
    default:
      Icon = focused ? Tab_Explore_Selected : Tab_Explore_Default;
      break;
  }
  return <Icon />;
};

const exploreOptions = (): BottomTabNavigationOptions => {
  const profile_image = useSelector(
    (state: RootState) => state.user.profileImage,
  );

  return {
    headerTitle: '',
    headerLeftContainerStyle: {
      paddingLeft: 10,
    },
    headerRightContainerStyle: {
      paddingRight: 20,
      alignContent: 'center',
      marginTop: 8,
    },
    headerLeft: () => (
      <Image source={ExploreHeader} style={{ width: 200, height: 60 }} />
    ),
    headerRight: () => (
      <View
        style={{
          borderRadius: 50,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        <Image
          source={{ uri: profile_image }}
          style={{ width: 40, height: 40, borderRadius: 50 }}
        />
      </View>
    ),
  };
};

const notificationOptions: BottomTabNavigationOptions = {
  headerTitle: 'Notifications',
  headerTitleAlign: 'center',
  // headerStyle: {
  // backgroundColor: "white",
  // height: heights.tabNavigationHeader,
  // },
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

const profileOptions = (): BottomTabNavigationOptions => {
  const navigation = useNavigation<NavigationHookProps>();
  const userName = useSelector((state: RootState) => state.user.name);
  return {
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
          closeBottomSheet();
          setTimeout(() => {
            dispatch(clearUser());
            hideLoader();
          }, 300);
        },
        onError: (error) => {
          hideLoader();
          Toast.show({
            type: 'error',
            text1: 'Logout Failed',
            text2: error?.message || 'Something wrong happened',
          });
        },
      });

      const _logout = () => {
        showLoader();
        mutate();
      };

      const _goToChangePassword = () => {
        closeBottomSheet();
        navigation.navigate('ChangePassword');
      };

      const handleOpenBottomSheet = () => {
        openBottomSheet(
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-start',
              paddingHorizontal: 35,
              paddingTop: 30,
            }}
          >
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                columnGap: 30,
                alignItems: 'center',
                paddingHorizontal: 5,
                paddingVertical: 5,
              }}
              onPress={_goToChangePassword}
            >
              <Key width={25} height={25} color={'#9f9f9f'} />
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '600',
                  fontFamily: 'Poppins Regular',
                  color: '#000000',
                }}
              >
                Change Password
              </Text>
            </TouchableOpacity>
            <View
              style={{
                height: 2,
                backgroundColor: '#eeeeee',
                marginVertical: 5,
              }}
            />
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                columnGap: 30,
                alignItems: 'center',
                paddingHorizontal: 5,
                paddingVertical: 5,
              }}
              onPress={_logout}
            >
              <Signout width={25} height={25} color={'#9f9f9f'} />
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '600',
                  fontFamily: 'Poppins Regular',
                  color: '#000000',
                }}
              >
                Logout
              </Text>
            </TouchableOpacity>
          </View>,
          ['20%'],
        );
      };

      return (
        <Button
          Icon={<MenuHr width={17} height={17} />}
          type="SECONDARY"
          isCirculer={true}
          containerStyle={[{ width: 35, height: 35, borderColor: '#000000' }]}
          onPress={handleOpenBottomSheet}
        />
      );
    },
    headerTitle: (props) => (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          columnGap: 5,
        }}
      >
        <Text
          style={{
            fontFamily: fontFamily._700_Bold.fontFamily,
            fontSize: 17,
            color: '#000000',
          }}
        >
          {userName}
        </Text>
        <Star />
      </View>
    ),
    // headerStyle: {
    // backgroundColor: "white",
    // height: heights.tabNavigationHeader,
    // },
    headerLeftContainerStyle: {
      paddingLeft: 20,
    },
    headerRightContainerStyle: {
      paddingRight: 20,
    },
    headerTitleAlign: 'center',
  };
};

const chatOptions: BottomTabNavigationOptions = {
  headerShown: false,
};

const postOptions: BottomTabNavigationOptions = {
  headerShown: false,
  tabBarLabel: 'Post',
  tabBarStyle: {
    display: 'none',
  },
};

export default TabsNavigator;
