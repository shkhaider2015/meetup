import { ChevronLeft } from '@/assets/icon';
import { ProfileImagePlaceholder } from '@/assets/images';
import { ActivityPicker } from '@/components';
import {
  Button,
  InputField,
  SafeScreen,
  SelectField,
} from '@/components/template';
import { useTheme } from '@/theme';
import { fontFamily, heights } from '@/theme/_config';
import { RootStackParamList } from '@/types/navigation';
import { editProfileSchema } from '@/types/schemas/user';
import { editProfileState } from '@/types/screens/editProfile';
import { useFormik } from 'formik';
import { useState } from 'react';
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';

const EditProfileScreen = ({ navigation }: EditProfileScreenType) => {
  const { layout, fonts, colors, gutters, backgrounds } = useTheme();
  const { height } = Dimensions.get('screen');

  const [showActivity, setShowActivity] = useState<boolean>(false)

  const formik = useFormik<editProfileState>({
    initialValues: {
      name: '',
      bio: '',
      interests: '',
    },
    validationSchema: editProfileSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const _handleNext = (nextRef: React.RefObject<TextInput>) => {
    nextRef.current?.focus();
  };

  const _handleBack = () => {
    navigation.goBack();
  };

  const _onConfirmActivity = (label:string|undefined) => {
    formik.setFieldValue('interests', label)
  }

  return (
    <SafeScreen>
      <EditProfileHeader onBack={_handleBack} onUpdate={formik.handleSubmit} />
      <KeyboardAvoidingView>
      <ScrollView>
        <View
          style={[
            layout.flex_1,
            backgrounds.gray30,
            gutters.paddingVertical_16,
            gutters.paddingHorizontal_24,
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
            <Image
              source={ProfileImagePlaceholder}
              style={{ width: 115, height: 115, borderRadius: 120 }}
            />
            <View>
              <Text
                style={[fonts.size_14, fontFamily._400_Regular, fonts.gray250]}
              >
                Upload your profile image
              </Text>
              <Button
                type="PRIMARY"
                label="Upload Image"
                textStyle={[fontFamily._700_Bold, fonts.size_16]}
                containerStyle={[gutters.marginTop_8]}
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
              value={'shkhaider2015@gmail.com'}
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
              // onSubmitEditing={() => _handleNext(passwordRef)}
              returnKeyType="next"
              keyboardType="default"
              autoCapitalize="none"
              blurOnSubmit={false}
              isError={formik.touched.name && formik.errors.name ? true : false}
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
            <InputField
              placeholder="Write something about you"
              onChangeText={formik.handleChange('bio')}
              onBlur={formik.handleBlur('bio')}
              value={formik.values.bio}
              // onSubmitEditing={() => _handleNext(passwordRef)}
              returnKeyType="next"
              keyboardType="default"
              autoCapitalize="none"
              blurOnSubmit={false}
              isError={formik.touched.bio && formik.errors.bio ? true : false}
              multiline={true}
              rows={3}
            />
            <Text style={[gutters.marginLeft_12, fonts.size_12, fonts.error]}>
              {formik.touched.bio && formik.errors.bio ? formik.errors.bio : ''}
            </Text>
          </View>
          <View style={[gutters.marginTop_10]}>
            <SelectField placeholder="Select interests" value={formik.values.interests} onPress={() => setShowActivity(true)} />
          </View>
        </View>
        <ActivityPicker
              open={showActivity}
              onClose={() => setShowActivity(false)}
              onConfirm={_onConfirmActivity}
            />
      </ScrollView>
      </KeyboardAvoidingView>
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

type EditProfileScreenType = NativeStackScreenProps<
  RootStackParamList,
  'EditProfile'
>;

export default EditProfileScreen;
