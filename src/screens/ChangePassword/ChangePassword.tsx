import { ChevronLeft } from '@/assets/icon';
import { useTheme } from '@/theme';
import { fontFamily, heights } from '@/theme/_config';
import { NavigationHookProps, RootStackParamList } from '@/types/navigation';
import { useNavigation } from '@react-navigation/native';
import {
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';

const ChangePassword = ({ navigation }: ChangePasswordScreenType) => {
  return (
    <View>
      <ChangePasswordHeader />
      <KeyboardAvoidingView>
        <View>
          <Text>Change Password</Text>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const ChangePasswordHeader = () => {
  const navigation = useNavigation<NavigationHookProps>();
  const { layout, gutters, backgrounds, fonts } = useTheme();

  return (
    <View
      style={[
        backgrounds.gray00,
        layout.row,
        layout.justifyBetween,
        layout.itemsCenter,
        gutters.paddingHorizontal_16,
        { height: heights.tabNavigationHeader },
      ]}
    >
      <TouchableOpacity
        style={[gutters.paddingHorizontal_8, gutters.paddingVertical_8]}
        onPress={() => navigation.goBack()}
      >
        <ChevronLeft />
      </TouchableOpacity>
      <Text style={[ {fontSize: 20}, fontFamily._600_SemiBold, fonts.gray800 ]} >Change Password</Text>
      <View style={[ gutters.paddingHorizontal_16 ]} />
    </View>
  );
};

export type ChangePasswordScreenType = NativeStackScreenProps<
  RootStackParamList,
  'ChangePassword'
>;
export default ChangePassword;
