import { Button, SafeScreen } from "@/components/template";
import { logout } from "@/services/users/fetchOne";
import { AppDispatch } from "@/store";
import { clearUser } from "@/store/slices/userSlice";
import { useTheme } from "@/theme";
import { RootStackParamList } from "@/types/navigation";
import { useMutation } from "@tanstack/react-query";
import { Dimensions, ScrollView, Text, View } from "react-native";
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";
import { useDispatch } from "react-redux";

const Profile = ({}: ProfileScreenType) => {
  const dispatch:AppDispatch = useDispatch();

  const { layout, gutters, backgrounds, fonts } = useTheme();
  const { isError, isPending, isSuccess, mutate } = useMutation({
    mutationFn: () => {
      return logout()
    },
    onSuccess(data, variables, context) {
        console.log("Success Logout : ", data, variables, context)
        dispatch(clearUser())
    },
  })
  const screenHeight = Dimensions.get("window").height;

  return <SafeScreen>
    <ScrollView>
      <View
        style={[
          gutters.paddingHorizontal_24,
          gutters.paddingVertical_12,
          layout.itemsCenter,
          layout.justifyCenter,
          {
            height: screenHeight,
            borderWidth: 2,
            borderColor: "red",
          },
        ]}
      >
        <Text style={[fonts.size_24, fonts.black]}>Profile Screen</Text>
        <Button label="Logout" containerStyle={[{width: '60%'}]} loading={isPending} onPress={() => {
          mutate()
        }} />
      </View>
    </ScrollView>
  </SafeScreen>;
};

type ProfileScreenType = NativeStackScreenProps<RootStackParamList, "Profile">;

export default Profile;
