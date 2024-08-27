import { RootStackParamList } from "@/types/navigation";
import { ScrollView, Text, View } from "react-native";
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";

const EditProfileScreen = ({}:EditProfileScreenType) => {

  return (
    <ScrollView>
      <View>
        <Text>Edit Profile Screen</Text>
      </View>
    </ScrollView>
  );
};

type EditProfileScreenType = NativeStackScreenProps<RootStackParamList, "EditProfile">;

export default EditProfileScreen;
