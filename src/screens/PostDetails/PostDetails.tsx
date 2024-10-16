import { SafeScreen } from "@/components/template"
import { useTheme } from "@/theme";
import { fontFamily } from "@/theme/_config";
import { RootStackParamList } from "@/types/navigation";
import { Text, View } from "react-native";
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";

const PostDetails = ({ navigation, route }:PostDetailsScreenType) => {
    const { postId } = route.params;

    const { layout, gutters, colors, borders } = useTheme();

    return <SafeScreen>
        <Text>Post Details</Text>
    </SafeScreen>
};

type PostDetailsScreenType = NativeStackScreenProps<
  RootStackParamList,
  'PostDetails'
>;

export default PostDetails