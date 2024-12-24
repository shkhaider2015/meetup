import React from 'react';
import { View, Text } from 'react-native';
import { ShopRemove } from '@/assets/icon';
import { useTheme } from '@/theme';

const EmptyState: React.FC = () => {
  const { gutters, layout, fonts,colors } = useTheme();

  return (
    <View
      style={[
        gutters.marginTop_8,
        layout.row,
        gutters.marginLeft_8,
      ]}
    >
      <ShopRemove width={20} height={20} color={colors.gray200} />
      <Text style={[gutters.marginLeft_10, fonts.gray300]}>Empty</Text>
    </View>
  );
};

export default EmptyState;
