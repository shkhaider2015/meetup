import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { useTheme } from '@/theme';
import { WifiIcon } from '@/assets/icon';

const NetworkStatusBar: React.FC = () => {
  const [isInternetReachable, setInternetReachable] = useState<boolean | null>(
    null,
  );
  const [isVisible, setVisible] = useState<boolean>(false);
  const [initialLoad, setInitialLoad] = useState<boolean>(true);
  const { layout, gutters, colors, fonts } = useTheme();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      const isInitialState = isInternetReachable === null;
      console.log('Network state changed:', isInitialState, state.isConnected);
      if (state.isConnected) {
        if (!initialLoad && !isInternetReachable) {
          // Show success message only after reconnection following network loss
          setInternetReachable(true);
          setVisible(true);
          setTimeout(() => setVisible(false), 5000);
        } else {
          setInternetReachable(true);
        }
      } else {
        setInternetReachable(false);
        setVisible(true);
      }
      setInitialLoad(false);
      console.log(state.isInternetReachable ? 'Online' : 'Network Error');
    });

    return () => {
      unsubscribe();
    };
  }, [isInternetReachable, initialLoad]);

    if (!isVisible && isInternetReachable) return;

  return (
    <View
      style={[
        layout.row,
        layout.itemsCenter,
        layout.justifyBetween,
        layout.absolute,
        layout.bottom0,
        gutters.paddingHorizontal_16,
        {
          backgroundColor: isInternetReachable ? 'green' : 'red',
          width: '100%',
          height: 23,
        },
      ]}
    >
      <View style={[layout.flex_1]}>
        <WifiIcon width={15} height={15} color={colors.gray00} />
      </View>
      <View style={[layout.justifyCenter, layout.itemsCenter, { flex: 3 }]}>
        <Text style={[fonts.bold, fonts.gray50]}>
          {isInternetReachable ? 'Online' : 'Network Error'}
        </Text>
      </View>
      <View style={[layout.flex_1]} />
    </View>
  );
};

export default NetworkStatusBar;
