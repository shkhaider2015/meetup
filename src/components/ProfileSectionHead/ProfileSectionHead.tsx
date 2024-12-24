import { DummyJohnsonPost } from '@/assets/dummyImages';
import { Edit, Envelop, Persons } from '@/assets/icon';
import { useTheme } from '@/theme';
import { fontFamily } from '@/theme/_config';
import { widthInPercentage } from '@/utils';
import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
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
import {
  FacebookLogo,
  InstagramLogo,
  SnapChatLogo,
  TikTokLogo,
  XLogo,
} from '@/assets/images';
import _ from 'lodash';

const ProfileHeadSection = (props: IProfileHeadSection) => {
  const {
    profileImage,
    isCurrentUser,
    onPressButton,
    userId,
    usersChatId,
    chatStatusProp,
    socialLinks,
  } = props;
  const { layout, gutters, backgrounds, fonts, borders, colors } = useTheme();
  const { navigate } = useNavigation<NavigationHookProps>();
  const currentUser = useSelector((state: RootState) => state.user);

  const [chatLoading, setChatLoading] = useState(false);
  const [chatStatus, setChatStatus] = useState<EChatStatus>(
    chatStatusProp || EChatStatus.DECLINED,
  );

  const { isPending: startChatPending, mutate: startChatMutate } = useMutation({
    mutationFn: () => {
      return sendMessageRequest({
        sender: currentUser._id,
        receiver: userId || '',
      });
    },
    onSuccess: (data: any) => {
      setChatStatus(EChatStatus.PENDING);
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

  const _onPressSocialLink = async (url?: string) => {
    try {
      console.log('URL : ', url);
      if (_.isEmpty(url) || !url) return;
      await Linking.canOpenURL(url);
      await Linking.openURL(url);
    } catch (error) {
      console.log("Error Url ", error)
      Toast.show({
        type: 'error',
        text1: 'URL is not valid',
        text2: 'Please update URL in edit profile',
      });
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
          isCached={true}
        />
      </View>
      {/* Details Column */}
      <View style={[{ flex: 1, rowGap: 30, paddingLeft: 15 }]}>
        {/* Followers section */}
        <View
          style={[
            layout.row,
            layout.justifyStart,
            layout.itemsCenter,
            gutters.paddingRight_32,
            gutters.gap_12,
            layout.wrap,
          ]}
        >
          {!_.isEmpty(socialLinks?.instagram) && (
            <TouchableOpacity
              style={styles.socialIconContainer}
              onPress={() => _onPressSocialLink(socialLinks?.instagram)}
            >
              <InstagramLogo width={35} height={35} />
            </TouchableOpacity>
          )}
          {!_.isEmpty(socialLinks?.x) && (
            <TouchableOpacity
              style={styles.socialIconContainer}
              onPress={() => _onPressSocialLink(socialLinks?.x)}
            >
              <XLogo width={35} height={35} />
            </TouchableOpacity>
          )}
          {!_.isEmpty(socialLinks?.facebook) && (
            <TouchableOpacity
              style={styles.socialIconContainer}
              onPress={() => _onPressSocialLink(socialLinks?.facebook)}
            >
              <FacebookLogo width={35} height={35} />
            </TouchableOpacity>
          )}
          {!_.isEmpty(socialLinks?.snapchat) && (
            <TouchableOpacity
              style={styles.socialIconContainer}
              onPress={() => _onPressSocialLink(socialLinks?.snapchat)}
            >
              <SnapChatLogo width={35} height={35} />
            </TouchableOpacity>
          )}
          {!_.isEmpty(socialLinks?.tiktok) && (
            <TouchableOpacity
              style={styles.socialIconContainer}
              onPress={() => _onPressSocialLink(socialLinks?.tiktok)}
            >
              <TikTokLogo width={35} height={35} />
            </TouchableOpacity>
          )}
        </View>
        {/* Edit Profile / Follow button */}
        {isCurrentUser ? (
          <Button
            label="Edit"
            type={'PRIMARY'}
            Icon={<Edit color={'#FFFFFF'} width={22} height={22} />}
            containerStyle={[
              backgrounds.gray800,
              borders.rounded_16,
              layout.itemsCenter,
              { width: '50%', height: 45 },
            ]}
            onPress={onPressButton}
          />
        ) : (
          <View style={[layout.row, layout.justifyBetween]}>
            {/* <Button
              label={isFollow ? 'Following' : 'Follow'}
              type={'PRIMARY'}
              containerStyle={[
                borders.rounded_16,
                { width: '40%', height: 40 },
              ]}
              textStyle={[fontFamily._600_SemiBold, fonts.size_12]}
              onPress={_onFollow}
              disabled={chatLoading}
            /> */}
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
  socialIconContainer: {
    width: 35,
    height: 35,
    borderRadius: 35,
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
  socialLinks?: {
    instagram: string;
    x: string;
    facebook: string;
    snapchat: string;
    tiktok: string;
  };
}

export default ProfileHeadSection;
