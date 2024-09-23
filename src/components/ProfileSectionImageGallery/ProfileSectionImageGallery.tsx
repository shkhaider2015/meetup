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
import {
  Image,
  ImageURISource,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Image as CustomImage } from '@/components/template';
import {  useState } from 'react';
import LottieView from 'lottie-react-native';
import { EmptyAnimation, LoadingAnimation } from '@/assets/images';
import { fontFamily } from '@/theme/_config';
import UserModal from '../Modals/User';
import { IPost } from '@/types/post';

const ProfileSectionImageGallery = (props: IProfileSectionImageGallery ) => {

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
  const [selectedPost, setSelectedPost] = useState<IPost | null>();


  const _onImagePress = (id: number) => {
    navigation.navigate('Carousel', { images, selectedIndex: id });
  };

  let imagePost = props.posts?.filter((post) => !_.isEmpty(post.image)) || [];
  const postLength = imagePost.length;

  const _showDetails = (posting: IPost) => {
    setSelectedPost(posting); 
  };
  const onClose = () => {
    setSelectedPost(null);
  }
  

  if (postLength === 0) {
    return (
      <View
        style={[
          gutters.paddingVertical_16,
          layout.itemsCenter,
          layout.justifyCenter,
          {
            minHeight: '35%'
          }
        ]}
      >
        <LottieView
          source={EmptyAnimation}
          autoPlay={true}
          loop={false}
          style={{
            width: '100%',
            height: 200,
          }}
        />
        <Text style={[fonts.gray300, fontFamily._400_Regular, fonts.size_14]}>
          No Posts To Show
        </Text>
      </View>
    );
  }

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
          <TouchableOpacity onPress={()=>_showDetails(post)}>
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
        {selectedPost && (
      <UserModal
       open={!_.isEmpty(selectedPost)}
       onClose={onClose}
       data={selectedPost}
     />)}
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
        <TouchableOpacity  onPress={()=>_showDetails(imagePost[0])}>
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
          <TouchableOpacity  onPress={()=>_showDetails(imagePost[1])}>
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
          <TouchableOpacity  onPress={()=>_showDetails(imagePost[2])}>
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
        {selectedPost && (
      <UserModal
       open={!_.isEmpty(selectedPost)}
       onClose={onClose}
       data={selectedPost}
     />)}
      </View>
    );
  }

  return (
    <View style={[gutters.paddingVertical_16]}>
      <View style={[layout.row, layout.justifyBetween]}>
        <TouchableOpacity  onPress={()=>_showDetails(imagePost[0])}>
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
          <TouchableOpacity  onPress={()=>_showDetails(imagePost[1])}>
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
          <TouchableOpacity  onPress={()=>_showDetails(imagePost[2])} >
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
          <TouchableOpacity  onPress={()=>_showDetails(post)}>
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
      {selectedPost && (
      <UserModal
       open={!_.isEmpty(selectedPost)}
       onClose={onClose}
       data={selectedPost}
     />)}
    </View>
  );
};

interface IProfileSectionImageGallery {
  posts?: IPostReducer[];
}

export default ProfileSectionImageGallery;
