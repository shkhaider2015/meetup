import {
  ProfileSectionDescription,
  ProfileSectionHead,
  ProfileSectionImageGallery,
  ProfileSectionActivities,
} from '@/components';
import { SafeScreen } from '@/components/template';
import { useState,useCallback } from 'react';
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
import { IPostReducer } from '@/types/reducer';
import { getAllPostByUser } from '@/services/posts/indes';
import Toast from 'react-native-toast-message';
import { useFocusEffect } from '@react-navigation/native';
import { convertImageURLforngRok } from '@/utils';


const Profile = ({ navigation, route }: ProfileScreenType) => {
  const user = useSelector((state: RootState) => state.user);
  const { backgrounds } = useTheme();
  const [userPosts, setUserPosts] = useState<IPostReducer[]>([]);
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
  console.log(user._id, "user idd");

  const { isPending:postsPending, mutate:postsMutation } = useMutation({
    mutationFn: () => {
      return getAllPostByUser(user._id);
    },
    onSuccess: (data, variables, context) => {
      console.log("Post success Data on profile  : ", data);
      setUserPosts(data);
    },
    onError: (error) => {
      Toast.show({
        type: 'error',
        text1: error.message,
      });
    },
  });
  console.log('User ID is :', user._id);

  useFocusEffect(useCallback(() => {
    if(user._id) {
      postsMutation();
     
    } else {
      console.log("no user exist")
    }
  }, [user]));
  console.log("UserPosts : ", userPosts);
  console.log("profile image",user.profileImage);
  console.log(convertImageURLforngRok(user.profileImage));

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
            profession={user.profession}
            description={user.bio}
          />

          <ProfileSectionActivities activities={user.activities} />
          <ProfileSectionImageGallery  posts={userPosts} />
        </View>
      </ScrollView>
    </SafeScreen>
  );
};

type ProfileScreenType = NativeStackScreenProps<RootStackParamList, 'Profile'>;

export default Profile;
