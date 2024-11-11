import { EmptyList, Post } from '@/components';
import { SafeScreen } from '@/components/template';
import { getAllPost } from '@/services/posts/indes';
import { AppDispatch, RootState } from '@/store';
import { loadMorePosts, setPosts } from '@/store/slices/postSlice';
import { useTheme } from '@/theme';
import { fontFamily, heights } from '@/theme/_config';
import { ExploreTabsParamList } from '@/types/navigation';
import { IPostReducer } from '@/types/reducer';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  RefreshControl,
  Text,
  View,
} from 'react-native';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { useDispatch, useSelector } from 'react-redux';

const limit = 10;

const ListView = ({}: ListViewScreenType) => {
  const posts = useSelector((state: RootState) => state.posts);
  const user = useSelector((state: RootState) => state.user);
  const [refreshData, setRefreshData] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const { layout, gutters, backgrounds, colors, fonts } = useTheme();
  const screenHeight =
    Dimensions.get('window').height -
    (heights.bottomTabBarHeight + heights.tabNavigationHeader);
  const dispatch: AppDispatch = useDispatch();

  const { isPending, mutate } = useMutation({
    mutationFn: (data: { page: number }) => {
      return getAllPost({ userId: user._id, page: data.page, limit });
    },
    onSuccess: (payload: any) => {
      const data: IPostReducer[] = payload?.data;
      const page: number = payload?.page || 1;
      const hasMore: boolean = payload?.hasMore;

      setPage(page);
      setHasMore(hasMore);
      if (loadMore) {
        dispatch(loadMorePosts(data));
        setLoadMore(false);
      } else {
        dispatch(setPosts(data));
        setRefreshData(false);
      }
    },
    onError: (error) => {
      console.log('Error : ', error);
      setRefreshData(false);
      setLoadMore(false);
    },
  });

  const _onRefresh = () => {
    setRefreshData(true);
    mutate({ page: 1 });
  };

  const _fetchMoreData = () => {
    if (!hasMore) return;
    mutate({ page: page + 1 });
    setLoadMore(true);
  };

  console.log('Hasmore ', hasMore);

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
          keyExtractor={(item, ind) => item._id + ind.toString()}
          contentContainerStyle={[
            { paddingBottom: 40, paddingTop: heights.exploreTabsHeader },
          ]}
          refreshControl={
            <RefreshControl
              refreshing={refreshData}
              onRefresh={_onRefresh}
              tintColor={colors.primary}
            />
          }
          ListEmptyComponent={
            <EmptyList containerStyle={[{ minHeight: screenHeight }]} />
          }
          ListHeaderComponent={
            <View style={[layout.justifyCenter, layout.itemsCenter]}>
              {isPending && (
                <ActivityIndicator
                  size={'large'}
                  color={colors.primary}
                  style={[gutters.marginTop_16]}
                />
              )}
            </View>
          }
          onEndReachedThreshold={0.03}
          onEndReached={_fetchMoreData}
          ListFooterComponent={() => {
            if (loadMore)
              return (
                <View style={[layout.justifyCenter, layout.itemsCenter]}>
                  {loadMore && (
                    <ActivityIndicator
                      size={'large'}
                      color={colors.primary}
                      style={[gutters.marginBottom_16, gutters.marginTop_12]}
                    />
                  )}
                </View>
              );

            if (!loadMore && !hasMore)
              return (
                <View style={[layout.justifyCenter, layout.itemsCenter]}>
                  <Text
                    style={[
                      fontFamily._600_SemiBold,
                      fonts.gray200,
                      fonts.size_14,
                      gutters.marginVertical_12,
                    ]}
                  >
                    You are all set
                  </Text>
                </View>
              );
          }}
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
