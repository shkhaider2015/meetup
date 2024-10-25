import { END_POINTS } from '@/constants';
import { instance } from '../instance';
import _ from 'lodash';
import { EMessageRequestStatus } from '@/types/reducer';

export const sendMessageRequest = async (reqData: { sender: string; receiver: string }) => {
  try {
    const response: any = await instance
      .post(END_POINTS.MESSAGE_REQUEST, {
        json: reqData,
      })
      .json();

    return response?.payload;
  } catch (error: any) {
    if (error?.response) {
      const errorData = await error.response.json();
      throw new Error(errorData.message || 'Something went wrong');
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};

export const updateMessageRequestStatus = async (reqData: {
    status: EMessageRequestStatus,
    id: string
}) => {
  try {
    const response: any = await instance
      .patch(`${END_POINTS.MESSAGE_REQUEST}/${reqData.id}`, {
        json: {
            status: reqData.status
        },
      })
      .json();

    return response?.payload;
  } catch (error: any) {
    if (error?.response) {
      const errorData = await error.response.json();
      throw new Error(errorData.message || 'Something went wrong');
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};

export const getMessageRequestSender = async (userId: string) => {
  try {
    const response: any = await instance
      .get(`${END_POINTS.MESSAGE_REQUEST_SENDER}/${userId}`)
      .json();

    return response?.payload;
  } catch (error: any) {
    
    if (error?.response) {
      const errorData = await error.response.json();
      throw new Error(errorData.message || 'Something went wrong');
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};

export const getMessageRequestReceiver = async (userId: string) => {
  try {
    const response: any = await instance
      .get(`${END_POINTS.MESSAGE_REQUEST_RECEIVER}/${userId}`)
      .json();
      
    return response?.payload;
  } catch (error: any) {
    if (error?.response) {
      const errorData = await error.response.json();
      throw new Error(errorData.message || 'Something went wrong');
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};
