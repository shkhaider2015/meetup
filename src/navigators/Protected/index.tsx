import { RootStackParamList } from "@/types/navigation";
import { createStackNavigator } from "@react-navigation/stack";
import TabsNavigator from "../TabNavigator";
import { Interests, Carousel, EditProfile, OtherProfile, ChangePassword, ForgetPasswordComplete } from "@/screens";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { useMutation } from "@tanstack/react-query";
import { loadUser } from "@/services/users";
import Toast from "react-native-toast-message";
import { useEffect } from "react";
import { clearUser, setUser } from "@/store/slices/userSlice";
import { IUserReducer } from "@/types/reducer";
import { convertImageURLforngRok } from "@/utils";
import { getItem } from "@/storage";
import { USER } from "@/constants";

const Stack = createStackNavigator<RootStackParamList>();

const ProtectedScreens = () => {
  const dispatch: AppDispatch = useDispatch();
  const isFirstTimeLoggedIn = false;  
  const {
    mutate: loadUserMutation,
  } = useMutation({
    mutationFn: (token:string) => {
      return loadUser(token);
    },
    onError: (error) => {
      if(error?.message?.includes("expired")) {
        Toast.show({
          type: "error",
          text1: "Session Expired",
          text2: error?.message,
        });
  
        setTimeout(() => {
          dispatch(clearUser())
        }, 500);
      }
    },
    onSuccess: (data:any) => {
      console.log("Load User Data ", data);
      const user:IUserReducer = {
        ...data,
        profileImage: convertImageURLforngRok(data.profileImage),
        isLoggedIn: true,
      }
      dispatch(setUser(user))
    },
  });

  useEffect(() => {
    const initializeUser = () => {
      const user:any = getItem(USER);
      if(user.token) {
        loadUserMutation(user.token)
      }
    }
    initializeUser()
  }, [dispatch])

  return (
    <Stack.Navigator
      initialRouteName={isFirstTimeLoggedIn ? "Ineterests" : "Tabs"}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Tabs" component={TabsNavigator} />
      <Stack.Screen name="Carousel" component={Carousel} />
      <Stack.Screen name="Ineterests" component={Interests} />
      <Stack.Screen name="OtherProfile" component={OtherProfile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="ForgetPasswordComplete" component={ForgetPasswordComplete} />
    </Stack.Navigator>
  );
};

export default ProtectedScreens;
