import { useEntity } from "@/store/thunks";
import Layout from "@/theme/layout";
import { ScrollView, Text, View } from "react-native";
import { useSelector } from "react-redux";

const AboutScreen = () => {
  const { data } = useEntity("posts");

  console.log("About data : ", data?.[0]);
  return (
    <ScrollView>
      <View>
        <Text>About Screen</Text>
      </View>
    </ScrollView>
  );
};

export default AboutScreen;
