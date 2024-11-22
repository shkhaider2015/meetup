import { DummyLaraBeu } from '@/assets/dummyImages';
import { useTheme } from '@/theme';
import { fontFamily } from '@/theme/_config';
import { INotificationItem } from '@/types/notificationItem';
import { Image, Linking, Text, TouchableOpacity, View } from 'react-native';
import { convertImageURLforngRok } from '@/utils';
import { Image as ImageComp } from '../template';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import isToday from 'dayjs/plugin/isToday'; 
import isYesterday from 'dayjs/plugin/isYesterday';

const NotificationItem = (props: INotificationItem) => {
  const { sender, title, message, createdAt,redirectPath } = props;
  const { fonts, gutters, layout } = useTheme();
  dayjs.extend(relativeTime);
  dayjs.extend(isToday);
  dayjs.extend(isYesterday);

  const formatDate = (createdAt:string) => {
    const date = dayjs(createdAt);

    if (date.isToday()) {
      return date.format('HH:mm');
    }

    if (date.isYesterday()) {
      return 'Yesterday';
    }

    if (date.year() === dayjs().year()) {
      return date.format('HH:mm DD MMM'); 
    }

    return date.format('HH:mm DD MMM YYYY'); 
  };
  
  const onPressItem = () => {
    Linking.openURL(redirectPath)
  }

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={onPressItem}
      style={[
        layout.row,
        layout.itemsCenter,
        layout.justifyStart,
        { columnGap: 20 },
      ]}
    >
      <View style={[layout.flex_1]}>
        <ImageComp
          imageURL={convertImageURLforngRok(sender.profileImage)}
          containerStyle={{ width: 50, height: 50, borderRadius: 40 }}
          fastImageProp={{ style: { borderRadius: 40 } }}
        />
      </View>
      <View style={[layout.col, { flex: 6, height: 55 }]}>
        <View style={[layout.row, layout.justifyBetween, layout.itemsCenter]}>
          <Text style={[fonts.size_14, fonts.gray800, fontFamily._500_Medium]}>
            {sender?.name}
          </Text>
          <Text style={[fonts.size_10, fontFamily._300_Light, fonts.gray250]}>
            {formatDate(createdAt)}
          </Text>
        </View>
        <Text style={[fonts.size_12, fontFamily._400_Regular, fonts.gray250]}>
          {message}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default NotificationItem;
