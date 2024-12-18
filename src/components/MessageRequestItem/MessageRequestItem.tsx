import { useTheme } from '@/theme';
import { Text, View } from 'react-native';
import { Button, Image } from '../template';
import { fontFamily } from '@/theme/_config';
import dayjs from 'dayjs';
import { convertImageURLforngRok } from '@/utils';
import { useMutation } from '@tanstack/react-query';
import { EMessageRequestStatus } from '@/types/reducer';
import { updateMessageRequestStatus } from '@/services/Chat';
import { useState } from 'react';
import Toast from 'react-native-toast-message';
import { CometChat } from '@cometchat/chat-sdk-react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationHookProps } from '@/types/navigation';

const MessageRequestItem = (props: IMessageRequestItem) => {
  const {
    _id,
    message,
    sender,
    receiver,
    createdAt,
    type,
    onAccept,
    onDecline,
  } = props;
  const user = type === 'RECEIVER' ? sender : receiver;
  const { layout, gutters, backgrounds, fonts, colors, borders } = useTheme();
  const navigation = useNavigation<NavigationHookProps>();

  const [isLoading, setIsLoading] = useState<EMessageRequestStatus>();

  const { mutate } = useMutation({
    mutationFn: (status: EMessageRequestStatus) => {
      return updateMessageRequestStatus({
        id: _id,
        status,
      });
    },
    onSuccess: async (data, vaiables) => {
      if (vaiables === EMessageRequestStatus.ACCEPTED) {
        try {
          const cometChatUser: CometChat.User = await CometChat.getUser(
            user.cometchat.id,
          );
          navigation.navigate('Messages', {
            chatWith: cometChatUser,
          });
        } catch (error: any) {
          Toast.show({
            type: 'error',
            text1: error?.message || "Can't start chat with this user",
          });
        } finally {
          onAccept?.(_id);
          setIsLoading(EMessageRequestStatus.PENDING);
        }
      }
      if (vaiables === EMessageRequestStatus.DECLINED) onDecline?.(_id);
    },
    onError: (error) => {
      setIsLoading(EMessageRequestStatus.PENDING);
      Toast.show({
        type: 'error',
        text1: 'Failed to update request status',
        text2: error.message,
      });
    },
  });

  const _onAccept = () => {
    setIsLoading(EMessageRequestStatus.ACCEPTED);
    mutate(EMessageRequestStatus.ACCEPTED);
  };

  const _onDecline = () => {
    setIsLoading(EMessageRequestStatus.DECLINED);
    mutate(EMessageRequestStatus.DECLINED);
  };

  return (
    <View
      style={[
        backgrounds.gray30,
        gutters.paddingHorizontal_10,
        gutters.paddingVertical_10,
        borders.gray100,
        borders.w_1,
        borders.rounded_16,
      ]}
    >
      <View style={[layout.row, layout.justifyBetween, layout.itemsStart]}>
        <View
          style={[
            layout.row,
            layout.justifyStart,
            layout.itemsCenter,
            gutters.gap_8,
            { width: '80%' },
          ]}
        >
          <Image
            imageURL={convertImageURLforngRok(user.profileImage)}
            containerStyle={{ width: 50, height: 50, borderRadius: 50 }}
            fastImageProp={{
              style: {
                width: 50,
                height: 50,
                borderRadius: 50,
                borderWidth: 1,
                borderColor: colors.gray100,
              },
            }}
          />
          <View>
            <Text
              style={[fontFamily._500_Medium, fonts.size_12, fonts.gray800]}
            >
              {user.name}
            </Text>
            <Text
              style={[
                fontFamily._400_Regular,
                fonts.size_12,
                fonts.gray300,
                { width: '100%' },
              ]}
            >
              {/* {message} */}
              {type === 'RECEIVER'
                ? `${user.name} wants to chat with you.`
                : `Your chat request has been sent`}
            </Text>
          </View>
        </View>
        <Text style={[fontFamily._400_Regular, fonts.size_12, fonts.gray200]}>
          {dayjs(createdAt).format('hh:mm a')}
        </Text>
      </View>
      <View
        style={[
          layout.row,
          layout.justifyEnd,
          layout.itemsCenter,
          gutters.gap_10,
        ]}
      >
        {type === 'RECEIVER' && (
          <Button
            type="PRIMARY"
            label="Accept"
            containerStyle={[{ height: 30, width: '28%' }]}
            textStyle={[{ fontSize: 12 }, fontFamily._600_SemiBold]}
            onPress={_onAccept}
            loading={isLoading === EMessageRequestStatus.ACCEPTED}
            disabled={isLoading === EMessageRequestStatus.DECLINED}
          />
        )}

        <Button
          type="SECONDARY"
          label={type === "RECEIVER" ? "Decline" : "Cancel"}
          containerStyle={[{ height: 30, width: '25%' }]}
          textStyle={[{ fontSize: 12 }, fontFamily._600_SemiBold]}
          onPress={_onDecline}
          loading={isLoading === EMessageRequestStatus.DECLINED}
          disabled={isLoading === EMessageRequestStatus.ACCEPTED}
        />
      </View>
    </View>
  );
};

interface IMessageRequestItem {
  message?: string;
  createdAt: Date;
  updatedAt: Date;
  _id: string;
  sender: {
    _id: string;
    name: string;
    profileImage: string;
    cometchat: {
      id: string;
    };
  };
  receiver: {
    _id: string;
    name: string;
    profileImage: string;
    cometchat: {
      id: string;
    };
  };
  type: 'SENDER' | 'RECEIVER';
  onAccept?: (id: string) => void;
  onDecline?: (id: string) => void;
  isLoading?: 'ACCEPTED' | 'DECLINE';
}

export default MessageRequestItem;
