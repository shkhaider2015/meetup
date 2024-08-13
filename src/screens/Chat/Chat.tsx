import { SafeScreen } from "@/components/template";
import { useTheme } from "@/theme";
import { RootStackParamList } from "@/types/navigation";
import { Dimensions, ScrollView, Text, View } from "react-native";
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";
import LimitTimePicker from "react-native-limit-timepicker";

const Chat = ({}: ChatScreenType) => {
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
            borderWidth: 2,
            borderColor: "red",
          },
        ]}
      >
        <Text style={[fonts.size_24, fonts.black]}>Chat Screen</Text>
        <LimitTimePicker
            customMinutesData={[0, 15, 30, 45]}
            onChangeHour={(value:any) => console.log("hour: ", value)}
            onChangeMinute={(value:any) => console.log("minute: ", value)}
            onChangePeriod={(value:any) => console.log("period: ", value)}
            minDate={new Date()}
            time={new Date()}
          />
      </View>
    </ScrollView>
  </SafeScreen>;
};

type ChatScreenType = NativeStackScreenProps<RootStackParamList, "Chat">;

export default Chat;
