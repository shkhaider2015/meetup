import { DummyJohnsonPost } from '@/assets/dummyImages';
import { Persons } from '@/assets/icon';
import { useTheme } from '@/theme';
import { fontFamily } from '@/theme/_config';
import { widthInPercentage } from '@/utils';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Image } from '../template';

const ProfileHeadSection = (props: IProfileHeadSection) => {
  const { profileImage, isCurrentUser, onPressButton } = props;
  const { layout, gutters, backgrounds, fonts, borders } = useTheme();
  return (
    <View
      style={[
        layout.row,
        layout.justifyStart,
        layout.itemsCenter,
        gutters.gap_10,
        backgrounds.gray00,
        gutters.paddingVertical_32,
        gutters.paddingHorizontal_24,
        {
          borderBottomStartRadius: 30,
          borderBottomEndRadius: 30,
        },
      ]}
    >
      {/* Image column */}
      <View
        style={[
          layout.justifyCenter,
          layout.itemsCenter,
          backgrounds.error,
          {
            width: widthInPercentage(40),
            height: widthInPercentage(40),
            borderRadius: 100,
            ...styles.profileImage,
          },
        ]}
      >
        {/* <Image
          source={!isCurrentUser ? DummyJohnsonPost : { uri: profileImage }}
          style={{
            width: widthInPercentage(39),
            height: widthInPercentage(39),
            borderRadius: 100,
          }}
        /> */}
        <Image imageURL={profileImage} containerStyle={{
          width: widthInPercentage(39),
          height: widthInPercentage(39),
          borderRadius: 300
        }} fastImageProp={{ style: { borderRadius: 300 } }} />
      </View>
      {/* Details Column */}
      <View style={[{ flex: 1, rowGap: 20 }]}>
        {/* Followers section */}
        <View
          style={[
            layout.row,
            isCurrentUser ? layout.justifyCenter : layout.justifyStart,
            layout.itemsCenter,
            gutters.paddingRight_10,
            gutters.gap_10,
          ]}
        >
          {/* Followers */}
          <View
            style={[
              layout.row,
              layout.justifyBetween,
              layout.itemsEnd,
              gutters.gap_8,
            ]}
          >
            <Persons
              width={widthInPercentage(8)}
              height={widthInPercentage(8)}
            />
            <View style={[layout.col]}>
              <Text
                style={[fontFamily._700_Bold, fonts.gray800, { fontSize: 14 }]}
              >
                1,232
              </Text>
              <Text
                style={[
                  fonts.size_10,
                  fontFamily._500_Medium,
                  fonts.gray800,
                  { marginTop: -5 },
                ]}
              >
                Followers
              </Text>
            </View>
          </View>
          {/* Following */}
          {
            isCurrentUser && <View
            style={[
              layout.row,
              layout.justifyStart,
              layout.itemsEnd,
              gutters.gap_8,
            ]}
          >
            <Persons
              width={widthInPercentage(8)}
              height={widthInPercentage(8)}
            />
            <View style={[layout.col]}>
              <Text
                style={[fontFamily._700_Bold, fonts.gray800, { fontSize: 14 }]}
              >
                1,232
              </Text>
              <Text
                style={[
                  fonts.size_10,
                  fontFamily._500_Medium,
                  fonts.gray800,
                  { marginTop: -5 },
                ]}
              >
                Following
              </Text>
            </View>
          </View>
          }
          
        </View>
        {/* Edit Profile / Follow button */}
        {isCurrentUser ? (
          <Button
            label="Edit Profile"
            type={'PRIMARY'}
            containerStyle={[
              backgrounds.gray800,
              borders.rounded_16,
              { width: '60%', height: 45 },
            ]}
            onPress={onPressButton}
          />
        ) : (
          <Button
            label="Follow"
            type={'PRIMARY'}
            containerStyle={[
              borders.rounded_16,
              { width: '60%', height: 45 },
            ]}
            onPress={onPressButton}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileImage: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

interface IProfileHeadSection {
  profileImage?: string;
  followers?: string;
  following?: string;
  onPressButton?: () => void;
  isCurrentUser: boolean;
}

export default ProfileHeadSection;
