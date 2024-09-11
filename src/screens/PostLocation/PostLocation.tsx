import { Button, SafeScreen } from '@/components/template';
import { useTheme } from '@/theme';
import { fontFamily, heights } from '@/theme/_config';
import { RootStackParamList } from '@/types/navigation';
import {
  Dimensions,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import RNMapView, { Details, Marker, Region } from 'react-native-maps';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { IInitialMapState } from '@/types/maps';
import { Close } from '@/assets/icon';
import { useFocusEffect } from '@react-navigation/native';
import { getRegionForCoordinates } from '@/utils';

const PostLocation = ({ navigation, route }: PostLocationScreenType) => {
  const { location } = route.params;
  const { layout, gutters, backgrounds, fonts, colors } = useTheme();

  const { height } = Dimensions.get('window');
  const screenHeight = Platform.OS === 'android' ? height + 60 : height;

  const [region, setRegion] = useState<Region>({
    ...getRegionForCoordinates([
      {
        latitude: location?.latitude || 0,
        longitude: location?.longitude || 0,
      },
    ]),
  });

  // useLayoutEffect(() => {
  //   // Hide the tab bar
  //   navigation.getParent()?.setOptions({
  //     tabBarStyle: { display: "none" },
  //   });

  //   return () => {
  //     navigation.getParent()?.setOptions({
  //       tabBarStyle: {
  //         display: "flex",
  //         backgroundColor: backgrounds.gray00.backgroundColor,
  //         height: heights.bottomTabBarHeight,
  //         paddingBottom: 0,
  //       },
  //     });
  //   };
  // }, [navigation]);


  useFocusEffect(() => {
    StatusBar.setBackgroundColor('#FE434E00');
    StatusBar.setBarStyle('light-content');
    StatusBar.setTranslucent(true);
  });

  const _onRegionChange = (region: Region, details: Details) => {
    setRegion(region);
  };

  const _onSelectLocation = () => {
    console.log('Location : ', region);
    route.params.onSelectLocation?.(
      region.latitude,
      region.longitude,
    );
    _onClose();
  };

  const _onClose = () => {
    StatusBar.setBackgroundColor(backgrounds.gray00.backgroundColor);
    StatusBar.setBarStyle('dark-content');
    StatusBar.setTranslucent(false);

    navigation.goBack();
  };

  console.log('route.params.location ', route.params.location);
  console.log('State ', region);

  return (
    <View
      style={[
        layout.relative,
        {
          height: screenHeight,
        },
      ]}
    >
      <View
        style={[
          layout.row,
          layout.justifyBetween,
          layout.itemsEnd,
          gutters.paddingVertical_16,
          gutters.paddingHorizontal_12,
          layout.absolute,
          layout.top0,
          layout.z1,
          {
            width: '100%',
            height: 120,
          },
        ]}
      >
        <Text />
        <Text style={[fonts.gray800, fontFamily._700_Bold, { fontSize: 20 }]}>
          Select Location
        </Text>
        <TouchableOpacity onPress={_onClose} style={{ marginBottom: 5 }}>
          <Close color={colors.gray800} />
        </TouchableOpacity>
      </View>
      <View
        style={[
          gutters.paddingVertical_16,
          gutters.paddingHorizontal_16,
          layout.row,
          layout.justifyCenter,
          layout.itemsCenter,
          layout.absolute,
          layout.bottom0,
          layout.z1,
          {
            height: 140,
          },
        ]}
      >
        <Button
          label="Select Location"
          type="PRIMARY"
          containerStyle={[{ width: '100%' }]}
          onPress={_onSelectLocation}
        />
      </View>
      <RNMapView
        style={{ ...StyleSheet.absoluteFillObject }}
        initialRegion={region}
        onRegionChange={_onRegionChange}
      >
        <Marker
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude,
          }}
        />
      </RNMapView>
    </View>
  );
};

type PostLocationScreenType = NativeStackScreenProps<
  RootStackParamList,
  'PostLocation'
>;

export default PostLocation;
