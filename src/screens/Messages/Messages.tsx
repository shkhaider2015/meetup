import React, { useCallback, useEffect, useState } from 'react';
import { SafeScreen } from '@/components/template';
import { useTheme } from '@/theme';
import { RootStackParamList } from '@/types/navigation';
import { Dimensions, ScrollView, Text, View } from 'react-native';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import LimitTimePicker from 'react-native-limit-timepicker';
import {
  CometChatContextProvider,
  CometChatMessages,
  CometChatMessageTemplate,
  CometChatTheme,
  CometChatUIKit,
  MessageHeaderConfigurationInterface,
  MessageListConfigurationInterface,
  MessageListStyleInterface,
} from '@cometchat/chat-uikit-react-native';
import { CometChat } from '@cometchat/chat-sdk-react-native';
import { fontFamily } from '@/theme/_config';

const Messages = ({ navigation, route }: ChatScreenType) => {
  const { chatWith } = route.params;
  const { layout, gutters, backgrounds, fonts, colors } = useTheme();

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

  const _onBack = () => {
    console.log('OPress ');
    navigation.goBack();
  };

  const messageHeaderConfiguration: MessageHeaderConfigurationInterface = {
    onBack: _onBack,
  };

  return (
    <SafeScreen>
      <View style={{ height: '100%', width: '100%' }}>
        <CometChatContextProvider theme={myTheme}>
          <CometChatMessages
            user={chatWith}
            hideDetails={true}
            messageHeaderConfiguration={messageHeaderConfiguration}
          />
        </CometChatContextProvider>
      </View>
    </SafeScreen>
  );
};

type ChatScreenType = NativeStackScreenProps<RootStackParamList, 'Messages'>;

export default Messages;
