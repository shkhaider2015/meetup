import { Asset } from "react-native-image-picker";

export interface ISignupForm {
  full_name: string;
  email: string;
  password: string;
  confirm_password: string;
  terms_and_condition: boolean;
}

export interface IUserLoginForm {
  email: string;
  password: string;
}

export interface IChangePassword {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface IForgetPassword {
  newPassword: string;
  confirmNewPassword: string;
}

export interface IEditProfileForm {
  name?: string;

  bio?: string;

  profileImage?: Asset;

  activitiesToAdd: string[];

  activitiesToDelete: string[];

  profession?: string
}

export interface IPostForm {
  userId: string;
  image?: Asset;
  details?: string;
  location?: {
    latitude: number;
    longitude: number;
  };
  date?: string;
  time?: string;
  activity?: string;
  address?: string
}
