import { SafeScreen } from "@/components/template";
import { heights } from "@/theme/_config";
import { ExploreTabsParamList } from "@/types/navigation";
import { Dimensions, StyleSheet, View } from "react-native";
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";
import RNMapView, { Details, Region } from "react-native-maps";
import { useState } from "react";
import { IInitialMapState } from "@/types/maps";
import {
  Cat_Charity,
  Cat_Cooking,
  Cat_Gaming,
  Cat_Music,
  Cat_Reading,
  Cat_Running,
  Cat_Swimming,
} from "@/assets/icon";
import {
  Dummy_Joe,
  Dummy_Maxwell,
  DummyFarnese,
  DummyJohnson,
  DummyLaraBeu,
} from "@/assets/dummyImages";
import { ICustomMarker } from "@/types/customMarker";
import CustomMarker from "@/components/CustomMarker/CustomMarker";

const MapView = ({ navigation }: MapViewScreenType) => {
  const screenHeight =
    Dimensions.get("window").height -
    (heights.bottomTabBarHeight +
      heights.tabNavigationHeader +
      heights.exploreTabsHeader +
      40);

  const [mapState, setMapState] = useState<IInitialMapState>({
    region: {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
  });

  const _onRegionChange = (region: Region, details: Details) => {;
    setMapState((pS) => ({ ...pS, region: region }));
  };

  return (
    <SafeScreen>
      <View
        style={[
          {
            height: screenHeight,
          },
        ]}
      >
        <RNMapView
          provider="google"
          style={{
            ...StyleSheet.absoluteFillObject,
          }}
          initialRegion={mapState.region}
          onRegionChange={_onRegionChange}
        >
          {data.map((item) => (
            <CustomMarker {...item} />
          ))}
        </RNMapView>
      </View>
    </SafeScreen>
  );
};

const data: ICustomMarker[] = [
  {
    latitude: 37.790579,
    longitude: -122.421425,
    user_image: DummyLaraBeu,
    CatIcon: <Cat_Cooking color={"#FFFFFF"} />,
  },
  {
    latitude: 37.786433,
    longitude: -122.447653,
    user_image: DummyFarnese,
    CatIcon: <Cat_Charity color={"#FFFFFF"} />,
  },
  {
    latitude: 37.761274,
    longitude: -122.443179,
    user_image: DummyJohnson,
    CatIcon: <Cat_Gaming color={"#FFFFFF"} />,
    backgroundColor: '#CFD8DC'
  },
  {
    latitude: 37.745512,
    longitude: -122.41348,
    user_image: Dummy_Maxwell,
    CatIcon: <Cat_Swimming color={"#FFFFFF"} />,
  },
  {
    latitude: 37.755806,
    longitude: -122.441552,
    user_image: Dummy_Joe,
    CatIcon: <Cat_Music color={"#FFFFFF"} />,
  },
  {
    latitude: 37.772102,
    longitude: -122.39029,
    user_image: DummyFarnese,
    CatIcon: <Cat_Reading color={"#FFFFFF"} />,
    backgroundColor: '#01ff45'
  },
  {
    latitude: 37.773602,
    longitude: -122.444264,
    user_image: DummyLaraBeu,
    CatIcon: <Cat_Running color={"#FFFFFF"} />,
    backgroundColor: '#08b5ff'
  },
];

type MapViewScreenType = NativeStackScreenProps<
  ExploreTabsParamList,
  "MapView"
>;

export default MapView;
