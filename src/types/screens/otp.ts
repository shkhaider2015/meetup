import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";
import { RootStackParamList } from "../navigation";
import { Dispatch, SetStateAction } from "react";

export type stateType = "IDLE" | "START" | "FINISH";

export type setStateType = Dispatch<SetStateAction<stateType>>

export type OTPScreenType = NativeStackScreenProps<RootStackParamList, "OTP">;

export type CounterProps = {
    state: stateType;
    setState: setStateType
}