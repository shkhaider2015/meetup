import {
  DummyLaraProfile_1,
  DummyLaraProfile_2,
  DummyLaraProfile_3,
  DummyLaraProfile_4,
  DummyLaraProfile_5,
  DummyLaraProfile_6,
  DummyLaraProfilePic,
} from "@/assets/dummyImages";
import {
  Cat_Gaming,
  Cat_Music,
  Cat_Shopping,
  Cat_Travel,
  Persons,
} from "@/assets/icon";
import { Button, SafeScreen } from "@/components/template";
import { logout } from "@/services/users/fetchOne";
import { AppDispatch } from "@/store";
import { clearUser } from "@/store/slices/userSlice";
import { useTheme } from "@/theme";
import { fontFamily, heights } from "@/theme/_config";
import { RootStackParamList } from "@/types/navigation";
import { useMutation } from "@tanstack/react-query";
import {
  Dimensions,
  FlatList,
  Image,
  ImageURISource,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "react-native-screens/lib/typescript/native-stack/types";
import { useDispatch } from "react-redux";

const Profile = ({ navigation }: ProfileScreenType) => {
  const dispatch: AppDispatch = useDispatch();

  const { layout, gutters, backgrounds, fonts } = useTheme();
  const { isError, isPending, isSuccess, mutate } = useMutation({
    mutationFn: () => {
      return logout();
    },
    onSuccess(data, variables, context) {
      console.log("Success Logout : ", data, variables, context);
      dispatch(clearUser());
    },
  });
  const { height, width } = Dimensions.get("window");

  return (
    <SafeScreen>
      <ScrollView>
        <View
          style={[
            backgrounds.gray30,
            {
              minHeight:
                height -
                (heights.bottomTabBarHeight + heights.tabNavigationHeader),
            },
          ]}
        >
          <ProfileHead />
          <ProfileDescriptions />
          <ProfileActivites />
          <ImageGallery navigation={navigation} />
        </View>
      </ScrollView>
    </SafeScreen>
  );
};

const ProfileHead = () => {
  const { layout, gutters, backgrounds, fonts, borders } = useTheme();
  return (
    <View
      style={[
        layout.row,
        layout.justifyStart,
        layout.itemsCenter,
        gutters.gap_10,
        backgrounds.gray00,
        gutters.paddingVertical_32,
        gutters.paddingHorizontal_24,
        {
          borderBottomStartRadius: 30,
          borderBottomEndRadius: 30,
        },
      ]}
    >
      {/* Image column */}
      <View
        style={[
          layout.justifyCenter,
          layout.itemsCenter,
          backgrounds.error,
          {
            width: 160,
            height: 160,
            borderRadius: 100,
          },
        ]}
      >
        <Image
          source={DummyLaraProfilePic}
          style={{ width: 155, height: 155, borderRadius: 100 }}
        />
      </View>
      {/* Details Column */}
      <View style={[{ flex: 1, rowGap: 20 }]}>
        {/* Followers section */}
        <View
          style={[
            layout.row,
            layout.justifyBetween,
            layout.itemsCenter,
            gutters.paddingRight_10,
          ]}
        >
          {/* Followers */}
          <View
            style={[
              layout.row,
              layout.justifyStart,
              layout.itemsEnd,
              gutters.gap_8,
            ]}
          >
            <Persons width={40} height={40} />
            <View style={[layout.col]}>
              <Text
                style={[fontFamily._700_Bold, fonts.gray800, { fontSize: 18 }]}
              >
                1,232
              </Text>
              <Text
                style={[
                  fonts.size_10,
                  fontFamily._500_Medium,
                  fonts.gray800,
                  { marginTop: -5 },
                ]}
              >
                Followers
              </Text>
            </View>
          </View>
          {/* Following */}
          <View
            style={[
              layout.row,
              layout.justifyStart,
              layout.itemsEnd,
              gutters.gap_8,
            ]}
          >
            <Persons width={40} height={40} />
            <View style={[layout.col]}>
              <Text
                style={[fontFamily._700_Bold, fonts.gray800, { fontSize: 18 }]}
              >
                1,232
              </Text>
              <Text
                style={[
                  fonts.size_10,
                  fontFamily._500_Medium,
                  fonts.gray800,
                  { marginTop: -5 },
                ]}
              >
                Following
              </Text>
            </View>
          </View>
        </View>
        {/* Edit Profile button */}
        <Button
          label="Edit Profile"
          type="PRIMARY"
          containerStyle={[
            backgrounds.gray800,
            borders.rounded_16,
            { width: "60%", height: 45 },
          ]}
        />
      </View>
    </View>
  );
};

const ProfileDescriptions = () => {
  const { layout, gutters, backgrounds, fonts } = useTheme();

  const text = `Inspiring you to live an active life ⚡️ \nAthlete — @nutrabay @athlab.in @royalsportnfitness \n“If something stands between you and your success, move it. Never be denied.”`;

  const renderTextWithHighlights = (text: string) => {
    // Split the text on spaces to process each word
    const words = text.split(" ");

    return words.map((word, index) => {
      if (word.startsWith("@")) {
        // If the word starts with "@", apply the special style
        return (
          <Text key={index} style={[fonts.primary]}>
            {word + " "}
          </Text>
        );
      } else {
        return <Text key={index}>{word + " "}</Text>;
      }
    });
  };

  return (
    <View style={[gutters.paddingHorizontal_32, gutters.paddingVertical_24]}>
      <View
        style={[
          layout.row,
          layout.justifyStart,
          layout.itemsCenter,
          gutters.gap_6,
        ]}
      >
        <Text style={[fontFamily._700_Bold, fonts.size_14, fonts.gray800]}>
          Lara Beu
        </Text>
        <View style={[backgrounds.gray180, { width: 1, height: 14 }]} />
        <Text style={[fontFamily._700_Bold, fonts.size_14, fonts.gray800]}>
          Athlete
        </Text>
      </View>
      <View>
        <Text
          style={[
            fontFamily._400_Regular,
            fonts.size_12,
            fonts.gray800,
            gutters.paddingVertical_10,
          ]}
        >
          {renderTextWithHighlights(text)}
        </Text>
      </View>
    </View>
  );
};

const ProfileActivites = () => {
  const { layout, gutters, backgrounds, fonts, borders } = useTheme();
  return (
    <View style={[gutters.paddingHorizontal_32]}>
      <Text style={[fontFamily._500_Medium, fonts.size_14, fonts.gray800]}>
        Activities
      </Text>
      <FlatList
        horizontal={true}
        data={[
          <Cat_Shopping
            color={backgrounds.primary.backgroundColor}
            width={25}
            height={25}
          />,
          <Cat_Travel
            color={backgrounds.primary.backgroundColor}
            width={25}
            height={25}
          />,
          <Cat_Gaming
            color={backgrounds.primary.backgroundColor}
            width={25}
            height={25}
          />,
          <Cat_Music
            color={backgrounds.primary.backgroundColor}
            width={25}
            height={25}
          />,
        ]}
        renderItem={({ item, index }) => (
          <View
            style={[
              index === 0
                ? gutters.paddingRight_32
                : gutters.paddingHorizontal_32,
              layout.justifyCenter,
              {
                height: 35,
              },
            ]}
          >
            {item}
          </View>
        )}
        ItemSeparatorComponent={() => (
          <View style={[backgrounds.gray100, { width: 2, height: 35 }]} />
        )}
        contentContainerStyle={[gutters.marginVertical_12]}
      />
    </View>
  );
};

const ImageGallery = ({ navigation }: { navigation: Navigation }) => {
  const { layout, gutters, backgrounds, fonts, borders } = useTheme();
  const images: ImageURISource[] = [
    Image.resolveAssetSource(DummyLaraProfile_4),
    Image.resolveAssetSource(DummyLaraProfile_6),
    Image.resolveAssetSource(DummyLaraProfile_5),
    Image.resolveAssetSource(DummyLaraProfile_1),
    Image.resolveAssetSource(DummyLaraProfile_2),
    Image.resolveAssetSource(DummyLaraProfile_3),
  ];

  const uris = images
    .map((item, ind) => ({ id: ind, uri: item.uri?.toString() }))
    .filter((item) => item.uri);

  console.log("Uris ", uris);
  const _onImagePress = (id: number) => {
    navigation.navigate("Carousel", { images, selectedIndex: id });
  };

  return (
    <View style={[gutters.paddingVertical_16]}>
      <View style={[layout.row, layout.justifyBetween]}>
        <TouchableOpacity onPress={() => _onImagePress(0)}>
          <Image source={images[0]} />
        </TouchableOpacity>
        <View style={[gutters.gap_10]}>
          <TouchableOpacity onPress={() => _onImagePress(3)}>
            <Image source={images[3]} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => _onImagePress(4)}>
            <Image source={images[4]} />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={[layout.row, layout.wrap, gutters.gap_14, gutters.marginTop_6]}
      >
        <TouchableOpacity onPress={() => _onImagePress(1)}>
          <Image source={images[1]} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => _onImagePress(2)}>
          <Image source={images[2]} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => _onImagePress(5)}>
          <Image source={images[5]} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

type Navigation = NativeStackNavigationProp<RootStackParamList, "Profile">;
type ProfileScreenType = NativeStackScreenProps<RootStackParamList, "Profile">;

export default Profile;
