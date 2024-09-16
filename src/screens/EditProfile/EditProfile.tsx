import { ChevronLeft } from '@/assets/icon';
import { ProfileImagePlaceholder } from '@/assets/images';
import { ActivityPicker } from '@/components';
import {
  Button,
  InputField,
  SafeScreen,
  SelectField,
} from '@/components/template';
import { IActivity } from '@/constants/activities';
import { useLoader } from '@/hooks';
import { updateProfile } from '@/services/users';
import { AppDispatch, RootState } from '@/store';
import { setUser } from '@/store/slices/userSlice';
import { useTheme } from '@/theme';
import { fontFamily, heights } from '@/theme/_config';
import { IEditProfileForm } from '@/types/forms';
import { RootStackParamList } from '@/types/navigation';
import { editProfileSchema } from '@/types/schemas/user';
import { editProfileState } from '@/types/screens/editProfile';
import { convertImageURLforngRok } from '@/utils';
import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import _ from 'lodash';
import { useRef, useState } from 'react';
import {
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
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
import { useDispatch, useSelector } from 'react-redux';

const EditProfileScreen = ({ navigation }: EditProfileScreenType) => {
  const { layout, fonts, colors, gutters, backgrounds } = useTheme();
  const { height } = Dimensions.get('screen');
  const bioRef = useRef<TextInput>(null);
  const [showActivity, setShowActivity] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const { showLoader, hideLoader } = useLoader();

  const { isPending, mutate } = useMutation({
    mutationFn: async (data: IEditProfileForm) => {
      return updateProfile(user._id, data);
    },
    onSuccess: (data) => {
      console.log('success update data : ', data);
      hideLoader();
      Toast.show({
        type: 'success',
        text1: 'Profile Updated successfully',
      });

      dispatch(
        setUser({
          ...user,
          ...data,
          profileImage: convertImageURLforngRok(data.profileImage),
        }),
      );
    },
    onError: (error) => {
      hideLoader();
      Toast.show({
        type: 'error',
        text1: 'Profile Update Failed',
        text2: error.message || 'Something wrong happened',
      });
    },
  });

  const formik = useFormik<IEditProfileForm>({
    initialValues: {
      name: user.name,
      bio: user.bio,
      activitiesToAdd: [],
      activitiesToDelete: [],
    },
    validationSchema: editProfileSchema,
    onSubmit: (values) => {
      showLoader();
      mutate(values);
    },
  });

  const _handleNext = (nextRef: React.RefObject<TextInput>) => {
    nextRef.current?.focus();
  };

  const _handleBack = () => {
    navigation.goBack();
  };

  const _onConfirmActivity = (activities: IActivity[]) => {
    let prevIds = user.activities;
    let addIds = activities
      .map((item) => item.id)
      .filter((id) => !prevIds.some((prevId) => prevId === id));
    let deleteIds = prevIds.filter(
      (id) => !activities.some((item) => item.id === id),
    );

    formik.setFieldValue('activitiesToAdd', addIds);
    formik.setFieldValue('activitiesToDelete', deleteIds);
  };

  const _uploadImage = async () => {
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

    const fileSize = result.assets?.[0].fileSize || 0;
    const fileSizeInMB = (fileSize / (1024 * 1024)).toFixed(2);

    if(Number(fileSizeInMB) >= 5) {
      Toast.show({
        type: "info",
        text1: "Image size must be less than 5 MB"
      })
      return
    }
    

    formik.setFieldValue('profileImage', result.assets?.[0]);
  };

  const _onUpdate = () => {
    if (!formik.dirty) {
      Toast.show({
        type: 'info',
        text1: 'Nothing to update',
      });
      return;
    }
    formik.handleSubmit();
  };

  console.log();

  return (
    <SafeScreen>
      <EditProfileHeader onBack={_handleBack} onUpdate={_onUpdate} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView>
          <View
            style={[
              layout.flex_1,
              backgrounds.gray30,
              gutters.paddingVertical_16,
              gutters.paddingHorizontal_24,
              gutters.paddingVertical_16,
              {
                minHeight: height - heights.tabNavigationHeader - 70,
              },
            ]}
          >
            {/* Head Section */}
            <View
              style={[
                layout.row,
                layout.justifyStart,
                layout.itemsCenter,
                gutters.gap_16,
                gutters.paddingVertical_24,
              ]}
            >
              {!_.isEmpty(formik.values.profileImage) ? (
                <Image
                  source={{ uri: formik.values.profileImage?.uri }}
                  style={styles.profileImage}
                />
              ) : user.profileImage ? (
                <Image src={user.profileImage} style={styles.profileImage} />
              ) : (
                <Image
                  source={ProfileImagePlaceholder}
                  style={styles.profileImage}
                />
              )}

              <View>
                <Text
                  style={[
                    fonts.size_14,
                    fontFamily._400_Regular,
                    fonts.gray250,
                  ]}
                >
                  Upload your profile image
                </Text>
                <Button
                  type="PRIMARY"
                  label="Upload Image"
                  textStyle={[fontFamily._700_Bold, fonts.size_16]}
                  containerStyle={[gutters.marginTop_8]}
                  onPress={_uploadImage}
                />
              </View>
            </View>
            {/* Input section */}
            <View style={[gutters.marginTop_40]}>
              <Text
                style={[
                  fonts.gray250,
                  fonts.size_14,
                  fontFamily._400_Regular,
                  gutters.marginBottom_10,
                ]}
              >
                Email
              </Text>
              <InputField
                placeholder="Email"
                value={user.email}
                // onSubmitEditing={() => _handleNext(passwordRef)}
                disable={true}
              />
            </View>
            <View style={[gutters.marginTop_10]}>
              <Text
                style={[
                  fonts.gray250,
                  fonts.size_14,
                  fontFamily._400_Regular,
                  gutters.marginBottom_10,
                ]}
              >
                Display Name
              </Text>
              <InputField
                placeholder="Full Name"
                onChangeText={formik.handleChange('name')}
                onBlur={formik.handleBlur('name')}
                value={formik.values.name}
                onSubmitEditing={() => _handleNext(bioRef)}
                returnKeyType="next"
                keyboardType="default"
                autoCapitalize="none"
                blurOnSubmit={false}
                isError={
                  formik.touched.name && formik.errors.name ? true : false
                }
              />
              <Text style={[gutters.marginLeft_12, fonts.size_12, fonts.error]}>
                {formik.touched.name && formik.errors.name
                  ? formik.errors.name
                  : ''}
              </Text>
            </View>
            <View style={[gutters.marginTop_10]}>
              <Text
                style={[
                  fonts.gray250,
                  fonts.size_14,
                  fontFamily._400_Regular,
                  gutters.marginBottom_10,
                ]}
              >
                Bio
              </Text>
              <TouchableOpacity onPress={() => bioRef.current?.focus()}>
                <InputField
                  ref={bioRef}
                  placeholder="Write something about you"
                  onChangeText={formik.handleChange('bio')}
                  onBlur={formik.handleBlur('bio')}
                  value={formik.values.bio}
                  onSubmitEditing={() => Keyboard.dismiss()}
                  returnKeyType="next"
                  keyboardType="default"
                  autoCapitalize="none"
                  blurOnSubmit={false}
                  isError={
                    formik.touched.bio && formik.errors.bio ? true : false
                  }
                  multiline={true}
                  rows={3}
                />
              </TouchableOpacity>
              <Text style={[gutters.marginLeft_12, fonts.size_12, fonts.error]}>
                {formik.touched.bio && formik.errors.bio
                  ? formik.errors.bio
                  : ''}
              </Text>
            </View>
            <View style={[gutters.marginTop_10]}>
              <SelectField
                placeholder="Select interests"
                // value={formik.values.activitesToAdd?.[0]}
                onPress={() => setShowActivity(true)}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <ActivityPicker
        open={showActivity}
        initialData={user.activities}
        isMulti={true}
        onClose={() => setShowActivity(false)}
        onConfirm={_onConfirmActivity}
      />
    </SafeScreen>
  );
};

const EditProfileHeader = ({
  onBack,
  onUpdate,
}: {
  onBack: () => void;
  onUpdate: () => void;
}) => {
  const { layout, fonts, colors, gutters } = useTheme();
  return (
    <View
      style={[
        layout.row,
        layout.justifyBetween,
        layout.itemsCenter,
        gutters.paddingHorizontal_16,
        { height: heights.tabNavigationHeader, width: '100%' },
      ]}
    >
      <View style={[{ width: 50 }]}>
        <TouchableOpacity
          style={[gutters.paddingVertical_8, gutters.paddingRight_8]}
          onPress={() => onBack()}
        >
          <ChevronLeft color={colors.gray800} />
        </TouchableOpacity>
      </View>
      <Text style={[fonts.size_16, fonts.gray800, fontFamily._600_SemiBold]}>
        Edit Profile
      </Text>

      <TouchableOpacity onPress={() => onUpdate()}>
        <Text style={[fonts.size_16, fonts.primary, fontFamily._500_Medium]}>
          Update
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  profileImage: {
    width: 115,
    height: 115,
    borderRadius: 120,
    borderWidth: 1,
    borderColor: '#8d8d8d',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

type EditProfileScreenType = NativeStackScreenProps<
  RootStackParamList,
  'EditProfile'
>;

export default EditProfileScreen;
