import { Edit, Heart, MenuHr, Share, Tick, Trash } from '@/assets/icon';
import { useTheme } from '@/theme';
import {
  ActivityIndicator,
  FlatList,
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
import { FC, SVGProps, useState } from 'react';
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
import dayjs, { Dayjs } from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { SvgProps } from 'react-native-svg';
import { useMutation } from '@tanstack/react-query';
import { deletePost as deletePostService } from '@/services/posts/indes';
import Toast from 'react-native-toast-message';
import { deletePost as deletePostAction } from '@/store/slices/postSlice';
import { PostStateType } from '@/types/screens/post';
import { activityData } from '@/constants/activities';

const Post = (props: IPost) => {
  const { user, activity, location, createdAt, details, date, time, image, _id } = props;
  const currentUser = useSelector((state: RootState) => state.user);
  const [showDetails, setShowDetails] = useState(false);
  const [favorite, setFavorite] = useState(false);

  const { layout, gutters, fonts, backgrounds, colors } = useTheme();
  const { openBottomSheet, closeBottomSheet } = useGlobalBottomSheet();
  const { navigate } = useNavigation<NavigationHookProps>();
  const dispatch: AppDispatch = useDispatch();

  const { isPending, mutate: deleteMutation } = useMutation({
    mutationFn: () => {
      return deletePostService(_id, currentUser._id);
    },
    onSuccess: () => {
      Toast.show({
        type: 'success',
        text1: 'Your post deleted successfully',
      });

      dispatch(deletePostAction({ id: _id }));
    },
    onError: (error) => {
      Toast.show({
        type: 'error',
        text1: 'Post Deletion Failed',
        text2: error.message,
      });
    },
  });

  const Icon = getIconByID(activity || '');

  const _onBottomSheetOpen = () => {
    if (isPending) return;
    openBottomSheet(
      <UserPostMenu
        isCurrentUser={currentUser._id === user._id}
        onDelete={_onDelete}
        onEdit={_onEdit}
        onClose={closeBottomSheet}
      />,
      ['25%'],
    );
  };

  const _goToProfile = () => {
    navigate('OtherProfile', {
      userId: 'some-id',
    });
  };

  const _onEdit = () => {
    const initialValues: PostStateType = {
      text: details,
      imageURL: image,
      location: location,
      date: date ? new Dayjs(date) : undefined,
      time: time ? new Dayjs(time) : undefined,
      activity: activityData.find(item => item.id === activity),
    }
    navigate('Post', { initialValues: initialValues, postId: _id });
  };

  const _onDelete = () => {
    deleteMutation();
  };

  const _showDetails = () => {
    if (isPending) return;
    setShowDetails(true);
  };

  return (
    <View style={[backgrounds.gray00, gutters.marginTop_24, layout.relative]}>
      {isPending && (
        <TouchableOpacity
          style={[
            layout.absolute,
            layout.justifyCenter,
            layout.itemsCenter,
            {
              width: '100%',
              height: '100%',
              backgroundColor: '#FFFFFF66',
              zIndex: 2,
            },
          ]}
        >
          <ActivityIndicator size={'large'} color={colors.primary} />
        </TouchableOpacity>
      )}

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
                { width: 35, height: 35, borderRadius: 50 },
              ]}
            >
              <Icon color={colors.gray00} width={18} height={18} />
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
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.mainCotainer}
        onPress={_showDetails}
      >
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
            onPressHighlighText={_showDetails}
          />
        ) : (
          <DetailText
            text={details}
            maxLength={50}
            onPressHighlighText={_showDetails}
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

const UserPostMenu = (props: IUserPostMenu) => {
  const { isCurrentUser, onEdit, onDelete, onClose } = props;
  const { gutters, layout, fonts, backgrounds } = useTheme();

  const currentUserOptions: IOptions[] = [
    {
      label: 'Edit',
      Icon: Edit,
      onPress: onEdit,
      isDisable: false,
    },
    {
      label: 'Delete',
      Icon: Trash,
      onPress: onDelete,
      isDisable: false,
    },
  ];

  const options: IOptions[] = [];

  return (
    <View style={[gutters.paddingHorizontal_16, gutters.paddingVertical_24]}>
      <FlatList
        data={isCurrentUser ? currentUserOptions : options}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              layout.row,
              layout.justifyStart,
              layout.itemsCenter,
              { height: 50 },
            ]}
            onPress={() => {
              onClose?.();
              setTimeout(() => {
                item.onPress?.();
              }, 200)
            }}
          >
            <item.Icon width={35} height={35} />
            <Text
              style={[
                fontFamily._400_Regular,
                fonts.size_16,
                fonts.gray800,
                gutters.marginLeft_12,
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(_, index) => index.toString()}
        ItemSeparatorComponent={() => (
          <View style={[{ height: 1 }, backgrounds.gray100]} />
        )}
      />
    </View>
  );
};

interface IUserPostMenu {
  isCurrentUser: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onClose?: () => void;
}

interface IOptions {
  label: string;
  Icon: FC<SvgProps>;
  onPress?: () => void;
  isDisable?: boolean;
}

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
