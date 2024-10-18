import {
  ChevronLeft,
  Clock,
  Close,
  DateIcon,
  Heart,
  LocationIcon,
  MenuHr,
  Share,
  Tick,
} from '@/assets/icon';
import { EmptyAnimation, LoadingAnimation } from '@/assets/images';
import { Header } from '@/components';
import { Button, Image, SafeScreen } from '@/components/template';
import { getPostById } from '@/services/posts/indes';
import { RootState } from '@/store';
import { useTheme } from '@/theme';
import { fontFamily, heights } from '@/theme/_config';
import { RootStackParamList } from '@/types/navigation';
import { IPostReducer } from '@/types/reducer';
import {
  convertImageURLforngRok,
  getIconByID,
  getRegionForCoordinates,
} from '@/utils';
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
  const screenHeight =
    Dimensions.get('screen').height - heights.tabNavigationHeader;
  const { layout, gutters, colors, borders, fonts, backgrounds } = useTheme();
  const { data, error, isLoading } = useQuery({
    queryKey: ['postdetail', postId],
    queryFn: () => getPostById(postId),
    enabled: !!postId,
  });

  const { user, activity, image, location, createdAt, details, date, time } =
    (data as IPostReducer) || {};

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
        <Header label="Post Details" />
        <View
          style={[
            layout.justifyCenter,
            layout.itemsCenter,
            gutters.paddingHorizontal_24,
            { height: screenHeight },
          ]}
        >
          <View style={[layout.itemsCenter, { minHeight: 400, width: '100%' }]}>
            <LottieView
              source={LoadingAnimation}
              autoPlay={true}
              loop={true}
              style={{
                width: '100%',
                height: 300,
              }}
            />
          </View>
        </View>
      </SafeScreen>
    );
  }

  if (error) {
    return (
      <SafeScreen>
        <Header label="Post Details" />
        <View
          style={[
            layout.justifyCenter,
            layout.itemsCenter,
            gutters.paddingHorizontal_24,
            { height: screenHeight },
          ]}
        >
          <View style={[layout.itemsCenter, { minHeight: 400, width: '100%' }]}>
            <LottieView
              source={EmptyAnimation}
              autoPlay={true}
              loop={true}
              style={{
                width: '100%',
                height: 300,
              }}
            />
            <Text
              style={[fonts.size_16, fontFamily._700_Bold, fonts.alignCenter]}
            >
              Oops! something wrong happened
            </Text>
          </View>
        </View>
      </SafeScreen>
    );
  }

  const headerLeftSection = () => (
    <View
      style={[
        layout.row,
        layout.justifyStart,
        layout.itemsCenter,
        gutters.paddingHorizontal_10,
      ]}
    >
      <ChevronLeft
        style={{ marginRight: 20 }}
        onPress={() => navigation.goBack()}
      />
      <TouchableOpacity onPress={_goToProfile}>
        <Image
          imageURL={convertImageURLforngRok(user.profileImage)}
          containerStyle={styles.profile_image}
          fastImageProp={{
            style: {
              borderRadius: 60,
              borderWidth: 1,
              borderColor: colors.gray100,
            },
          }}
        />
      </TouchableOpacity>
      <View style={[layout.col, gutters.marginHorizontal_12]}>
        <Text onPress={_goToProfile} style={[fonts.size_16, fonts.gray800]}>
          {user.name}
        </Text>
        <View style={[layout.row, layout.itemsCenter, { columnGap: 5 }]}>
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
  );

  return (
    <SafeScreen>
      <Header
        leftComponent={headerLeftSection}
        rightComponnent={() => (
          <View style={[ gutters.paddingRight_24, layout.itemsCenter, layout.justifyCenter ]} >
            <MenuHr
              color={colors.gray300}
              onPress={() => navigation.goBack()}
            />
          </View>
        )}
      />
      <ScrollView>
        <View style={[backgrounds.gray00, { minHeight: screenHeight }]}>
          <View style={[gutters.paddingHorizontal_24]}>
            <View
              style={[
                styles.mainCotainer,
                backgrounds.gray100,
                gutters.padding_4,
                borders.rounded_16,
              ]}
            >
              {/* Content */}
              {!_.isEmpty(image) && (
                <Image
                  imageURL={convertImageURLforngRok(image || '')}
                  containerStyle={styles.location}
                  fastImageProp={{ style: { borderRadius: 10 } }}
                />
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
                gutters.paddingVertical_10,
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
                <LocationIcon color={colors.primary3} />
                <Text>Some Dummy Location, street 3</Text>
              </View>
            </View>
            <View
              style={[
                gutters.paddingVertical_10,
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
                <DateIcon color={colors.primary3} />
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
                <Clock color={colors.primary3} />
                <Text>{dayjs(time).format('hh-mm-ss')}</Text>
              </View>
            </View>
          </View>
          <View
            style={[
              backgrounds.gray150,
              layout.fullWidth,
              gutters.marginTop_16,
              { height: 2 },
            ]}
          />
          <View
            style={[gutters.paddingBottom_10, gutters.paddingHorizontal_24]}
          >
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
                style={[gutters.paddingBottom_16, styles.details_container]}
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
    borderRadius: 60,
  },
  mainCotainer: {
    width: '100%',
    maxHeight: 300,
    marginTop: 20,
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
