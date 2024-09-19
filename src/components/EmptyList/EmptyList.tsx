import { EmptyAnimation } from '@/assets/images';
import { useTheme } from '@/theme';
import { fontFamily } from '@/theme/_config';
import LottieView from 'lottie-react-native';
import { View, Text, StyleProp, ViewStyle } from 'react-native';

const EmptyList = ({
  text = 'Empty Posts',
  containerStyle,
  loop,
}: IEmptyList) => {
  const { gutters, layout, fonts } = useTheme();

  return (
    <View
      style={[
        gutters.paddingVertical_16,
        layout.itemsCenter,
        layout.justifyCenter,
        {
          minHeight: '35%',
        },
        containerStyle,
      ]}
    >
      <LottieView
        source={EmptyAnimation}
        autoPlay={true}
        loop={loop}
        style={{
          width: '100%',
          height: 200,
        }}
      />
      <Text style={[fonts.gray300, fontFamily._400_Regular, fonts.size_14]}>
        {text}
      </Text>
    </View>
  );
};

interface IEmptyList {
  text?: string;
  containerStyle?: StyleProp<ViewStyle>;
  loop?: boolean;
}

export default EmptyList;
