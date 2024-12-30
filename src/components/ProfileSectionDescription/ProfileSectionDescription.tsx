import { useTheme } from '@/theme';
import { fontFamily } from '@/theme/_config';
import _ from 'lodash';
import { Text, View } from 'react-native';
import { ShopRemove } from '@/assets/icon';
import EmptyIcon from "@/components/EmptyIcon/EmptyIcon";

const ProfileSectionDescriptions = (props:IProfileSectionDescription) => {
  const { name, profession, description } = props;
  const { layout, gutters, backgrounds, fonts, colors } = useTheme();

  const text = `Inspiring you to live an active life ⚡️ \nAthlete — @nutrabay @athlab.in @royalsportnfitness \n“If something stands between you and your success, move it. Never be denied.”`;

  const renderTextWithHighlights = (text: string | undefined) => {
    if(!text || _.isEmpty(text)) return 'Please update your profile'
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
      <View>
        <View style={[layout.row, layout.justifyStart, gutters.gap_10]}>
          <Text style={[fontFamily._500_Medium, fonts.size_16, fonts.gray800]}>
            {'Profession'}
          </Text>
          <View style={{ width: 1, height: 20, backgroundColor: colors.gray300 }} />
          {profession ? (
          <Text
            style={[
              fontFamily._700_Bold,
              fonts.size_14,
              fonts.gray800,
            ]}
          >
            {profession}
          </Text>
        ) : (
        <EmptyIcon/>
        )}
        </View>

        {/* {profession ? (
          <Text
            style={[
              fontFamily._700_Bold,
              fonts.size_14,
              fonts.gray800,
              gutters.marginTop_8,
            ]}
          >
            {profession}
          </Text>
        ) : (
        <EmptyIcon/>
        )} */}
      </View>
      <View style={[gutters.marginTop_16]}>
        <Text style={[fontFamily._500_Medium, fonts.size_16, fonts.gray800]}>
          About
        </Text>
        {description && description.length >0 ?(
          <Text
            style={[
              fontFamily._400_Regular,
              fonts.size_12,
              fonts.gray800,
              gutters.paddingVertical_10,
              fonts.alignCenter,
            ]}
          >
            {renderTextWithHighlights(description)}
          </Text>
        ) : ( <View style={[ gutters.marginTop_10 ]} > <EmptyIcon/> </View>
         
        )}
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
