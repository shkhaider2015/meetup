import { DEEP_LINK_IDS } from '@/constants';
import { RootStackParamList } from '@/types/navigation';
import { LinkingOptions } from '@react-navigation/native';
import { Linking } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import _ from 'lodash';
import { isValidJSON } from '.';

function buildDeepLinkFromNotificationData(
  data: NotificationData | undefined,
): string | undefined {
  const redirectPath = data?.redirectPath;
//   if (!redirectPath || !DEEP_LINK_IDS.includes(redirectPath)) {
//     console.warn('Unverified redirectPath', redirectPath);
//     return null;
//   }

  if(redirectPath?.includes('chat')) {
    const chatUserId = redirectPath
  }

  console.warn('Missing postId');
  return redirectPath;
}

export const linking: LinkingOptions<RootStackParamList> = {
  prefixes: ['mingleeapp://', process.env.DEV_API_URL || ''],
  config: {
    initialRouteName: 'Tabs',
    screens: {
      Tabs: {
        screens: {
          Explore: 'explore',
          Chat: 'chat/:chatWithId'
        },
      },
      PostDetails: 'post/:postId',
      Settings: 'settings',
      OtherProfile: 'user/:userId',
    },
  },
  async getInitialURL() {
    const url = await Linking.getInitialURL();
    console.log('Url ', url);

    if (typeof url === 'string') {
      return url;
    }

    let message = await messaging().getInitialNotification();
    
    console.log('==================================');
    console.log('==================================');
    console.log('==================================');
    console.log('Message : ', message);
    console.log('Message Data ', message?.data);
    // const deeplinkURL = buildDeepLinkFromNotificationData(
    //   message?.data as NotificationData,
    // );

      if(typeof message?.data?.message === "string") {
        if(isValidJSON(message?.data?.message)) {
          const userData = JSON.parse(_.cloneDeep(message?.data?.message));
          const chatDeeplink = `mingleeapp://chat/${userData.sender}`;
          return chatDeeplink
        }
      }


    const deeplinkURL = message?.data?.redirectPath;
    if (typeof deeplinkURL === 'string') {
      return deeplinkURL;
    }
    return null;
  },
  subscribe(listener: (url: string) => void) {
    const onReceiveURL = ({ url }: { url: string }) => {
      console.log('URL Listener ', url);

      return listener(url);
    };

    // Listen to incoming links from deep linking
    const linkingSubscription = Linking.addEventListener('url', onReceiveURL);

    // Handle background notification
    const unsubscribe = messaging().onNotificationOpenedApp((remoteMessage) => {
      // console.log('******************************************************');
      console.log('On Message ', remoteMessage);
      console.log("OnMessage :: ", remoteMessage.data?.message)

      // const url = buildDeepLinkFromNotificationData(
      //   remoteMessage.data as NotificationData,
      // );
      const url = remoteMessage.data?.redirectPath;
      // console.log("------- ------ ------ User : ", user, user.isLoggedIn)
      if (typeof url === 'string') {
        listener(url);
      }
    });

    return () => {
      linkingSubscription.remove();
      unsubscribe();
    };
  },
};

export interface NotificationData {
  navigationId?: string;
  id?: string;
  title?: string;
  message?: string;
  redirectPath?: string;
}
