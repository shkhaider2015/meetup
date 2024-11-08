import { GridView, MapView as MapViewIcon } from '@/assets/icon';
import { ListView, MapView } from '@/screens';
import { useTheme } from '@/theme';
import { heights } from '@/theme/_config';
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
            height: heights.exploreTabsHeader,
            borderRadius: 10,
            backgroundColor: '#FE434E'
        },
        tabBarStyle: {
            width: 200,
            alignSelf: 'center',
            backgroundColor: colors.gray00,
            height: heights.exploreTabsHeader,
            marginTop: 15,
            borderRadius: 10,
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

    return <Icon width={25} height={25} color={focused ? '#FFFFFF' : '#FE434E'  } />;
  };
  
export default ExploreTabs
