import { DummyUser } from "@/assets/dummyImages";
import {
  Activity,
  Cat_Drinking,
  Cat_Fitness,
  Cat_Mountain_Climb,
  Cat_Others,
  Cat_Reading,
  Cat_Running,
  Cat_Shopping,
  Cat_Skateboarding,
  Cat_Sports,
  Cat_Swimming,
  Clock,
  Close,
  DateIcon,
  ImageIcon,
  LocationIcon,
} from "@/assets/icon";
import { ActivityPicker, DatePicker } from "@/components";
import { Button, SafeScreen } from "@/components/template";
import { useGlobalBottomSheet, useKeyboardVisible } from "@/hooks";
import { useTheme } from "@/theme";
import { fontFamily, heights } from "@/theme/_config";
import { RootStackParamList } from "@/types/navigation";
import {
  PostData,
  PostHeaderProps,
  PostInputMenu,
  PostInputProps,
} from "@/types/screens/post";
import {
  getRegionForCoordinates,
  requestLocationPermission,
  requestLocationPermissionCross,
} from "@/utils";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  PermissionsAndroid,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from "react-native-image-picker";
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";
import { SvgProps } from "react-native-svg";
import Toast from "react-native-toast-message";
import Geolocation from "react-native-geolocation-service";
import { string } from "zod";
import dayjs, { Dayjs } from "dayjs";
import RNMapView, { Marker } from "react-native-maps";

