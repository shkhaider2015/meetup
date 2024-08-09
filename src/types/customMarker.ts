import React from "react";
import { ImageSourcePropType } from "react-native";

export interface ICustomMarker {
    latitude: number;
    longitude: number;
    user_image: ImageSourcePropType;
    CatIcon: React.ReactElement;
    backgroundColor?: string;
    onPress?: () => void;
}