import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();

export const setItem = (key: string, value: any) => {
  storage.set(key, JSON.stringify(value));
};

export const getItem = <T>(key: string): T | null => {
  const value = storage.getString(key);
  return value ? JSON.parse(value) : null;
};

export const removeItem = (key: string) => {
  storage.delete(key);
};

export default storage;