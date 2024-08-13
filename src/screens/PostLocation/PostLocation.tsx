import { SafeScreen } from "@/components/template";
import { useTheme } from "@/theme";
import { heights } from "@/theme/_config";
import { RootStackParamList } from "@/types/navigation";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";
import RNMapView, { Details, Region } from "react-native-maps";
import { useState } from "react";
import { IInitialMapState } from "@/types/maps";

const PostLocation = ({}: PostLocationScreenType) => {
  const { layout, gutters, backgrounds, fonts } = useTheme();

  const [mapState, setMapState] = useState<IInitialMapState>({
    region: {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
  });

  const _onRegionChange = (region: Region, details: Details) => {
    setMapState((pS) => ({ ...pS, region: region }));
  };

  const { height } = Dimensions.get("window");
  const screenHeight = height - heights.bottomTabBarHeight;

  return (
    <SafeScreen>
        <View
          style={[
            {
              height: screenHeight,
              position: 'relative'
            },
          ]}
        >
          <View style={{ position: 'absolute', top: 0, zIndex: 1,  borderWidth: 2, borderColor: 'blue', width: '100%'  }} >
            <Text>Top</Text>
          </View>
          <View style={{ position: 'absolute', bottom: 0, zIndex: 1, width: '100%', borderWidth: 2, borderColor: 'red' }} >
            <Text>Top</Text>
          </View>
          <RNMapView
            style={{ ...StyleSheet.absoluteFillObject }}
            initialRegion={mapState.region}
            onRegionChange={_onRegionChange}
          >
          
          </RNMapView>
        </View>
    </SafeScreen>
  );
};

type PostLocationScreenType = NativeStackScreenProps<
  RootStackParamList,
  "PostLocation"
>;

export default PostLocation;
