import { Header } from '@/components';
import { SafeScreen } from '@/components/template';
import { useTheme } from '@/theme';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';

const PostDetailsPlaceholder = () => {
  const { layout, gutters } = useTheme();

  return (
    <SafeScreen>
      <Header label="Post Details" />
      <View
        style={[
          layout.fullWidth,
          gutters.paddingHorizontal_24,
          gutters.paddingVertical_16,
        ]}
      >
        <ShimmerPlaceholder
          LinearGradient={LinearGradient}
          shimmerStyle={styles.image}
        />

        <ShimmerPlaceholder
          LinearGradient={LinearGradient}
          shimmerStyle={styles.location}
        />
        <ShimmerPlaceholder
          LinearGradient={LinearGradient}
          shimmerStyle={styles.date}
        />
        <View
          style={[
            layout.row,
            layout.justifyBetween,
            layout.itemsCenter,
            gutters.marginVertical_12,
          ]}
        >
          <View style={[layout.row, layout.justifyStart, layout.itemsCenter, gutters.gap_10]}>
            <ShimmerPlaceholder
              LinearGradient={LinearGradient}
              shimmerStyle={styles.actions}
            />
            <ShimmerPlaceholder
              LinearGradient={LinearGradient}
              shimmerStyle={styles.actions}
            />
          </View>
          <ShimmerPlaceholder
            LinearGradient={LinearGradient}
            shimmerStyle={styles.time}
          />
        </View>
        <ShimmerPlaceholder
          LinearGradient={LinearGradient}
          shimmerStyle={styles.text}
        />
        <ShimmerPlaceholder
          LinearGradient={LinearGradient}
          shimmerStyle={styles.text1}
        />
        <ShimmerPlaceholder
          LinearGradient={LinearGradient}
          shimmerStyle={styles.text2}
        />
      </View>
    </SafeScreen>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300,
    borderRadius: 20,
  },
  location: { width: '100%', height: 30, borderRadius: 5, marginVertical: 10, marginTop: 30},
  date: { width: '100%', height: 30, borderRadius: 5, marginVertical: 10},
  actions: { width: 50, height: 50, borderRadius: 50 },
  time: { width: '25%', height: 30, borderRadius: 5 },
  text: {
    width: '80%',
    height: 20,
    borderRadius: 5,
    marginTop: 40,
  },
  text1: { width: '65%', height: 20, borderRadius: 5, marginTop: 20 },
  text2: { width: '50%', height: 20, borderRadius: 5, marginTop: 20 },
});

export default PostDetailsPlaceholder;
