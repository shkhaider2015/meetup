import { ChevronLeft, Star } from '@/assets/icon';
import {
  Header,
  ProfileSectionActivities,
  ProfileSectionDescription,
  ProfileSectionHead,
  ProfileSectionImageGallery,
} from '@/components';
import { SafeScreen } from '@/components/template';
import { getAllPostByUser } from '@/services/posts/indes';
import { logout } from '@/services/users';
import { getUserDetails } from '@/services/users/auth';
import { AppDispatch, RootState } from '@/store';
import { clearUser } from '@/store/slices/userSlice';
import { useTheme } from '@/theme';
import { fontFamily, heights } from '@/theme/_config';
import { RootStackParamList } from '@/types/navigation';
import { IPostReducer } from '@/types/reducer';
import { convertImageURLforngRok } from '@/utils';
import { useFocusEffect } from '@react-navigation/native';
import { useMutation } from '@tanstack/react-query';
import _ from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';

const text = `Inspiring you to live an active life ⚡️ \nAthlete — @nutrabay @athlab.in @royalsportnfitness \n“If something stands between you and your success, move it. Never be denied.”`;

const OthersProfile = ({ navigation, route }: OtherProfileScreenType) => {
  const { userId } = route.params;

  const currentUser = useSelector((state: RootState) => state.user);
  const [userInfo, setUserInfo] = useState<IUserInfo>();
  const [userPosts, setUserPosts] = useState<IPostReducer[]>([])

  const dispatch: AppDispatch = useDispatch();
  const { layout, gutters, backgrounds, fonts, colors } = useTheme();
  const { isPending, mutate } = useMutation({
    mutationFn: () => {
      return getUserDetails({
        userId: userId || '',
        currentUserId: currentUser._id,
      });
    },
    onSuccess: (data, variables, context) => {
      console.log("Data : ", data);
      
      setUserInfo(data);
    },
    onError: (error) => {
      Toast.show({
        type: 'error',
        text1: error.message,
      });
    },
  });
  const { isPending:postsPending, mutate:postsMutation } = useMutation({
    mutationFn: () => {
      return getAllPostByUser(userId|| "");
    },
    onSuccess: (data, variables, context) => {
      console.log("Post success Data : ", data);
      
      setUserPosts(data?.data);
    },
    onError: (error) => {
      Toast.show({
        type: 'error',
        text1: error.message,
      });
    },
  });
  const { height, width } = Dimensions.get('window');

  useFocusEffect(useCallback(() => {
    if(userId && currentUser) {
      mutate();
      postsMutation()
    }
  }, [userId, currentUser]));

  const _goBack = () => {
    navigation.setParams({ userId: undefined });
    if(navigation.canGoBack()) {
      navigation.goBack()
    } else {
      navigation.replace("Tabs")
    }
  };

  const _followUser = () => {};

  console.log("UserPosts : ", userId);

  return (
    <SafeScreen>
      <Header middleComponent={() => <View
        style={[
          layout.row,
          layout.justifyCenter,
          layout.itemsCenter,
          gutters.gap_4,
          {
            flex: 4
          }
        ]}
      >
        <Text style={[fonts.gray800, fonts.size_16, fontFamily._700_Bold, gutters.marginTop_4]}>
          {userInfo?.name}
        </Text>
        <Star width={20} height={20} color={colors.blue500} />
      </View>} />
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
            isCurrentUser={false}
            onPressButton={_followUser}
            profileImage={convertImageURLforngRok(userInfo?.profileImage || '')}
          />
          <ProfileSectionDescription
            name={userInfo?.name}
            profession="Athelete"
            description={userInfo?.bio}
          />
          <ProfileSectionActivities activities={userInfo?.activities} />
          <ProfileSectionImageGallery posts={userPosts} isLoading={postsPending} />
        </View>
      </ScrollView>
    </SafeScreen>
  );
};

interface IUserInfo {
  _id: string;
  name: string;
  email: string;
  profileImage: string;
  cometchat: {
    id: string;
  };
  bio: string;
  activities: string[];
}

type OtherProfileScreenType = NativeStackScreenProps<
  RootStackParamList,
  'OtherProfile'
>;

export default OthersProfile;
