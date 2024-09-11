import { END_POINTS } from "@/constants";
import { instance } from "../instance";

export const getAllPost = async () => {
  try {
    const response:any = await instance.get(END_POINTS.POST).json()

    return response?.payload
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

export const getAllPostByUser = async () => {
  try {
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

export const getPostById = async () => {
  try {
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

export const updatePost = async () => {
  try {
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

export const deletePost = async () => {
  try {
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
