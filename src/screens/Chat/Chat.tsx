import React, { useCallback, useEffect, useState } from 'react';
import { SafeScreen } from '@/components/template';
import { useTheme } from '@/theme';
import { RootStackParamList } from '@/types/navigation';
import { Dimensions, ScrollView, Text, View } from 'react-native';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import LimitTimePicker from 'react-native-limit-timepicker';
import {
  CometChatContextProvider,
  CometChatConversations,
  CometChatTheme,
} from '@cometchat/chat-uikit-react-native';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { CometChat } from '@cometchat/chat-sdk-react-native';
import { useFocusEffect } from '@react-navigation/native';
import { fontFamily } from '@/theme/_config';

const Chat = ({ navigation, route }: ChatScreenType) => {
  // const { chatWith } = route.params;
  const { layout, gutters, backgrounds, fonts, colors } = useTheme();
  const screenHeight = Dimensions.get('window').height;
  const user = useSelector((state: RootState) => state.user);

  let myTheme: CometChatTheme = new CometChatTheme({});
  myTheme.palette.setPrimary({
    light: '#ff747e',
    dark: '#ff747e',
  });
  myTheme.palette.setSecondary({
    light: '#000000',
    dark: '#FFFFFF'
  })
  myTheme.palette.setAccent({
    light: '#000000',
    dark: '#FFFFFF'
  })
  // myTheme.typography.setFontFamily([
  //   fontFamily._400_Regular.fontFamily,
  //   fontFamily._500_Medium.fontFamily,
  //   fontFamily._600_SemiBold.fontFamily,
  //   fontFamily._700_Bold.fontFamily,
  // ]);

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
        {/* <CometChatConversationsWithMessages user={chatWith}  /> */}
        <CometChatContextProvider theme={myTheme}>
          <CometChatConversations onItemPress={_onItemPress} hideSubmitIcon={true}/>
        </CometChatContextProvider>
      </View>
    </SafeScreen>
  );
};

type ChatScreenType = NativeStackScreenProps<RootStackParamList, 'Chat'>;

export default Chat;