const Post = ({ navigation }: PostScreenType) => {
  const { layout, gutters, backgrounds, fonts, borders, colors } = useTheme();
  const { height, width } = Dimensions.get("window");
  const screenHeight = height - heights.bottomTabBarHeight;
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [showActivity, setShowActivity] = useState(false);
  const [location, setLocation] = useState<Geolocation.GeoPosition | boolean>(
    false
  );
  const [post, setPost] = useState<PostData>({
    date: dayjs(),
    time: dayjs(),
    location: {
      latitude: 24.928096242353995,
      longitude: 67.0176518149674,
    },
    imageUri:
      "file:///data/user/0/com.meetup/cache/rn_image_picker_lib_temp_ac2a108c-c4b8-43fd-adc9-437ee579baf3.jpg",
    // imageUri: undefined,
    activity: {
      label: "Reading",
      Icon: Cat_Reading,
    },
  });

  const isKeyboardVisible = useKeyboardVisible();

  useLayoutEffect(() => {}, []);

  const _onPressInput = () => {
    if (!isKeyboardVisible) Keyboard.dismiss();
  };

  const _OnShowCalender = () => {
    Keyboard.dismiss();

    setShowDate(true);
  };

  const _OnShowTime = () => {
    Keyboard.dismiss();

    setShowTime(true);
  };

  const _onShowGallery = async () => {
    const options: ImageLibraryOptions = {
      selectionLimit: 1,
      mediaType: "photo",
    };

    const result = await launchImageLibrary(options);

    if (result.errorCode) {
      Toast.show({
        type: "error",
        text1: "Something wromng happen",
      });
    }

    if (result.assets?.[0].uri) {
      setPost((post) => ({
        ...post,
        imageUri: result.assets?.[0].uri,
      }));
    }
  };

  const _onShowActivity = () => {
    Keyboard.dismiss();
    setShowActivity(true);
  };

  const _onGoToLocation = (location: Geolocation.GeoPosition | undefined) => {
    navigation.navigate("PostLocation", {
      location,
      onSelectLocation(lat, long) {
        setPost((post) => ({
          ...post,
          location: {
            latitude: lat,
            longitude: long,
          },
        }));
      },
    });
  };

  const _onCancelPost = () => {
    console.log("cancel : ");

    navigation.goBack();
  };

  const getLocation = async () => {
    if (Platform.OS === "ios") {
      const iosResult = await Geolocation.requestAuthorization("whenInUse");
      if (iosResult === "granted") {
        Geolocation.getCurrentPosition(
          (position) => {
            console.log(position);
            _onGoToLocation(position);
            // setLocation(position);
          },
          (error) => {
            // See error code charts below.
            console.log(error.code, error.message);
            _onGoToLocation(undefined);
            // setLocation(false);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      }
      console.log("IosResult : ", iosResult);
      return;
    }
    const result = requestLocationPermissionCross();
    result
      .then((res) => {
        console.log("res is:", res);
        if (res) {
          Geolocation.getCurrentPosition(
            (position) => {
              console.log(position);
              _onGoToLocation(position);
              // setLocation(position);
            },
            (error) => {
              // See error code charts below.
              console.log(error.code, error.message);
              _onGoToLocation(undefined);
              // setLocation(false);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
          );
        } else {
          _onGoToLocation(undefined);
        }
      })
      .catch((err) => {
        _onGoToLocation(undefined);
      });
    console.log(location);
  };

  const _onConfirmDate = (type: "TIME" | "DATE", val: Dayjs) => {
    if (type === "TIME") {
      setPost((post) => ({
        ...post,
        time: val,
      }));
      // let time = dayjs()
      // time.hour()
      // console.log("Time  in confirm", val, time.format('h-m-s a'));
    } else {
      setPost((post) => ({
        ...post,
        date: val,
      }));
    }
  };

  const _onConfirmActivity = (
    label: string | undefined,
    icon: React.FC<SvgProps> | undefined
  ) => {
    if (label && icon) {
      setPost((post) => ({
        ...post,
        activity: {
          label: label,
          Icon: icon,
        },
      }));
    }
  };

  const _onCancelData = (type: "DATA" | "IMAGE" | "LOCATION") => {
    switch (type) {
      case "DATA":
        setPost((post) => ({
          ...post,
          date: undefined,
          time: undefined,
          activity: undefined,
        }));
        break;
      case "IMAGE":
        setPost((post) => ({
          ...post,
          imageUri: undefined,
        }));
        break;
      case "LOCATION":
        setPost((post) => ({
          ...post,
          location: undefined,
        }));
        break;
      default:
        break;
    }
  };

  console.log("Post ^^ : ", post);

  return (
    <SafeScreen>
        <KeyboardAvoidingView
          style={[layout.flex_1]}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View
            style={[
              gutters.paddingHorizontal_12,
              gutters.paddingVertical_12,
              backgrounds.gray00,
              {
                height: "100%",
              },
            ]}
          >
            <PostHeader onCancel={_onCancelPost} />
            <PostInput onPress={_onPressInput} />
            <View style={[{ flex: 2 }]}>
              {post.location && !post.imageUri && (
                <View
                  style={[
                    borders.w_1,
                    borders.gray100,
                    gutters.paddingHorizontal_4,
                    gutters.paddingVertical_4,
                    backgrounds.gray30,
                    layout.relative,
                    {
                      width: "100%",
                      height: 250,
                      borderRadius: 20,
                    },
                  ]}
                >
                  <TouchableOpacity
                    style={[
                      layout.absolute,
                      layout.top0,
                      layout.right0,
                      layout.justifyCenter,
                      layout.itemsCenter,
                      backgrounds.gray150,
                      {
                        width: 30,
                        height: 30,
                        borderRadius: 40,
                        marginTop: -27,
                        marginRight: -5,
                      },
                    ]}
                    onPress={() => _onCancelData("LOCATION")}
                  >
                    <Close color={colors.gray800} width={20} height={20} />
                  </TouchableOpacity>
                  <RNMapView
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                    initialRegion={{
                      ...getRegionForCoordinates([
                        {
                          latitude: post.location.latitude || 0,
                          longitude: post.location.longitude || 0,
                        },
                      ]),
                    }}
                  >
                    <Marker
                      coordinate={{
                        latitude: post.location.latitude || 0,
                        longitude: post.location.longitude || 0,
                      }}
                    />
                  </RNMapView>
                </View>
              )}
              {post.imageUri && (
                <ImageBackground
                  source={{ uri: post.imageUri }}
                  style={{
                    width: "100%",
                    height: 250,
                    position: "relative",
                  }}
                  imageStyle={[borders.rounded_16]}
                >
                  <TouchableOpacity
                    style={[
                      layout.absolute,
                      layout.top0,
                      layout.right0,
                      layout.justifyCenter,
                      layout.itemsCenter,
                      backgrounds.gray150,
                      {
                        width: 30,
                        height: 30,
                        borderRadius: 40,
                        marginTop: -8,
                        marginRight: -5,
                      },
                    ]}
                    onPress={() => _onCancelData("IMAGE")}
                  >
                    <Close color={colors.gray800} width={20} height={20} />
                  </TouchableOpacity>
                </ImageBackground>
              )}

              {(post.activity || post.date || post.time) && (
                <View
                  style={[
                    layout.row,
                    layout.justifyBetween,
                    layout.itemsCenter,
                    gutters.padding_10,
                    backgrounds.gray150,
                    borders.rounded_4,
                    gutters.marginTop_24,
                  ]}
                >
                  <View
                    style={[
                      layout.row,
                      layout.justifyStart,
                      layout.itemsCenter,
                    ]}
                  >
                    {post.activity?.Icon && (
                      <post.activity.Icon color={colors.gray800} />
                    )}
                    <Text style={[fonts.gray800, fontFamily._400_Regular]}>
                      {"   "}- {post.activity?.label} -{" "}
                      {post.date?.format("DD MMM")}{" "}
                      {post.time?.format("hh:mm a")}{" "}
                    </Text>
                  </View>
                  <Close
                    color={colors.gray800}
                    onPress={() => _onCancelData("DATA")}
                  />
                </View>
              )}
            </View>
            <PostMenu
              onPressDateIcon={_OnShowCalender}
              onPressTimeIcon={_OnShowTime}
              onPressLocationIcon={getLocation}
              onPressImageIcon={_onShowGallery}
              onPressActivityIcon={_onShowActivity}
            />
            {/* <View style={{ height: 10 }} /> */}
            {/* {!keyboardVisible && (
          <View>
            <Button label="Next" type="PRIMARY" onPress={_onNext} />
          </View>
        )} */}

            <DatePicker
              open={showDate}
              type="DATE"
              onCancel={() => setShowDate(false)}
              onConfirm={(value) => _onConfirmDate("DATE", value)}
            />
            <DatePicker
              open={showTime}
              type="TIME"
              onCancel={() => setShowTime(false)}
              onConfirm={(value) => _onConfirmDate("TIME", value)}
            />

            <ActivityPicker
              open={showActivity}
              onClose={() => setShowActivity(false)}
              onConfirm={_onConfirmActivity}
            />
          </View>
        </KeyboardAvoidingView>
    </SafeScreen>
  );
};

const PostHeader = ({ onCancel }: PostHeaderProps) => {
  const { fonts, layout, gutters } = useTheme();
  return (
    <View
      style={[
        layout.row,
        layout.justifyBetween,
        layout.itemsCenter,
        { height: 70 },
      ]}
    >
      <View
        style={[
          layout.row,
          layout.justifyStart,
          layout.itemsCenter,
          gutters.gap_8,
        ]}
      >
        <TouchableOpacity onPress={() => onCancel?.()}>
          <Close width={30} height={30} color={fonts.gray800.color} />
        </TouchableOpacity>
        <Image source={DummyUser} />
        <Text style={[fontFamily._500_Medium, fonts.size_16, fonts.gray800]}>
          Lara Beu
        </Text>
      </View>
      <TouchableOpacity>
        <Text style={[fontFamily._600_SemiBold, fonts.size_16, fonts.primary]}>
          Post
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const PostInput = ({ onPress }: PostInputProps) => {
  const { fonts, layout, gutters, colors } = useTheme();
  const isKeyboardVisible = useKeyboardVisible();
  const inputRef = useRef<TextInput>(null);

  const _onPress = () => {
    onPress?.();

    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  };

  return (
    // <KeyboardAvoidingView
    //   style={[layout.flex_1]}
    //   behavior={Platform.OS === "ios" ? "height" : "height"}
    // >
    <TouchableOpacity
      style={[
        layout.flex_1,
        {
          paddingBottom: isKeyboardVisible ? 0 : 60,
        },
      ]}
      onPress={_onPress}
      activeOpacity={1}
    >
      <TextInput
        ref={inputRef}
        style={[fonts.gray800, fonts.size_14]}
        placeholder="Enter your thoughts...."
        multiline={true}
        selectionColor={colors.gray800}
        scrollEnabled={true}
        autoFocus={true}
      />
    </TouchableOpacity>
    // </KeyboardAvoidingView>
  );
};

const PostMenu = (props: PostInputMenu) => {
  const {
    onPressDateIcon,
    onPressImageIcon,
    onPressLocationIcon,
    onPressTimeIcon,
    onPressActivityIcon,
  } = props;
  const { layout, colors, gutters } = useTheme();

  const _onPressIcon = (
    value: "TIME" | "DATE" | "LOCATION" | "IMAGE" | "ACTIVITY"
  ) => {
    switch (value) {
      case "DATE":
        onPressDateIcon?.();
        break;
      case "IMAGE":
        onPressImageIcon?.();
        break;
      case "LOCATION":
        onPressLocationIcon?.();
        break;
      case "TIME":
        onPressTimeIcon?.();
        break;
      case "ACTIVITY":
        onPressActivityIcon?.();
        break;
      default:
        break;
    }
  };

  return (
    <View
      style={[
        layout.row,
        layout.justifyEnd,
        layout.itemsStart,
        gutters.gap_24,
        gutters.paddingRight_24,
        {
          height: Platform.OS === "ios" ? 50 : 80,
        },
      ]}
    >
      <TouchableOpacity onPress={() => _onPressIcon("IMAGE")}>
        <ImageIcon width={30} height={30} color={colors.gray800} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => _onPressIcon("LOCATION")}>
        <LocationIcon width={30} height={30} color={colors.gray800} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => _onPressIcon("ACTIVITY")}>
        <Activity width={30} height={30} color={colors.gray800} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => _onPressIcon("DATE")}>
        <DateIcon width={30} height={30} color={colors.gray800} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => _onPressIcon("TIME")}>
        <Clock width={30} height={30} color={colors.gray800} />
      </TouchableOpacity>
    </View>
  );
};

type PostScreenType = NativeStackScreenProps<RootStackParamList, "Post">;

export default Post;
