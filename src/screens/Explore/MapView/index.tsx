import { SafeScreen } from '@/components/template';
import { heights } from '@/theme/_config';
import { ExploreTabsParamList } from '@/types/navigation';
import { Dimensions, Platform, StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import RNMapView, { Details, Region } from 'react-native-maps';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import CustomMarker from '@/components/CustomMarker/CustomMarker';
import { getRegionForCoordinates, requestLocationPermission } from '@/utils';
import Geolocation, { GeoCoordinates } from 'react-native-geolocation-service';
import { useLoader } from '@/hooks';
import { AppDispatch, RootState } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import { setLocation } from '@/store/slices/locationSlice';
import { useTheme } from '@/theme';
import { useMutation } from '@tanstack/react-query';
import { getAllPost } from '@/services/posts/indes';
import { IPostReducer } from '@/types/reducer';
import { setPosts } from '@/store/slices/postSlice';

const MapView = ({ navigation }: MapViewScreenType) => {
  const screenHeight =
    Dimensions.get('window').height -
    (heights.bottomTabBarHeight + heights.tabNavigationHeader);

  const location = useSelector((state: RootState) => state.location);
  const [mapState, setMapState] = useState<Region>(location);
  const currentUser = useSelector((state: RootState) => state.user);
  const posts = useSelector((state: RootState) => state.posts);

  const { showLoader, hideLoader } = useLoader();
  const dispatch: AppDispatch = useDispatch();

  const { mutate: postMutation } = useMutation({
    mutationFn: () => {
      return getAllPost({
        userId: currentUser._id,
        page: 1,
        limit: 10,
        latitude: location.latitude,
        longitude: location.longitude,
        radiusInKiloMeter: 30,
      });
    },
    onSuccess: async (payload: any) => {
      // console.log('----- Post Data Success -----');
      const data: IPostReducer[] = payload?.data;
      dispatch(setPosts(data));
    },
    onError: async (error) => {
      console.log('----- Post Data Error -----', error.message);
    },
  });

  useEffect(() => {
    postMutation()
  }, [location])

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
    const result = await requestLocationPermission();

    if (result) {
      Geolocation.getCurrentPosition(
        (position) => {
          console.log(position);
          _setLocation(position.coords);
          _hideLoader();
        },
        (error) => {
          // See error code charts below.
          console.log(error.code, error.message);
          _hideLoader();
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      );
    }
  };

  const _hideLoader = () => {
    setTimeout(() => {
      hideLoader();
    }, 1000);
  };

  const CustomMapView = useCallback(
    () => (
      <RNMapView
        provider="google"
        style={{
          ...StyleSheet.absoluteFillObject,
        }}
        initialRegion={location}
        // onRegionChangeComplete={_onRegionChange}
        zoomControlEnabled={true}
        // loadingEnabled={true}
        // loadingIndicatorColor={colors.primary}
        showsMyLocationButton={true}
        showsUserLocation={true}
        followsUserLocation={true}
        mapPadding={{ top: 130, right: 20, left: 20, bottom: 110 }}
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
        {/* <CustomMapView /> */}
        <RNMapView
          provider="google"
          style={{
            ...StyleSheet.absoluteFillObject,
          }}
          initialRegion={location}
          // onRegionChangeComplete={_onRegionChange}
          zoomControlEnabled={true}
          // loadingEnabled={true}
          // loadingIndicatorColor={colors.primary}
          showsMyLocationButton={true}
          showsUserLocation={true}
          followsUserLocation={true}
          mapPadding={{ top: 60, right: 15, left: 20, bottom: 10 }}
        >
          {posts.map((post) => (
            <CustomMarker key={post._id} {...post} />
          ))}
        </RNMapView>
      </View>
    </SafeScreen>
  );
};

type MapViewScreenType = NativeStackScreenProps<
  ExploreTabsParamList,
  'MapView'
>;

export default MapView;
