import { ChevronLeft } from '@/assets/icon';
import { useTheme } from '@/theme';
import { fontFamily, heights } from '@/theme/_config';
import { NavigationHookProps } from '@/types/navigation';
import { useNavigation } from '@react-navigation/native';
import { ReactElement, ReactNode } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const Header = (props: IHeaderProp) => {
  const navigation = useNavigation<NavigationHookProps>();
  const { layout, gutters, backgrounds, borders, fonts } = useTheme();
  const {
    label,
    leftComponent = () => (
      <TouchableOpacity
        style={[gutters.paddingHorizontal_8, gutters.paddingVertical_8]}
        onPress={() => navigation.goBack()}
      >
        <ChevronLeft />
      </TouchableOpacity>
    ),
    middleComponent = () => (
      <Text style={[{ fontSize: 20 }, fontFamily._600_SemiBold, fonts.gray800]}>
        {label}
      </Text>
    ),
    rightComponnent = () => <View style={[gutters.paddingHorizontal_16]} />,
  } = props;

  return (
    <View
      style={[
        backgrounds.gray00,
        layout.row,
        layout.justifyBetween,
        layout.itemsCenter,
        gutters.paddingHorizontal_16,
        borders.wBottom_1,
        borders.gray150,
        { height: heights.tabNavigationHeader },
      ]}
    >
      {leftComponent()}
      {middleComponent()}
      {rightComponnent()}
    </View>
  );
};

interface IHeaderProp {
  label?: string;
  leftComponent?: () => ReactNode;
  middleComponent?: () => ReactNode;
  rightComponnent?: () => ReactNode;
}

export default Header;
