import React from "react"
import { TextInputProps } from "react-native"

// export type IInputFieldProps = {
//     ...TextInputProps
// }

export interface IInputFieldProps extends TextInputProps {
    rightIcon?: React.ReactElement;
    inputType?: InputTypes,
    isError?: boolean
}

type InputTypes = "TEXT" | "PASSWORD" | "NUMBER"