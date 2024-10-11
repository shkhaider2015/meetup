import { ChevronRight } from '@/assets/icon';
import { useTheme } from '@/theme';
import { fontFamily } from '@/theme/_config';
import { ReactNode } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const SettingsItem = (props: ISettingsItemProps) => {
  const { label = 'Label', Icon, onPress } = props;
  const { layout, gutters, borders, fonts, backgrounds, colors } = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        layout.row,
        layout.justifyBetween,
        layout.itemsCenter,
        gutters.paddingVertical_12,
        gutters.paddingHorizontal_12,
        gutters.marginTop_16,
        borders.w_1,
        borders.gray50,
        borders.rounded_16,
      ]}
      activeOpacity={0.7}
    >
      <View
        style={[
          layout.row,
          layout.justifyStart,
          layout.itemsCenter,
          gutters.gap_14,
        ]}
      >
        {/* Logo */}
        <View
          style={[
            backgrounds.primary,
            layout.justifyCenter,
            layout.itemsCenter,
            {
              borderRadius: 8,
              width: 40,
              height: 40,
            },
          ]}
        >
          {/* <Key width={20} height={20} color={colors.gray00} /> */}
          {Icon?.()}
        </View>
        <Text style={[fonts.black, fonts.size_16, fontFamily._500_Medium]}>
          {label}
        </Text>
      </View>
      <View style={[]}>
        {/* logo */}
        <ChevronRight width={25} height={25} color={colors.gray200} />
      </View>
    </TouchableOpacity>
  );
};

interface ISettingsItemProps {
  label?: string;
  Icon?: () => ReactNode;
  onPress?: () => void;
}

export default SettingsItem;
