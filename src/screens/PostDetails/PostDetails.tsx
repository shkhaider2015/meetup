import {
    ChevronLeft,
  Clock,
  Close,
  DateIcon,
  Heart,
  LocationIcon,
  Share,
  Tick,
} from '@/assets/icon';
import { EmptyAnimation } from '@/assets/images';
import { Button, Image, SafeScreen } from '@/components/template';
import { getPostById } from '@/services/posts/indes';
import { RootState } from '@/store';
import { useTheme } from '@/theme';
import { fontFamily } from '@/theme/_config';
import { RootStackParamList } from '@/types/navigation';
import { IPostReducer } from '@/types/reducer';
import { getIconByID, getRegionForCoordinates } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import _ from 'lodash';
import LottieView from 'lottie-react-native';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import RNMapView, { Marker } from 'react-native-maps';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { useSelector } from 'react-redux';

const PostDetails = ({ navigation, route }: PostDetailsScreenType) => {
  const { postId } = route.params;

  const currentUser = useSelector((state: RootState) => state.user);
  const screenHeight = Dimensions.get('screen').height;
  const { layout, gutters, colors, borders, fonts, backgrounds } = useTheme();
  const { data, error, isLoading } = useQuery({
    queryKey: ['postdetail', postId],
    queryFn: () => getPostById(postId),
    enabled: !!postId,
  });

  const { user, activity, image, location, createdAt, details, date, time } =
  data as IPostReducer;

  const Icon = getIconByID(activity || '');

  const _goToProfile = () => {
    if (user._id == currentUser._id) {
      navigation.navigate('Profile');
      return;
    }
    navigation.navigate('OtherProfile', {
      userId: user._id,
    });
  };

  if (isLoading) {
    return (
      <SafeScreen>
        <View
          style={[
            layout.justifyCenter,
            layout.itemsCenter,
            { height: screenHeight },
          ]}
        >
          <Text style={[fonts.size_24, fontFamily._700_Bold]}>...Loading</Text>
        </View>
      </SafeScreen>
    );
  }

  if (error) {
    return (
      <SafeScreen>
        <View
          style={[
            layout.justifyCenter,
            layout.itemsCenter,
            { height: screenHeight },
          ]}
        >
          <View>
            <LottieView
              source={EmptyAnimation}
              autoPlay={true}
              loop={true}
              style={{
                width: '100%',
                height: 200,
              }}
            />
            <Text style={[fonts.size_24, fontFamily._700_Bold]}>
              Oops! something wrong happened
            </Text>
          </View>
        </View>
      </SafeScreen>
    );
  }

  return (
    <SafeScreen>
      <ScrollView>
        <View style={[backgrounds.gray00]}>
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
            <ChevronLeft style={{ paddingHorizontal: 5 }} onPress={() => navigation.goBack()} />
              <TouchableOpacity onPress={_goToProfile}>
                <Image
                  imageURL={user.profileImage}
                  containerStyle={styles.profile_image}
                />
              </TouchableOpacity>
              <View style={[layout.col, gutters.marginHorizontal_12]}>
                <Text
                  onPress={_goToProfile}
                  style={[fonts.size_16, fonts.gray800]}
                >
                  {user.name}
                </Text>
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
            <Close color={colors.gray800} onPress={() => {}} />
          </View>
          <View style={styles.mainCotainer}>
            {/* Content */}
            {!_.isEmpty(image) && (
              <Image imageURL={image} containerStyle={styles.location} />
            )}
            {!_.isEmpty(location) && _.isEmpty(image) && (
              <RNMapView
                provider="google"
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
          <View
            style={[
              gutters.marginVertical_12,
              gutters.padding_10,
              layout.row,
              layout.justifyStart,
              layout.itemsCenter,
              gutters.gap_24,
              backgrounds.gray30,
            ]}
          >
            <View
              style={[
                layout.row,
                gutters.gap_14,
                layout.justifyStart,
                layout.itemsCenter,
              ]}
            >
              <LocationIcon color={colors.primary} />
              <Text>Some Dummy Location, street 3</Text>
            </View>
          </View>
          <View
            style={[
              gutters.padding_10,
              layout.row,
              layout.justifyStart,
              layout.itemsCenter,
              gutters.gap_24,
              backgrounds.gray30,
            ]}
          >
            <View
              style={[
                layout.row,
                gutters.gap_14,
                layout.justifyStart,
                layout.itemsCenter,
              ]}
            >
              <DateIcon color={colors.primary} />
              <Text>{dayjs(date).format('YYYY-MM-DD')}</Text>
            </View>
            <View
              style={[
                layout.row,
                gutters.gap_14,
                layout.justifyStart,
                layout.itemsCenter,
              ]}
            >
              <Clock color={colors.primary} />
              <Text>{dayjs(time).format('hh-mm-ss')}</Text>
            </View>
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
              <Text style={[fonts.gray180]}>
                {dayjs(createdAt).fromNow()}
              </Text>
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
      </ScrollView>
    </SafeScreen>
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

type PostDetailsScreenType = NativeStackScreenProps<
  RootStackParamList,
  'PostDetails'
>;

export default PostDetails;
