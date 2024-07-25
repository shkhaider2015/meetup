import { ScrollView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useEntity } from "@/store/thunks";

const HomeScreen = () => {
  const { data, loading, error, fetch } = useEntity("posts");

  useEffect(() => {
    console.log("Api calling ", fetch)
    fetch("https://jsonplaceholder.typicode.com/posts");
  }, []);
  
  console.log("Home data : ", data?.slice?.(0, 3), loading, error);

  if (loading)
    return (
      <View>
        <Text>...Loading</Text>
      </View>
    );
  return (
    <ScrollView>
      <View>
        <Text>Home Screen</Text>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
