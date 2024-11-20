import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useTheme } from '@/theme';
import AuthNavigator from './AuthNavigator';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import ProtectedScreens from './Protected';
import { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import { linking, NotificationData } from '@/utils/Deeplinking';

function ApplicationNavigator() {
  const { navigationTheme } = useTheme();
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      // console.log('Foreground Message:', remoteMessage);
      const {
        title = 'Notification',
        message = 'You have received new notification',
      } = remoteMessage.data as NotificationData;
      // Handle the foreground notification here
      PushNotification.localNotification({
        channelId: 'default', // Ensure you create this channel
        title: title,
        message: message,
        smallIcon: 'ic_launcher.png',
        userInfo: remoteMessage.data
      });
    });

    return unsubscribe;
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer linking={linking} theme={navigationTheme}>
        {user.isLoggedIn ? <ProtectedScreens /> : <AuthNavigator />}
      </NavigationContainer>
      {/* <NetworkStatusBar /> */}
    </SafeAreaProvider>
  );
}

export default ApplicationNavigator;
