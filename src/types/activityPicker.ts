import React from "react";
import { SvgProps } from "react-native-svg";

export type ActivityPickerProps = {
    open: boolean;
    onClose?: () => void;
    onConfirm?: (label:string | undefined, icon: React.FC<SvgProps> | undefined) => void; 
}