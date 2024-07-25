import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';
import { entities, Entity } from '../data';

interface State<T> {
  data: T;
  loading: boolean;
  error: string | null;
}

const createEntitySlice = <T>(entity: Entity) => {
  const initialState: State<T> = {
    data: entity.initialData as T,
    loading: false,
    error: null,
  };

  return createSlice({
    name: entity.name,
    initialState,
    reducers: {
      setLoading: (state, action: PayloadAction<boolean>) => {
        state.loading = action.payload;
      },
      setError: (state, action: PayloadAction<string | null>) => {
        state.error = action.payload;
      },
      setData: (state, action: PayloadAction<T>) => {
        state.data = action.payload as Draft<T>;
      },
    },
  });
};

const slices = entities.map(entity => createEntitySlice(entity));

export const reducers = slices.reduce((acc, slice) => {
  acc[slice.name] = slice.reducer;
  return acc;
}, {} as Record<string, any>);

export const actions = slices.reduce((acc, slice) => {
  acc[slice.name] = slice.actions;
  return acc;
}, {} as Record<string, any>);
