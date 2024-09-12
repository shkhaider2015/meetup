import { useTheme } from '@/theme';
import { fontFamily } from '@/theme/_config';
import { ActivityPickerProps, IActivityPicker } from '@/types/activityPicker';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { useEffect, useRef, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Button } from '../template';
import { activityData } from '@/constants/activities';
import _ from 'lodash';

const activitesData: IActivityPicker[] = activityData.map((item) => ({
  ...item,
  isSelected: false,
}));

const ActivityPicker = (props: ActivityPickerProps) => {
  const { open, isMulti = false, initialData = [], onClose, onConfirm } = props;

  const [snapPoints] = useState<string[]>(['75%']);
  const [activities, setActivities] = useState(
    activitesData.map((item) =>
      initialData.some((id) => item.id === id)
        ? { ...item, isSelected: true }
        : item,
    ),
  );

  const { borders, fonts, colors, gutters, layout } = useTheme();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    if (open) {
      bottomSheetModalRef.current?.present();
    }
  }, [open]);

  const _onPress = (id: string) => {
    setActivities((pS) =>
      pS.map((item) =>
        item.id === id
          ? { ...item, isSelected: !item.isSelected }
          : isMulti
            ? item
            : { ...item, isSelected: false },
      ),
    );
  };

  const _onCancel = () => {
    if (!open) return;
    onClose?.();
    _dismissBottomSheet();
  };

  const _dismissBottomSheet = () => {
    bottomSheetModalRef.current?.dismiss();
  };

  const _onConfirm = () => {
    const selected = activities.filter((item) => item.isSelected);
    if (_.isEmpty(selected)) return;

    onConfirm?.(selected);

    _onCancel();
  };

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            appearsOnIndex={0}
            disappearsOnIndex={-1}
            pressBehavior={'close'}
            {...props}
          />
        )}
        handleStyle={{
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          borderBottomWidth: 1,
          borderBottomColor: colors.gray100,
        }}
        onDismiss={() => _onCancel()}
        enableHandlePanningGesture={true}
        enableContentPanningGesture={false}
      >
        <View style={[{ height: '100%' }]}>
          <Text
            style={[
              fonts.alignCenter,
              fontFamily._500_Medium,
              fonts.size_16,
              fonts.gray800,
              gutters.paddingVertical_12,
            ]}
          >
            Add Activity
          </Text>
          <ScrollView style={{ maxHeight: '75%' }}>
            <View
              style={[
                layout.row,
                layout.wrap,
                layout.justifyCenter,
                gutters.paddingVertical_24,
                { columnGap: 16, rowGap: 36 },
              ]}
            >
              {activities.map(({ Icon, ...item }) => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    layout.col,
                    layout.itemsCenter,
                    gutters.gap_6,
                    { width: '30%' },
                  ]}
                  onPress={() => _onPress(item.id)}
                >
                  {
                    <Icon
                      color={item.isSelected ? colors.primary : colors.gray300}
                      width={25}
                      height={25}
                    />
                  }
                  <Text style={[fonts.gray300]}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
          <View
            style={[
              layout.row,
              layout.justifyBetween,
              layout.itemsCenter,
              gutters.paddingHorizontal_10,
              gutters.paddingVertical_10,
              {
                borderWidth: 1,
                borderTopColor: colors.gray50,
                borderBottomColor: colors.gray00
              },
            ]}
          >
            <Button
              label="Cancel"
              type="SECONDARY"
              onPress={_onCancel}
              containerStyle={[{ width: '45%', height: 50 }]}
            />
            <Button
              label="Confirm"
              type="PRIMARY"
              onPress={_onConfirm}
              containerStyle={[{ width: '45%', height: 50 }]}
              disabled={activities.every(item => !item.isSelected)}
            />
          </View>
        </View>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

export default ActivityPicker;
