import {
  DummyJohnson,
  DummyJohnsonPost,
  DummyLaraBeu,
  DummyUserLocation,
} from "@/assets/dummyImages";
import { Cat_Running, Cat_Swimming } from "@/assets/icon";
import { Post } from "@/components";
import { SafeScreen } from "@/components/template";
import { useTheme } from "@/theme";
import { heights } from "@/theme/_config";
import { ExploreTabsParamList } from "@/types/navigation";
import { IPost } from "@/types/post";
import { Dimensions, FlatList, ScrollView, Text, View } from "react-native";
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";

const ListView = ({}: ListViewScreenType) => {
  const { layout, gutters, backgrounds, fonts } = useTheme();
  const screenHeight =
    Dimensions.get("window").height -
    (heights.bottomTabBarHeight +
      heights.tabNavigationHeader +
      heights.exploreTabsHeader +
      40);

  return (
    <SafeScreen>
      <View
        style={[
          gutters.paddingVertical_12,
          {
            height: screenHeight,
          },
        ]}
      >
        <FlatList
          data={PostsData}
          renderItem={({ item }) => <Post {...item} />}
          keyExtractor={(item, ind) => item.id || ind.toString()}
          contentContainerStyle={[{ paddingBottom: 40 }]}
        />
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

type ListViewScreenType = NativeStackScreenProps<
  ExploreTabsParamList,
  "ListView"
>;

export default ListView;
