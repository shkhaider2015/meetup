import {
  Cat_Charity,
  Cat_Cooking,
  Cat_Drinking,
  Cat_Fashioon,
  Cat_Fitness,
  Cat_Gaming,
  Cat_Mountain_Climb,
  Cat_Music,
  Cat_Others,
  Cat_Painting,
  Cat_PawPrint,
  Cat_Photography,
  Cat_Reading,
  Cat_Running_Right,
  Cat_Skateboarding,
  Cat_Speech,
  Cat_Sports,
  Cat_Swimming,
  Cat_Travel,
} from '@/assets/icon';
import { FC } from 'react';
import { SvgProps } from 'react-native-svg';

export interface IActivity {
  id: string;
  label: string;
  Icon: FC<SvgProps>;
}

export const activityData: IActivity[] = [
  {
    id: '',
    label: 'Charity',
    Icon: Cat_Charity,
  },
  {
    id: '',
    label: 'Cookig',
    Icon: Cat_Cooking,
  },
  {
    id: '',
    label: 'Driking',
    Icon: Cat_Drinking,
  },
  {
    id: '',
    label: 'Fashion',
    Icon: Cat_Fashioon,
  },
  {
    id: '',
    label: 'Fitness',
    Icon: Cat_Fitness,
  },
  {
    id: '',
    label: 'Gaming',
    Icon: Cat_Gaming,
  },
  {
    id: '',
    label: 'Mountain Climbing',
    Icon: Cat_Mountain_Climb,
  },
  {
    id: '',
    label: 'Music',
    Icon: Cat_Music,
  },
  {
    id: '',
    label: 'Others',
    Icon: Cat_Others,
  },
  {
    id: '',
    label: 'Painting',
    Icon: Cat_Painting,
  },
  {
    id: '',
    label: 'Pets',
    Icon: Cat_PawPrint,
  },
  {
    id: '',
    label: 'Photography',
    Icon: Cat_Photography,
  },
  {
    id: '',
    label: 'Reading',
    Icon: Cat_Reading,
  },
  {
    id: '',
    label: 'Running',
    Icon: Cat_Running_Right,
  },
  {
    id: '',
    label: 'Shopping',
    Icon: Cat_Charity,
  },
  {
    id: '',
    label: 'Sketboardig',
    Icon: Cat_Skateboarding,
  },
  {
    id: '',
    label: 'Speech',
    Icon: Cat_Speech,
  },
  {
    id: '',
    label: 'Sports',
    Icon: Cat_Sports,
  },
  {
    id: '',
    label: 'Swimming',
    Icon: Cat_Swimming,
  },
  {
    id: '',
    label: 'Travel',
    Icon: Cat_Travel,
  },
];
