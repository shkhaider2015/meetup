import {
  Activity,
  Clock,
  Close,
  DateIcon,
  ImageIcon,
  LocationIcon,
} from '@/assets/icon';
import { ActivityPicker, DatePicker } from '@/components';
import { SafeScreen } from '@/components/template';
import { useKeyboardVisible, useLoader } from '@/hooks';
import { useTheme } from '@/theme';
import { fontFamily, heights } from '@/theme/_config';
import { RootStackParamList } from '@/types/navigation';
import {
  PostStateType,
  PostHeaderProps,
  PostInputMenu,
  PostInputProps,
} from '@/types/screens/post';
import {
  convertImageURLforngRok,
  getRegionForCoordinates,
  requestLocationPermissionCross,
} from '@/utils';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import Toast from 'react-native-toast-message';
import Geolocation from 'react-native-geolocation-service';
import { Dayjs } from 'dayjs';
import RNMapView, { Marker } from 'react-native-maps';
import { IActivity } from '@/constants/activities';
import { IPostForm } from '@/types/forms';
import { useMutation } from '@tanstack/react-query';
import { createPost, updatePost } from '@/services/posts/indes';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import _ from 'lodash';
import {
  updatePost as updatePostReducer,
  updatePosts as updatePostsReducer,
} from '@/store/slices/postSlice';
import { useFocusEffect } from '@react-navigation/native';

const postInitialValues: PostStateType = {
  date: undefined,
  time: undefined,
  location: undefined,
  imageUri: undefined,
  activity: undefined,
};

