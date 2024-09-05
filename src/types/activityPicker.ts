import { IActivity } from "@/constants/activities";
import React from "react";
import { SvgProps } from "react-native-svg";

export type ActivityPickerProps = {
    open: boolean;
    isMulti?: boolean;
    initialData?: string[]
    onClose?: () => void;
    onConfirm?: (activities:IActivity[] ) => void;
}

export interface IActivityPicker extends IActivity {
    isSelected: boolean;
}