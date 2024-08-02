import { useTheme } from "@/theme";
import { ICheckbox } from "@/types/templates/checkbox";
import { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

const Checkbox = (props: ICheckbox) => {
  const { onChange, onBlur, checked = false } = props;
  const [isChecked, setIsChecked] = useState(checked);
  const { borders, layout, backgrounds } = useTheme();

  const _onChange = () => {
    setIsChecked((pS) => !pS);
    onChange?.(!isChecked);
  };

  return (
    <TouchableOpacity
      onPress={_onChange}
      style={[
        styles.container,
        borders.primary,
        borders.rounded_4,
        layout.justifyCenter,
        layout.itemsCenter,
      ]}
      activeOpacity={.7}
      onBlur={()=> onBlur?.()}
    >
      {isChecked && <View style={[styles.checked, backgrounds.primary]} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 20,
    height: 20,
    borderWidth: 1,
  },
  checked: {
    width: 13,
    height: 13,
    borderRadius: 2,
  },
});

export default Checkbox;
