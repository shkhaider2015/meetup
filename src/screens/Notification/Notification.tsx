import { useSelector } from 'react-redux'; // Add the import
import { NotificationItem } from '@/components';
import { SafeScreen } from '@/components/template';
import { getNotifications } from '@/services/notifications';
import { useTheme } from '@/theme';
import { heights } from '@/theme/_config';
import { RootStackParamList } from '@/types/navigation';
import { INotificationItem } from '@/types/notificationItem';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Dimensions, FlatList, ScrollView, Text, View } from 'react-native';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { RootState } from '@/store';

const Notifications = ({}: NotificationsScreenType) => {
  const userId = useSelector((state: RootState) => state.user._id);

  const [notificationData, setNotificationData] = useState<INotificationItem[]>(
    [],
  );
  const { layout, gutters, backgrounds, fonts } = useTheme();
  const { isPending, isError, mutate } = useMutation({
    mutationFn: () => {
      return getNotifications(userId);
    },
    onSuccess: (data: INotificationItem[]) => {
      console.log('Notifications fetched successfully:', data);
      setNotificationData(data);
    },

    onError: (error) => {
      console.error('Error fetching notifications:', error);
    },
  });

  useEffect(() => {
    console.log('userId:', userId);
    if (userId) {
      mutate();
    }
  }, [userId]);

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
          }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeScreen>
  );
};

// const dummyData:INotificationItem[] = [
//   {
//     id: "111",
//     user_name: "Farnese Vandimion",
//     created_at: "14:28",
//     notification: "Farnese liked your photo.",
//     image: DummyFarnese
//   },
//   {
//     id: "112",
//     user_name: "Joe",
//     created_at: "1:12",
//     notification: "Joe visited your profile.",
//     image: Dummy_Joe
//   },
//   {
//     id: "113",
//     user_name: "Meetup",
//     created_at: "Yesterday",
//     notification: "Our services will be down around 4pm may 13th 2024",
//     image: Dummy_Meetup
//   },
//   {
//     id: "114",
//     user_name: "Farnese Vandimion",
//     created_at: "Yesterday",
//     notification: "Farnese liked your photo.",
//     image: DummyLaraBeu
//   },
//   {
//     id: "115",
//     user_name: "Maxwell",
//     created_at: "14:28 14 april",
//     notification: "Maxwell reacted to your activity.",
//     image: Dummy_Maxwell
//   },
//   {
//     id: "116",
//     user_name: "Meetup",
//     created_at: "14:28 12 april",
//     notification: "Alert! related your activity Skateboard park....",
//     image: DummyMeetupBell
//   },
//   {
//     id: "117",
//     user_name: "Farnese Vandimion",
//     created_at: "14:28 11 april",
//     notification: "Farnese liked your photo.",
//     image: DummyFarnese
//   },
//   {
//     id: "118",
//     user_name: "Farnese Vandimion",
//     created_at: "14:28 11 april",
//     notification: "Farnese liked your photo.",
//     image: Dummy_LaraBeu2
//   },
//   {
//     id: "119",
//     user_name: "Johnson",
//     created_at: "14:28 10 april",
//     notification: "Johnson commented on your activity.",
//     image: Dummy_Johnson2
//   },
//   {
//     id: "120",
//     user_name: "Mercy",
//     created_at: "14:28 6 april",
//     notification: "Mercy saved your activity.",
//     image: DummyFarnese
//   }
// ]

type NotificationsScreenType = NativeStackScreenProps<
  RootStackParamList,
  'Notifications'
>;

export default Notifications;
