import { BADGE } from '@/constants/reducer';
import { getItem, removeItem, setItem } from '@/storage';
import { IBadge } from '@/types/reducer';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: IBadge = getItem<IBadge>(BADGE) || {
  Chat: 0,
  Notifications: 0,
  Requests: 0,
};

const BadgeSlice = createSlice({
  name: BADGE,
  initialState,
  reducers: {
    updateChatBadge: (state, action: PayloadAction<number>) => {
      state = {
        ...state,
        Chat: state.Chat + action.payload,
      };
      setItem(BADGE, state);
      return state;
    },
    updateNotificationsBadge: (state, action: PayloadAction<number>) => {
      state = {
        ...state,
        Notifications: state.Notifications + action.payload,
      };
      setItem(BADGE, state);
      return state;
    },
    updateRequestsBadge: (state, action: PayloadAction<number>) => {
      state = {
        ...state,
        Requests: state.Requests + action.payload,
      };
      setItem(BADGE, state);
      return state;
    },
    clearChatBadge: (state) => {
      removeItem(BADGE);
      return {
        ...state,
        Chat: 0,
      };
    },
    clearNotificationsBadge: (state) => {
      removeItem(BADGE);
      return {
        ...state,
        Notifications: 0,
      };
    },
    clearRequestsBadge: (state) => {
      removeItem(BADGE);
      return {
        ...state,
        Requests: 0,
      };
    },
    clearAllBadge: () => {
      removeItem(BADGE);
      return {
        Chat: 0,
        Notifications: 0,
        Requests: 0,
      };
    },
  },
});

export const {
  updateChatBadge,
  updateNotificationsBadge,
  updateRequestsBadge,
  clearChatBadge,
  clearNotificationsBadge,
  clearRequestsBadge,
  clearAllBadge,
} = BadgeSlice.actions;
export default BadgeSlice.reducer;
