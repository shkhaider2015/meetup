import { NavigationContainer, NavigationState } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useTheme } from '@/theme';
import AuthNavigator from './AuthNavigator';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import ProtectedScreens from './Protected';
import { useEffect, useState } from 'react';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import { linking } from '@/utils/Deeplinking';
import _ from 'lodash';
import { isValidJSON } from '@/utils';

const getActiveRouteName = (state: NavigationState | undefined): string | null => {
  if (!state || state.index == null) return null;

  const route = state.routes[state.index];
  if (route.state) {
    // Recursively check nested navigator state
    return getActiveRouteName(route.state as NavigationState);
  }

  return route.name;
};

function ApplicationNavigator() {
  const { navigationTheme } = useTheme();
  const user = useSelector((state: RootState) => state.user);
  const [currentRouteName, setCurrentRouteName] = useState<string | null>(null);

  const onStateChange = (state?: NavigationState) => {
    const activeRouteName = getActiveRouteName(state);
    setCurrentRouteName(activeRouteName);
  };

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      // console.log('Foreground Message:', remoteMessage);
      let userData:any = null;
      if(typeof remoteMessage.data?.message === "string") {
        if(isValidJSON(remoteMessage.data?.message)) {
          userData = JSON.parse(_.cloneDeep(remoteMessage.data?.message));
          userData.redirectPath = `mingleeapp://chat/${userData.sender}`
          userData.title = remoteMessage.data?.title.toString();
          userData.message = remoteMessage.notification?.body || ""
        } else {
          userData = remoteMessage.data;
        }
      }

      // console.log("     -------------------------------         ");
      // console.log("------------  User Data  --------- ", userData);
      // console.log("     -------------------------------         ");

      if(currentRouteName === "Messages" || currentRouteName === "Chat") return

      // Handle the foreground notification here
      PushNotification.localNotification({
        channelId: 'default', // Ensure you create this channel
        title: userData.title || 'You have received new notification',
        message: userData.message || "",
        smallIcon: 'ic_launcher.png',
        userInfo: userData,
      });
    });

    return unsubscribe;
  }, [currentRouteName]);


  return (
    <SafeAreaProvider>
      <NavigationContainer linking={linking} theme={navigationTheme} onStateChange={onStateChange}>
        {user.isLoggedIn ? <ProtectedScreens /> : <AuthNavigator />}
      </NavigationContainer>
      {/* <NetworkStatusBar /> */}
    </SafeAreaProvider>
  );
}

export default ApplicationNavigator;
