export interface IUserReducer {
    id: string;
    name: string;
    email: string;
    profile_image: string;
    isLoggedIn: boolean;
    token: string;
    cometchat: {
      authToken: string;
      id: string;
    }
  }