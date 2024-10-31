import {
  MenuHr,
  Search,
  SettingsIcon,
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
  Tick,
} from '@/assets/icon';
import { ExploreHeader, MeetupIcon } from '@/assets/images';
import { Button } from '@/components/template';
import { Chat, Explore, Notifications, Post, Profile } from '@/screens';
import { RootState } from '@/store';
import { useTheme } from '@/theme';
import { fontFamily, heights } from '@/theme/_config';
import { NavigationHookProps, RootStackParamList } from '@/types/navigation';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import { FC, useCallback } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { useSelector } from 'react-redux';
import { Platform } from 'react-native';
import { Image as FastImage } from '@/components/template';
import { convertImageURLforngRok } from '@/utils';
import { Header } from '@/components';

const Tab = createBottomTabNavigator<RootStackParamList>();

function TabsNavigator() {
  const { backgrounds } = useTheme();
  const { replace } = useNavigation<NavigationHookProps>();
  const userLocation = useSelector((state: RootState) => state.location);

  useFocusEffect(
    useCallback(() => {
      if (userLocation.latitude === 0 && userLocation.longitude === 0)
        replace('LocationPermission');
    }, [userLocation]),
  );

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
        name="Post"
        component={Post}
        initialParams={{
          initialValues: undefined,
        }}
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
    case 'Post':
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
  const navigation = useNavigation<NavigationHookProps>();

  return {
    header: () => (
      <Header
        leftComponent={() => (
          <View>
            <Image source={ExploreHeader} style={{ width: 200, height: 60 }} />
          </View>
        )}
        rightComponnent={() => (
          <TouchableOpacity
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
            onPress={() => navigation.navigate('Profile')}
          >
            <FastImage
              imageURL={convertImageURLforngRok(profile_image)}
              containerStyle={{ width: 40, height: 40, borderRadius: 50 }}
              fastImageProp={{
                style: { width: 40, height: 40, borderRadius: 50 },
              }}
            />
          </TouchableOpacity>
        )}
      />
    ),
  };
};

const notificationOptions: BottomTabNavigationOptions = {
  header: () => (
    <Header
      leftComponent={() => (
        <Image source={MeetupIcon} style={{ width: 40, height: 35 }} />
      )}
      label="Notifications"
      rightComponnent={() => (
        <Button
          Icon={<Search width={17} height={17} />}
          type="SECONDARY"
          isCirculer
          containerStyle={[{ width: 35, height: 35 }]}
        />
      )}
    />
  ),
};

const profileOptions = (): BottomTabNavigationOptions => {
  const navigation = useNavigation<NavigationHookProps>();
  const userName = useSelector((state: RootState) => state.user.name);
  const { layout } = useTheme();
  return {
    header: () => (
      <Header
        leftComponent={() => <View style={{ flex: 1 }} />}
        middleComponent={() => (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              columnGap: 6,
              flex: 1,
            }}
          >
            <Text
              style={{
                fontFamily: fontFamily._700_Bold.fontFamily,
                fontSize: 17,
                color: '#000000',
                marginTop: 3,
              }}
            >
              {userName}
            </Text>
            <Tick width={15} height={15} />
          </View>
        )}
        rightComponnent={() => (
          <TouchableOpacity
            style={[
              { width: 35, height: 35, flex: 1 },
              layout.row,
              layout.justifyEnd,
              layout.itemsCenter,
            ]}
            onPress={() => navigation.navigate('Settings')}
          >
            <SettingsIcon width={22} height={22} />
          </TouchableOpacity>
        )}
      />
    ),
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
