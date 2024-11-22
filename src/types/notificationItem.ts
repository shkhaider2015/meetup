import { ImageSourcePropType } from 'react-native';

export interface INotificationItem {
  _id: string;
  title: string;
  message: string;
  isRead: boolean;
  redirectPath: string;
  type: string;
  createdAt: string;
  sender: {
    id: string;
    name: string;
    profileImage: string;
  };
}
