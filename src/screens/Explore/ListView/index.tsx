import { EmptyList, Post } from '@/components';
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
  const user = useSelector((state: RootState) => state.user);
  const [refreshData, setRefreshData] = useState(false);

  const { layout, gutters, backgrounds, colors } = useTheme();
  const screenHeight =
    Dimensions.get('window').height -
    (heights.bottomTabBarHeight +
      heights.tabNavigationHeader);
  const dispatch: AppDispatch = useDispatch();

  const { isPending, mutate } = useMutation({
    mutationFn: () => {
      return getAllPost({ userId: user._id});
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
    if(user._id) {
      mutate();
    }
  }, [dispatch, user]);

  const _onRefresh = () => {
    setRefreshData(true);
    mutate();
  };

  return (
    <SafeScreen>
      <View
        style={[
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
          contentContainerStyle={[{ paddingBottom: 40, paddingTop: heights.exploreTabsHeader }]}
          refreshControl={
            <RefreshControl
              refreshing={refreshData}
              onRefresh={_onRefresh}
              tintColor={colors.primary}
            />
          }
          ListEmptyComponent={<EmptyList containerStyle={[ { minHeight: screenHeight } ]} />}
          
        />
      </View>
    </SafeScreen>
  );
};

type ListViewScreenType = NativeStackScreenProps<
  ExploreTabsParamList,
  'ListView'
>;

export default ListView;
