import { useTheme } from "@/theme";
import { IInputFieldProps } from "@/types/templates/InputField";
import { useState, useRef, useEffect } from "react";
import {
  Image,
  TextInput,
  TouchableOpacity,
  View,
  Animated,
} from "react-native";
import { Eye, EyeSlash } from "@/assets/icon";

const InputField = (props: IInputFieldProps) => {
  const { inputType = "TEXT" } = props;
  const { borders, backgrounds, gutters, layout } = useTheme();
  const [isActive, setIsActive] = useState<boolean>(false);
  const [secureText, setSecureText] = useState<boolean>(false);

  // Create an animated value for the border color
  const borderColor = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(borderColor, {
      toValue: isActive ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isActive]);

  // Interpolate the border color value
  const interpolatedBorderColor = borderColor.interpolate({
    inputRange: [0, 1],
    outputRange: [borders.gray100.borderColor, borders.purple500.borderColor], // Adjust these colors to match your theme
  });
  const _onPressEyeIcon = () => setSecureText((pS) => !pS);

  return (
    <Animated.View
      style={[
        backgrounds.gray50,
        borders.w_1,
        borders.rounded_24,
        gutters.paddingHorizontal_12,
        layout.row,
        layout.itemsCenter,
        {
          borderColor: interpolatedBorderColor,
        },
      ]}
    >
      <TextInput
        {...props}
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
        style={[layout.flex_1]}
        secureTextEntry={inputType === "PASSWORD" ? secureText : false}
      />
      {inputType === "PASSWORD" && (
        <TouchableOpacity onPress={_onPressEyeIcon}>
          {secureText ? <EyeSlash c /> : <Eye />}
        </TouchableOpacity>
      )}
    </Animated.View>
  );
};

export default InputField;
