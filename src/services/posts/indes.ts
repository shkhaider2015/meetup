import { END_POINTS } from '@/constants';
import { instance } from '../instance';
import { IPostForm } from '@/types/forms';
import _ from 'lodash';
import { convertAssetToFile } from '@/utils';

export const createPost = async (data: IPostForm) => {
  try {
    const anyData: any = data;
    const formdata = new FormData();

    Object.keys(anyData).forEach((key: string) => {
      const value = anyData[key];
      if (_.isEmpty(value) || !value) return;

      if (key == 'image') {
        formdata.append(key, convertAssetToFile(anyData[key]));
      } else if (key == 'location') {
        formdata.append('location[latitude]', anyData[key].latitude);
        formdata.append('location[longitude]', anyData[key].longitude);
      } else {
        formdata.append(key, anyData[key]);
      }
    });

    const response: any = await instance
      .post(END_POINTS.POST, {
        body: formdata,
      })
      .json();

    return response?.payload;
  } catch (error: any) {
    if (error?.response) {
      const errorData = await error.response.json();
      console.log('HTTP response:', errorData);
      throw new Error(errorData.message);
    } else {
      console.log('Error ', error);
      throw new Error(error?.message || 'An unknown error occurred');
    }
  }
};

export const getAllPost = async (queryParams: { userId: string }) => {
  try {
    const response: any = await instance
      .get(END_POINTS.POST, {
        searchParams: queryParams,
      })
      .json();

    return response?.payload;
  } catch (error: any) {
    if (error?.response) {
      const errorData = await error.response.json();
      console.log('HTTP response:', errorData);
      throw new Error(errorData.message);
    } else {
      console.log('Error ', error);
      throw new Error(error?.message || 'An unknown error occurred');
    }
  }
};

export const getAllPostByUser = async (userId: string) => {
  try {
    const response: any = await instance
      .get(`${END_POINTS.POST}/user/${userId}`)
      .json();

    return response?.payload;
  } catch (error: any) {
    if (error?.response) {
      const errorData = await error.response.json();
      console.log('HTTP response:', errorData);
      throw new Error(errorData.message);
    } else {
      console.log('Error ', error);
      throw new Error(error?.message || 'An unknown error occurred');
    }
  }
};

export const getPostById = async (data: { id: string; userId: string }) => {
  try {
    const response: any = await instance
      .get(`${END_POINTS.POST}/${data.id}`, {
        searchParams: {
          userId: data.userId,
        },
      })
      .json();

    return response?.payload;
  } catch (error: any) {
    if (error?.response) {
      const errorData = await error.response.json();
      console.log('HTTP response:', errorData);
      throw new Error(errorData.message);
    } else {
      console.log('Error ', error);
      throw new Error(error?.message || 'An unknown error occurred');
    }
  }
};

export const updatePost = async (
  postId: string,
  data: IPostForm,
  imageURL?: string,
) => {
  try {
    const anyData: any = data;
    const formdata = new FormData();

    Object.keys(anyData).forEach((key: string) => {
      const value = anyData[key];
      //   if (_.isEmpty(value) || !value) return;

      if (key == 'image') {
        // if user upload new image
        if (value) {
          formdata.append(key, convertAssetToFile(anyData[key]));
        }

        // case may user remove existing
        if (!value && !imageURL) formdata.append(key, null);
      } else if (key == 'location' && !_.isEmpty(value)) {
        formdata.append('location[latitude]', anyData[key].latitude);
        formdata.append('location[longitude]', anyData[key].longitude);
      } else {
        if (!_.isEmpty(value)) {
          formdata.append(key, anyData[key] || null);
        }
      }
    });

    const response: any = await instance
      .patch(`${END_POINTS.POST}/${postId}`, {
        body: formdata,
      })
      .json();

    return response?.payload;
  } catch (error: any) {
    if (error?.response) {
      const errorData = await error.response.json();
      console.log('HTTP response:', errorData);
      throw new Error(errorData.message);
    } else {
      console.log('Error ', error);
      throw new Error(error?.message || 'An unknown error occurred');
    }
  }
};

export const deletePost = async (postId: string, userId: string) => {
  try {
    const response = await instance
      .delete(`${END_POINTS.POST}/${postId}`, {
        json: {
          userId,
        },
      })
      .json();

    return response;
  } catch (error: any) {
    if (error?.response) {
      const errorData = await error.response.json();
      console.log('HTTP response:', errorData);
      throw new Error(errorData.message);
    } else {
      console.log('Error ', error);
      throw new Error(error?.message || 'An unknown error occurred');
    }
  }
};

export const likeOrDislikePost = async (data: {
  userId: string;
  postId: string;
  isLike: boolean;
}) => {
  try {
    console.log('Data in service ', data);
    const response: any = await instance
      .post(END_POINTS.LIKE_OR_DISLIKE, {
        json: data,
      })
      .json();

    if (!response?.payload) {
      throw response;
    }

    return await response?.payload;
  } catch (error: any) {
    if (error?.response) {
      const errorData = await error.response.json();
      console.log('HTTP response:', errorData);
      throw new Error(errorData.message);
    } else {
      console.log('Error ', error);
      throw new Error(error?.message || 'An unknown error occurred');
    }
  }
};
