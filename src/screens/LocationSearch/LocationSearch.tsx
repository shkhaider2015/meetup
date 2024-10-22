import { InputField } from '@/components/template';
import { useTheme } from '@/theme';
import { RootStackParamList } from '@/types/navigation';
import React, { useRef, useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Text,
  ListRenderItem,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { ChevronLeft, Search } from '@/assets/icon';
import _ from 'lodash';
import { google } from '@/constants/keys';
import style from '@cometchat/chat-uikit-react-native/src/shared/views/CometChatReceipt/style';
import LottieView from 'lottie-react-native';
import { EmptyList } from '@/components';

interface ISearchData {
  PlaceName: string;
  Address: string;
  latitude: number;
  longitude: number;
}

const LocationSearch = ({ route, navigation }: LocationSearchScreenType) => {
  const inputRef = useRef<TextInput>(null);
  const { layout, gutters, colors, fonts, backgrounds } = useTheme();
  const { height } = Dimensions.get('screen');

  const [searchData, setSearchData] = useState<ISearchData[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const handleLocationSelect = (location: ISearchData) => {
    route.params.onSelectLocation(location.latitude, location.longitude);
    navigation.goBack();
  };

  const _onSearch = async (query: string) => {
    try {
      setSearchLoading(true);
      const apiKey = google.API_KEY;
      const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${apiKey}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.status === 'OK') {
        const places = data.results;
        const searchData: ISearchData[] = places.map((place: any) => {
          const { name, formatted_address, geometry } = place;
          const searchItem: ISearchData = {
            PlaceName: name,
            Address: formatted_address,
            latitude: geometry?.location?.lat,
            longitude: geometry?.location?.lng,
          };
          console.log('Address:', searchItem);
          console.log('------------------------');
          return searchItem;
        });
        setSearchData(searchData);
      } else {
        throw new Error(data.status);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSearchLoading(false);
    }
  };

  const debouncedSearch = _.debounce((query: string) => {
    _onSearch(query); // This will only be called after 500ms of inactivity
  }, 500);

  const _onChangeInput = (txt: string) => {
    if (_.isEmpty(txt.trim())) return;
    debouncedSearch(txt);
  };

  const renderItem: ListRenderItem<ISearchData> = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleLocationSelect(item)}
      style={[layout.row]}
      activeOpacity={0.7}
    >
      <View style={[gutters.marginBottom_12]}>
        <Text style={[fonts.bold, fonts.size_16]}>{item.PlaceName}</Text>
        <Text style={[fonts.gray300, fonts.size_12]}>{item.Address}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[gutters.paddingHorizontal_12, { height: height }]}>
      <View
        style={[
          layout.relative,
          layout.row,
          gutters.gap_8,
          { width: '100%', marginTop: 30 },
        ]}
      >
        <View
          style={[layout.justifyCenter, layout.itemsCenter, { width: '10%' }]}
        >
          <ChevronLeft
            color={colors.black}
            onPress={() => navigation.goBack()}
          />
        </View>
        <View style={[{ width: '85%' }]}>
          <InputField
            ref={inputRef}
            placeholder="Search location"
            inputType="TEXT"
            editable={true}
            keyboardType="default"
            Lefticon={<Search color={colors.black} />}
            onChangeText={_onChangeInput}
            inputHeight={50}
          />
        </View>
      </View>

      <FlatList
        data={searchData}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={[
          gutters.paddingVertical_10,
          gutters.paddingHorizontal_12,
          { minHeight: '80%' },
        ]}
        ListHeaderComponent={
          <View style={[layout.justifyCenter, layout.itemsCenter]}>
            {searchLoading && (
              <ActivityIndicator size={'large'} color={colors.primary} />
            )}
          </View>
        }
        ListEmptyComponent={
          <EmptyList containerStyle={{ minHeight: '80%' }} text="" />
        }
        ItemSeparatorComponent={({ item, index }) => (
          <View
            style={[ gutters.marginVertical_10, backgrounds.gray100, { height: 1 }]}
          />
        )}
        style={[gutters.paddingBottom_16, gutters.marginTop_24]}
      />
    </View>
  );
};

type LocationSearchScreenType = NativeStackScreenProps<
  RootStackParamList,
  'LocationSearch'
>;
export default LocationSearch;
