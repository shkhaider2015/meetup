import { useTheme } from "@/theme";
import { fontFamily } from "@/theme/_config";
import _ from "lodash";
import { Text, View } from "react-native";

const ProfileSectionDescriptions = (props:IProfileSectionDescription) => {
  const { name, profession, description } = props;
  const { layout, gutters, backgrounds, fonts } = useTheme();

  const text = `Inspiring you to live an active life ⚡️ \nAthlete — @nutrabay @athlab.in @royalsportnfitness \n“If something stands between you and your success, move it. Never be denied.”`;

  const renderTextWithHighlights = (text: string | undefined) => {
    if(!text || _.isEmpty(text)) return
    // Split the text on spaces to process each word
    const words = text.split(' ');

    return words.map((word, index) => {
      if (word.startsWith('@')) {
        // If the word starts with "@", apply the special style
        return (
          <Text key={index} style={[fonts.primary]}>
            {word + ' '}
          </Text>
        );
      } else {
        return <Text key={index}>{word + ' '}</Text>;
      }
    });
  };

  return (
    <View style={[gutters.paddingHorizontal_32, gutters.paddingVertical_24]}>
      <View
        style={[
          layout.row,
          layout.justifyStart,
          layout.itemsCenter,
          gutters.gap_6,
        ]}
      >
        <Text style={[fontFamily._700_Bold, fonts.size_14, fonts.gray800]}>
          {name}
        </Text>
        <View style={[backgrounds.gray180, { width: 1, height: 14 }]} />
        <Text style={[fontFamily._700_Bold, fonts.size_14, fonts.gray800]}>
          {profession}
        </Text>
      </View>
      <View>
        <Text
          style={[
            fontFamily._400_Regular,
            fonts.size_12,
            fonts.gray800,
            gutters.paddingVertical_10,
          ]}
        >
          {renderTextWithHighlights(description)}
        </Text>
      </View>
    </View>
  );
};

interface IProfileSectionDescription {
    name?: string;
    profession?: string;
    description?: string;
}
export default ProfileSectionDescriptions;
