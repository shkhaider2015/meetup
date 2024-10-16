import { InputField } from '@/components/template';
import { useTheme } from '@/theme';
import { RootStackParamList } from '@/types/navigation';
import React, { useRef } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Text,
  ListRenderItem,
  Dimensions,
} from 'react-native';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { Search } from '@/assets/icon';
const { height } = Dimensions.get('window');

const LocationSearchScreen = ({ navigation }: LocationSearchScreenType) => {
  const inputRef = useRef<TextInput>(null);
  const { layout, gutters, colors, fonts, backgrounds } = useTheme();

  interface Location {
    id: string;
    title: string;
    subtitle: string;
  }

  const Locations = [
    { id: '1', title: 'Mountain View', subtitle: 'Fremont' },
    { id: '2', title: 'Sunny Vale', subtitle: 'Fremont City' },
    { id: '3', title: 'Redwood City', subtitle: 'Fremont' },
    { id: '4', title: 'San Jose', subtitle: 'San Jose' },
    { id: '5', title: 'Stan Ford', subtitle: 'Stan Ford' },
    { id: '6', title: 'Palo Alto', subtitle: 'Palo Alto' },
    { id: '7', title: 'Menlo Park', subtitle: 'Menlo Park' },
    { id: '8', title: 'Atherton', subtitle: 'Atherton' },
    { id: '9', title: 'Emerald Hills', subtitle: 'Emerald Hills' },
    { id: '10', title: 'SunnyVale', subtitle: 'SunnyVale' },
    { id: '11', title: 'Union City', subtitle: 'Union City' },
    { id: '12', title: 'Castro Valley', subtitle: 'Castro Valley' },
    
  ];

  const handleFocus = () => {
    inputRef.current?.focus();
  };

  const handleLocationSelect = (location: { id: string; title: string }) => {
    console.log('Location selected:', location.title);
  };

  const renderItem: ListRenderItem<Location> = ({ item }) => (
    <View style={[gutters.marginVertical_12, { width: '100%' }]}>
      <TouchableOpacity
        onPress={() => handleLocationSelect(item)}
        style={[layout.row]}
      >
        <View style={[gutters.marginBottom_12]}>
          <Text style={[fonts.bold, fonts.size_16]}>{item.title}</Text>
          <Text style={[fonts.gray300, fonts.size_12]}>{item.subtitle}</Text>
        </View>
      </TouchableOpacity>
      <View
        style={[
          backgrounds.gray100,
          // gutters.marginTop_8,
          {
            height: 1,
            width: '100%',
          },
        ]}
      />
    </View>
  );

  return (
    <View style={[gutters.paddingHorizontal_12, layout.justifyCenter,{ height:height }]}>
      <View
        style={[
          layout.relative,
          { width: '100%', marginTop: 80 },
        ]}
      >
        <InputField
          ref={inputRef}
          placeholder="Enter location"
          inputType="TEXT"
          editable={true}
          onFocus={handleFocus}
          keyboardType="default"
          Lefticon={<Search color={colors.black} />}
        />
      </View>

      <FlatList
        data={Locations}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={[
          gutters.paddingVertical_10, 
          gutters.paddingHorizontal_12, 
        ]}
      />
    </View>
  );
};

export default LocationSearchScreen;

type LocationSearchScreenType = NativeStackScreenProps<
  RootStackParamList,
  'LocationSearchScreen'
>;
