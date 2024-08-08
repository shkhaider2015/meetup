import { Dummy_Joe, Dummy_Johnson2, Dummy_LaraBeu2, Dummy_Maxwell, Dummy_Meetup, DummyFarnese, DummyLaraBeu, DummyMeetupBell, DummyMercey } from "@/assets/dummyImages";
import { NotificationItem } from "@/components";
import { SafeScreen } from "@/components/template";
import { useTheme } from "@/theme";
import { heights } from "@/theme/_config";
import { RootStackParamList } from "@/types/navigation";
import { INotificationItem } from "@/types/notificationItem";
import { Dimensions, FlatList, ScrollView, Text, View } from "react-native";
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";

const Notifications = ({}: NotificationsScreenType) => {
  const { layout, gutters, backgrounds, fonts } = useTheme();
  const screenHeight =
    Dimensions.get("window").height -
    (heights.bottomTabBarHeight + heights.tabNavigationHeader);

  return (
    <SafeScreen>
      <View
        style={[
          // gutters.paddingHorizontal_24,
          // gutters.paddingVertical_12,
          backgrounds.gray30,
          {
            height: screenHeight,
          },
        ]}
      >
        <FlatList 
          data={dummyData}
          renderItem={({item}) => <NotificationItem {...item} />}
          keyExtractor={(item, ind) => item.id || ind.toString() }
          ItemSeparatorComponent={() => <View style={[ gutters.marginVertical_12, {height: 1, backgroundColor: '#a5a4a846'} ]}  />}
          contentContainerStyle={{
            paddingVertical: 34,
            paddingHorizontal: 24
          }}
        />
        {/* <NotificationItem /> */}
      </View>
    </SafeScreen>
  );
};

const dummyData:INotificationItem[] = [
  {
    id: "111",
    user_name: "Farnese Vandimion",
    created_at: "14:28",
    notification: "Farnese liked your photo.",
    image: DummyFarnese
  },
  {
    id: "112",
    user_name: "Joe",
    created_at: "1:12",
    notification: "Joe visited your profile.",
    image: Dummy_Joe
  },
  {
    id: "113",
    user_name: "Meetup",
    created_at: "Yesterday",
    notification: "Our services will be down around 4pm may 13th 2024",
    image: Dummy_Meetup
  },
  {
    id: "114",
    user_name: "Farnese Vandimion",
    created_at: "Yesterday",
    notification: "Farnese liked your photo.",
    image: DummyLaraBeu
  },
  {
    id: "115",
    user_name: "Maxwell",
    created_at: "14:28 14 april",
    notification: "Maxwell reacted to your activity.",
    image: Dummy_Maxwell
  },
  {
    id: "116",
    user_name: "Meetup",
    created_at: "14:28 12 april",
    notification: "Alert! related your activity Skateboard park....",
    image: DummyMeetupBell
  },
  {
    id: "117",
    user_name: "Farnese Vandimion",
    created_at: "14:28 11 april",
    notification: "Farnese liked your photo.",
    image: DummyFarnese
  },
  {
    id: "118",
    user_name: "Farnese Vandimion",
    created_at: "14:28 11 april",
    notification: "Farnese liked your photo.",
    image: Dummy_LaraBeu2
  },
  {
    id: "119",
    user_name: "Johnson",
    created_at: "14:28 10 april",
    notification: "Johnson commented on your activity.",
    image: Dummy_Johnson2
  },
  {
    id: "120",
    user_name: "Mercy",
    created_at: "14:28 6 april",
    notification: "Mercy saved your activity.",
    image: DummyMercey
  }
]

type NotificationsScreenType = NativeStackScreenProps<
  RootStackParamList,
  "Notifications"
>;

export default Notifications;
