import { MarkerLayout } from "@/assets/images";
import { useTheme } from "@/theme";
import { ICustomMarker } from "@/types/customMarker";
import { Image, View } from "react-native";
import { Marker } from "react-native-maps";

const CustomMarker = (props:ICustomMarker) => {
const { latitude, longitude, user_image, CatIcon, backgroundColor="#FE434E", onPress } = props;
  const { backgrounds, layout, gutters } = useTheme();
  return (
    <Marker
      style={[layout.row, layout.itemsStart]}
      coordinate={{ latitude: latitude, longitude: longitude }}
    >
      <View style={[layout.relative]}>
        <MarkerLayout
          color={backgroundColor}
          width={50}
          height={80}
        />
        <Image
          source={user_image}
          style={[
            layout.absolute,
            gutters.marginLeft_8,
            gutters.marginTop_8,
            {
              width: 35,
              height: 35,
            },
          ]}
        />
      </View>
      {
        CatIcon && <View
        style={[
          layout.justifyCenter,
          layout.itemsCenter,
          gutters.marginTop_12,
          gutters.marginLeft_4,
          backgrounds.primary,
          {
            width: 35,
            height: 35,
            borderRadius: 50,
          },
        ]}
      >
        {CatIcon}
      </View>
      }
      
    </Marker>
  );
};

export default CustomMarker;
