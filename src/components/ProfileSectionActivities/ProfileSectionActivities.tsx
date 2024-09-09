import { activityData } from '@/constants/activities';
import { useTheme } from '@/theme';
import { fontFamily } from '@/theme/_config';
import { widthInPercentage } from '@/utils';
import _ from 'lodash';
import { FlatList, Text, View } from 'react-native';

const ProfileSectionActivites = (props: IProfileSectionActivities) => {
  const { activities = [] } = props;

  const { layout, gutters, backgrounds, fonts, colors } = useTheme();

  return (
    <View style={[gutters.paddingHorizontal_32]}>
        {
            !_.isEmpty(activities) && <Text style={[fontFamily._500_Medium, fonts.size_16, fonts.gray800]}>
            Activities
          </Text>
        }
      
      <FlatList
        horizontal={true}
        data={activityData
          .filter((item) => activities.some((id) => item.id === id))
          .map((activity) => (
            <activity.Icon
              color={colors.primary}
              width={widthInPercentage(6.5)}
              height={widthInPercentage(6.5)}
            />
          ))}
        renderItem={({ item, index }) => (
          <View
            style={[
              index === 0
                ? gutters.paddingRight_24
                : gutters.paddingHorizontal_24,
              layout.justifyCenter,
              {
                height: 35,
              },
            ]}
          >
            {item}
          </View>
        )}
        ItemSeparatorComponent={() => (
          <View style={[backgrounds.gray100, { width: 2, height: 35 }]} />
        )}
        contentContainerStyle={[gutters.marginVertical_12]}
      />
    </View>
  );
};

interface IProfileSectionActivities {
  activities?: string[];
}
export default ProfileSectionActivites;
