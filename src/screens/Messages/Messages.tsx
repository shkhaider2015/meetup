import React, { useCallback, useEffect, useState } from 'react';
import { SafeScreen } from '@/components/template';
import { useTheme } from '@/theme';
import { RootStackParamList } from '@/types/navigation';
import { Dimensions, ScrollView, Text, View } from 'react-native';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import LimitTimePicker from 'react-native-limit-timepicker';
import {
  CometChatMessages,
  CometChatMessageTemplate,
  CometChatUIKit,
  MessageHeaderConfigurationInterface,
  MessageListConfigurationInterface,
  MessageListStyleInterface,
} from '@cometchat/chat-uikit-react-native';
import { CometChat } from '@cometchat/chat-sdk-react-native';

const Messages = ({ navigation, route }: ChatScreenType) => {
  const { chatWith } = route.params;
  const { layout, gutters, backgrounds, fonts, colors } = useTheme();

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
        <CometChatMessages
          user={chatWith}
          hideDetails={true}
          messageHeaderConfiguration={messageHeaderConfiguration}
        />
      </View>
    </SafeScreen>
  );
};

type ChatScreenType = NativeStackScreenProps<RootStackParamList, 'Messages'>;

export default Messages;
