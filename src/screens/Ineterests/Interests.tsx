import { Button } from '@/components/template';
import { activityData, IActivity } from '@/constants/activities';
import { useTheme } from '@/theme';
import { fontFamily } from '@/theme/_config';
import { RootStackParamList } from '@/types/navigation';
import _ from 'lodash';
import { useState } from 'react';
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

const activitiesData: IActivityInterests[] = _.cloneDeep(activityData).map(
  (item) => ({ ...item, isSelected: false }),
);

const Interests = ({ navigation }: InterestsScreenType) => {
  const { layout, gutters, backgrounds, fonts, colors } = useTheme();
  const screenHeight = Dimensions.get('window').height;

  const [activities, setActivities] = useState(activitiesData);
  const [error, setError] = useState<string>();

  const categoryStyle: StyleProp<ViewStyle> = [
    gutters.paddingHorizontal_12,
    gutters.marginHorizontal_12,
    { height: 50 },
  ];

  const _onSelect = (id:string , isSelected: boolean) => {
    const data = _.cloneDeep(activities).map(item => item.id === id ? ({
      ...item,
      isSelected: isSelected
    }): item )

    setActivities(data)
  }

  const renderItem = (item: IActivityInterests, index: number) => {
    let isTwo = false;

    if(index % 5 === 0 || index % 5 === 1) isTwo = true;
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
          containerStyle={[{height: 50}]}
        />
      </View>
    );
  };

  const _onCreate = () => {
    const selectedActivities = activities.filter(item => item.isSelected).map(item => item.id)
    if(selectedActivities.length === 0) {
      setError("No activity selected");
      return
    }

    navigation.navigate("Tabs")
  }

  const _onSkip = () => {
    navigation.navigate("Tabs")
  }

  return (
    <>
      <StatusBar
        translucent={true}
        backgroundColor={'#FE434E00'}
        barStyle={'dark-content'}
      />

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
          {/* <View
              style={[
                layout.row,
                layout.justifyCenter,
                layout.itemsCenter,
                gutters.paddingVertical_12,
                gutters.marginTop_12,
              ]}
            >
              <Button
                Icon={<Cat_Charity color={"white"} />}
                label="Charity"
                type="PRIMARY"
                containerStyle={[...categoryStyle]}
              />
              <Button
                Icon={<Cat_Cooking color={"black"} />}
                label="Cooking"
                type="SECONDARY"
                containerStyle={[...categoryStyle]}
              />
            </View>
            <View style={[layout.row, layout.justifyStart, layout.itemsCenter]}>
              <Button
                Icon={<Cat_Fashioon color={"black"} />}
                label="Fashion"
                type="SECONDARY"
                containerStyle={[...categoryStyle]}
              />
              <Button
                Icon={<Cat_Gaming color={"black"} />}
                label="Gaming"
                type="SECONDARY"
                containerStyle={[...categoryStyle]}
              />
              <Button
                Icon={<Cat_Music color={"white"} />}
                label="Music"
                type="PRIMARY"
                containerStyle={[...categoryStyle]}
              />
            </View>
            <View
              style={[
                layout.row,
                layout.justifyCenter,
                layout.itemsCenter,
                gutters.paddingVertical_12,
              ]}
            >
              <Button
                Icon={<Cat_Reading color={"white"} />}
                label="Reading"
                type="PRIMARY"
                containerStyle={[...categoryStyle]}
              />
              <Button
                Icon={<Cat_Photography color={"black"} />}
                label="Photography"
                type="SECONDARY"
                containerStyle={[...categoryStyle]}
              />
            </View>
            <View style={[layout.row, layout.justifyStart, layout.itemsCenter]}>
              <Button
                Icon={<Cat_Painting color={"black"} />}
                label="Painting"
                type="SECONDARY"
                containerStyle={[...categoryStyle]}
              />
              <Button
                Icon={<Cat_Cooking color={"white"} />}
                label="Cooking"
                type="PRIMARY"
                containerStyle={[...categoryStyle]}
              />
              <Button
                Icon={<Cat_Travel color={"black"} />}
                label="Travel"
                type="SECONDARY"
                containerStyle={[...categoryStyle]}
              />
            </View>
            <View
              style={[
                layout.row,
                layout.justifyCenter,
                layout.itemsCenter,
                gutters.paddingVertical_12,
              ]}
            >
              <Button
                Icon={<Cat_PawPrint color={"white"} />}
                label="Pets"
                type="PRIMARY"
                containerStyle={[...categoryStyle]}
              />
              <Button
                Icon={<Cat_Speech color={"black"} />}
                label="Politics"
                type="SECONDARY"
                containerStyle={[...categoryStyle]}
              />
            </View> */}
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
            label="Create Account"
            containerStyle={[gutters.marginVertical_12]}
            onPress={_onCreate}
          />
        </View>
      </View>
    </>
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
