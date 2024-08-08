import { DummyLaraBeu } from "@/assets/dummyImages";
import { useTheme } from "@/theme";
import { fontFamily } from "@/theme/_config";
import { INotificationItem } from "@/types/notificationItem";
import { Image, Text, TouchableOpacity, View } from "react-native";

const NotificationItem = (props: INotificationItem) => {
  const { image, user_name, created_at, notification } = props;
  const { fonts, gutters, layout } = useTheme();

  return (
    <TouchableOpacity activeOpacity={.5} style={[ layout.row, layout.itemsCenter, layout.justifyStart, {columnGap: 20} ]} >
      <View style={[ layout.flex_1 ]} >
        <Image source={image} style={{ width: 60, height: 60 }} />
      </View>
      <View style={[ layout.col, { flex: 6, height: 55} ]} >
        <View style={[ layout.row, layout.justifyBetween, layout.itemsCenter ]} >
          <Text style={[ fonts.size_16, fonts.gray800, fontFamily._500_Medium ]} >{user_name}</Text>
          <Text style={[ fonts.size_14, fontFamily._300_Light, fonts.gray250 ]} >{created_at}</Text>
        </View>
        <Text style={[ fonts.size_12, fontFamily._400_Regular, fonts.gray250 ]} >{notification}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default NotificationItem;
