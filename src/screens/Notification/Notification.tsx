import { useDispatch, useSelector } from 'react-redux'; // Add the import
import { EmptyList, NotificationItem } from '@/components';
import { SafeScreen } from '@/components/template';
import { getNotifications } from '@/services/notifications';
import { AppDispatch, RootState } from '@/store';
import { clearNotificationsBadge } from '@/store/slices/badgeSlice';
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
import Notification from 'react-native-push-notification';
import NotificationPlaceholder from './Notification.placeholder';

const Notifications = ({}: NotificationsScreenType) => {
  const userId = useSelector((state: RootState) => state.user._id);
  const badges = useSelector((state: RootState) => state.badge);
  const dispatch: AppDispatch = useDispatch();
  const [notificationData, setNotificationData] = useState<INotificationItem[]>(
    [],
  );
  const [refreshData, setRefreshData] = useState(false);
  const [loadinng, setLoading] = useState(false);

  const { layout, gutters, backgrounds, fonts, colors } = useTheme();
  const { isPending, isError, mutate } = useMutation({
    mutationFn: () => {
      return getNotifications(userId);
    },
    onSuccess: (data: INotificationItem[]) => {
      console.log('Notifications fetched successfully:', data);
      setNotificationData(data);
      if (refreshData) setRefreshData(false);
      if (loadinng) setLoading(false);
    },
    onError: (error) => {
      console.error('Error fetching notifications:', error);
      if (refreshData) setRefreshData(false);
      if (loadinng) setLoading(false);
    },
  });

  useEffect(() => {
    console.log('userId:', userId);
    if (userId) {
      setLoading(true);
      mutate();
    }
  }, [userId]);

  useFocusEffect(
    useCallback(() => {
      mutate();
      if (badges.Notifications > 0) {
        dispatch(clearNotificationsBadge());
        Notification.removeAllDeliveredNotifications();
      }
    }, [badges]),
  );

  const _onRefresh = () => {
    setRefreshData(true);
    mutate();
  };

  if (loadinng) return <NotificationPlaceholder />;

  return (
    <View
      style={[
        backgrounds.gray30,
        {
          flex: 1,
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
            colors={[colors.primary]}
            progressBackgroundColor={colors.gray00}
          />
        }
      />
    </View>
  );
};

type NotificationsScreenType = NativeStackScreenProps<
  RootStackParamList,
  'Notifications'
>;

export default Notifications;
