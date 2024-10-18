import { Key, Signout } from '@/assets/icon';
import { Header, SettingsItem } from '@/components';
import { SafeScreen } from '@/components/template';
import { POST, USER } from '@/constants';
import { useLoader } from '@/hooks';
import { logout } from '@/services/users';
import { removeItem } from '@/storage';
import { AppDispatch } from '@/store';
import { clearUser } from '@/store/slices/userSlice';
import { useTheme } from '@/theme';
import { RootStackParamList } from '@/types/navigation';
import { useMutation } from '@tanstack/react-query';
import { Dimensions, ScrollView, View } from 'react-native';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';

const SettingsScreen = ({ navigation }: SettingsScreenType) => {
  const { gutters, colors } = useTheme();
  const screenHeight = Dimensions.get('screen').height;

  const { showLoader, hideLoader } = useLoader();
  const dispatch: AppDispatch = useDispatch();

  const { mutate } = useMutation({
    mutationFn: () => {
      return logout();
    },
    onSuccess: () => {
      hideLoader();
      dispatch(clearUser());
      removeItem(USER);
      removeItem(POST);
    },
    onError: (error) => {
      hideLoader();
      Toast.show({
        type: 'error',
        text1: 'Logout Failed',
        text2: error?.message || 'Something wrong happened',
      });
    },
  });

  const _logout = () => {
    showLoader();
    mutate();
  };

  return (
    <SafeScreen>
      <Header label="Settings" />
      <ScrollView>
        <View
          style={[
            { minHeight: screenHeight },
            gutters.paddingHorizontal_24,
            gutters.paddingVertical_16,
          ]}
        >
          <SettingsItem
            label="Change Password"
            Icon={() => <Key width={20} height={20} color={colors.gray00} />}
            onPress={() => navigation.navigate('ChangePassword')}
          />
          <SettingsItem
            label="Logout"
            Icon={() => (
              <Signout width={20} height={20} color={colors.gray00} />
            )}
            onPress={() => _logout()}
          />
        </View>
      </ScrollView>
    </SafeScreen>
  );
};

type SettingsScreenType = NativeStackScreenProps<
  RootStackParamList,
  'Settings'
>;

export default SettingsScreen;
