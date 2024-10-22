import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { useTheme } from '@/theme';

const NetworkStatusBar: React.FC = () => {
   
    const [isInternetReachable, setInternetReachable] = useState<boolean | null>(null);
    const [isVisible, setVisible] = useState<boolean>(false);
    const { backgrounds, layout, gutters, colors,fonts } = useTheme();

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener((state) => {
            console.log('Network state changed:', state);
            if (state.isConnected) {
                setInternetReachable(state.isConnected);
                setVisible(true);
                setTimeout(() => {
                    setVisible(false);
                }, 5000);
                

            }
            else {
                setInternetReachable(false);
                setVisible(true)
                }
            console.log(state.isInternetReachable ? "Online" : "Network Error");
        });

        return () => {
            unsubscribe();
        };
    }, []);
    if (!isVisible && isInternetReachable ) 
        return;
    
    return (
        <View style={[gutters.padding_10,layout.itemsCenter,layout.justifyCenter,layout.absolute,layout.bottom0 ,{ backgroundColor: isInternetReachable ? 'green' : 'red' ,width:"100%"}]}>
            <Text style={[fonts.bold,fonts.gray50]}>
                { isInternetReachable ? 'Online' : 'Network Error '}
            </Text>
        </View>
    );
};

export default NetworkStatusBar;
