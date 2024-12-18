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
  };
  activities: string[];
  bio: string;
  profession: string;
  socialLinks: {
    instagram: string;
    x: string;
    facebook: string;
    snapchat: string;
    tiktok: string;
  }
}

export interface IPostReducer {
  _id: string;
  details?: string;
  image?: string;
  location?: IPostLocation;
  date?: Date;
  time?: Date;
  activity?: string;
  user: IPostUser;
  address?: string;
  isLikedByMe?: boolean;
  isChatStarts?: boolean;
  createdAt: string;
  updatedAt: string;
}

interface IPostLocation {
  coordinates: number[]
}

interface IPostUser {
  _id: string;
  name: string;
  profileImage: string;
  cometchat: {
    id: string;
  };
}

export interface IMessageRequest {
  _id: string;
  status: EMessageRequestStatus;
  message?: string;
  sender: {
    _id: string;
    name: string;
    profileImage: string;
    cometchat: {
      id: string
    }
  };
  receiver: {
    _id: string;
    name: string;
    profileImage: string;
    cometchat: {
      id: string
    }
  };
  createdAt: Date;
  updatedAt: Date;
}

export enum EMessageRequestStatus {
  ACCEPTED = 'ACCEPTED',
  DECLINED = 'DECLINED',
  PENDING = 'PENDING',
}

export interface IBadge {
  Chat: number;
  Notifications: number;
  Requests: number;
}
