import { Button } from '@/components/template';
import { activityData, IActivity } from '@/constants/activities';
import { updateProfile } from '@/services/users';
import { AppDispatch, RootState } from '@/store';
import { setUser } from '@/store/slices/userSlice';
import { useTheme } from '@/theme';
import { fontFamily } from '@/theme/_config';
import { RootStackParamList } from '@/types/navigation';
import { convertImageURLforngRok } from '@/utils';
import { useMutation } from '@tanstack/react-query';
import _ from 'lodash';
import { useLayoutEffect, useState } from 'react';
import {
  Dimensions,
  ScrollView,
  StatusBar,
  Text,
  View,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  StyleSheet,
} from 'react-native';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';

const activitiesData: IActivityInterests[] = _.cloneDeep(activityData).map(
  (item) => ({ ...item, isSelected: false }),
);

const Interests = ({ navigation }: InterestsScreenType) => {
  const { layout, gutters, backgrounds, fonts, colors } = useTheme();
  const screenHeight = Dimensions.get('window').height;

  const user = useSelector((state: RootState) => state.user);
  const [activities, setActivities] = useState(activitiesData);
  const [error, setError] = useState<string>();

  const dispatch: AppDispatch = useDispatch();
  const { isPending, mutate } = useMutation({
    mutationFn: (data: { activitiesToAdd: string[] }) => {
      return updateProfile(user._id, data);
    },
    onSuccess: (data) => {
      Toast.show({
        type: 'success',
        text1: 'Interests updated successfully',
      });
      dispatch(
        setUser({
          ...user,
          ...data,
          profileImage: convertImageURLforngRok(data.profileImage),
        }),
      );
      _onClose();
    },
    onError: (error) => {
      Toast.show({
        type: 'error',
        text1: 'Interests update failed',
        text2: error.message,
      });
    },
  });

  const categoryStyle: StyleProp<ViewStyle> = [
    gutters.paddingHorizontal_12,
    gutters.marginHorizontal_12,
    { height: 50 },
  ];

  const _onSelect = (id: string, isSelected: boolean) => {
    const data = _.cloneDeep(activities).map((item) =>
      item.id === id
        ? {
            ...item,
            isSelected: isSelected,
          }
        : item,
    );

    setActivities(data);
  };

  const renderItem = (item: IActivityInterests, index: number) => {
    let isTwo = false;

    if (index % 5 === 0 || index % 5 === 1) isTwo = true;
    else isTwo = false;

    const isIndented = index % 5 === 1 || index % 5 === 3;

    return (
      <View style={[{ width: isTwo ? '37%' : '30%' }]}>
        <Button
          label={item.label}
          Icon={
            <item.Icon
              color={item.isSelected ? colors.gray00 : colors.primary}
              width={22}
              height={22}
            />
          }
          type={item.isSelected ? 'PRIMARY' : 'SECONDARY'}
          onPress={() => _onSelect(item.id, !item.isSelected)}
          containerStyle={[{ height: 50 }]}
        />
      </View>
    );
  };

  const _onCreate = () => {
    const selectedActivities = activities
      .filter((item) => item.isSelected)
      .map((item) => item.id);
    if (selectedActivities.length === 0) {
      Toast.show({
        type: 'info',
        text1: 'No Interest is selected',
        text2: 'Please select at least one interest',
      });
      setError('No activity selected');
      return;
    }
    mutate({
      activitiesToAdd: selectedActivities,
    });
  };

  const _onSkip = () => {
    _onClose();
    navigation.replace('Tabs');
  };

  useLayoutEffect(() => {
    StatusBar.setBackgroundColor('#FE434E00');
    StatusBar.setBarStyle('dark-content');
    StatusBar.setTranslucent(true);
  }, []);

  const _onClose = () => {
    StatusBar.setBackgroundColor(backgrounds.gray00.backgroundColor);
    StatusBar.setBarStyle('dark-content');
    StatusBar.setTranslucent(false);
  };

  return (
    <View
      style={[
        layout.flex_1,
        gutters.paddingHorizontal_24,
        gutters.paddingVertical_12,
        layout.fullHeight,
        backgrounds.primary04,
        {
          minHeight: screenHeight,
          paddingTop: 75,
        },
      ]}
    >
      <View
        style={[
          layout.col,
          {
            flex: 5,
            // borderWidth: 2,
            // borderColor: 'green'
          },
        ]}
      >
        <View>
          <Text
            style={[
              fontFamily._600_SemiBold,
              fonts.size_32,
              fonts.alignCenter,
              fonts.black,
            ]}
          >
            Select Up to 3 Interests
          </Text>
          <Text style={[fonts.alignCenter, fonts.gray250, fonts.size_16]}>
            Tell us what piques your curiosity and passions
          </Text>
        </View>
        <ScrollView>
          <View
            style={[
              layout.row,
              layout.justifyCenter,
              gutters.marginVertical_24,
              layout.wrap,
              { rowGap: 20, columnGap: 15 },
            ]}
          >
            {activities.map((item, index) => renderItem(item, index))}
          </View>
        </ScrollView>
      </View>
      <View
        style={[
          layout.justifyCenter,
          {
            flex: 1,
          },
        ]}
      >
        <TouchableOpacity onPress={_onSkip}>
          <Text style={[fonts.primary, fonts.alignCenter]}>Skip for now</Text>
        </TouchableOpacity>
        <Button
          label="Add Interests"
          containerStyle={[gutters.marginVertical_12]}
          onPress={_onCreate}
          loading={isPending}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  twoItem: {},
  threeItem: {},
});

interface IActivityInterests extends IActivity {
  isSelected: boolean;
}

type InterestsScreenType = NativeStackScreenProps<
  RootStackParamList,
  'Ineterests'
>;

export default Interests;
