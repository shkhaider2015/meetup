import { DummyUser } from "@/assets/dummyImages";
import {
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
import { DatePicker } from "@/components";
import { Button, SafeScreen } from "@/components/template";
import { useGlobalBottomSheet } from "@/hooks";
import { useTheme } from "@/theme";
import { fontFamily, heights } from "@/theme/_config";
import { RootStackParamList } from "@/types/navigation";
import { PostInputMenu, PostInputProps } from "@/types/screens/post";
import { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";
import { SvgProps } from "react-native-svg";

const Post = ({ navigation }: PostScreenType) => {
  const { layout, gutters, backgrounds, fonts } = useTheme();
  const { openBottomSheet, closeBottomSheet } = useGlobalBottomSheet();
  const { height } = Dimensions.get("window");
  const screenHeight = height - heights.bottomTabBarHeight;
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);

  const [keyboardVisible, setKeyBoardVisible] = useState(false);

  useEffect(() => {
    const showKeyboardListener = Keyboard.addListener(
      "keyboardDidShow",
      _showKeyboard
    );
    const hideKeyboardListener = Keyboard.addListener(
      "keyboardDidHide",
      _hideKeyboard
    );

    return () => {
      showKeyboardListener.remove();
      hideKeyboardListener.remove();
    };
  }, []);

  const _showKeyboard = () => {
    setKeyBoardVisible(true);
  };
  const _hideKeyboard = () => {
    setKeyBoardVisible(false);
  };

  const _onNext = () => {
    // openBottomSheet(<ActivityForSheet />, ["50%"]);
    // setShowTime(true)
    // setShowDate(true)
    navigation.navigate("PostLocation");
  };

  const _onPressInput = () => {
    if (!keyboardVisible) Keyboard.dismiss();
  };

  const _OnShowCalender = () => {
    Keyboard.dismiss();

    setShowDate(true);
  };
  const _OnShowTime = () => {
    Keyboard.dismiss();

    setShowTime(true);
  };

  const _onGoToLocation = () => {
    navigation.navigate("PostLocation");
  };

  return (
    <SafeScreen>
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
        <PostHeader />
        <PostInput onPress={_onPressInput} />
        {keyboardVisible && (
          <PostMenu
            onPressDateIcon={_OnShowCalender}
            onPressTimeIcon={_OnShowTime}
            onPressLocationIcon={_onGoToLocation}
          />
        )}

        {!keyboardVisible && (
          <View>
            <Button label="Next" type="PRIMARY" onPress={_onNext} />
          </View>
        )}

        <DatePicker
          open={showDate}
          type="DATE"
          onClose={() => setShowDate(false)}
        />
        <DatePicker
          open={showTime}
          type="TIME"
          onClose={() => setShowTime(false)}
        />
      </View>
    </SafeScreen>
  );
};

const PostHeader = () => {
  const { fonts, layout, gutters } = useTheme();
  return (
    <View style={[layout.row, layout.justifyBetween, layout.itemsCenter]}>
      <View
        style={[
          layout.row,
          layout.justifyStart,
          layout.itemsCenter,
          gutters.gap_8,
        ]}
      >
        <TouchableOpacity>
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
  const inputRef = useRef<TextInput>(null);

  const _onPress = () => {
    onPress?.();

    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  };

  return (
    <KeyboardAvoidingView
      style={[layout.flex_1]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableOpacity
        style={[layout.flex_1, { paddingBottom: 60 }]}
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
        />
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const ActivityForSheet = () => {
  const { fonts, layout, gutters, backgrounds } = useTheme();
  const [dummyCat, setDummyCat] = useState(dummyCategories);
  const _onPress = (id: string) => {
    setDummyCat((pS) =>
      pS.map((item) =>
        item.id === id ? { ...item, isSelected: !item.isSelected } : item
      )
    );
  };
  return (
    <View>
      <Text
        style={[
          fonts.alignCenter,
          fontFamily._500_Medium,
          fonts.size_16,
          fonts.gray800,
          gutters.paddingVertical_12,
        ]}
      >
        Add Activity
      </Text>
      <View
        style={[
          layout.row,
          layout.wrap,
          layout.justifyCenter,
          gutters.paddingVertical_24,
          { columnGap: 16, rowGap: 36 },
        ]}
      >
        {dummyCat.map(({ Icon, ...item }) => (
          <TouchableOpacity
            key={item.id}
            style={[
              layout.col,
              layout.itemsCenter,
              gutters.gap_6,
              { width: "30%" },
            ]}
            onPress={() => _onPress(item.id)}
          >
            {
              <Icon
                color={
                  item.isSelected
                    ? backgrounds.primary.backgroundColor
                    : backgrounds.gray300.backgroundColor
                }
              />
            }
            <Text style={[fonts.gray300]}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={[gutters.paddingHorizontal_16]}>
        <Button label="Next" type="PRIMARY" onPress={() => {}} />
      </View>
    </View>
  );
};

const TimeSheet = () => {
  const { layout, gutters, fonts } = useTheme();

  return (
    <View>
      <View style={[gutters.paddingHorizontal_16]}>
        <Button label="Next" type="PRIMARY" onPress={() => {}} />
      </View>
    </View>
  );
};

const PostMenu = (props: PostInputMenu) => {
  const {
    onPressDateIcon,
    onPressImageIcon,
    onPressLocationIcon,
    onPressTimeIcon,
  } = props;
  const { layout, colors, gutters } = useTheme();

  const _onPressIcon = (value: "TIME" | "DATE" | "LOCATION" | "IMAGE") => {
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
      default:
        break;
    }
  };

  return (
    <View
      style={[
        layout.row,
        layout.justifyEnd,
        layout.itemsCenter,
        gutters.gap_24,
        gutters.paddingRight_24,
        { height: 50 },
      ]}
    >
      <TouchableOpacity onPress={() => _onPressIcon("IMAGE")}>
        <ImageIcon width={30} height={30} color={colors.gray800} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => _onPressIcon("LOCATION")}>
        <LocationIcon width={30} height={30} color={colors.gray800} />
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

const dummyCategories: {
  id: string;
  label: string;
  Icon: React.FC<SvgProps>;
  isSelected: boolean;
}[] = [
  {
    id: "171",
    label: "Shopping",
    Icon: Cat_Shopping,
    isSelected: false,
  },
  {
    id: "172",
    label: "Reading",
    Icon: Cat_Reading,
    isSelected: false,
  },
  {
    id: "173",
    label: "Fitness",
    Icon: Cat_Fitness,
    isSelected: false,
  },
  {
    id: "174",
    label: "Sports",
    Icon: Cat_Sports,
    isSelected: false,
  },
  {
    id: "175",
    label: "Skateboarding",
    Icon: Cat_Skateboarding,
    isSelected: false,
  },
  {
    id: "176",
    label: "Mountain Climb",
    Icon: Cat_Mountain_Climb,
    isSelected: false,
  },
  {
    id: "177",
    label: "Others",
    Icon: Cat_Others,
    isSelected: false,
  },
];

type PostScreenType = NativeStackScreenProps<RootStackParamList, "Post">;

export default Post;
