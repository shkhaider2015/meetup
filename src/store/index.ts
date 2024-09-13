import { configureStore } from '@reduxjs/toolkit';
import { postReducer, userReducer } from './slices';

const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;