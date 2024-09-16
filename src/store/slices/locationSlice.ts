import { LOCATION } from '@/constants/reducer';
import { getItem, removeItem, setItem } from '@/storage';
import { IPostReducer } from '@/types/reducer';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Region } from 'react-native-maps';

const initialState: Region = getItem<Region>(LOCATION) || {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
};

const locationSlice = createSlice({
  name: LOCATION,
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<Region>) => {
      setItem(LOCATION, action.payload);
      return action.payload;
    },
    clearLocatioin: () => {
      removeItem(LOCATION);
      return {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
    },
  },
});

export const { setLocation, clearLocatioin } = locationSlice.actions;
export default locationSlice.reducer;