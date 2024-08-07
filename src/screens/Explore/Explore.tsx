import { Button, SafeScreen } from "@/components/template";
import { useTheme } from "@/theme";
import { heights } from "@/theme/_config";
import { RootStackParamList } from "@/types/navigation";
import {
  Animated,
  Dimensions,
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
} from "react-native";
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";
import MapView, { Polygon } from "react-native-maps";
import {
  Cat_Running,
  Cat_Swimming,
  GridView,
  MapView as MapViewIcon,
} from "@/assets/icon";
import { useEffect, useRef, useState } from "react";
import { Post, SegmentButtons } from "@/components";
import {
  DummyJohnson,
  DummyJohnsonPost,
  DummyLaraBeu,
  DummyUserLocation,
} from "@/assets/dummyImages";
import { IPost } from "@/types/post";
import { SegmentState } from "@/types/segmentButtons";

const Explore = ({}: ExploreScreenType) => {
  const [view, setView] = useState<SegmentState>("GRID_VIEW");
  const { layout, gutters, backgrounds, fonts } = useTheme();
  const screenHeight = Dimensions.get("window").height;

  return (
    <SafeScreen>
      <View
        style={[
          backgrounds.gray30,
          {
            height:
              screenHeight -
              heights.tabNavigationHeader -
              heights.bottomTabBarHeight,
          },
        ]}
      >
        <View
          style={[
            layout.row,
            layout.justifyEnd,
            gutters.paddingVertical_12,
            {
              zIndex: 2,
            },
          ]}
        >
          <SegmentButtons onPress={(val) => setView(val)} />
        </View>
        {view === "GRID_VIEW" ? (
          <FlatList
            data={PostsData}
            renderItem={({ item }) => <Post {...item} />}
            keyExtractor={(item, ind) => item.id || ind.toString()}
            contentContainerStyle={[{ paddingBottom: 40 }]}
          />
        ) : (
          <MapView
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
          </MapView>
        )}

        {/* <MapView
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
        </MapView> */}
      </View>
    </SafeScreen>
  );
};

const dummyDesc = `Skaterboarding at Whistler Skateboard park at 4 pm 20th May.Skating is my cherished hobby, a daily ritual I eagerly anticipate. At precisely 4 PM, I glide onto the smooth pavement of Central Park, indulging in the exhilarating freedom it offers. 

Each graceful turn and twist brings me profound joy, a temporary escape from the daily hustle. In this serene setting, I find solace and rejuvenation, making my daily skate a cherished part of my routine.
`;
const PostsData: IPost[] = [
  {
    user: {
      name: "Lara Beu",
      imageSource: DummyLaraBeu,
    },
    distance: "3km",
    Doing_icon: <Cat_Running />,
    main_post: DummyUserLocation,
    created_at: "3 hours ago",
    desc: dummyDesc,
  },
  {
    user: {
      name: "Johnson",
      imageSource: DummyJohnson,
    },
    distance: "3km",
    Doing_icon: <Cat_Swimming />,
    main_post: DummyJohnsonPost,
    created_at: "3 hours ago",
    desc: dummyDesc,
  },
];

type ExploreScreenType = NativeStackScreenProps<RootStackParamList, "Explore">;

export default Explore;
