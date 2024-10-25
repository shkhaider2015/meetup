import {
  Envelop,
  GridView,
  MapView as MapViewIcon,
  Share,
} from '@/assets/icon';
import { ListView, MapView, MessageRequests } from '@/screens';
import { useTheme } from '@/theme';
import { fontFamily } from '@/theme/_config';
import {
  ExploreTabsParamList,
  MessageRequestTabsParamList,
} from '@/types/navigation';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { RouteProp } from '@react-navigation/native';
import { FC } from 'react';
import { Text, View } from 'react-native';
import { SvgProps } from 'react-native-svg';

const Tab = createMaterialTopTabNavigator<MessageRequestTabsParamList>();

function MessageRequestTabNavigator() {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => tabBarIconOption(route, focused),
        tabBarLabel: '',
        tabBarIndicatorStyle: {
          height: 60,
          backgroundColor: '#FE434E',
        },
        tabBarStyle: {
          backgroundColor: colors.gray00,
          height: 60,
        },
        tabBarIconStyle: {
          width: '100%',
        }
      })}
      initialRouteName="Received"
    >
      <Tab.Screen name="Received" component={MessageRequests} />
      <Tab.Screen name="Sent" component={MessageRequests} />
    </Tab.Navigator>
  );
}

const tabBarIconOption = (
  route: RouteProp<
    MessageRequestTabsParamList,
    keyof MessageRequestTabsParamList
  >,
  focused: boolean,
) => {
  let Icon: FC<SvgProps>;

  switch (route.name) {
    case 'Received':
      Icon = Envelop;
      break;
    case 'Sent':
      Icon = Share;
      break;
    default:
      Icon = MapViewIcon;
      break;
  }

  return (
    <View style={{ width: '100%', alignItems: 'center' }} >
      <Icon width={20} height={20} color={focused ? '#ffffff' : '#bebebe'} />
      <Text
        style={[
          {
            color: focused ? '#ffffff' : '#bebebe',
            fontSize: 14,
            fontFamily: fontFamily._600_SemiBold.fontFamily,
            marginTop: 3
          },
        ]}
      >
        {route.name}
      </Text>
    </View>
  );
};

export default MessageRequestTabNavigator;
