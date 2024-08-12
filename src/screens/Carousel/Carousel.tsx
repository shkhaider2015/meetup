import { Button } from "@/components/template";
import { useTheme } from "@/theme";
import { RootStackParamList } from "@/types/navigation";
import {
  Dimensions,
  Image,
  StatusBar,
  Text,
  View,
} from "react-native";
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";
import ReanimatedCarousel from "react-native-reanimated-carousel";
import { Close } from "@/assets/icon";
import { fontFamily } from "@/theme/_config";
import { useLayoutEffect } from "react";

const Carousel = ({ navigation, route }: CarouselScreenType) => {
  const { images, selectedIndex } = route.params;

  const { layout, gutters, backgrounds, fonts } = useTheme();
  const screenWidth = Dimensions.get("window").width;

  useLayoutEffect(() => {
    StatusBar.setBackgroundColor(backgrounds.gray500.backgroundColor);
    StatusBar.setBarStyle("light-content");
  }, []);

  const onGoBack = () => {
    StatusBar.setBackgroundColor(backgrounds.gray00.backgroundColor);
    StatusBar.setBarStyle("dark-content");
    navigation.goBack();
  };

  return (<View style={[layout.flex_1, backgrounds.gray500]}>
        <ReanimatedCarousel
          loop={false}
          width={screenWidth}
          autoPlay={false}
          data={images}
          defaultIndex={selectedIndex}
          scrollAnimationDuration={1000}
          renderItem={({ item, index }) => (
            <View style={[layout.flex_1]}>
              <View
                style={[
                  layout.flex_1,
                  layout.justifyCenter,
                  layout.itemsEnd,
                  gutters.paddingRight_32,
                  gutters.paddingTop_32,
                ]}
              >
                <Button
                  Icon={<Close color={"#000000"} />}
                  isCirculer={true}
                  type="SECONDARY"
                  onPress={onGoBack}
                  containerStyle={[ backgrounds.gray100 ]}
                />
              </View>
              <View
                style={[layout.justifyCenter, layout.itemsCenter, { flex: 6 }]}
              >
                <Image source={item} />
              </View>
              <View
                style={[
                  layout.flex_1,
                  layout.justifyCenter,
                  layout.itemsCenter,
                ]}
              >
                <Text
                  style={[fonts.gray00, fontFamily._500_Medium, fonts.size_24]}
                >
                  {index + 1 + " / " + images.length}
                </Text>
              </View>
            </View>
          )}

        />
      </View>
  );
};

type CarouselScreenType = NativeStackScreenProps<
  RootStackParamList,
  "Carousel"
>;

export default Carousel;
