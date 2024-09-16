import { SafeScreen } from '@/components/template';
import { heights } from '@/theme/_config';
import { ExploreTabsParamList } from '@/types/navigation';
import { Dimensions, Platform, StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import RNMapView, { Details, Region } from 'react-native-maps';
import { useCallback, useLayoutEffect, useState } from 'react';
import { IInitialMapState } from '@/types/maps';
import {
  Cat_Charity,
  Cat_Cooking,
  Cat_Gaming,
  Cat_Music,
  Cat_Reading,
  Cat_Running_Left,
  Cat_Swimming,
} from '@/assets/icon';
import {
  Dummy_Joe,
  Dummy_Maxwell,
  DummyFarnese,
  DummyJohnson,
  DummyLaraBeu,
} from '@/assets/dummyImages';
import { ICustomMarker } from '@/types/customMarker';
import CustomMarker from '@/components/CustomMarker/CustomMarker';
import { getRegionForCoordinates, requestLocationPermission } from '@/utils';
import Geolocation, { GeoCoordinates } from 'react-native-geolocation-service';
import { useLoader } from '@/hooks';
import { AppDispatch, RootState } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import { setLocation } from '@/store/slices/locationSlice';
import { useFocusEffect } from '@react-navigation/native';

const MapView = ({ navigation }: MapViewScreenType) => {
  const screenHeight =
    Dimensions.get('window').height -
    (heights.bottomTabBarHeight +
      heights.tabNavigationHeader +
      heights.exploreTabsHeader +
      40);

  const [mapState, setMapState] = useState<Region>({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const location = useSelector((state: RootState) => state.location);
  const posts = useSelector((state: RootState) => state.posts);


  const { showLoader, hideLoader } = useLoader();
  const dispatch: AppDispatch = useDispatch();

  // useFocusEffect(
  //   useCallback(() => {
  //     getLocation();
  //   }, []),
  // );

  useLayoutEffect(() => {
    getLocation();
  }, [])

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
      hideLoader();
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
    }
    // result
    //   .then((res) => {
    //     console.log('res is:', res);
    //     if (res) {
    //       Geolocation.getCurrentPosition(
    //         (position) => {
    //           console.log(position);
    //           _setLocation(position.coords)
    //         },
    //         (error) => {
    //           // See error code charts below.
    //           console.log(error.code, error.message);
    //         },
    //         { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    //       );
    //     } else {
    //     }
    //   })
    //   .catch((err) => {});
    hideLoader();
  };

  console.log('Current Location : ', location);

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
      >
        {/* {data.map((item) => (
          <CustomMarker key={item.latitude} {...item} />
        ))} */}
        {
          posts.map(post => <CustomMarker key={post._id} {...post} />)
        }
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

const data: ICustomMarker[] = [
  {
    latitude: 37.790579,
    longitude: -122.421425,
    user_image: DummyLaraBeu,
    CatIcon: <Cat_Cooking color={'#FFFFFF'} />,
  },
  {
    latitude: 37.786433,
    longitude: -122.447653,
    user_image: DummyFarnese,
    CatIcon: <Cat_Charity color={'#FFFFFF'} />,
  },
  {
    latitude: 37.761274,
    longitude: -122.443179,
    user_image: DummyJohnson,
    CatIcon: <Cat_Gaming color={'#FFFFFF'} />,
    backgroundColor: '#CFD8DC',
  },
  {
    latitude: 37.745512,
    longitude: -122.41348,
    user_image: Dummy_Maxwell,
    CatIcon: <Cat_Swimming color={'#FFFFFF'} />,
  },
  {
    latitude: 37.755806,
    longitude: -122.441552,
    user_image: Dummy_Joe,
    CatIcon: <Cat_Music color={'#FFFFFF'} />,
  },
  {
    latitude: 37.772102,
    longitude: -122.39029,
    user_image: DummyFarnese,
    CatIcon: <Cat_Reading color={'#FFFFFF'} />,
    backgroundColor: '#01ff45',
  },
  {
    latitude: 37.773602,
    longitude: -122.444264,
    user_image: DummyLaraBeu,
    CatIcon: <Cat_Running_Left color={'#FFFFFF'} />,
    backgroundColor: '#08b5ff',
  },
];

type MapViewScreenType = NativeStackScreenProps<
  ExploreTabsParamList,
  'MapView'
>;

export default MapView;
