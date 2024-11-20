import 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MMKV } from 'react-native-mmkv';

import { ThemeProvider } from '@/theme';
import firebase from '@react-native-firebase/app';
import ApplicationNavigator from './navigators/Application';
import './translations';
import { Provider } from 'react-redux';
import store from '@/store';
import { StrictMode, useEffect } from 'react';
import storage from './storage';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { GlobalBottomSheetProvider, LoaderProvider } from './components/Global';
import Toast from 'react-native-toast-message';
import { Linking, PermissionsAndroid, Platform } from 'react-native';
import {
  CometChatUIKit,
  UIKitSettings,
} from '@cometchat/chat-uikit-react-native';
import { CometChat } from '@cometchat/chat-sdk-react-native';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import SplashScreen from 'react-native-splash-screen';
import PushNotification from 'react-native-push-notification';

export const queryClient = new QueryClient();

dayjs.extend(relativeTime);

function App() {
  const getPermissions = () => {
    if (Platform.OS == 'android') {
      PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      ]);
    }
  };

  useEffect(() => {
    const initialize = async () => {
      await delay(); // Wait for 3 seconds
      getPermissions();
    };

    initialize();
  }, []);

  const delay = (): Promise<void> => {
    return new Promise((resolve) =>
      setTimeout(() => {
        init();
        SplashScreen.hide();
        return resolve();
      }, 3000),
    );
  };

  const init = () => {
    let uikitSettings: UIKitSettings = {
      appId: process.env.COMETCHAT_APP_ID || '',
      authKey: process.env.COMETCHAT_AUTH_KEY || '',
      region: process.env.COMETCHAT_REGION || '',
      // subscriptionType: CometChat.AppSettings.SUBSCRIPTION_TYPE_FRIENDS,
    };

    CometChatUIKit.init(uikitSettings)
      .then(() => {
        console.log('CometChatUiKit successfully initialized');
      })
      .catch((error) => {
        console.log('Initialization failed with exception:', error);
      });

    PushNotification.createChannel(
      {
        channelId: 'default', // Same as the one used in localNotification
        channelName: 'Default Channel',
        importance: 4, // High importance
        soundName: 'default',
      },
      (created) => {
        // console.log(`Channel created: ${created}`);
        PushNotification.configure({
          onNotification: async function (notification) {
            // console.log('Foreground Notification:', notification);
            const redirectPath = notification.data?.redirectPath;
            const isValidURL = await Linking.canOpenURL(redirectPath)
            if(isValidURL) {
              Linking.openURL(redirectPath)
            }
          },
        });
      },
    );
  };

  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider storage={storage}>
          <GestureHandlerRootView>
            <GlobalBottomSheetProvider>
              <Provider store={store}>
                <LoaderProvider>
                  <ApplicationNavigator />
                  <Toast />
                </LoaderProvider>
              </Provider>
            </GlobalBottomSheetProvider>
          </GestureHandlerRootView>
        </ThemeProvider>
      </QueryClientProvider>
    </StrictMode>
  );
}

export default App;
