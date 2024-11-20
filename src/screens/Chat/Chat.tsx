import React, { useEffect } from 'react';
import { SafeScreen } from '@/components/template';
import { RootStackParamList } from '@/types/navigation';
import { View } from 'react-native';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import {
  CometChatContextProvider,
  CometChatConversations,
  CometChatTheme,
} from '@cometchat/chat-uikit-react-native';
import { CometChat } from '@cometchat/chat-sdk-react-native';
import _ from 'lodash';

const Chat = ({ navigation, route }: ChatScreenType) => {
  const { chatWithId } = route.params;

  useEffect(() => {
    const _getUser = async () => {
      const chatWithUser: CometChat.User = await CometChat.getUser(chatWithId);
      if (chatWithUser instanceof CometChat.User) {
        navigation.navigate('Messages', {
          chatWith: chatWithUser,
        });
      }
    };
    if (!_.isEmpty(chatWithId)) {
      _getUser();
    }
  }, [chatWithId]);

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
