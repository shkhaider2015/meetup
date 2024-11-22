import { END_POINTS } from '@/constants';
import { instance } from '../instance';

export const getNotifications = async (userId: string) => {
  try {
    const response: any = await instance
      .get(`${END_POINTS.NOTIFICATION}/${userId}`)
      .json();

    const notificationspayload = response?.payload ;
    // console.log('notifications ', notificationspayload);

    return notificationspayload;
  } catch (error: any) {
    if (error?.response) {
      const errorData = await error.response.json();
      throw new Error(errorData.message || 'Something went wrong');
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};
