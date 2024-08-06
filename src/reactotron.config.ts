import Reactotron, { ReactotronReactNative } from 'reactotron-react-native';
import mmkvPlugin from 'reactotron-react-native-mmkv';
import {
	QueryClientManager,
	reactotronReactQuery,
} from 'reactotron-react-query';

import { queryClient } from './App';
import config from '../app.json';
import storage from './storage';

const queryClientManager = new QueryClientManager({
	queryClient,
});

Reactotron.configure({
	name: config.name,
	onDisconnect: () => {
		queryClientManager.unsubscribe();
	},
})
	.useReactNative()
	.use(mmkvPlugin<ReactotronReactNative>({ storage }))
	.use(reactotronReactQuery(queryClientManager))
	.connect();
