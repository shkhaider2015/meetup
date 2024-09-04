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
    id: 'aa39b6c2-6d20-41dd-a805-8ee8a353ca05',
    label: 'Charity',
    Icon: Cat_Charity,
  },
  {
    id: 'c56f2417-b172-467a-84aa-e6c0da664612',
    label: 'Cookig',
    Icon: Cat_Cooking,
  },
  {
    id: '439b0f8e-6205-493f-bdd4-bf8b05b0e383',
    label: 'Driking',
    Icon: Cat_Drinking,
  },
  {
    id: '976318f2-79fd-4e5a-8996-50f045a7cbea',
    label: 'Fashion',
    Icon: Cat_Fashioon,
  },
  {
    id: 'cc377cba-160b-41b1-aa64-c2cb9b26d410',
    label: 'Fitness',
    Icon: Cat_Fitness,
  },
  {
    id: 'd4d73ba1-134f-4509-82aa-13c2698f5769',
    label: 'Gaming',
    Icon: Cat_Gaming,
  },
  {
    id: '0c907b40-b148-437a-ae52-e85c390db318',
    label: 'Climbing',
    Icon: Cat_Mountain_Climb,
  },
  {
    id: '275c09cd-696a-4c3b-87f4-8e7071474cfa',
    label: 'Music',
    Icon: Cat_Music,
  },
  {
    id: '37239347-c9b0-48ea-8dce-5d0a8bb5d30d',
    label: 'Others',
    Icon: Cat_Others,
  },
  {
    id: '90d7a781-0a1d-4abe-86cb-4fafb4717473',
    label: 'Painting',
    Icon: Cat_Painting,
  },
  {
    id: '8c6f70c7-3efc-4770-aacf-a9b383969803',
    label: 'Pets',
    Icon: Cat_PawPrint,
  },
  {
    id: '716f6427-2764-46fc-bf9e-b8e067bedd18',
    label: 'Photography',
    Icon: Cat_Photography,
  },
  {
    id: '95f8049a-0722-478c-924e-4c2265115fad',
    label: 'Reading',
    Icon: Cat_Reading,
  },
  {
    id: '1eaf4626-82c0-40d9-835b-7433a01c0d2b',
    label: 'Running',
    Icon: Cat_Running_Right,
  },
  {
    id: '635d2f70-dc52-46d3-a1a8-6f4691870a99',
    label: 'Shopping',
    Icon: Cat_Charity,
  },
  {
    id: '4d6fe6c9-70ad-4216-8262-193c0e46c569',
    label: 'Sketboardig',
    Icon: Cat_Skateboarding,
  },
  {
    id: '986e9f06-6ee2-4208-8aea-7b1f19223db1',
    label: 'Speech',
    Icon: Cat_Speech,
  },
  {
    id: '7b0baa60-ca05-4182-8e10-0fa6c5448ace',
    label: 'Sports',
    Icon: Cat_Sports,
  },
  {
    id: '324c37c3-588b-4a90-b1b9-e341cf949cd9',
    label: 'Swimming',
    Icon: Cat_Swimming,
  },
  {
    id: '1f0c959c-6ccd-41b0-8526-077a8939113b',
    label: 'Travel',
    Icon: Cat_Travel,
  },
];
