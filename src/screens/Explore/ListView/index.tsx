import {
  DummyJohnson,
  DummyJohnsonPost,
  DummyLaraBeu,
  DummyUserLocation,
} from '@/assets/dummyImages';
import { Cat_Running_Left, Cat_Swimming } from '@/assets/icon';
import { Post } from '@/components';
import { SafeScreen } from '@/components/template';
import { getAllPost } from '@/services/posts/indes';
import { AppDispatch, RootState } from '@/store';
import { setPosts } from '@/store/slices/postSlice';
import { useTheme } from '@/theme';
import { heights } from '@/theme/_config';
import { ExploreTabsParamList } from '@/types/navigation';
import { IPost } from '@/types/post';
import { IPostReducer } from '@/types/reducer';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { useDispatch, useSelector } from 'react-redux';

const ListView = ({}: ListViewScreenType) => {
  const posts = useSelector((state: RootState) => state.posts);
  const [refreshData, setRefreshData] = useState(false);

  const { layout, gutters, backgrounds, colors } = useTheme();
  const screenHeight =
    Dimensions.get('window').height -
    (heights.bottomTabBarHeight +
      heights.tabNavigationHeader +
      heights.exploreTabsHeader +
      40);
  const dispatch: AppDispatch = useDispatch();

  const { isPending, mutate } = useMutation({
    mutationFn: () => {
      return getAllPost();
    },
    onSuccess: (data:IPostReducer[]) => {
      console.log('data : ', data?.[0]);
      dispatch(setPosts(data));
      setRefreshData(false);
    },
    onError: (error) => {
      console.log('Error : ', error);
      setRefreshData(false);
    },
  });

  useEffect(() => {
    mutate();
  }, [dispatch]);

  const _onRefresh = () => {
    setRefreshData(true);
    mutate();
  };

  return (
    <SafeScreen>
      <View
        style={[
          gutters.paddingVertical_12,
          backgrounds.gray30,
          {
            height: screenHeight,
          },
        ]}
      >
        <FlatList
          data={posts}
          renderItem={({ item }) => <Post {...item} />}
          keyExtractor={(item, ind) => item._id || ind.toString()}
          contentContainerStyle={[{ paddingBottom: 40 }]}
          refreshControl={
            <RefreshControl
              refreshing={refreshData}
              onRefresh={_onRefresh}
              tintColor={colors.primary}
            />
          }
        />
      </View>
    </SafeScreen>
  );
};

const dummyDesc = `Skaterboarding at Whistler Skateboard park at 4 pm 20th May.Skating is my cherished hobby, a daily ritual I eagerly anticipate. At precisely 4 PM, I glide onto the smooth pavement of Central Park, indulging in the exhilarating freedom it offers. 

Each graceful turn and twist brings me profound joy, a temporary escape from the daily hustle. In this serene setting, I find solace and rejuvenation, making my daily skate a cherished part of my routine.
`;
// const PostsData: IPost[] = [
//   {
//     user: {
//       name: 'Lara Beu',
//       imageSource: DummyLaraBeu,
//     },
//     distance: '3km',
//     activity: '324c37c3-588b-4a90-b1b9-e341cf949cd9',
//     main_post: DummyUserLocation,
//     created_at: '3 hours ago',
//     desc: dummyDesc,
//   },
//   {
//     user: {
//       name: 'Johnson',
//       imageSource: DummyJohnson,
//     },
//     distance: '3km',
//     activity: '1eaf4626-82c0-40d9-835b-7433a01c0d2b',
//     main_post: DummyJohnsonPost,
//     created_at: '3 hours ago',
//     desc: dummyDesc,
//   },
// ];

type ListViewScreenType = NativeStackScreenProps<
  ExploreTabsParamList,
  'ListView'
>;

export default ListView;
