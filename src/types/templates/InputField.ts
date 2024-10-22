import React, { ReactElement } from "react"
import { TextInputProps } from "react-native"

// export type IInputFieldProps = {
//     ...TextInputProps
// }

export interface IInputFieldProps extends TextInputProps {
    rightIcon?: React.ReactElement;
    inputType?: InputTypes;
    isError?: boolean;
    disable?: boolean;
    rows?: number;
    Lefticon?: React.ReactElement;
    inputHeight?: number
}

type InputTypes = "TEXT" | "PASSWORD" | "NUMBER"