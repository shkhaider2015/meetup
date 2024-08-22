import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setItem, getItem, removeItem } from "@/storage";
import { IUserReducer } from '@/types/reducer';
import { USER } from '@/constants';

const initialState: IUserReducer = getItem<IUserReducer>('user') || {
  id: '',
  name: '',
  email: '',
  profile_image: '',
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: USER,
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUserReducer>) => {
      setItem(USER, action.payload);
      return action.payload;
    },
    clearUser: () => {
      removeItem(USER);
      return {
        id: '',
        name: '',
        email: '',
        profile_image: '',
        isLoggedIn: false,
      };
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;