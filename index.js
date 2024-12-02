/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';
import store from '@/store';
import { isValidJSON } from '@/utils';
import { updateChatBadge, updateNotificationsBadge } from '@/store/slices/badgeSlice';

if (__DEV__) {
	import('@/reactotron.config');
}

// Register background handler
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    // console.log('Message handled in the background!', remoteMessage);
    // You can perform background tasks here, like saving data or updating local storage;
	if (typeof remoteMessage?.data?.message === 'string') {
        if (isValidJSON(remoteMessage?.data?.message)) {
          store.dispatch(updateChatBadge(1));
        } else {
			store.dispatch(updateNotificationsBadge(1));
		}
      }
});

AppRegistry.registerComponent(appName, () => App);
