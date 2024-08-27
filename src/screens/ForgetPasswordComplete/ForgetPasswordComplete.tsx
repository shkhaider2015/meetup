import { Tick } from '@/assets/icon';
import { Confirmationbackground } from '@/assets/images';
import { Button } from '@/components/template';
import { useTheme } from '@/theme';
import { fontFamily } from '@/theme/_config';
import { RootStackParamList } from '@/types/navigation';
import { ImageBackground, SafeAreaView, Text, View } from 'react-native';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';

const ForgetPasswordCompleteScreen = ({ navigation }: ForgetPasswordCompleteScreenType) => {
  const { layout, gutters, fonts, colors } = useTheme();

  const _goToLogin = () => {
    navigation.navigate("Login")
  }

  return (
    <SafeAreaView style={[layout.flex_1, layout.justifyCenter, layout.itemsCenter, gutters.paddingHorizontal_24]}>
        <View style={[ layout.justifyCenter, layout.itemsCenter, { width: '100%'} ]} >
          <ImageBackground source={Confirmationbackground} style={[ {width: 120, height: 120 }]}  >
              {/* <Tick color={colors.gray00} width={20} height={20} /> */}
          </ImageBackground>
          <Text style={[ fonts.size_32, fontFamily._600_SemiBold, fonts.gray800, gutters.marginTop_24 ]} >Password Changed!</Text>
          <Text style={[ fonts.size_16, fonts.gray300, fontFamily._400_Regular ]} >Your password has been changed successfully.</Text>
          <Button label='Back to login' type="PRIMARY" containerStyle={[ gutters.marginTop_40, { width: '100%'} ]} onPress={_goToLogin}  />
        </View>
    </SafeAreaView>
  );
};

export type ForgetPasswordCompleteScreenType = NativeStackScreenProps<RootStackParamList, "ForgetPasswordComplete" >;


export default ForgetPasswordCompleteScreen;
