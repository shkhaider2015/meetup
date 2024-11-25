import { EmptyList, MessageRequestItem } from '@/components';
import { SafeScreen } from '@/components/template';
import { getAllRequests } from '@/services/Chat';
import { RootState } from '@/store';
import { useTheme } from '@/theme';
import { heights } from '@/theme/_config';
import { RootStackParamList } from '@/types/navigation';
import { IMessageRequest } from '@/types/reducer';
import { useMutation } from '@tanstack/react-query';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import {
  View,
  Dimensions,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import Toast from 'react-native-toast-message';
import { useSelector } from 'react-redux';

const RequestsScreen = ({ navigation }: RequestsScreenType) => {
  const { layout, gutters, colors } = useTheme();
  const screenHeight =
    Dimensions.get('screen').height - heights.tabNavigationHeader;
  const currentUser = useSelector((state: RootState) => state.user);

  const [refreshData, setRefreshData] = useState(false);
  const [data, setData] = useState<IMessageRequest[]>([]);

  const { isPending, isError, mutate } = useMutation({
    mutationFn: () => {
      return getAllRequests(currentUser._id);
    },
    onSuccess: (data: IMessageRequest[]) => {
      setData(data);
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
    setData((pS) => pS.filter((item) => item._id !== id));
  };
  const onDecline = (id: string) => {
    setData((pS) => pS.filter((item) => item._id !== id));
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
          data={data}
          renderItem={({ item }) => (
            <MessageRequestItem
              {...item}
              onAccept={onAccept}
              onDecline={onDecline}
              type={item.sender._id === currentUser._id ? "SENDER" : "RECEIVER"}
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
              containerStyle={[{ minHeight: screenHeight - screenHeight / 3 }]}
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
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeScreen>
  );
};

type RequestsScreenType = NativeStackScreenProps<
  RootStackParamList,
  'Requests'
>;

export default RequestsScreen;
