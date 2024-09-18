import { RootStackParamList } from '@/types/navigation';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import ExploreTabs from '@/navigators/ExploreTabNavigator';

const Explore = ({}: ExploreScreenType) => {

  return (
      <ExploreTabs />
  );
};

type ExploreScreenType = NativeStackScreenProps<RootStackParamList, 'Explore'>;

export default Explore;
