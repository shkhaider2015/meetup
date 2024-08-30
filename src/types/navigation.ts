import type { StackScreenProps } from '@react-navigation/stack';
import { ImageSourcePropType } from 'react-native';
import GeoLocation from "react-native-geolocation-service"
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';

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
		type: "ForgetPassword" | "ChangePassword"
	};
	Ineterests: undefined;
	Explore: undefined;
	Chat: undefined;
	Post: undefined;
	PostTab: undefined;
	PostLocation: {
		location?: GeoLocation.GeoPosition
		onSelectLocation?: (lat:number, long:number) => void
	};
	Notifications: undefined;
	Profile: undefined;
	Carousel: {
		images: ImageSourcePropType[],
		selectedIndex?: number
	};
	Tabs: undefined;
	OTP: {
		id: string;
		email: string;
		type: "ACCOUNT_ACTIVATION" | "FORGOT_PASSWORD"
	},
	EditProfile: undefined;
	OtherProfile: {
		userId?: string
	},
	ChangePassword: undefined
};

export type ExploreTabsParamList = {
	MapView: undefined;
	ListView: undefined;
}

export type NavigationHookProps = NativeStackNavigationProp<RootStackParamList>;

export type RootScreenProps<
	S extends keyof RootStackParamList = keyof RootStackParamList,
> = StackScreenProps<RootStackParamList, S>;
