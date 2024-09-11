import { useTheme } from "@/theme";
import { fontFamily } from "@/theme/_config";
import _ from "lodash";
import { StyleProp, Text, TextStyle } from "react-native";

const DetailText = (props: IDetailText) => {
    const {
      text,
      maxLength = 50,
      highlightedText = 'See more ...',
      onPressHighlighText,
    } = props;
    const { fonts } = useTheme();

    if(_.isUndefined(text)) return <Text></Text>
  
    if (text.length < maxLength) {
      return <Text style={[fonts.gray300, fontFamily._400_Regular, props.style]}>{text}</Text>;
    }
  
    return (
      <Text style={[fonts.gray300, fontFamily._400_Regular, props.style]}>
        {text?.slice(0, maxLength)}{' '}
        <Text
          style={[fonts.primary, props.highlightTextStyle]}
          onPress={onPressHighlighText}
        >
          {highlightedText}
        </Text>
      </Text>
    );
  };
  
  interface IDetailText {
    text?: string;
    maxLength?: number;
    highlightedText?: string;
    onPressHighlighText?: () => void;
    style?: StyleProp<TextStyle>;
    highlightTextStyle?: StyleProp<TextStyle>;
  }

  export default DetailText