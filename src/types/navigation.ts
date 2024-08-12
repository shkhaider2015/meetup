import type { StackScreenProps } from '@react-navigation/stack';
import { ImageSourcePropType } from 'react-native';

export type RootStackParamList = {
	Startup: undefined;
	Example: undefined;
	Login: undefined;
	Signup: undefined;
	Home: undefined;
	About: undefined;
	ForgetPassword: undefined;
	Ineterests: undefined;
	Explore: undefined;
	Chat: undefined;
	Post: undefined;
	Notifications: undefined;
	Profile: undefined;
	Carousel: {
		images: ImageSourcePropType[],
		selectedIndex?: number
	};
	Tabs: undefined
};

export type ExploreTabsParamList = {
	MapView: undefined;
	ListView: undefined;
}

export type RootScreenProps<
	S extends keyof RootStackParamList = keyof RootStackParamList,
> = StackScreenProps<RootStackParamList, S>;
