import { LoadingAnimation } from '@/assets/images';
import { LoaderContext } from '@/context';
import { useTheme } from '@/theme';
import { LoaderProps } from '@/types/loader';
import LottieView from 'lottie-react-native';
import React, { useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const Loader: React.FC<LoaderProps> = ({ isVisible }) => {
  const { colors } = useTheme();

  if (!isVisible) return null;

  return (
    <View style={styles.overlay}>
      {/* <ActivityIndicator size="large" color={colors.primary} /> */}
      <View
        style={{
          width: 150,
          height: 150,
          backgroundColor: colors.gray800,
          borderRadius: 200,
        }}
      ></View>

      <LottieView
        autoPlay={true}
        loop={true}
        source={LoadingAnimation}
        style={{
          width: '100%',
          height: 300,
          position: 'absolute'
        }}
      />
    </View>
  );
};

export const LoaderProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
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

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.124)',
    zIndex: 500,
  },
});

export default Loader;
