import { LoadingAnimation } from '@/assets/images';
import { localKey, USER } from '@/constants';
import { loadUser } from '@/services/users';
import { getItem, setItem } from '@/storage';
import { AppDispatch } from '@/store';
import { clearUser, setUser } from '@/store/slices/userSlice';
import { useTheme } from '@/theme';
import { RootStackParamList } from '@/types/navigation';
import { IUserReducer } from '@/types/reducer';
import {
  checkLocationPermission,
  checkNotificationPermission,
  convertImageURLforngRok,
} from '@/utils';
import { useFocusEffect } from '@react-navigation/native';
import { useMutation } from '@tanstack/react-query';
import LottieView from 'lottie-react-native';
import { useEffect, useLayoutEffect } from 'react';
import { Platform, View } from 'react-native';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';

const LoadingScreen = ({ navigation }: LoadingScreenType) => {
  const { layout, gutters, fonts, backgrounds } = useTheme();

  const dispatch: AppDispatch = useDispatch();
  const isFirstTimeLoggedIn = false;
  const { mutate: loadUserMutation } = useMutation({
    mutationFn: (token: string) => {
      return loadUser(token);
    },
    onError: (error) => {
      if (error?.message?.includes('expired')) {
        Toast.show({
          type: 'error',
          text1: 'Session Expired',
          text2: error?.message,
        });

        setTimeout(() => {
          dispatch(clearUser());
        }, 500);
      }
    },
    onSuccess: async (data: any) => {
      console.log('Load User Data ', data);
      const user: IUserReducer = {
        ...data,
        profileImage: convertImageURLforngRok(data.profileImage),
        isLoggedIn: true,
      };
      dispatch(setUser(user));
      console.log("Is Just logged in  before");
      const isJustLoggedIn = getItem<boolean>(localKey.JUST_LOGGED_IN);

      console.log("Is Just logged in ", isJustLoggedIn, typeof isJustLoggedIn);
      
      if (!isJustLoggedIn) {
        navigation.navigate('Tabs');
        return
      } else {
        setItem(localKey.JUST_LOGGED_IN, false)
      }

      let isNotificationAllowed = await checkNotificationPermission();
      let isLocationAllowed = await checkLocationPermission();
      let isActivitiesAdded = user.activities.length > 0;
      if (!isNotificationAllowed) {
        navigation.navigate('NotificationsPermission');
      } else if (!isLocationAllowed) {
        navigation.navigate('LocationPermission');
      } else if (!isActivitiesAdded) {
        navigation.navigate('Ineterests');
      } else {
        navigation.navigate('Tabs');
      }
    },
  });

  useEffect(() => {
    const initializeUser = () => {
      const user: any = getItem(USER);
      if (user.token) {
        loadUserMutation(user.token);
      }
    };
    initializeUser();
  }, [dispatch]);

  return (
    <View
      style={[
        layout.fullHeight,
        layout.flex_1,
        layout.justifyCenter,
        layout.itemsCenter,
        backgrounds.gray00,
      ]}
    >
      <LottieView
        source={LoadingAnimation}
        autoPlay={true}
        loop={true}
        style={{
          width: '80%',
          height: 300,
        }}
      />
    </View>
  );
};
type LoadingScreenType = NativeStackScreenProps<RootStackParamList, 'Loading'>;
export default LoadingScreen;
