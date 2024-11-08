import { Header } from '@/components';
import { SafeScreen } from '@/components/template';
import { useTheme } from '@/theme';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';

const OtherProfilePlaceholder = () => {
  const { layout, gutters } = useTheme();

  return (
    <SafeScreen>
      <Header label="User Details" />
      <View
        style={[
          layout.fullWidth,
          gutters.paddingHorizontal_24,
          gutters.paddingVertical_16,
        ]}
      >
        {/* Profile Head */}
        <View
          style={[
            layout.row,
            layout.justifyBetween,
            layout.itemsCenter,
            {
              height: 200,
            },
          ]}
        >
          <ShimmerPlaceholder
            LinearGradient={LinearGradient}
            shimmerStyle={styles.image}
          />

          <View style={[]}>
            <ShimmerPlaceholder
              LinearGradient={LinearGradient}
              shimmerStyle={styles.headText1}
            />
            <ShimmerPlaceholder
              LinearGradient={LinearGradient}
              shimmerStyle={styles.headText2}
            />
          </View>
        </View>
        {/* Details */}
        <ShimmerPlaceholder
          LinearGradient={LinearGradient}
          shimmerStyle={styles.details1}
        />
        <ShimmerPlaceholder
          LinearGradient={LinearGradient}
          shimmerStyle={styles.details2}
        />
        <ShimmerPlaceholder
          LinearGradient={LinearGradient}
          shimmerStyle={styles.details3}
        />
        {/* Activity Row */}
        <View style={[layout.row, gutters.gap_40, gutters.marginTop_40]}>
          <ShimmerPlaceholder
            LinearGradient={LinearGradient}
            shimmerStyle={styles.activity1}
          />
          <ShimmerPlaceholder
            LinearGradient={LinearGradient}
            shimmerStyle={styles.activity2}
          />
          <ShimmerPlaceholder
            LinearGradient={LinearGradient}
            shimmerStyle={styles.activity3}
          />

        </View>
        {/* Gallery */}
        <View
          style={[
            layout.row,
            layout.wrap,
            gutters.gap_16,
            gutters.marginTop_40,
          ]}
        >
          {Array.from([1, 2, 3, 4, 5, 6]).map((item) => (
            <ShimmerPlaceholder
              key={item}
              LinearGradient={LinearGradient}
              shimmerStyle={styles.gallery}
            />
          ))}
        </View>
      </View>
    </SafeScreen>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 120,
    height: 120,
    borderRadius: 120,
  },
  headText1: {
    width: '65%',
    height: 18,
    borderRadius: 5,
    marginTop: 20,
  },
  headText2: {
    width: '35%',
    height: 18,
    borderRadius: 5,
    marginTop: 20,
  },
  details1: {
    width: '80%',
    height: 12,
    borderRadius: 5,
    marginTop: 40,
  },
  details2: {
    width: '65%',
    height: 12,
    borderRadius: 5,
    marginTop: 15,
  },
  details3: {
    width: '40%',
    height: 12,
    borderRadius: 5,
    marginTop: 15,
  },
  activity1: {
    width: 40,
    height: 40,
    borderRadius: 45,
  },
  activity2: {
    width: 40,
    height: 40,
    borderRadius: 45,
  },
  activity3: {
    width: 40,
    height: 40,
    borderRadius: 45,
  },
  activity4: {
    width: 40,
    height: 40,
    borderRadius: 45,
  },
  gallery: {
    width: '30%',
    height: 100,
    borderRadius: 20,
  },
});

export default OtherProfilePlaceholder;
