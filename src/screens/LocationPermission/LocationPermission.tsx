import { Platform, Text, TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from '@/types/navigation';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { LocationAnimation } from '@/assets/images';
import LottieView from 'lottie-react-native';
import { useTheme } from '@/theme';
import { fontFamily } from '@/theme/_config';
import { Button } from '@/components/template';
import {
  requestLocationPermission,
  requestNotificationPermissionCross,
} from '@/utils';
import { useSelector } from 'react-redux';
import Geolocation, { GeoCoordinates } from 'react-native-geolocation-service';
import { RootState } from '@/store';

const LocationPermissionScreen = ({ navigation }: LocationsScreenType) => {
  const { layout, gutters, fonts } = useTheme();
  const user = useSelector((state: RootState) => state.user);

  const getLocationPermission = async () => {
    Platform.OS === 'android'
      ? await requestLocationPermission()
      : await Geolocation.requestAuthorization('whenInUse');

    let isActivitiesAdded = user.activities.length > 0;
    setTimeout(() => {
      if (!isActivitiesAdded) {
        navigation.navigate('Ineterests');
      } else {
        navigation.navigate('Tabs');
      }
    }, 1000);
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
          Always stay up to date with the latest updates and alerts
        </Text>
      </View>
      <View
        style={[layout.itemsCenter, layout.justifyCenter, { minHeight: '30%' }]}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[gutters.paddingBottom_12]}
        >
          <Text
            style={[fonts.gray300, fontFamily._600_SemiBold, fonts.size_14]}
          >
            SKIP
          </Text>
        </TouchableOpacity>
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
