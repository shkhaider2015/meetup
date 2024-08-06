import {
  Cat_Charity,
  Cat_Cooking,
  Cat_Fashioon,
  Cat_Gaming,
  Cat_Music,
  Cat_Painting,
  Cat_PawPrint,
  Cat_Photography,
  Cat_Reading,
  Cat_Speech,
  Cat_Travel,
} from "@/assets/icon";
import { Button } from "@/components/template";
import { useTheme } from "@/theme";
import { fontFamily } from "@/theme/_config";
import { RootStackParamList } from "@/types/navigation";
import {
  Dimensions,
  ScrollView,
  StatusBar,
  Text,
  View,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from "react-native";
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";

const Interests = ({ navigation }: InterestsScreenType) => {
  const { layout, gutters, backgrounds, fonts } = useTheme();
  const screenHeight = Dimensions.get("window").height;

  const categoryStyle: StyleProp<ViewStyle> = [
    gutters.paddingHorizontal_12,
    gutters.marginHorizontal_12,
    { height: 50 },
  ];

  return (
    <>
      <StatusBar
        translucent={true}
        backgroundColor={"#FE434E00"}
        barStyle={"dark-content"}
      />
      <ScrollView style={[layout.flex_1, backgrounds.primary04]}>
        <View
          style={[
            layout.flex_1,
            gutters.paddingHorizontal_24,
            gutters.paddingVertical_12,
            layout.fullHeight,
            {
              minHeight: screenHeight - 75,
            },
          ]}
        >
          <View
            style={[
              layout.col,
              {
                flex: 4,
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
            <View
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
            </View>
          </View>
          <View
            style={[
              layout.justifyCenter,
              {
                flex: 1,
                // borderWidth: 2,
                // borderColor: 'blue'
              },
            ]}
          >
            <TouchableOpacity>
              <Text style={[fonts.primary, fonts.alignCenter]}>
                Skip for now
              </Text>
            </TouchableOpacity>
            <Button
              label="Create Account"
              containerStyle={[gutters.marginVertical_12]}
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
};

type InterestsScreenType = NativeStackScreenProps<
  RootStackParamList,
  "Ineterests"
>;

export default Interests;
