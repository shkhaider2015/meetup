import Carousel from "@/screens/Carousel/Carousel";
import { RootStackParamList } from "@/types/navigation";
import { createStackNavigator } from "@react-navigation/stack";
import TabsNavigator from "../TabNavigator";
import { Interests } from "@/screens";
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
      Toast.show({
        type: "error",
        text1: "Session Expired",
        text2: error?.message || "Your session has been expired, Please login",
      });

      setTimeout(() => {
        dispatch(clearUser())
      }, 500);
    },
    onSuccess: (data:any) => {
      console.log("Dasta ", data);
      const user:IUserReducer = {
        ...data,
        profile_image: convertImageURLforngRok(data.profile_image),
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
    </Stack.Navigator>
  );
};

export default ProtectedScreens;
