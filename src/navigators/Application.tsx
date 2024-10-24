import { LinkingOptions, NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useTheme } from '@/theme';
import AuthNavigator from './AuthNavigator';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import ProtectedScreens from './Protected';
import { RootStackParamList } from '@/types/navigation';
import { Linking } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { DEEP_LINK_IDS } from '@/constants';

function ApplicationNavigator() {
  const { navigationTheme } = useTheme();
  const user = useSelector((state: RootState) => state.user);
  
  interface NotificationData {
    navigationId?: string;
    id?: string;
  }
  
  function buildDeepLinkFromNotificationData(data: NotificationData | undefined): string | null {
    const navigationId = data?.navigationId;
    if (!navigationId || !DEEP_LINK_IDS.includes(navigationId)) {
      console.warn('Unverified navigationId', navigationId);
      return null;
    }
  
    if (navigationId === 'home') {
      return 'mingleeapp://home';
    }
  
    if (navigationId === 'settings') {
      return 'mingleeapp://settings';
    }

    if (navigationId === 'post') {
      const postId = data?.id;
      if (typeof postId === 'string') {
        return `mingleeapp://post/${postId}`;
      }
    }
  
  
    console.warn('Missing postId');
    return null;
  }
  
  const linking: LinkingOptions<RootStackParamList> = {
    prefixes: ['mingleeapp://', process.env.DEV_API_URL || ''],
    config: {
      initialRouteName: "Tabs",
      screens: {
        Tabs: {
          screens: {
            Explore: "explore"
          }
        },
        PostDetails: 'post/:postId',
        Settings: 'settings',
        OtherProfile: 'user/:userId'
      },
    },
    async getInitialURL() {
      const url = await Linking.getInitialURL();
      console.log("Url ", url);
      
      if (typeof url === 'string') {
        return url;
      }
  
      const message = await messaging().getInitialNotification();
      const deeplinkURL = buildDeepLinkFromNotificationData(message?.data as NotificationData);
      if (typeof deeplinkURL === 'string') {
        return deeplinkURL;
      }
      return null;
    },
    subscribe(listener: (url: string) => void) {
      const onReceiveURL = ({ url }: { url: string }) => {
        console.log("URL Listener ", url);
        
       return listener(url)
      };
  

      // Listen to incoming links from deep linking
      const linkingSubscription = Linking.addEventListener('url', onReceiveURL);
  
      // Handle background notification
      const unsubscribe = messaging().onNotificationOpenedApp(remoteMessage => {
        const url = buildDeepLinkFromNotificationData(remoteMessage.data as NotificationData);
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

  return (
    <SafeAreaProvider>
      <NavigationContainer linking={linking} theme={navigationTheme}>
        { user.isLoggedIn ? <ProtectedScreens /> : <AuthNavigator /> }
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default ApplicationNavigator;
