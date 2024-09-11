import { Close, Heart, MenuHr, Share, Tick } from '@/assets/icon';
import { Button } from '@/components/template';
import { useTheme } from '@/theme';
import { fontFamily } from '@/theme/_config';
import { UserModalProps } from '@/types/modals';
import { IPost } from '@/types/post';
import {
  convertImageURLforngRok,
  getIconByID,
  getRegionForCoordinates,
  widthInPercentage,
} from '@/utils';
import dayjs from 'dayjs';
import _ from 'lodash';
import { useEffect, useLayoutEffect } from 'react';
import {
  Modal,
  View,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import RNMapView, { Marker } from 'react-native-maps';

const text1 = `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat quas officia aspernatur repellendus velit nisi, harum quis nemo itaque deserunt neque magnam cumque fugiat deleniti eligendi nam odio asperiores autem? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat quas officia aspernatur repellendus velit nisi, harum quis nemo itaque deserunt neque magnam cumque fugiat deleniti eligendi nam odio asperiores autem?`;
const text2 = `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat quas officia aspernatur repellendus velit nisi, harum quis nemo itaque deserunt neque magnam cumque fugiat deleniti eligendi nam odio asperiores autem?`;
const text3 = `Lorem ipsum dolor sit, amet consectetur adipisicing elit.`;

const UserModal = (props: UserModalProps) => {
  const { data, open, onClose } = props;
  const { user, activity, image, location, createdAt, details } = data;
  const { layout, gutters, fonts, colors, backgrounds, borders } = useTheme();
  const width = Dimensions.get('screen').width;

  const Icon = getIconByID(activity || '');

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
          { backgroundColor: '#0000004D' },
        ]}
      >
        <View
          style={[
            backgrounds.gray00,
            borders.rounded_16,
            { width: widthInPercentage(90) },
          ]}
        >
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
              <Image
                source={{
                  uri: convertImageURLforngRok(user.profileImage || ''),
                }}
                style={styles.profile_image}
              />
              <View style={[layout.col, gutters.marginHorizontal_12]}>
                <Text style={[fonts.size_16, fonts.gray800]}>{user.name}</Text>
                <View
                  style={[layout.row, layout.itemsCenter, { columnGap: 5 }]}
                >
                  <Text style={[fonts.size_12, fonts.gray200]}>{'3km'}</Text>
                  <Tick />
                </View>
              </View>
              {Icon && (
                <View
                  style={[
                    layout.justifyCenter,
                    layout.itemsCenter,
                    backgrounds.primary,
                    { width: 40, height: 40, borderRadius: 50 },
                  ]}
                >
                  <Icon color={colors.gray00} />
                </View>
              )}
            </View>
            <Close color={colors.gray800} onPress={_handleClose} />
          </View>
          <View style={styles.mainCotainer}>
            {/* Content */}
            {!_.isEmpty(image) && (
              <Image
                source={{ uri: convertImageURLforngRok(image || '') }}
                style={styles.location}
              />
            )}
            {!_.isEmpty(location) && _.isEmpty(image) && (
              <RNMapView
                style={{
                  width: '100%',
                  height: '100%',
                }}
                initialRegion={{
                  ...getRegionForCoordinates([
                    {
                      latitude: location.latitude,
                      longitude: location.longitude,
                    },
                  ]),
                }}
              >
                <Marker
                  coordinate={{
                    latitude: location.latitude || 0,
                    longitude: location.longitude || 0,
                  }}
                />
              </RNMapView>
            )}
          </View>
          <View style={[gutters.paddingBottom_10]}>
            {/* Details if there are neither image nor location */}
            {_.isEmpty(image) && _.isEmpty(location) && (
              <View
                style={[
                  gutters.paddingHorizontal_16,
                  gutters.paddingBottom_16,
                  styles.details_container,
                ]}
              >
                <ScrollView>
                  <Text style={[fonts.gray300, fontFamily._400_Regular]}>
                    {details}
                  </Text>
                </ScrollView>
              </View>
            )}
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
              <Text style={[fonts.gray180]}>{dayjs(createdAt).fromNow()}</Text>
            </View>
            {/* Details if there are image or location */}
            {(!_.isEmpty(image) || !_.isEmpty(location)) && (
              <View
                style={[
                  gutters.paddingHorizontal_16,
                  gutters.paddingBottom_16,
                  styles.details_container,
                ]}
              >
                <ScrollView>
                  <Text style={[fonts.gray300, fontFamily._400_Regular]}>
                    {details}
                  </Text>
                </ScrollView>
              </View>
            )}
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
  mainCotainer: {
    width: '100%',
    maxHeight: 300,
  },
  location: {
    width: '100%',
    height: '100%',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  details_container: {
    maxHeight: 220,
  },
});

export default UserModal;
