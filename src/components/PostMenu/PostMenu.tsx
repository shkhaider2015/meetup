import { Edit, Trash } from "@/assets/icon";
import { useTheme } from "@/theme";
import { fontFamily } from "@/theme/_config";
import { FC } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SvgProps } from "react-native-svg";

const PostMenu = (props: IPostMenu) => {
    const { isCurrentUser, onEdit, onDelete, onClose } = props;
    const { gutters, layout, fonts, backgrounds } = useTheme();
  
    const currentUserOptions: IOptions[] = [
      {
        label: 'Edit',
        Icon: Edit,
        onPress: onEdit,
        isDisable: false,
      },
      {
        label: 'Delete',
        Icon: Trash,
        onPress: onDelete,
        isDisable: false,
      },
    ];
  
    const options: IOptions[] = [];
  
    return (
      <View style={[gutters.paddingHorizontal_16, gutters.paddingVertical_24]}>
        <FlatList
          data={isCurrentUser ? currentUserOptions : options}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                layout.row,
                layout.justifyStart,
                layout.itemsCenter,
                { height: 50 },
              ]}
              onPress={() => {
                onClose?.();
                setTimeout(() => {
                  item.onPress?.();
                }, 200);
              }}
            >
              <item.Icon width={35} height={35} />
              <Text
                style={[
                  fontFamily._400_Regular,
                  fonts.size_16,
                  fonts.gray800,
                  gutters.marginLeft_12,
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(_, index) => index.toString()}
          ItemSeparatorComponent={() => (
            <View style={[{ height: 1 }, backgrounds.gray100]} />
          )}
        />
      </View>
    );
  };
  
  interface IPostMenu {
    isCurrentUser: boolean;
    onEdit?: () => void;
    onDelete?: () => void;
    onClose?: () => void;
  }

  interface IOptions {
    label: string;
    Icon: FC<SvgProps>;
    onPress?: () => void;
    isDisable?: boolean;
  }

  export default PostMenu