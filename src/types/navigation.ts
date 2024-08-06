import type { StackScreenProps } from '@react-navigation/stack';

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
};

export type RootScreenProps<
	S extends keyof RootStackParamList = keyof RootStackParamList,
> = StackScreenProps<RootStackParamList, S>;
