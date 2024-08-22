import { Edit, Heart, MenuHr, Share, Tick, Trash } from "@/assets/icon";
import { useTheme } from "@/theme";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button } from "../template";
import { fontFamily } from "@/theme/_config";
import { IPost } from "@/types/post";
import UserModal from "../Modals/User";
import { useState } from "react";
import { useGlobalBottomSheet } from "@/hooks";
import { useNavigation } from "@react-navigation/native";
import { NavigationHookProps, RootStackParamList } from "@/types/navigation";

const Post = (props: IPost) => {
  const { user, distance, Doing_icon, created_at, desc, main_post, id } = props;
  const [showDetails, setShowDetails] = useState(false);

  const { layout, gutters, fonts, backgrounds } = useTheme();
  const { openBottomSheet, closeBottomSheet } = useGlobalBottomSheet();
  const { navigate } = useNavigation<NavigationHookProps>();

  const _onBottomSheetOpen = () => {
    openBottomSheet(<UserPostMenu />, ["25%"]);
  };

  const _goToProfile = () => {
    navigate("Profile", { isCurrentUser: false, id: id });
  };

  return (
    <View style={[backgrounds.gray00, gutters.marginTop_24]}>
      <View
        style={[
          layout.row,
          layout.justifyBetween,
          layout.itemsCenter,
          gutters.paddingHorizontal_12,
          gutters.paddingVertical_8,
        ]}
      >
        {/* Header */}
        <View style={[layout.row, layout.justifyStart, layout.itemsCenter]}>
          <TouchableOpacity onPress={_goToProfile}>
            <Image source={user.imageSource} style={styles.profile_image} />
          </TouchableOpacity>
          <View style={[layout.col, gutters.marginHorizontal_12]}>
            <TouchableOpacity onPress={_goToProfile}>
              <Text style={[fonts.size_16, fonts.gray800]}>{user.name}</Text>
            </TouchableOpacity>
            <View style={[layout.row, layout.itemsCenter, { columnGap: 5 }]}>
              <Text style={[fonts.size_12, fonts.gray200]}>{distance}</Text>
              <Tick />
            </View>
          </View>
          {Doing_icon}
        </View>
        <TouchableOpacity
          onPress={_onBottomSheetOpen}
          style={[gutters.padding_8]}
        >
          <MenuHr />
        </TouchableOpacity>
      </View>
      <View>
        {/* Content */}
        <Image source={main_post} style={styles.location} />
      </View>
      <View style={[gutters.paddingBottom_10]}>
        {/* Footer */}
        <View
          style={[
            layout.row,
            layout.justifyBetween,
            layout.itemsCenter,
            gutters.paddingVertical_10,
            gutters.paddingHorizontal_10,
          ]}
        >
          {/* Buttons */}
          <View
            style={[
              layout.row,
              layout.itemsCenter,
              layout.justifyStart,
              { columnGap: 10 },
            ]}
          >
            {/* Icons */}
            <Button
              Icon={
                <Heart
                  color={backgrounds.primary.backgroundColor}
                  width={23}
                  height={23}
                />
              }
              isCirculer={true}
              type="SECONDARY"
              containerStyle={[{ width: 40, height: 40 }]}
            />
            <Button
              Icon={
                <Share
                  color={backgrounds.primary.backgroundColor}
                  width={20}
                  height={20}
                />
              }
              isCirculer={true}
              type="SECONDARY"
              containerStyle={[{ width: 40, height: 40 }]}
            />
          </View>
          <Text style={[fonts.gray180]}>{created_at}</Text>
        </View>
        <Text style={[gutters.paddingHorizontal_10, fonts.size_16]}>
          {/* Details */}
          <Text style={[fontFamily._500_Medium, fonts.black]}>
            Username_01:{" "}
          </Text>
          <Text style={[fonts.gray300]}>
            {desc.slice(0, 60)}{" "}
            <Text style={[fonts.primary]} onPress={() => setShowDetails(true)}>
              See more ..
            </Text>{" "}
          </Text>
        </Text>
      </View>
      <UserModal
        open={showDetails}
        onClose={() => setShowDetails(false)}
        data={props}
      />
    </View>
  );
};

const UserPostMenu = () => {
  const { gutters, layout, fonts } = useTheme();

  return (
    <View style={[gutters.paddingHorizontal_12, gutters.paddingVertical_24]}>
      {["One", "Two", "Three", "Four"].map((item, ind) => (
        <TouchableOpacity
          key={ind}
          style={[
            layout.row,
            layout.justifyStart,
            layout.itemsCenter,
            gutters.gap_8,
          ]}
        >
          <Edit width={30} height={30} />
          <Text style={[fontFamily._400_Regular, fonts.size_16, fonts.gray800]}>
            Option {item}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  profile_image: {
    width: 50,
    height: 50,
    borderRadius: 40,
  },
  location: {
    width: "100%",
    height: 210,
  },
});

export default Post;
