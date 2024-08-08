import { GridView, MapView } from "@/assets/icon";
import { useTheme } from "@/theme";
import { ISegmentButtons, SegmentState } from "@/types/segmentButtons";
import { useEffect, useRef, useState } from "react";
import { Animated, BackHandler, TouchableOpacity, View } from "react-native";

const SegmentButtons = (props: ISegmentButtons) => {
  const { onPress = () => {} } = props;
  const { layout, backgrounds, borders } = useTheme();
  const [viewLayout, setViewLayout] = useState<SegmentState>("GRID_VIEW");

  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: viewLayout === "MAP_VIEW" ? 0 : 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [viewLayout]);

  const animatedLeft = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 80], // Adjust the width based on the button width
  });

  const _onPress = (value: SegmentState) => {
    setViewLayout(value);
    onPress(value);
  };

  const width = 160;
  const height = 50;

  return (
    <View
      style={[
        layout.row,
        layout.justifyCenter,
        layout.itemsCenter,
        borders.w_1,
        borders.gray50,
        borders.rounded_24,
        backgrounds.gray00,
        { width: width, height: height, position: "relative" },
      ]}
    >
      <Animated.View
        style={{
          position: "absolute",
          left: animatedLeft,
          width: (width/2),
          height: height - 1,
          backgroundColor: backgrounds.primary.backgroundColor,
          borderRadius: 24,
        }}
      />
      <TouchableOpacity
        onPress={() => {
        _onPress("MAP_VIEW")
        }}
        style={[
          layout.row,
          layout.justifyCenter,
          layout.itemsCenter,
          borders.rounded_24,
          { width: width / 2 - 1, height: height - 1, zIndex: 10 },
        ]}
      >
        <MapView
          color={
            viewLayout === "MAP_VIEW"
              ? backgrounds.gray00.backgroundColor
              : backgrounds.primary.backgroundColor
          }
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          _onPress("GRID_VIEW");
        }}
        style={[
          layout.row,
          layout.justifyCenter,
          layout.itemsCenter,
          borders.rounded_24,
          { width: width / 2 - 1, height: height - 1, zIndex: 10 },
        ]}
      >
        <GridView
          color={
            viewLayout === "GRID_VIEW"
              ? backgrounds.gray00.backgroundColor
              : backgrounds.primary.backgroundColor
          }
        />
      </TouchableOpacity>
    </View>
  );
};

export default SegmentButtons;
