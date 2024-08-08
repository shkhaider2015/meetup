import React from "react";
import { ImageSourcePropType } from "react-native";
import { SvgProps } from "react-native-svg";


export interface IPost {
    id?: string;
    user: {
        name: string,
        imageSource: ImageSourcePropType | undefined
    }
    main_post: ImageSourcePropType | undefined;
    distance: string;
    Doing_icon: React.ReactElement;
    created_at: string;
    desc: string;
}