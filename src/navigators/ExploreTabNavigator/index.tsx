import { GridView, MapView as MapViewIcon } from '@/assets/icon';
import { ListView, MapView } from '@/screens';
import { useTheme } from '@/theme';
import { ExploreTabsParamList } from '@/types/navigation';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { RouteProp } from '@react-navigation/native';
import { FC } from 'react';
import { SvgProps } from 'react-native-svg';

const Tab = createMaterialTopTabNavigator<ExploreTabsParamList>();

function ExploreTabs() {
  const { colors } = useTheme();

  return (
    <Tab.Navigator screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => tabBarIconOption(route, focused),
        tabBarLabel: "",
        tabBarIndicatorStyle: {
            height: 60,
            borderRadius: 20,
            backgroundColor: '#FE434E'
        },
        tabBarStyle: {
            width: 200,
            alignSelf: 'center',
            backgroundColor: colors.gray00,
            height: 60,
            marginVertical: 10,
            borderRadius: 20,
            position: 'absolute'
        },
        swipeEnabled: false
    })} initialRouteName="MapView" >
      <Tab.Screen name="MapView" component={MapView} />
      <Tab.Screen name="ListView" component={ListView} />
    </Tab.Navigator>
  );
}

const tabBarIconOption = (
    route: RouteProp<ExploreTabsParamList, keyof ExploreTabsParamList>,
    focused: boolean
  ) => {
    let Icon: FC<SvgProps>;
  
    switch (route.name) {
        case "ListView":
            Icon = GridView
            break;
        case "MapView":
            Icon = MapViewIcon
            break;
        default:
            Icon = MapViewIcon
            break;
    }

    return <Icon width={30} height={30} color={focused ? '#FFFFFF' : '#FE434E'  } />;
  };
  
export default ExploreTabs
