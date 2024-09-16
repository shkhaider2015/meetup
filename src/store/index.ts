import { configureStore } from '@reduxjs/toolkit';
import { locationReducer, postReducer, userReducer } from './slices';

const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postReducer,
    location: locationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
