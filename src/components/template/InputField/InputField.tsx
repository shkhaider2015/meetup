import { useTheme } from "@/theme";
import { IInputFieldProps } from "@/types/templates/InputField";
import { useState } from "react";
import { Image, TextInput, View } from "react-native";

const InputField = (props:IInputFieldProps) => {
  const { onPress, keyboardType, inputType="TEXT" } = props;
  const { borders, backgrounds, gutters } = useTheme();
  const [isActive, setIsActive] = useState<boolean>(false)

  return (
    <View
      style={[
        backgrounds.gray50,
        borders.w_1,
        isActive ? borders.purple500 : borders.gray100 ,
        borders.rounded_24,
        gutters.paddingHorizontal_12
      ]}
    >
      <TextInput
        {...props}
        keyboardType={keyboardType}
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
      />
      {
        inputType === 'PASSWORD' && <Image src="" />
      }
    </View>
  );
};

export default InputField;
