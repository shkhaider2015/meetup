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
import { IPostReducer } from '@/types/reducer';
import { convertImageURLforngRok, widthInPercentage } from '@/utils';
import { useNavigation } from '@react-navigation/native';
import _ from 'lodash';
import { Image, ImageURISource, TouchableOpacity, View } from 'react-native';
import { Image as CustomImage } from '@/components/template';

const ProfileSectionImageGallery = (props: IProfileSectionImageGallery) => {
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

  let imagePost = props.posts?.filter((post) => !_.isEmpty(post.image)) || [];
  const postLength = imagePost.length;

  const _onPressImage = (id: string) => {
    console.log('Clicked : ', id);
  };

  console.log("Image Post : ", imagePost, props.posts);
  

  if (postLength <= 2) {
    return (
      <View
        style={[
          gutters.paddingVertical_16,
          layout.row,
          layout.itemsCenter,
          layout.justifyBetween,
        ]}
      >
        {imagePost.map((post) => (
          <TouchableOpacity onPress={() => _onPressImage(post._id)}>
            <CustomImage
              imageURL={convertImageURLforngRok(post.image || '')}
              containerStyle={{
                width: widthInPercentage(45),
                height: 270,
                borderRadius: 5,
              }}
              fastImageProp={{ style: { borderRadius: 5 } }}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  if (postLength === 3) {
    return (
      <View
        style={[
          gutters.paddingVertical_16,
          layout.row,
          layout.justifyBetween,
          layout.itemsCenter,
        ]}
      >
        <TouchableOpacity onPress={() => _onPressImage(imagePost[0]._id)}>
          <CustomImage
            imageURL={convertImageURLforngRok(imagePost[0].image || '')}
            containerStyle={{
              width: widthInPercentage(63),
              height: 270,
              borderRadius: 5,
            }}
            fastImageProp={{ style: { borderRadius: 5 } }}
          />
        </TouchableOpacity>
        <View style={[gutters.gap_6]}>
          <TouchableOpacity onPress={() => _onPressImage(imagePost[1]._id)}>
            <CustomImage
              imageURL={convertImageURLforngRok(imagePost[1].image || '')}
              containerStyle={{
                width: widthInPercentage(35),
                height: 131,
                borderRadius: 5,
              }}
              fastImageProp={{ style: { borderRadius: 5 } }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => _onPressImage(imagePost[2]._id)}>
            <CustomImage
              imageURL={convertImageURLforngRok(imagePost[2].image || '')}
              containerStyle={{
                width: widthInPercentage(35),
                height: 131,
                borderRadius: 5,
              }}
              fastImageProp={{ style: { borderRadius: 5 } }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={[gutters.paddingVertical_16]}>
      <View style={[layout.row, layout.justifyBetween]}>
        <TouchableOpacity onPress={() => _onPressImage(imagePost[0]._id)}>
          <CustomImage
            imageURL={convertImageURLforngRok(imagePost[0].image || '')}
            containerStyle={{
              width: widthInPercentage(63),
              height: 270,
              borderRadius: 5,
            }}
            fastImageProp={{ style: { borderRadius: 5 } }}
          />
        </TouchableOpacity>
        <View style={[gutters.gap_6]}>
          <TouchableOpacity onPress={() => _onPressImage(imagePost[1]._id)}>
            <CustomImage
              imageURL={convertImageURLforngRok(imagePost[1].image || '')}
              containerStyle={{
                width: widthInPercentage(35),
                height: 131,
                borderRadius: 5,
              }}
              fastImageProp={{ style: { borderRadius: 5 } }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => _onPressImage(imagePost[2]._id)}>
            <CustomImage
              imageURL={convertImageURLforngRok(imagePost[2].image || '')}
              containerStyle={{
                width: widthInPercentage(35),
                height: 131,
                borderRadius: 5,
              }}
              fastImageProp={{ style: { borderRadius: 5 } }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={[
          layout.row,
          layout.justifyBetween,
          layout.wrap,
          gutters.marginTop_6,
          { rowGap: 5 },
        ]}
      >
        {imagePost.slice(3).map((post) => (
          <TouchableOpacity onPress={() => _onPressImage(post._id)}>
            <CustomImage
              imageURL={convertImageURLforngRok(post.image || '')}
              containerStyle={{
                width: widthInPercentage(30.5),
                height: 131,
                borderRadius: 5,
              }}
              fastImageProp={{ style: { borderRadius: 5 } }}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

interface IProfileSectionImageGallery {
  posts?: IPostReducer[];
}

export default ProfileSectionImageGallery;
