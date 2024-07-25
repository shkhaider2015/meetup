import React from "react"
import { TextInputProps } from "react-native"

// export type IInputFieldProps = {
//     ...TextInputProps
// }

export interface IInputFieldProps extends TextInputProps {
    rightIcon?: React.ReactElement;
    inputType?: InputTypes
}

type InputTypes = "TEXT" | "PASSWORD" | "NUMBER"