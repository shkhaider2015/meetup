import {
  ProfileSectionDescription,
  ProfileSectionHead,
  ProfileSectionImageGallery,
  ProfileSectionActivities,
} from '@/components';
import { SafeScreen } from '@/components/template';
import { logout } from '@/services/users';
import { AppDispatch, RootState } from '@/store';
import { clearUser } from '@/store/slices/userSlice';
import { useTheme } from '@/theme';
import { heights } from '@/theme/_config';
import { RootStackParamList } from '@/types/navigation';
import { useMutation } from '@tanstack/react-query';
import _ from 'lodash';
import { Dimensions, ScrollView, View } from 'react-native';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { useDispatch, useSelector } from 'react-redux';

const Profile = ({ navigation, route }: ProfileScreenType) => {
  const user = useSelector((state: RootState) => state.user);
  const { backgrounds } = useTheme();
  const { isError, isPending, isSuccess, mutate } = useMutation({
    mutationFn: () => {
      return logout();
    },
    onSuccess(data, variables, context) {
      console.log('Success Logout : ', data, variables, context);
      dispatch(clearUser());
    },
  });
  const dispatch: AppDispatch = useDispatch();
  const { height } = Dimensions.get('window');

  const _OpenEditProfile = () => {
    navigation.navigate('EditProfile');
  };

  return (
    <SafeScreen>
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
          <ProfileSectionHead
            isCurrentUser={true}
            onPressButton={_OpenEditProfile}
            profileImage={user.profileImage}
          />
          <ProfileSectionDescription
            name={user.name}
            profession="Athlete"
            description={user.bio}
          />

          <ProfileSectionActivities activities={user.activities} />
          <ProfileSectionImageGallery />
        </View>
      </ScrollView>
    </SafeScreen>
  );
};

type ProfileScreenType = NativeStackScreenProps<RootStackParamList, 'Profile'>;

export default Profile;
