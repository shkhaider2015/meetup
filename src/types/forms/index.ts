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
