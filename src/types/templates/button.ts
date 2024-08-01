import {  Falsy, RecursiveArray, RegisteredStyle, StyleProp, TextStyle, ViewStyle } from "react-native";
import { SvgProps } from "react-native-svg";



export interface IButton  {
    isCirculer?: boolean;
    Icon?: React.FC<SvgProps>;
    label?: string;
    type?: "PRIMARY" | "SECONDARY"
    onPress?: () => void;
    containerStyle?: RecursiveArray<Falsy | ViewStyle | RegisteredStyle<ViewStyle>>;
    textStyle?: RecursiveArray<Falsy | TextStyle | RegisteredStyle<TextStyle>>;
}