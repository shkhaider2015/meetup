import { useState } from 'react';
import { ImageStyle, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import FastImage, { FastImageProps } from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import ShimmerPlaceholder, {
  ShimmerPlaceholderProps,
} from 'react-native-shimmer-placeholder';

const Image = (props: IImageProps) => {
  const [isImageLoaded, setImageLoaded] = useState(false);

  if (!isImageLoaded) {
    return (
      <ShimmerPlaceholder
        LinearGradient={LinearGradient}
        visible={isImageLoaded}
        style={[styles.shimmer, props.shimmerProps?.style]}
      />
    );
  }
  return (
    <FastImage
      style={[styles.image, props.fastImageProps?.style]}
      source={{
        uri: props.imageURL,
        priority: FastImage.priority.normal,
      }}
      onLoad={() => setImageLoaded(true)}
      resizeMode={FastImage.resizeMode.cover}
    />
  );
};

const styles = StyleSheet.create({
  shimmer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
});

interface IImageProps {
  imageURL?: string;
  shimmerProps?: ShimmerPlaceholderProps;
  fastImageProps?: FastImageProps;
}

export default Image;
