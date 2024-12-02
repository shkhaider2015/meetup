import { EmptyList, Header, MessageRequestItem } from '@/components';
import { Button, Image, SafeScreen } from '@/components/template';
import {
  getMessageRequestReceiver,
  getMessageRequestSender,
} from '@/services/Chat';
import { RootState } from '@/store';
import { useTheme } from '@/theme';
import { fontFamily, heights } from '@/theme/_config';
import {
  MessageRequestTabsParamList,
  RootStackParamList,
} from '@/types/navigation';
import {
  IMessageRequest,
} from '@/types/reducer';
import { useMutation, useQuery } from '@tanstack/react-query';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { useSelector } from 'react-redux';

const MessageRequests = ({ route, navigation }: MessageRequestsScreenType) => {
  const { layout, gutters, backgrounds, fonts, colors } = useTheme();
  const screenHeight =
    Dimensions.get('screen').height - (heights.tabNavigationHeader + 60);
  const currentUser = useSelector((state: RootState) => state.user);

  const [refreshData, setRefreshData] = useState(false);
  const [receiverData, setReceiverData] = useState<IMessageRequest[]>([]);
  const [senderData, setSenderData] = useState<IMessageRequest[]>([]);
  const [itemIdLoading, setItemIdLoading] = useState<string>();

  const { isPending, isError, mutate } = useMutation({
    mutationFn: () => {
      if (route.name === 'Received') {
        return getMessageRequestReceiver(currentUser._id);
      } else {
        return getMessageRequestSender(currentUser._id);
      }
    },
    onSuccess: (data: IMessageRequest[]) => {
        if(route.name === "Received") {
            setReceiverData(data);
        } else {
            setSenderData(data)
        }
      setRefreshData(false);
    },
    onError: () => {
      setRefreshData(false);
    },
  });

  useEffect(() => {
    if (!_.isEmpty(currentUser._id)) {
      mutate();
    }
  }, [currentUser]);

  const _onRefresh = () => {
    setRefreshData(true);
    mutate();
  };

  const onAccept = (id: string) => {
    if(route.name === "Received") {
        setReceiverData((pS) => pS.filter((item) => item._id !== id));
    } else {
        setSenderData((pS) => pS.filter((item) => item._id !== id));
    }
    
  };
  const onDecline = (id: string) => {
    if(route.name === "Received") {
        setReceiverData((pS) => pS.filter((item) => item._id !== id));
    } else {
        setSenderData((pS) => pS.filter((item) => item._id !== id));
    }
  };

  return (
    <SafeScreen>
      <View
        style={[
          {
            height: screenHeight,
          },
          gutters.paddingHorizontal_16,
        ]}
      >
        {/* <Header label="Message Request" /> */}
        <FlatList
          data={ route.name === "Received" ? receiverData : senderData}
          renderItem={({ item }) => (
            <MessageRequestItem
              {...item}
              onAccept={onAccept}
              onDecline={onDecline}
              type={route.name === "Received" ? "RECEIVER" : "SENDER"}
            />
          )}
          keyExtractor={(item) => item.toString()}
          ItemSeparatorComponent={() => (
            <View
              style={[
                { height: 10 },
                layout.fullWidth,
                gutters.marginVertical_8,
              ]}
            />
          )}
          refreshControl={
            <RefreshControl
              refreshing={refreshData}
              onRefresh={_onRefresh}
              tintColor={colors.primary}
              colors={[colors.primary]}
              progressBackgroundColor={colors.gray00}
            />
          }
          ListEmptyComponent={
            <EmptyList
              containerStyle={[{ minHeight: screenHeight }]}
              text="No request found"
            />
          }
          ListHeaderComponent={
            <View style={[layout.justifyCenter, layout.itemsCenter]}>
              {isPending && (
                <ActivityIndicator
                  size={'large'}
                  color={colors.primary}
                  style={[gutters.marginTop_16]}
                />
              )}
            </View>
          }
          style={[gutters.marginVertical_16, { minHeight: '60%' }]}
        />
      </View>
    </SafeScreen>
  );
};

type MessageRequestsScreenType = NativeStackScreenProps<
  MessageRequestTabsParamList,
  'Received' | 'Sent'
>;

export default MessageRequests;
