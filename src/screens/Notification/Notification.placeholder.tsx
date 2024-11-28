import { useTheme } from '@/theme';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';

const NotificationPlaceholder = () => {
  const { layout, gutters } = useTheme();

  const renderItem = (key: string) => {
    return (
      <View
        key={key}
        style={[
          layout.row,
          layout.justifyBetween,
          layout.itemsCenter,
          gutters.marginVertical_10
        ]}
      >
        <View style={[layout.row, gutters.gap_14]}>
          <ShimmerPlaceholder
            LinearGradient={LinearGradient}
            shimmerStyle={styles.image}
          />
          <View style={[gutters.gap_10, layout.justifyCenter]}>
            <ShimmerPlaceholder
              LinearGradient={LinearGradient}
              shimmerStyle={styles.text1}
            />
            <ShimmerPlaceholder
              LinearGradient={LinearGradient}
              shimmerStyle={styles.text2}
            />
          </View>
        </View>
        <View style={[layout.justifyStart, layout.itemsStart, { width: 50 }]}>
          <ShimmerPlaceholder
            LinearGradient={LinearGradient}
            shimmerStyle={styles.date}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={[layout.flex_1, gutters.paddingHorizontal_24, gutters.paddingVertical_24]}>
      {['a', 'b', 'c', 'd', 'e', 'f'].map((item) => renderItem(item))}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 70,
    height: 70,
    borderRadius: 70,
  },
  date: { width: '100%', height: 7, borderRadius: 5 },
  text1: { width: '80%', height: 13, borderRadius: 5 },
  text2: { width: '50%', height: 10, borderRadius: 5 },
});

export default NotificationPlaceholder;
