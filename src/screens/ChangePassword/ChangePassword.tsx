import { ChevronLeft } from '@/assets/icon';
import { Button, InputField, SafeScreen } from '@/components/template';
import { useTheme } from '@/theme';
import { fontFamily, heights } from '@/theme/_config';
import { NavigationHookProps, RootStackParamList } from '@/types/navigation';
import { ChangePasswordSchema } from '@/types/schemas/user';
import { useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import { useRef } from 'react';
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';

const ChangePassword = ({ navigation }: ChangePasswordScreenType) => {
  const { layout, gutters, fonts } = useTheme();
  const { height } = Dimensions.get('screen');
  const screenHeight = height - heights.tabNavigationHeader - 60;
  const newPasswordRef = useRef<TextInput>(null);
  const confirmNewPasswordRef = useRef<TextInput>(null);

  const formik = useFormik<{
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
  }>({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
    validationSchema: ChangePasswordSchema,
    onSubmit: (values) => {
      console.log(values);
      navigation.navigate('ForgetPasswordComplete', {
        type: "ChangePassword"
      });
    },
  });

  const _handleNext = (nextRef: React.RefObject<TextInput>) => {
    nextRef.current?.focus();
  };

  return (
    <SafeScreen>
      <ChangePasswordHeader />
      <KeyboardAvoidingView>
        <ScrollView >
          <View style={[ { minHeight: screenHeight} ]} >
            <View
              style={[
                gutters.paddingHorizontal_24,
                gutters.paddingVertical_16,
                { flex: 2 }
              ]}
            >
              <Text
                style={[fonts.size_32, fonts.gray800, fontFamily._600_SemiBold]}
              >
                Create New Password
              </Text>
              <Text
                style={[fonts.size_16, fonts.gray250, fontFamily._400_Regular]}
              >
                Your new password must be unique from those previously used.
              </Text>
              <View style={[gutters.marginTop_40]}>
                <InputField
                  placeholder="Current Password"
                  inputType="PASSWORD"
                  onChangeText={formik.handleChange('currentPassword')}
                  onBlur={formik.handleBlur('currentPassword')}
                  value={formik.values.currentPassword}
                  onSubmitEditing={() => _handleNext(newPasswordRef)}
                  returnKeyType="next"
                  blurOnSubmit={false}
                  isError={
                    formik.touched.currentPassword &&
                    formik.errors.currentPassword
                      ? true
                      : false
                  }
                />
                <Text
                  style={[gutters.marginLeft_12, fonts.size_12, fonts.error]}
                >
                  {formik.touched.currentPassword &&
                  formik.errors.currentPassword
                    ? formik.errors.currentPassword
                    : ''}
                </Text>
              </View>
              <View style={[gutters.marginTop_10]}>
                <InputField
                  ref={newPasswordRef}
                  placeholder="New Password"
                  inputType="PASSWORD"
                  onChangeText={formik.handleChange('newPassword')}
                  onBlur={formik.handleBlur('newPassword')}
                  value={formik.values.newPassword}
                  onSubmitEditing={() => _handleNext(confirmNewPasswordRef)}
                  returnKeyType="next"
                  blurOnSubmit={false}
                  isError={
                    formik.touched.newPassword && formik.errors.newPassword
                      ? true
                      : false
                  }
                />
                <Text
                  style={[gutters.marginLeft_12, fonts.size_12, fonts.error]}
                >
                  {formik.touched.newPassword && formik.errors.newPassword
                    ? formik.errors.newPassword
                    : ''}
                </Text>
              </View>
              <View style={[gutters.marginTop_12]}>
                <InputField
                  ref={confirmNewPasswordRef}
                  placeholder="Confirm Password"
                  inputType="PASSWORD"
                  onChangeText={formik.handleChange('confirmNewPassword')}
                  onBlur={formik.handleBlur('confirmNewPassword')}
                  value={formik.values.confirmNewPassword}
                  onSubmitEditing={() => Keyboard.dismiss()}
                  isError={
                    formik.touched.confirmNewPassword &&
                    formik.errors.confirmNewPassword
                      ? true
                      : false
                  }
                />

                <Text
                  style={[gutters.marginLeft_12, fonts.size_12, fonts.error]}
                >
                  {formik.touched.confirmNewPassword &&
                  formik.errors.confirmNewPassword
                    ? formik.errors.confirmNewPassword
                    : ''}
                </Text>
              </View>
            </View>
            <View
              style={[
                gutters.paddingHorizontal_24,
                layout.justifyStart,
                { flex: 1 }
              ]}
            >
              <Button
                label="Update"
                type="PRIMARY"
                onPress={formik.handleSubmit}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeScreen>
  );
};

const ChangePasswordHeader = () => {
  const navigation = useNavigation<NavigationHookProps>();
  const { layout, gutters, backgrounds, borders, fonts } = useTheme();

  return (
    <View
      style={[
        backgrounds.gray00,
        layout.row,
        layout.justifyBetween,
        layout.itemsCenter,
        gutters.paddingHorizontal_16,
        borders.wBottom_1,
        borders.gray150,
        { height: heights.tabNavigationHeader },
      ]}
    >
      <TouchableOpacity
        style={[gutters.paddingHorizontal_8, gutters.paddingVertical_8]}
        onPress={() => navigation.goBack()}
      >
        <ChevronLeft />
      </TouchableOpacity>
      <Text style={[{ fontSize: 20 }, fontFamily._600_SemiBold, fonts.gray800]}>
        Change Password
      </Text>
      <View style={[gutters.paddingHorizontal_16]} />
    </View>
  );
};

export type ChangePasswordScreenType = NativeStackScreenProps<
  RootStackParamList,
  'ChangePassword'
>;
export default ChangePassword;
