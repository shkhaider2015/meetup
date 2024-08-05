export interface IUserLoginForm {
    email: string;
    password: string;
  }
  export interface IUserReducer {
    id: string;
    full_name: string;
    email: string;
    isLoggedIn: boolean;
  }