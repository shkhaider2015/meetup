import { useDispatch, useSelector } from 'react-redux'; // Add the import
import { EmptyList, NotificationItem } from '@/components';
import { SafeScreen } from '@/components/template';
import { getNotifications } from '@/services/notifications';
import { AppDispatch, RootState } from '@/store';
import {
  clearNotificationsBadge,
} from '@/store/slices/badgeSlice';
import { useTheme } from '@/theme';
import { RootStackParamList } from '@/types/navigation';
import { INotificationItem } from '@/types/notificationItem';
import { useMutation } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { useFocusEffect } from '@react-navigation/native';

const Notifications = ({}: NotificationsScreenType) => {
  const userId = useSelector((state: RootState) => state.user._id);
  const badges = useSelector((state: RootState) => state.badge);
  const dispatch: AppDispatch = useDispatch();
  const [notificationData, setNotificationData] = useState<INotificationItem[]>(
    [],
  );
  const [refreshData, setRefreshData] = useState(false);

  const { layout, gutters, backgrounds, fonts, colors } = useTheme();
  const { isPending, isError, mutate } = useMutation({
    mutationFn: () => {
      return getNotifications(userId);
    },
    onSuccess: (data: INotificationItem[]) => {
      console.log('Notifications fetched successfully:', data);
      setNotificationData(data);
      setRefreshData(false);
    },
    onError: (error) => {
      console.error('Error fetching notifications:', error);
      setRefreshData(false);
    },
  });

  useEffect(() => {
    console.log('userId:', userId);
    if (userId) {
      mutate();
    }
  }, [userId]);

  useFocusEffect(
    useCallback(() => {
      if (badges.Notifications > 0) {
        dispatch(clearNotificationsBadge());
      }
    }, [badges]),
  );

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
            minHeight: '100%',
          },
        ]}
      >
        <FlatList
          data={notificationData}
          renderItem={({ item }) => <NotificationItem {...item} />}
          keyExtractor={(item) => item._id}
          ItemSeparatorComponent={() => (
            <View
              style={[
                gutters.marginVertical_12,
                { height: 1, backgroundColor: '#a5a4a846' },
              ]}
            />
          )}
          contentContainerStyle={{
            paddingVertical: 34,
            paddingHorizontal: 24,
            minHeight: '100%',
          }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <EmptyList
              containerStyle={[{ minHeight: '100%' }]}
              text="No notifications found"
            />
          }
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

type NotificationsScreenType = NativeStackScreenProps<
  RootStackParamList,
  'Notifications'
>;

export default Notifications;
