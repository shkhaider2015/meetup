import React from "react";

export type position  = "TOP" | "BOTTOM" 
export interface IMenu {
    type?: position;
    data?: IData[]
}

export interface IData {
    Icon?: React.ReactElement;
    label?: string;
    onPress?: () => void;
}