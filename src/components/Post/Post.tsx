import { Edit, Heart, MenuHr, Share, Tick, Trash } from "@/assets/icon";
import { useTheme } from "@/theme";
import { Image, StyleSheet, Text, View } from "react-native";
import { Button } from "../template";
import { fontFamily } from "@/theme/_config";
import { IPost } from "@/types/post";

const Post = (props: IPost) => {
  const { user, distance, Doing_icon, created_at, desc, main_post } = props;
  const { layout, gutters, fonts, backgrounds } = useTheme();

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
          <Image source={user.imageSource} style={styles.profile_image} />
          <View style={[layout.col, gutters.marginHorizontal_12]}>
            <Text style={[fonts.size_16, fonts.gray800]}>{user.name}</Text>
            <View style={[layout.row, layout.itemsCenter, { columnGap: 5 }]}>
              <Text style={[fonts.size_12]}>{distance}</Text>
              <Tick />
            </View>
          </View>
          {Doing_icon}
        </View>
        <MenuHr />
        {/* <InlineMenu
          data={[
            { label: "Edit", Icon: <Edit width={20} height={20} /> },
            { label: "Delete", Icon: <Trash width={20} height={20}  /> },
          ]}
        /> */}
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
            {desc.slice(0, 60)} <Text style={[fonts.primary]}>See more ..</Text>{" "}
          </Text>
        </Text>
      </View>
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
