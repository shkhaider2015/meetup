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

export interface IPostReducer {
  _id: string;
  details?: string;
  image?: string;
  location?: IPostLocation;
  date?: Date;
  time?: Date;
  activity?: string;
  isLikedByMe?: boolean;
  user: IPostUser;
  createdAt: string;
  updatedAt: string;
}

interface IPostLocation {
  latitude: number;
  longitude: number;
}

interface IPostUser {
  _id: string;
  name: string;
  profileImage: string;
  cometchat: {
    id: string
  }
}