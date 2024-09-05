export interface IUserReducer {
    _id: string;
    name: string;
    email: string;
    profileImage: string;
    isLoggedIn: boolean;
    token: string;
    cometchat: {
      authToken: string;
      id: string;
    },
    activities: string[];
    bio: string;
  }