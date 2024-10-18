import { useState } from 'react';
import {
  ImageStyle,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import FastImage, { FastImageProps } from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import ShimmerPlaceholder, {
  ShimmerPlaceholderProps,
} from 'react-native-shimmer-placeholder';

const Image = (props: IImageProps) => {
  const { shimmerStyle, containerStyle, fastImageProp, imageURL } = props;
  const [isImageLoaded, setImageLoaded] = useState(false);

  // console.log("URL ", imageURL);
  

  return (
    <View style={[styles.container, containerStyle]}>
      {/* Shimmer Placeholder */}
      {!isImageLoaded && (
        <ShimmerPlaceholder
          LinearGradient={LinearGradient}
          visible={isImageLoaded}
          style={[styles.shimmer, containerStyle, shimmerStyle]}
        />
      )}
      {/* FastImage for image loading */}
      <FastImage
        style={[styles.image , fastImageProp?.style  ]}
        source={{
          uri: imageURL,
          priority: FastImage.priority.normal,
        }}
        onLoad={() => {
            setImageLoaded(true)
        }}
        onError={() => setImageLoaded(true)}
        resizeMode={FastImage.resizeMode.cover}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 200,
    position: "relative",
  },
  shimmer: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    position: "absolute"
  },
  image: {
    width: '100%',
    height: '100%',
  }
});

interface IImageProps {
  imageURL?: string;
  shimmerStyle?: StyleProp<ViewStyle>;
  fastImageProp?: FastImageProps;
  containerStyle?: StyleProp<ViewStyle>;
}

export default Image;
