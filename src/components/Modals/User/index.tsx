import { Close, Heart, MenuHr, Share, Tick } from "@/assets/icon";
import { Button } from "@/components/template";
import { useTheme } from "@/theme";
import { fontFamily } from "@/theme/_config";
import { UserModalProps } from "@/types/modals";
import { IPost } from "@/types/post";
import { useEffect, useLayoutEffect } from "react";
import { Modal, View, Image, Text, StyleSheet, StatusBar } from "react-native";

const UserModal = (props: UserModalProps) => {
  const { data, open, onClose } = props;
  const { user, distance, Doing_icon, main_post, created_at, desc } = data;
  const { layout, gutters, fonts, colors, backgrounds, borders } = useTheme();

  const _handleClose = () => {
    // StatusBar.setBackgroundColor(colors.gray00);
    // StatusBar.setBarStyle("dark-content");
    // StatusBar.setTranslucent(false);
    
        onClose();
  };

//   useLayoutEffect(() => {
//     if (open) {
//       StatusBar.setBackgroundColor("#0000004D");
//       StatusBar.setBarStyle("light-content");
//       StatusBar.setTranslucent(true);
//     }
//   }, [open]);

  return (
    <Modal
      style={styles.modalView}
      animationType="fade"
      visible={open}
      onRequestClose={_handleClose}
      transparent={true}
    >
      <View
        style={[
          layout.flex_1,
          layout.justifyCenter,
          layout.itemsCenter,
          gutters.paddingHorizontal_12,
          { backgroundColor: "#0000004D" },
        ]}
      >
        <View style={[backgrounds.gray00, borders.rounded_16]}>
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
                <View
                  style={[layout.row, layout.itemsCenter, { columnGap: 5 }]}
                >
                  <Text style={[fonts.size_12, fonts.gray200]}>{distance}</Text>
                  <Tick />
                </View>
              </View>
              {Doing_icon}
            </View>
            <Close color={colors.gray800} onPress={_handleClose} />
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
              <Text style={[fonts.gray300]}>{desc}</Text>
            </Text>
          </View>
        </View>
      </View>
    </Modal>
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
  modalView: {
    margin: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default UserModal;
