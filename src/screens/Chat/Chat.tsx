import React, { useEffect, useState } from 'react';
import { SafeScreen } from '@/components/template';
import { useTheme } from '@/theme';
import { RootStackParamList } from '@/types/navigation';
import { Dimensions, ScrollView, Text, View } from 'react-native';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import LimitTimePicker from 'react-native-limit-timepicker';
import { CometChatConversationsWithMessages } from '@cometchat/chat-uikit-react-native';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { CometChat } from '@cometchat/chat-sdk-react-native';

const Chat = ({}: ChatScreenType) => {
  const { layout, gutters, backgrounds, fonts } = useTheme();
  const screenHeight = Dimensions.get('window').height;
  const user = useSelector((state: RootState) => state.user);

  const [cometChatUser, setCometChatUser] = useState<CometChat.User>();

  // Add the below state to load the UI component after user logs in.
  const [renderUI, setRenderUI] = useState(false);

  useEffect(() => {
    if (user) {
      CometChat.getLoggedinUser()
        .then((user) => {
          setCometChatUser(user || undefined)
        })
        .catch((err) => console.log('CometChat logged In User : ', err));
    }
  }, [user]);

  return (
    <SafeScreen>
      <View style={{ height: '100%', width: '100%' }}>
        {
          cometChatUser && <CometChatConversationsWithMessages />
        }
        
      </View>
    </SafeScreen>
  );
};

type ChatScreenType = NativeStackScreenProps<RootStackParamList, 'Chat'>;

export default Chat;
