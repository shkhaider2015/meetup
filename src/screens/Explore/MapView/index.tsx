import { SafeScreen } from '@/components/template';
import { heights } from '@/theme/_config';
import { ExploreTabsParamList } from '@/types/navigation';
import { Dimensions, Platform, StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import RNMapView, { Details, Region } from 'react-native-maps';
import { useCallback, useLayoutEffect, useState } from 'react';
import CustomMarker from '@/components/CustomMarker/CustomMarker';
import { getRegionForCoordinates, requestLocationPermission } from '@/utils';
import Geolocation, { GeoCoordinates } from 'react-native-geolocation-service';
import { useLoader } from '@/hooks';
import { AppDispatch, RootState } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import { setLocation } from '@/store/slices/locationSlice';
import { useTheme } from '@/theme';

const MapView = ({ navigation }: MapViewScreenType) => {
  const screenHeight =
    Dimensions.get('window').height -
    (heights.bottomTabBarHeight +
      heights.tabNavigationHeader);

  const location = useSelector((state: RootState) => state.location);
  const [mapState, setMapState] = useState<Region>(location);

  const posts = useSelector((state: RootState) => state.posts);

  const { colors } = useTheme();
  const { showLoader, hideLoader } = useLoader();
  const dispatch: AppDispatch = useDispatch();

  useLayoutEffect(() => {
    if (location.latitude === 0 && location.longitude === 0) {
      getLocation();
    }
  }, [location]);

  const _onRegionChange = (region: Region, details: Details) => {
    setMapState((pS) => ({ ...pS, region: region }));
  };

  const _setLocation = (location: GeoCoordinates) => {
    const tempLocation: Region = {
      ...getRegionForCoordinates([
        {
          latitude: location.latitude || 0,
          longitude: location.longitude || 0,
        },
      ]),
    };

    setMapState(tempLocation);
    dispatch(setLocation(tempLocation));
  };

  const getLocation = async () => {
    showLoader();
    if (Platform.OS === 'ios') {
      const iosResult = await Geolocation.requestAuthorization('whenInUse');
      if (iosResult === 'granted') {
        Geolocation.getCurrentPosition(
          (position) => {
            console.log(position);
            _setLocation(position.coords);
            // setLocation(position);
          },
          (error) => {
            // See error code charts below.
            console.log(error.code, error.message);

            // setLocation(false);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        );
      } else {
      }
      console.log('IosResult : ', iosResult);
      _hideLoader();
      return;
    }
    const result = await requestLocationPermission();
    if (result) {
      Geolocation.getCurrentPosition(
        (position) => {
          console.log(position);
          _setLocation(position.coords);
        },
        (error) => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      );
      _hideLoader();
    }
  };

  const _hideLoader = () => {
    setTimeout(() => {
      hideLoader()
    }, 1000)
  }

  const CustomMapView = useCallback(
    () => (
      <RNMapView
        provider="google"
        style={{
          ...StyleSheet.absoluteFillObject,
        }}
        initialRegion={mapState}
        onRegionChange={_onRegionChange}
        zoomControlEnabled={true}
        loadingEnabled={true}
        loadingIndicatorColor={colors.primary}
      >
        {posts.map((post) => (
          <CustomMarker key={post._id} {...post} />
        ))}
      </RNMapView>
    ),
    [location, posts],
  );

  return (
    <SafeScreen>
      <View
        style={[
          {
            height: screenHeight,
          },
        ]}
      >
        <CustomMapView />
      </View>
    </SafeScreen>
  );
};


type MapViewScreenType = NativeStackScreenProps<
  ExploreTabsParamList,
  'MapView'
>;

export default MapView;
