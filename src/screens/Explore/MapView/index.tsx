import { SafeScreen } from "@/components/template";
import { useTheme } from "@/theme";
import { heights } from "@/theme/_config";
import { ExploreTabsParamList } from "@/types/navigation";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";
import RNMapView, { Polygon } from "react-native-maps";

const MapView = ({ navigation }: MapViewScreenType) => {
  const { layout, gutters, backgrounds, fonts } = useTheme();
  const screenHeight =
    Dimensions.get("window").height -
    (heights.bottomTabBarHeight +
      heights.tabNavigationHeader +
      heights.exploreTabsHeader +
      40);

  return (
    <SafeScreen>
      <View
        style={[
          {
            height: screenHeight,
            borderWidth: 2,
            borderColor: "red",
          },
        ]}
      >
        <RNMapView
          provider="google"
          style={{
            ...StyleSheet.absoluteFillObject,
          }}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          liteMode={true}
        >
          <Polygon
            coordinates={[{ latitude: 37.78825, longitude: -122.4324 }]}
          />
        </RNMapView>
      </View>
    </SafeScreen>
  );
};

type MapViewScreenType = NativeStackScreenProps<
  ExploreTabsParamList,
  "MapView"
>;

export default MapView;
