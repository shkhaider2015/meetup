import { SafeScreen } from "@/components/template";
import { useTheme } from "@/theme";
import { RootStackParamList } from "@/types/navigation";
import { Dimensions, ScrollView, Text, View } from "react-native";
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";

const Explore = ({}: ExploreScreenType) => {
  const { layout, gutters, backgrounds, fonts } = useTheme();
  const screenHeight = Dimensions.get("window").height;

  return <SafeScreen>
    <ScrollView>
      <View
        style={[
          gutters.paddingHorizontal_24,
          gutters.paddingVertical_12,
          layout.itemsCenter,
          layout.justifyCenter,
          {
            height: screenHeight,
          },
        ]}
      >
        <Text style={[fonts.size_24, fonts.black]}>Explore Screen</Text>
      </View>
    </ScrollView>
  </SafeScreen>;
};

type ExploreScreenType = NativeStackScreenProps<RootStackParamList, "Explore">;

export default Explore;