const Post = ({ navigation, route }: PostScreenType) => {
  const { initialValues, postId } = route.params;
  const { layout, gutters, backgrounds, fonts, borders, colors } = useTheme();
  const { height, width } = Dimensions.get('window');
  const screenHeight = height - heights.bottomTabBarHeight;

  const user = useSelector((state: RootState) => state.user);
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [showActivity, setShowActivity] = useState(false);
  const [location, setLocation] = useState<Geolocation.GeoPosition | boolean>(
    false,
  );
  const [post, setPost] = useState<PostStateType>(postInitialValues);
  const { showLoader, hideLoader } = useLoader();

  const isKeyboardVisible = useKeyboardVisible();
  const dispatch: AppDispatch = useDispatch();

  // create post mutation
  const { mutate } = useMutation({
    mutationFn: (data: IPostForm) => {
      return createPost(data);
    },
    onSuccess: (data) => {
      hideLoader();
      dispatch(updatePostsReducer(data));
      Toast.show({
        type: 'success',
        text1: 'Post created successfully',
      });
      _clearPostState();

      navigation.goBack();
    },
    onError: (error) => {
      hideLoader();
      Toast.show({
        type: 'error',
        text1: 'Post Creation Failed',
        text2: error.message,
      });
    },
  });

  // Update post mutation
  const { mutate: updatePostMutation } = useMutation({
    mutationFn: (data: { data: IPostForm; imageURL?: string }) => {
      if (_.isEmpty(postId) || !postId) throw 'Post id is not found';
      return updatePost(postId, data.data, data.imageURL);
    },
    onSuccess: (data) => {
      hideLoader();
      dispatch(updatePostReducer(data));
      Toast.show({
        type: 'success',
        text1: 'Post updated successfully',
      });
      _clearPostState();
      setTimeout(() => {
        navigation.goBack();
      }, 500);
    },
    onError: (error) => {
      hideLoader();
      Toast.show({
        type: 'error',
        text1: 'Post Modification Failed',
        text2: error.message,
      });
    },
  });

  // set initial values if screen render for update
  useFocusEffect(
    useCallback(() => {
      if (!_.isEmpty(initialValues) && initialValues) {
        setPost(initialValues);
      }
    }, [initialValues]),
  );

  // function to reset state values
  const _clearPostState = () => {
    setPost(postInitialValues);
    navigation.setParams({ initialValues: undefined });
  };

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
      mediaType: 'photo',
    };

    const result = await launchImageLibrary(options);

    if (result.errorCode) {
      Toast.show({
        type: 'error',
        text1: 'Something wromng happen',
      });
    }

    if (result.assets?.[0].uri) {
      setPost((post) => ({
        ...post,
        imageUri: result.assets?.[0],
      }));
    }
  };

  const _onShowActivity = () => {
    Keyboard.dismiss();
    setShowActivity(true);
  };

  const _onGoToLocation = (
    location: { latitude: number; longitude: number } | undefined,
  ) => {
    hideLoader();
    const myLocation = {
      latitude: post.location?.latitude || location?.latitude || 0,
      longitude: post.location?.longitude || location?.longitude || 0,
    };
    navigation.navigate('PostLocation', {
      location: myLocation,
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
    _clearPostState();
    navigation.goBack();
  };

  const getLocation = async () => {
    showLoader();
    if (Platform.OS === 'ios') {
      const iosResult = await Geolocation.requestAuthorization('whenInUse');
      if (iosResult === 'granted') {
        Geolocation.getCurrentPosition(
          (position) => {
            console.log(position);
            _onGoToLocation(position.coords);
            // setLocation(position);
          },
          (error) => {
            // See error code charts below.
            console.log(error.code, error.message);
            _onGoToLocation(undefined);
            // setLocation(false);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        );
      } else {
        hideLoader();
      }
      console.log('IosResult : ', iosResult);
      return;
    }
    const result = requestLocationPermissionCross();
    result
      .then((res) => {
        console.log('res is:', res);
        if (res) {
          Geolocation.getCurrentPosition(
            (position) => {
              console.log(position);
              _onGoToLocation(position.coords);
              // setLocation(position);
            },
            (error) => {
              // See error code charts below.
              console.log(error.code, error.message);
              _onGoToLocation(undefined);
              // setLocation(false);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
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

  const _onConfirmDate = (type: 'TIME' | 'DATE', val: Dayjs) => {
    if (type === 'TIME') {
      setPost((post) => ({
        ...post,
        time: val,
      }));
    } else {
      setPost((post) => ({
        ...post,
        date: val,
      }));
    }
  };

  const _onConfirmActivity = (activities: IActivity[]) => {
    setPost((post) => ({
      ...post,
      activity: activities[0],
    }));
  };

  const _onCancelData = (type: 'DATA' | 'IMAGE' | 'LOCATION') => {
    switch (type) {
      case 'DATA':
        setPost((post) => ({
          ...post,
          date: undefined,
          time: undefined,
          activity: undefined,
        }));
        break;
      case 'IMAGE':
        setPost((post) => ({
          ...post,
          imageUri: undefined,
          imageURL: undefined,
        }));
        break;
      case 'LOCATION':
        setPost((post) => ({
          ...post,
          location: undefined,
        }));
        break;
      default:
        break;
    }
  };

  const _onChangeText = (text: string) => {
    setPost((pS) => ({
      ...pS,
      text: text,
    }));
  };

  const _onPost = useCallback(() => {
    let errors: string[] = [];
    if (_.isEmpty(post.text)) errors.push('Thoughts');
    if (_.isEmpty(post.location)) errors.push('Location');
    if (_.isEmpty(post.date)) errors.push('Date');
    if (_.isEmpty(post.time)) errors.push('Time');
    if (_.isEmpty(post.activity)) errors.push('Activity');

    if (!_.isEmpty(errors)) {
      let message: string = errors.join(',') + ' are required';

      Toast.show({
        type: 'error',
        text1: 'Cannot Create Post',
        text2: message,
      });
      return;
    }

    let postData: IPostForm = {
      userId: user._id,
    };
    postData.details = post.text;
    postData.date = post.date?.toDate().toISOString();
    postData.time = post.time?.toDate().toISOString();
    postData.activity = post.activity?.id;
    postData.image = post.imageUri;
    if (post.location?.latitude && post.location.longitude) {
      postData.location = {
        latitude: post.location.latitude,
        longitude: post.location.longitude,
      };
    }
    mutate(postData);
    showLoader();
  }, [post]);

  const _onUpdate = () => {
    let errors: string[] = [];
    if (_.isEmpty(post.text)) errors.push('Thoughts');
    if (_.isEmpty(post.location)) errors.push('Location');
    if (_.isEmpty(post.date)) errors.push('Date');
    if (_.isEmpty(post.time)) errors.push('Time');
    if (_.isEmpty(post.activity)) errors.push('Activity');

    if (!_.isEmpty(errors)) {
      let message: string = errors.join(',') + ' are required';

      Toast.show({
        type: 'error',
        text1: 'Cannot Create Post',
        text2: message,
      });
      return;
    }

    let postData: IPostForm = {
      userId: user._id,
    };
    postData.details = post.text;
    postData.date = post.date?.toDate().toISOString();
    postData.time = post.time?.toDate().toISOString();
    postData.activity = post.activity?.id;
    postData.image = post.imageUri;
    if (post.location?.latitude && post.location.longitude) {
      postData.location = {
        latitude: post.location.latitude,
        longitude: post.location.longitude,
      };
    }
    updatePostMutation({
      data: postData,
      imageURL: post.imageURL,
    });
    showLoader();
  };

  return (
    <SafeScreen>
      <KeyboardAvoidingView
        style={[layout.flex_1]}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View
          style={[
            gutters.paddingHorizontal_12,
            gutters.paddingVertical_12,
            backgrounds.gray00,
            {
              height: '100%',
            },
          ]}
        >
          <PostHeader
            onCancel={_onCancelPost}
            onPost={_onPost}
            onUpdate={_onUpdate}
            isUpdate={!_.isEmpty(initialValues)}
          />
          <PostInput
            text={post.text}
            onPress={_onPressInput}
            onChange={_onChangeText}
          />
          <View style={[{ flex: 2 }]}>
            {post.location && !post.imageUri && !post.imageURL && (
              <View
                style={[
                  borders.w_1,
                  borders.gray100,
                  gutters.paddingHorizontal_4,
                  gutters.paddingVertical_4,
                  backgrounds.gray30,
                  layout.relative,
                  {
                    width: '100%',
                    height: '70%',
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
                  onPress={() => _onCancelData('LOCATION')}
                >
                  <Close color={colors.gray800} width={20} height={20} />
                </TouchableOpacity>
                <RNMapView
                  style={{
                    width: '100%',
                    height: '100%',
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
            {post.imageURL && !post.imageUri && (
              <ImageBackground
                source={{ uri: convertImageURLforngRok(post.imageURL) }}
                style={{
                  width: '100%',
                  height: '70%',
                  position: 'relative',
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
                  onPress={() => _onCancelData('IMAGE')}
                >
                  <Close color={colors.gray800} width={20} height={20} />
                </TouchableOpacity>
              </ImageBackground>
            )}
            {post.imageUri && (
              <ImageBackground
                source={{ uri: post.imageUri.uri }}
                style={{
                  width: '100%',
                  height: '70%',
                  position: 'relative',
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
                  onPress={() => _onCancelData('IMAGE')}
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
                  backgrounds.gray150,
                  borders.rounded_4,
                  gutters.marginTop_24,
                  gutters.paddingHorizontal_10,
                  gutters.paddingVertical_10,
                ]}
              >
                <View
                  style={[layout.row, layout.justifyStart, layout.itemsCenter]}
                >
                  {post.activity?.Icon && (
                    <post.activity.Icon color={colors.gray800} />
                  )}
                  <Text style={[fonts.gray800, fontFamily._400_Regular]}>
                    {'   '}- {post.activity?.label} -{' '}
                    {post.date?.format('DD MMM')} {post.time?.format('hh:mm a')}{' '}
                  </Text>
                </View>
                <Close
                  color={colors.gray800}
                  onPress={() => _onCancelData('DATA')}
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

          <DatePicker
            open={showDate}
            type="DATE"
            onCancel={() => setShowDate(false)}
            onConfirm={(value) => _onConfirmDate('DATE', value)}
          />
          <DatePicker
            open={showTime}
            type="TIME"
            onCancel={() => setShowTime(false)}
            onConfirm={(value) => _onConfirmDate('TIME', value)}
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

const PostHeader = ({
  onCancel,
  onPost,
  onUpdate,
  isUpdate,
}: PostHeaderProps) => {
  const user = useSelector((state: RootState) => state.user);
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
        <TouchableOpacity onPress={onCancel}>
          <Close width={30} height={30} color={fonts.gray800.color} />
        </TouchableOpacity>
        <Image
          source={{ uri: user.profileImage }}
          style={{
            width: 50,
            height: 50,
            borderRadius: 55,
          }}
        />
        <Text style={[fontFamily._500_Medium, fonts.size_16, fonts.gray800]}>
          {user.name}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          if (isUpdate) onUpdate?.();
          else onPost?.();
        }}
      >
        <Text style={[fontFamily._600_SemiBold, fonts.size_16, fonts.primary]}>
          {isUpdate ? 'Update' : 'Post'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const PostInput = ({ onPress, onChange, text }: PostInputProps) => {
  const { fonts, layout, gutters, colors } = useTheme();
  const isKeyboardVisible = useKeyboardVisible();
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    return () => {
      inputRef.current?.clear();
    };
  }, []);

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
        value={text}
        scrollEnabled={true}
        autoFocus={true}
        onChangeText={onChange}
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
    value: 'TIME' | 'DATE' | 'LOCATION' | 'IMAGE' | 'ACTIVITY',
  ) => {
    switch (value) {
      case 'DATE':
        onPressDateIcon?.();
        break;
      case 'IMAGE':
        onPressImageIcon?.();
        break;
      case 'LOCATION':
        onPressLocationIcon?.();
        break;
      case 'TIME':
        onPressTimeIcon?.();
        break;
      case 'ACTIVITY':
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
        gutters.paddingTop_10,
        gutters.paddingRight_16,
        {
          height: Platform.OS === 'ios' ? 50 : 80,
        },
      ]}
    >
      <TouchableOpacity onPress={() => _onPressIcon('IMAGE')}>
        <ImageIcon width={30} height={30} color={colors.gray800} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => _onPressIcon('LOCATION')}>
        <LocationIcon width={30} height={30} color={colors.gray800} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => _onPressIcon('ACTIVITY')}>
        <Activity width={30} height={30} color={colors.gray800} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => _onPressIcon('DATE')}>
        <DateIcon width={30} height={30} color={colors.gray800} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => _onPressIcon('TIME')}>
        <Clock width={30} height={30} color={colors.gray800} />
      </TouchableOpacity>
    </View>
  );
};

type PostScreenType = NativeStackScreenProps<RootStackParamList, 'Post'>;

export default Post;
