import { Edit, Heart, MenuHr, Share, Tick } from '@/assets/icon';
import { useTheme } from '@/theme';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button } from '../template';
import { fontFamily } from '@/theme/_config';
import { IPost } from '@/types/post';
import UserModal from '../Modals/User';
import { useState } from 'react';
import { useGlobalBottomSheet } from '@/hooks';
import { useNavigation } from '@react-navigation/native';
import { NavigationHookProps } from '@/types/navigation';
import {
  convertImageURLforngRok,
  getIconByID,
  getRegionForCoordinates,
} from '@/utils';
import _ from 'lodash';
import RNMapView, { Marker } from 'react-native-maps';
import DetailText from '../DetailText/DetailText';
import dayjs from 'dayjs';

const Post = (props: IPost) => {
  const { user, activity, location, createdAt, details, image, _id } = props;
  const [showDetails, setShowDetails] = useState(false);
  const [favorite, setFavorite] = useState(false);

  const { layout, gutters, fonts, backgrounds, colors } = useTheme();
  const { openBottomSheet, closeBottomSheet } = useGlobalBottomSheet();
  const { navigate } = useNavigation<NavigationHookProps>();

  const Icon = getIconByID(activity || '');

  const _onBottomSheetOpen = () => {
    openBottomSheet(<UserPostMenu />, ['25%']);
  };

  const _goToProfile = () => {
    navigate('OtherProfile', {
      userId: 'some-id',
    });
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
            <Image
              source={{ uri: convertImageURLforngRok(user.profileImage) }}
              style={styles.profile_image}
            />
          </TouchableOpacity>
          <View style={[layout.col, gutters.marginHorizontal_12]}>
            <TouchableOpacity onPress={_goToProfile}>
              <Text style={[fonts.size_16, fonts.gray800]}>{user.name}</Text>
            </TouchableOpacity>
            <View style={[layout.row, layout.itemsCenter, { columnGap: 5 }]}>
              <Text style={[fonts.size_12, fonts.gray200]}>3km</Text>
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
        <TouchableOpacity
          onPress={_onBottomSheetOpen}
          style={[gutters.padding_8]}
        >
          <MenuHr color={colors.gray250} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity activeOpacity={.8} style={styles.mainCotainer} onPress={() => setShowDetails(true)}>
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
      </TouchableOpacity>
      {/* Details section */}
      <View style={styles.detailContainer}>
        {_.isEmpty(image) && _.isEmpty(location) ? (
          <DetailText
            text={details}
            maxLength={200}
            onPressHighlighText={() => setShowDetails(true)}
          />
        ) : (
          <DetailText
            text={details}
            maxLength={50}
            onPressHighlighText={() => setShowDetails(true)}
          />
        )}
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
                  color={favorite ? colors.primary : colors.gray250}
                  width={23}
                  height={23}
                />
              }
              isCirculer={true}
              type="SECONDARY"
              containerStyle={[{ width: 40, height: 40 }]}
              onPress={() => setFavorite((pS) => !pS)}
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
        {/* There should be comments */}
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
      {['One', 'Two', 'Three', 'Four'].map((item, ind) => (
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
  mainCotainer: {
    width: '100%',
    maxHeight: 210,
  },
  location: {
    width: '100%',
    height: '100%',
  },
  detailContainer: {
    width: '100%',
    paddingHorizontal: 16,
    paddingTop: 10,
    maxHeight: 210,
  },
});

export default Post;
