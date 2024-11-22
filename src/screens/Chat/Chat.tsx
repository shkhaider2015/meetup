import React, { useCallback, useEffect } from 'react';
import { SafeScreen } from '@/components/template';
import { RootStackParamList } from '@/types/navigation';
import { Dimensions, View } from 'react-native';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import {
  CometChatContextProvider,
  CometChatConversations,
  CometChatTheme,
} from '@cometchat/chat-uikit-react-native';
import { CometChat } from '@cometchat/chat-sdk-react-native';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { useFocusEffect } from '@react-navigation/native';
import { clearChatBadge } from '@/store/slices/badgeSlice';
import { useTheme } from '@/theme';

const Chat = ({ navigation, route }: ChatScreenType) => {
  // const { chatWith } = route.params;
  const { layout, gutters, backgrounds, fonts, colors, variant } = useTheme();
  const screenHeight = Dimensions.get('window').height;
  const user = useSelector((state: RootState) => state.user);
  // const { chatWithId="" } = route.params;

  // useEffect(() => {
  //   const _getUser = async () => {
  //     const chatWithUser: CometChat.User = await CometChat.getUser(chatWithId);
  //     if (chatWithUser instanceof CometChat.User) {
  //       navigation.navigate('Messages', {
  //         chatWith: chatWithUser,
  //       });
  //     }
  //   };
  //   if (!_.isEmpty(chatWithId)) {
  //     _getUser();
  //   }
  // }, [chatWithId]);

  const badges = useSelector((state: RootState) => state.badge);
  const dispatch: AppDispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      if (badges.Chat > 0) {
        dispatch(clearChatBadge());
      }
    }, [badges]),
  );

  let myTheme: CometChatTheme = new CometChatTheme({});
  myTheme.palette.setPrimary({
    light: '#ff747e',
    dark: '#ff747e',
  });
  myTheme.palette.setSecondary({
    light: '#000000',
    dark: '#FFFFFF',
  });
  myTheme.palette.setAccent({
    light: '#000000',
    dark: '#FFFFFF',
  });

  myTheme.palette.setMode(variant === 'dark' ? 'dark' : 'light');
  // myTheme.typography.setFontFamily([
  //   fontFamily._400_Regular.fontFamily,
  //   fontFamily._500_Medium.fontFamily,
  //   fontFamily._600_SemiBold.fontFamily,
  //   fontFamily._700_Bold.fontFamily,
  // ]);
  myTheme.typography.setFontFamily(['Poppins']);

  const _onItemPress = (item: CometChat.Conversation) => {
    const chatWith = item.getConversationWith();
    if (chatWith instanceof CometChat.User) {
      navigation.navigate('Messages', {
        chatWith,
      });
    }
  };

  return (
    <SafeScreen>
      <View style={{ height: '100%', width: '100%' }}>
        <CometChatContextProvider theme={myTheme}>
          <CometChatConversations
            onItemPress={_onItemPress}
            hideSubmitIcon={true}
          />
        </CometChatContextProvider>
      </View>
    </SafeScreen>
  );
};

type ChatScreenType = NativeStackScreenProps<RootStackParamList, 'Chat'>;

export default Chat;
