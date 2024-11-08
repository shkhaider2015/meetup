import { BellIcon, Envelop } from '@/assets/icon';
import { Notifications, RequestScreen } from '@/screens';
import { useTheme } from '@/theme';
import { fontFamily } from '@/theme/_config';
import { NotificationTabsParamList } from '@/types/navigation';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { RouteProp } from '@react-navigation/native';
import { FC } from 'react';
import { Text, View } from 'react-native';
import { SvgProps } from 'react-native-svg';

const Tab = createMaterialTopTabNavigator<NotificationTabsParamList>();

function NotificationTabNavigator() {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => tabBarIconOption(route, focused),
        tabBarLabel: '',
        tabBarIndicatorStyle: {
          height: 50,
          backgroundColor: '#FE434E',
        },
        tabBarStyle: {
          backgroundColor: colors.gray00,
          height: 50,
          paddingVertical: 0
        },
        tabBarIconStyle: {
          width: '100%',
          marginTop: -6
        },
      })}
      initialRouteName="Notifications"
    >
      <Tab.Screen name="Notifications" component={Notifications} />
      <Tab.Screen name="Requests" component={RequestScreen} />
    </Tab.Navigator>
  );
}

const tabBarIconOption = (
  route: RouteProp<NotificationTabsParamList, keyof NotificationTabsParamList>,
  focused: boolean,
) => {
  let Icon: FC<SvgProps>;

  switch (route.name) {
    case 'Notifications':
      Icon = BellIcon;
      break;
    case 'Requests':
      Icon = Envelop;
      break;
    default:
      Icon = BellIcon;
      break;
  }

  return (
    <View style={{ width: '100%', alignItems: 'center' }}>
      <Icon width={18} height={18} color={focused ? '#ffffff' : '#bebebe'} />
      <Text
        style={[
          {
            color: focused ? '#ffffff' : '#bebebe',
            fontSize: 12,
            fontFamily: fontFamily._600_SemiBold.fontFamily,
            marginTop: 2,
          },
        ]}
      >
        {route.name}
      </Text>
    </View>
  );
};

export default NotificationTabNavigator;
