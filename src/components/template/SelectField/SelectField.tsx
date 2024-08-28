import { ChevronLeft, ChevronRight } from '@/assets/icon';
import { useTheme } from '@/theme';
import { SelectFieldProps } from '@/types/templates/selectField';
import _ from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { Animated, Text, TouchableOpacity, View } from 'react-native';

const SelectField = (props:SelectFieldProps) => {
  const { placeholder="Placeholder", value="", onPress=()=>{} } = props;
  const { layout, gutters, borders, backgrounds, fonts, colors } = useTheme();

  const [isActive, setIsActive] = useState<boolean>(false);

  const borderColor = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(borderColor, {
      toValue: isActive ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isActive]);

  // Interpolate the border color value
  const interpolatedBorderColor = borderColor.interpolate({
    inputRange: [0, 1],
    outputRange: [borders.gray150.borderColor, borders.gray400.borderColor], // Adjust these colors to match your theme
  });

  const _onSelect = () => {
    onPress?.();
  }

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={_onSelect} >
      <Animated.View
        style={[
          layout.row,
          layout.justifyBetween,
          layout.itemsCenter,
          gutters.paddingHorizontal_12,
          borders.rounded_32,
          backgrounds.gray30,
          borders.w_1,
          borders.gray150,
          { height: 60, borderColor: interpolatedBorderColor },
        ]}
      >
        <Text style={[fonts.size_14, _.isEmpty(value) ? fonts.gray250 : fonts.gray800]}>{_.isEmpty(value) ? placeholder : value }</Text>

        <ChevronRight color={colors.gray800} />
      </Animated.View>
    </TouchableOpacity>
  );
};

export default SelectField;
