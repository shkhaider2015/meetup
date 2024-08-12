import { useTheme } from '@/theme';
import React, { createContext, useContext, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

interface LoaderProps {
  isVisible: boolean;
}

interface LoaderContextProps {
    isLoading: boolean;
    showLoader: () => void;
    hideLoader: () => void;
  }

const Loader: React.FC<LoaderProps> = ({ isVisible }) => {
    const {colors} = useTheme();

  if (!isVisible) return null;

  return (
    <View style={styles.overlay}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
};


const LoaderContext = createContext<LoaderContextProps>({
  isLoading: false,
  showLoader: () => {},
  hideLoader: () => {},
});

export const LoaderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const showLoader = () => setIsLoading(true);
  const hideLoader = () => setIsLoading(false);

  return (
    <LoaderContext.Provider value={{ isLoading, showLoader, hideLoader }}>
        <Loader isVisible={isLoading} />
      {children}
    </LoaderContext.Provider>
  );
};

export const useLoader = () => useContext(LoaderContext);

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 500
  },
});

export default Loader;