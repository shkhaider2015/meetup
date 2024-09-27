import {
  PermissionsAndroid,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { RootStackParamList } from '@/types/navigation';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { NotificationAnimation } from '@/assets/images';
import LottieView from 'lottie-react-native';
import { useTheme } from '@/theme';
import { fontFamily } from '@/theme/_config';
import { Button } from '@/components/template';

const NotificationScreenPermission = ({
  navigation,
}: NotificationsScreenType) => {
  console.log('NotificationScreenPermission component is rendered!');
  const { layout, gutters, fonts } = useTheme();
  const getNotificationPermission = () => {
    if (Platform.OS === 'android') {
        const platformcheck = PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS;
        console.log('permission acess',platformcheck);
    }
    
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
          source={NotificationAnimation}
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
          NOTIFICATIONS
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
          label="ENABLE NOTIFICATIONS"
          containerStyle={[{ width: '80%', height: '20%' }]}
          onPress={getNotificationPermission}
        />
      </View>
    </View>
  );
};
type NotificationsScreenType = NativeStackScreenProps<
  RootStackParamList,
  'NotificationsPermission'
>;
export default NotificationScreenPermission;
