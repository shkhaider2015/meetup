import { useTheme } from "@/theme";
import { fontFamily } from "@/theme/_config";
import { IButton } from "@/types/templates/button";
import {
  Button as RNButton,
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

const Button = (props: IButton) => {
  const {
    label,
    Icon,
    isCirculer = false,
    type = "PRIMARY",
    onPress,
    containerStyle = [],
    textStyle = [],
  } = props;

  const { layout, backgrounds, borders, colors, fonts } = useTheme();

  const defaultStyles: StyleProp<ViewStyle> = [
    layout.row,
    layout.justifyCenter,
    layout.itemsCenter,
    borders.rounded_32,
    {
      height: 54,
    },
  ];
  const primaryStyles: StyleProp<ViewStyle> = [backgrounds.primary];
  const secondaryStyles: StyleProp<ViewStyle> = [
    backgrounds.gray30,
    borders.w_1,
    borders.gray150,
  ];

  const defaultTextStyles: StyleProp<TextStyle> = [
    fonts.gray00,
    fontFamily._500_Medium,
    fonts.size_14,
  ];
  const primaryTextStyles: StyleProp<TextStyle> = [fonts.gray00];
  const secondaryTextStyles: StyleProp<TextStyle> = [fonts.gray800];

  const mainStyles: StyleProp<ViewStyle> = [...defaultStyles];
  const mainTextStyles: StyleProp<ViewStyle> = [...defaultTextStyles];

  // if(sty) mainStyles.push(...styles)
  if (type === "PRIMARY") {
    mainStyles.push(...primaryStyles);
    mainTextStyles.push(...primaryTextStyles);
  } else {
    mainStyles.push(...secondaryStyles);
    mainTextStyles.push(...secondaryTextStyles);
  }

  if(Icon) mainTextStyles.push({marginLeft: 8})

  const _onPress = () => {
    onPress?.();
  };

  return (
    <TouchableOpacity
      style={[...mainStyles, ...containerStyle]}
      onPress={_onPress}
      activeOpacity={.7}
    >
      {Icon && Icon}
      {label && <Text style={[...mainTextStyles, ...textStyle]}>{label}</Text>}
    </TouchableOpacity>
  );
};

export default Button;
