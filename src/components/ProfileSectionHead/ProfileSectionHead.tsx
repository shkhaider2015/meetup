import { DummyJohnsonPost } from '@/assets/dummyImages';
import { Envelop, Persons } from '@/assets/icon';
import { useTheme } from '@/theme';
import { fontFamily } from '@/theme/_config';
import { widthInPercentage } from '@/utils';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Image } from '../template';
import { useMutation } from '@tanstack/react-query';
import { sendMessageRequest } from '@/services/Chat';
import Toast from 'react-native-toast-message';
import { useState } from 'react';
import { CometChat } from '@cometchat/chat-sdk-react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationHookProps } from '@/types/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const ProfileHeadSection = (props: IProfileHeadSection) => {
  const {
    profileImage,
    isCurrentUser,
    onPressButton,
    userId,
    usersChatId,
    chatStatusProp,
  } = props;
  const { layout, gutters, backgrounds, fonts, borders, colors } = useTheme();
  const { navigate } = useNavigation<NavigationHookProps>();
  const currentUser = useSelector((state: RootState) => state.user);

  const [chatLoading, setChatLoading] = useState(false);
  const [chatStatus, setChatStatus] = useState<EChatStatus>(chatStatusProp || EChatStatus.DECLINED)

  const { isPending: startChatPending, mutate: startChatMutate } = useMutation({
    mutationFn: () => {
      return sendMessageRequest({
        sender: currentUser._id,
        receiver: userId || '',
      });
    },
    onSuccess: (data: any) => {
      setChatStatus(EChatStatus.PENDING)
      Toast.show({
        type: 'success',
        text1: 'Message request sent successfully',
        text2:
          data?.message ||
          'Once end user accept your request you will be able to start chat with him',
      });
    },
    onError: (error) => {
      Toast.show({
        type: 'error',
        text1: 'Failed to start chat with user',
        text2: error.message,
      });
    },
  });

  const isFollow = false;

  const _onFollow = () => {
    if (currentUser._id === userId) return;
  };
  const _onUnfollow = () => {
    if (currentUser._id === userId) return;
  };

  const _startChat = async () => {
    if (currentUser._id === userId) return;

    if (chatStatus === EChatStatus.PENDING) return;
    if (chatStatus === EChatStatus.ACCEPTED) {
      try {
        setChatLoading(true);
        const cometChatUser: CometChat.User =
          await CometChat.getUser(usersChatId);
        navigate('Messages', {
          chatWith: cometChatUser,
        });
      } catch (error: any) {
        Toast.show({
          type: 'error',
          text1: error?.message || "Can't start chat with this user",
        });
      } finally {
        setChatLoading(false);
      }
    }
    if (chatStatus === EChatStatus.DECLINED) {
      startChatMutate();
    }
  };

  

  return (
    <View
      style={[
        layout.row,
        layout.justifyStart,
        layout.itemsCenter,
        gutters.gap_10,
        backgrounds.gray00,
        gutters.paddingVertical_32,
        gutters.paddingHorizontal_24,
        styles.root,
      ]}
    >
      {/* Image column */}
      <View
        style={[
          layout.justifyCenter,
          layout.itemsCenter,
          backgrounds.gray100,
          {
            width: widthInPercentage(33),
            height: widthInPercentage(33),
            borderRadius: 100,
            ...styles.profileImage,
          },
        ]}
      >
        <Image
          imageURL={profileImage}
          containerStyle={{
            width: widthInPercentage(32),
            height: widthInPercentage(32),
            borderRadius: 300,
          }}
          fastImageProp={{ style: { borderRadius: 300 } }}
        />
      </View>
      {/* Details Column */}
      <View style={[{ flex: 1, rowGap: 20 }]}>
        {/* Followers section */}
        <View
          style={[
            layout.row,
            isCurrentUser ? layout.justifyCenter : layout.justifyStart,
            layout.itemsCenter,
            gutters.paddingRight_10,
            gutters.gap_10,
          ]}
        >
          {/* Followers */}
          <View
            style={[
              layout.row,
              layout.justifyBetween,
              layout.itemsEnd,
              gutters.gap_8,
            ]}
          >
            <Persons
              width={widthInPercentage(8)}
              height={widthInPercentage(8)}
            />
            <View style={[layout.col]}>
              <Text
                style={[fontFamily._700_Bold, fonts.gray800, { fontSize: 14 }]}
              >
                1,232
              </Text>
              <Text
                style={[
                  fonts.size_10,
                  fontFamily._500_Medium,
                  fonts.gray800,
                  { marginTop: -5 },
                ]}
              >
                Followers
              </Text>
            </View>
          </View>
          {/* Following */}
          {/* {isCurrentUser && ( */}
          <View
            style={[
              layout.row,
              layout.justifyStart,
              layout.itemsEnd,
              gutters.gap_8,
            ]}
          >
            <Persons
              width={widthInPercentage(8)}
              height={widthInPercentage(8)}
            />
            <View style={[layout.col]}>
              <Text
                style={[fontFamily._700_Bold, fonts.gray800, { fontSize: 14 }]}
              >
                1,232
              </Text>
              <Text
                style={[
                  fonts.size_10,
                  fontFamily._500_Medium,
                  fonts.gray800,
                  { marginTop: -5 },
                ]}
              >
                Following
              </Text>
            </View>
          </View>
          {/* )} */}
        </View>
        {/* Edit Profile / Follow button */}
        {isCurrentUser ? (
          <Button
            label="Edit Profile"
            type={'PRIMARY'}
            containerStyle={[
              backgrounds.gray800,
              borders.rounded_16,
              { width: '60%', height: 45 },
            ]}
            onPress={onPressButton}
          />
        ) : (
          <View style={[layout.row, layout.justifyBetween]}>
            <Button
              label={isFollow ? 'Following' : 'Follow'}
              type={'PRIMARY'}
              containerStyle={[
                borders.rounded_16,
                { width: '40%', height: 40 },
              ]}
              textStyle={[fontFamily._600_SemiBold, fonts.size_12]}
              onPress={_onFollow}
              disabled={chatLoading}
            />
            <Button
              label={
                chatStatus === EChatStatus.PENDING ? 'Request Sent' : 'Message'
              }
              type={'PRIMARY'}
              containerStyle={[
                backgrounds.gray800,
                borders.rounded_16,
                { width: '55%', height: 40 },
              ]}
              textStyle={[fontFamily._600_SemiBold, fonts.size_12]}
              onPress={_startChat}
              Icon={<Envelop width={15} height={15} color={colors.gray00} />}
              disabled={chatStatus === EChatStatus.PENDING || chatLoading}
              loading={chatLoading}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.16,
    shadowRadius: 1.51,
    elevation: 2,
    borderBottomStartRadius: 30,
    borderBottomEndRadius: 30,
  },
  profileImage: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export enum EChatStatus {
  ACCEPTED = 'ACCEPTED',
  DECLINED = 'DECLINED',
  PENDING = 'PENDING',
}
interface IProfileHeadSection {
  profileImage?: string;
  followers?: string;
  following?: string;
  onPressButton?: () => void;
  isCurrentUser: boolean;
  userId?: string;
  usersChatId?: string;
  chatStatusProp?: EChatStatus;
}

export default ProfileHeadSection;
