import { MarkerLayout } from '@/assets/images';
import { useTheme } from '@/theme';
import { ICustomMarker } from '@/types/customMarker';
import { IPost } from '@/types/post';
import { convertImageURLforngRok, getIconByID } from '@/utils';
import { Image, View } from 'react-native';
import { Marker } from 'react-native-maps';
import UserModal from '../Modals/User';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NavigationHookProps } from '@/types/navigation';

const CustomMarker = (props: IPost) => {
  const { location, user, activity, _id } = props;

  const [showDetails, setShowDetails] = useState(false);
  const { backgrounds, layout, gutters, colors } = useTheme();
  const { navigate } = useNavigation<NavigationHookProps>();

  const CatIcon = getIconByID(activity || '');

  const _gotoPostDetails = () => {
    navigate('PostDetails', {
      postId: _id,
    });
  };

  return (
    <Marker
      style={[layout.row, layout.itemsStart]}
      coordinate={{
        latitude: location?.latitude || 0,
        longitude: location?.longitude || 0,
      }}
      onPress={() => _gotoPostDetails()}
    >
      <View style={[layout.relative]}>
        <MarkerLayout color={colors.primary} width={40} height={65} />
        <Image
          source={{ uri: convertImageURLforngRok(user.profileImage) }}
          style={[
            layout.absolute,
            gutters.marginLeft_8,
            gutters.marginTop_8,
            {
              width: 25,
              height: 25,
              borderRadius: 40,
              borderWidth: 1,
              borderColor: '#FFFFFF',
            },
          ]}
        />
      </View>
      {CatIcon && (
        <View
          style={[
            layout.justifyCenter,
            layout.itemsCenter,
            gutters.marginTop_12,
            gutters.marginLeft_4,
            backgrounds.primary,
            {
              width: 27,
              height: 27,
              borderRadius: 50,
            },
          ]}
        >
          {<CatIcon color={colors.gray00} width={15} height={15} />}
        </View>
      )}

      {/* To be removed */}
      <UserModal
        open={showDetails}
        onClose={() => setShowDetails(false)}
        data={props}
      />
    </Marker>
  );
};

export default CustomMarker;
