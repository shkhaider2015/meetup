import { IActivity } from "@/constants/activities";
import { Dayjs } from "dayjs";
import React from "react";
import { Asset } from "react-native-image-picker";
import { SvgProps } from "react-native-svg";

export type PostInputProps = {
    onPress?: () => void;
    onChange?: (text:string) => void;
    text?: string
}

export type PostInputMenu = {
    onPressImageIcon?: () => void;
    onPressLocationIcon?: () => void;
    onPressDateIcon?: () => void;
    onPressTimeIcon?: () => void;
    onPressActivityIcon?: () => void;
}

export type PostHeaderProps = {
    onCancel?: () => void;
    onPost?: () => void;
}

export type PostData = {
    text?: string;
    location?: {
        latitude?: number;
        longitude?: number;
    };
    date?: Dayjs;
    time?: Dayjs;
    imageUri?: Asset;
    activity?: IActivity
}