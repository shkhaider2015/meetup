import { MarkerLayout } from "@/assets/images";
import { useTheme } from "@/theme";
import { ICustomMarker } from "@/types/customMarker";
import { IPost } from "@/types/post";
import { convertImageURLforngRok, getIconByID } from "@/utils";
import { Image, View } from "react-native";
import { Marker } from "react-native-maps";
import UserModal from "../Modals/User";
import { useState } from "react";

const CustomMarker = (props:IPost) => {
const { location, user, activity } = props;

const [showDetails, setShowDetails] = useState(false)
  const { backgrounds, layout, gutters, colors } = useTheme();

  const CatIcon = getIconByID(activity || '');

  return (
    <Marker
      style={[layout.row, layout.itemsStart]}
      coordinate={{ latitude: location?.latitude || 0, longitude: location?.longitude || 0}}
      onPress={()=> setShowDetails(true)}
    >
      <View style={[layout.relative]}>
        <MarkerLayout
          color={colors.primary}
          width={50}
          height={80}
        />
        <Image
          source={{ uri: convertImageURLforngRok(user.profileImage) }}
          style={[
            layout.absolute,
            gutters.marginLeft_8,
            gutters.marginTop_8,
            {
              width: 35,
              height: 35,
              borderRadius: 40,
              borderWidth: 1,
              borderColor: '#FFFFFF'
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
        {<CatIcon color={colors.gray00} />}
      </View>
      }
      <UserModal
        open={showDetails}
        onClose={() => setShowDetails(false)}
        data={props}
        />
    </Marker>
  );
};

export default CustomMarker;
