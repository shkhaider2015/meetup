import {
  DummyLaraProfile_1,
  DummyLaraProfile_2,
  DummyLaraProfile_3,
  DummyLaraProfile_4,
  DummyLaraProfile_5,
  DummyLaraProfile_6,
} from '@/assets/dummyImages';
import { useTheme } from '@/theme';
import { NavigationHookProps } from '@/types/navigation';
import { widthInPercentage } from '@/utils';
import { useNavigation } from '@react-navigation/native';
import { Image, ImageURISource, TouchableOpacity, View } from 'react-native';

const ProfileSectionImageGallery = () => {
  const navigation: NavigationHookProps = useNavigation();
  const { layout, gutters, backgrounds, fonts, borders } = useTheme();
  const images: ImageURISource[] = [
    Image.resolveAssetSource(DummyLaraProfile_4),
    Image.resolveAssetSource(DummyLaraProfile_6),
    Image.resolveAssetSource(DummyLaraProfile_5),
    Image.resolveAssetSource(DummyLaraProfile_1),
    Image.resolveAssetSource(DummyLaraProfile_2),
    Image.resolveAssetSource(DummyLaraProfile_3),
  ];

  const _onImagePress = (id: number) => {
    navigation.navigate('Carousel', { images, selectedIndex: id });
  };

  return (
    <View style={[gutters.paddingVertical_16]}>
      <View style={[layout.row, layout.justifyBetween]}>
        <TouchableOpacity onPress={() => _onImagePress(0)}>
          <Image
            source={images[0]}
            style={{ width: widthInPercentage(63), height: 270 , borderRadius: 5 }}
          />
        </TouchableOpacity>
        <View style={[gutters.gap_6]}>
          <TouchableOpacity onPress={() => _onImagePress(3)}>
            <Image
              source={images[3]}
              style={{ width: widthInPercentage(35), height: 131, borderRadius: 5 }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => _onImagePress(4)}>
            <Image
              source={images[4]}
              style={{ width: widthInPercentage(35), height: 131, borderRadius: 5 }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={[layout.row, layout.justifyBetween, layout.wrap, gutters.marginTop_6 , { rowGap: 5 } ]}
      >
        <TouchableOpacity onPress={() => _onImagePress(1)}>
          <Image
            source={images[1]}
            style={{ width: widthInPercentage(30.5), borderRadius: 5 }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => _onImagePress(2)}>
          <Image
            source={images[2]}
            style={{ width: widthInPercentage(30.5), borderRadius: 5 }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => _onImagePress(5)}>
          <Image
            source={images[5]}
            style={{ width: widthInPercentage(35), borderRadius: 5 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};


interface IProfileSectionImageGallery {
    images?: string[]
}

export default ProfileSectionImageGallery