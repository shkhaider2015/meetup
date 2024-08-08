import { ImageSourcePropType } from "react-native";

export interface INotificationItem {
    id?: string;
    image?: ImageSourcePropType;
    user_name?: string;
    notification?: string;
    created_at?: string;
}