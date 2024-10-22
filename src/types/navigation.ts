import type { StackScreenProps } from '@react-navigation/stack';
import { ImageSourcePropType } from 'react-native';
import GeoLocation from 'react-native-geolocation-service';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';
import { PostStateType } from './screens/post';
import { CometChat } from '@cometchat/chat-sdk-react-native';

export type RootStackParamList = {
  Startup: undefined;
  Example: undefined;
  Login: undefined;
  Signup: undefined;
  Home: undefined;
  About: undefined;
  ForgetPassword: undefined;
  ForgetPasswordChange: {
    user_id: string;
  };
  ForgetPasswordComplete: {
    type: 'ForgetPassword' | 'ChangePassword';
  };
  Ineterests: undefined;
  Explore: undefined;
  Chat: undefined;
  Messages: {
    chatWith?: CometChat.User;
  };
  Post: {
    initialValues?: PostStateType;
    postId?: string;
  };
  PostTab: {
    initialValues?: PostStateType;
  };
  PostLocation: {
    location?: {
      latitude: number;
      longitude: number;
    };
    onSelectLocation?: (lat: number, long: number) => void;
  };
  Notifications: undefined;
  NotificationsPermission: undefined;
  Profile: undefined;
  Carousel: {
    images: ImageSourcePropType[];
    selectedIndex?: number;
  };
  Tabs: undefined;
  OTP: {
    id: string;
    email: string;
    type: 'ACCOUNT_ACTIVATION' | 'FORGOT_PASSWORD';
  };
  EditProfile: undefined;
  OtherProfile: {
    userId?: string;
  };
  ChangePassword: undefined;
  Loading: undefined;
  LocationPermission: undefined;
  Settings: undefined;
  LocationSearch: {
    onSelectLocation: (lat: number, long:number) => void;
  };
  PostDetails: {
    postId: string;
  };
};

export type ExploreTabsParamList = {
  MapView: undefined;
  ListView: undefined;
};

export type NavigationHookProps = NativeStackNavigationProp<RootStackParamList>;

export type RootScreenProps<
  S extends keyof RootStackParamList = keyof RootStackParamList,
> = StackScreenProps<RootStackParamList, S>;
