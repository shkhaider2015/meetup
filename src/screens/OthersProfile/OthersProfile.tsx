import { ChevronLeft, Star } from '@/assets/icon';
import {
  ProfileSectionActivities,
  ProfileSectionDescription,
  ProfileSectionHead,
  ProfileSectionImageGallery,
} from '@/components';
import { SafeScreen } from '@/components/template';
import { logout } from '@/services/users';
import { AppDispatch } from '@/store';
import { clearUser } from '@/store/slices/userSlice';
import { useTheme } from '@/theme';
import { fontFamily, heights } from '@/theme/_config';
import { RootStackParamList } from '@/types/navigation';
import { useMutation } from '@tanstack/react-query';
import _ from 'lodash';
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { useDispatch } from 'react-redux';

const text = `Inspiring you to live an active life ⚡️ \nAthlete — @nutrabay @athlab.in @royalsportnfitness \n“If something stands between you and your success, move it. Never be denied.”`;

const OthersProfile = ({ navigation, route }: OtherProfileScreenType) => {
  const { userId } = route.params;
  const dispatch: AppDispatch = useDispatch();
  const { layout, gutters, backgrounds, fonts } = useTheme();
  const { isError, isPending, isSuccess, mutate } = useMutation({
    mutationFn: () => {
      return logout();
    },
    onSuccess(data, variables, context) {
      console.log('Success Logout : ', data, variables, context);
      dispatch(clearUser());
    },
  });
  const { height, width } = Dimensions.get('window');

  const _goBack = () => {
    navigation.setParams({ userId: undefined })
    navigation.goBack();
  };

  return (
    <SafeScreen>
      <ProfileHeader onBack={_goBack} title="Jhonson" />
      <ScrollView>
        <View
          style={[
            backgrounds.gray30,
            {
              minHeight:
                height -
                (heights.bottomTabBarHeight + heights.tabNavigationHeader),
            },
          ]}
        >
          <ProfileSectionHead isCurrentUser={false} />
          <ProfileSectionDescription
            name={'Jhonson'}
            profession="Athelete"
            description={text}
          />
          <ProfileSectionActivities />
          <ProfileSectionImageGallery />
        </View>
      </ScrollView>
    </SafeScreen>
  );
};

const ProfileHeader = ({
  onBack,
  title,
}: {
  onBack?: () => void;
  title?: string;
}) => {
  const { layout, gutters, backgrounds, fonts, colors } = useTheme();
  return (
    <View
      style={[
        layout.row,
        layout.justifyBetween,
        layout.itemsCenter,
        gutters.paddingHorizontal_10,
        backgrounds.gray00,
        { height: heights.bottomTabBarHeight },
      ]}
    >
      <View
        style={[
          layout.row,
          layout.justifyStart,
          layout.itemsCenter,
          layout.flex_1,
        ]}
      >
        <TouchableOpacity
          onPress={onBack}
          style={[gutters.paddingHorizontal_8]}
        >
          <ChevronLeft width={25} height={25} />
        </TouchableOpacity>
      </View>
      <View
        style={[
          layout.row,
          layout.justifyCenter,
          layout.itemsCenter,
          gutters.gap_4,
          layout.flex_1,
        ]}
      >
        <Text style={[fonts.gray800, fonts.size_24, fontFamily._700_Bold]}>
          {title}
        </Text>
        <Star width={20} height={20} color={colors.blue500} />
      </View>
      <View style={[layout.flex_1]}></View>
    </View>
  );
};

type OtherProfileScreenType = NativeStackScreenProps<
  RootStackParamList,
  'OtherProfile'
>;

export default OthersProfile;
