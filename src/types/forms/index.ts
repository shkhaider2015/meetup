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