import { Post, PostLocation } from "@/screens";
import { RootStackParamList } from "@/types/navigation";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator<RootStackParamList>();

const PostNavigator = () => {
    return <Stack.Navigator>
        <Stack.Screen name="Post" component={Post} options={{ headerShown: false }} />
        <Stack.Screen name="PostLocation" component={PostLocation} options={{
             headerShown: false,  
             
             }} />
    </Stack.Navigator>
}

export default PostNavigator;