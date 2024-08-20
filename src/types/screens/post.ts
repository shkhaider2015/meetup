import { Dayjs } from "dayjs";
import React from "react";
import { SvgProps } from "react-native-svg";

export type PostInputProps = {
    onPress?: () => void;
    data?: PostData
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
    imageUri?: string;
    activity?: {
        label?: string;
        Icon?: React.FC<SvgProps>;
    }
}