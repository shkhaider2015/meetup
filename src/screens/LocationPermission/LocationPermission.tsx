import { Platform, Text, TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from '@/types/navigation';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { LocationAnimation } from '@/assets/images';
import LottieView from 'lottie-react-native';
import { useTheme } from '@/theme';
import { fontFamily } from '@/theme/_config';
import { Button } from '@/components/template';
import {
  getRegionForCoordinates,
  requestLocationPermission,
  requestNotificationPermissionCross,
} from '@/utils';
import { useDispatch, useSelector } from 'react-redux';
import Geolocation, { GeoCoordinates } from 'react-native-geolocation-service';
import { AppDispatch, RootState } from '@/store';
import { useLoader } from '@/hooks';
import { Region } from 'react-native-maps';
import { setLocation } from '@/store/slices/locationSlice';

const LocationPermissionScreen = ({ navigation }: LocationsScreenType) => {
  const { layout, gutters, fonts } = useTheme();
  const { showLoader, hideLoader } = useLoader();
  const dispatch: AppDispatch = useDispatch();

  const currentUser = useSelector((state: RootState) => state.user);
  const userLocation = useSelector((state: RootState) => state.location);

  const getLocationPermission = async () => {
    showLoader();
    await requestLocationPermission();
    Geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        const tempLocation: Region = {
          ...getRegionForCoordinates([
            {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
          ]),
        };
        dispatch(setLocation(tempLocation));
        let isActivitiesAdded = currentUser.activities.length > 0;
        setTimeout(() => {
          if (!isActivitiesAdded) {
            navigation.replace('Ineterests');
          } else {
            navigation.replace('Tabs');
          }
          hideLoader();
        }, 1000);
      },
      (error) => {
        console.log(error.code, error.message);
        hideLoader();
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  };
  

  return (
    <View>
      <View
        style={[
          //   gutters.paddingVertical_16,
          layout.itemsCenter,
          layout.justifyCenter,
          {
            minHeight: '70%',
          },
        ]}
      >
        <LottieView
          source={LocationAnimation}
          autoPlay={true}
          loop={true}
          style={{
            width: '80%',
            height: 200,
          }}
        />
        <Text
          style={[
            gutters.paddingTop_24,
            fonts.black,
            fontFamily._700_Bold,
            fonts.size_24,
          ]}
        >
          LOCATION
        </Text>
        <Text
          style={[
            gutters.paddingHorizontal_24,
            fonts.black,
            fontFamily._500_Medium,
            fonts.size_16,
            {
              textAlign: 'center',
            },
          ]}
        >
          Enable location for best experience
        </Text>
      </View>
      <View
        style={[layout.itemsCenter, layout.justifyCenter, { minHeight: '30%' }]}
      >
        {/* <TouchableOpacity
          onPress={_onSkip}
          style={[gutters.paddingBottom_12]}
        >
          <Text
            style={[fonts.gray300, fontFamily._600_SemiBold, fonts.size_14]}
          >
            SKIP
          </Text>
        </TouchableOpacity> */}
        <Button
          label="ENABLE LOCATION"
          containerStyle={[{ width: '80%', height: '20%' }]}
          onPress={getLocationPermission}
        />
      </View>
    </View>
  );
};
type LocationsScreenType = NativeStackScreenProps<
  RootStackParamList,
  'LocationPermission'
>;
export default LocationPermissionScreen;
