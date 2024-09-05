import {
  IChangePassword,
  IEditProfileForm,
  IForgetPassword,
  ISignupForm,
  IUserLoginForm,
} from '@/types/forms';
import { userSchema } from '@/types/schemas/user';
import * as yup from 'yup';
import { instance } from '../instance';
import { END_POINTS } from '@/constants';
import { CometChat } from '@cometchat/chat-sdk-react-native';
import _ from 'lodash';
import { convertAssetToFile } from '@/utils';

export const login = async (data: IUserLoginForm) => {
  try {
    const response: any = await instance
      .post(END_POINTS.LOGIN, {
        json: data,
      })
      .json();

    await CometChat.login(response?.payload?.cometchat?.authToken);

    return response?.payload;
  } catch (error: any) {
    if (error instanceof yup.ValidationError) {
      console.log('Validation failed:', error.errors);
      throw error;
    } else if (error?.response) {
      const errorData = await error.response.json();
      console.log('HTTP Error:', errorData);
      throw new Error(errorData.message || 'Something went wrong');
    } else {
      console.log('Error ', error);

      throw new Error(error?.message || 'An unknown error occurred');
    }
  }
};

export const signup = async (data: ISignupForm) => {
  try {
    const response = await instance
      .post(END_POINTS.SIGNUP, {
        json: {
          email: data.email,
          name: data.full_name,
          password: data.password,
          confirmPassword: data.confirm_password,
        },
      })
      .json();

    return response;
  } catch (error: any) {
    if (error instanceof yup.ValidationError) {
      console.error('Validation failed:', error.errors);
      throw error;
    } else if (error?.response) {
      const errorData = await error.response.json();
      console.error('HTTP Error:', errorData);
      throw new Error(errorData.message || 'Something went wrong');
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};

export const accountVarification = async (id: string, code: string) => {
  try {
    const response = await instance.post(END_POINTS.ACCOUNT_ACTIVATION, {
      json: {
        id,
        code,
      },
    });

    return response;
  } catch (error: any) {
    if (error instanceof yup.ValidationError) {
      console.log('Validation failed:', error.errors);
      throw error;
    } else if (error?.response) {
      const errorData = await error.response.json();
      console.log('HTTP Error:', errorData);
      throw new Error(errorData.message || 'Something went wrong');
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};

export const resendCode = async (
  id: string,
  type: 'FORGET_PASSWORD' | 'ACTIVATE_ACCOUNT',
) => {
  try {
    const response = await instance
      .post(END_POINTS.RESEND_ACTIVATION_CODE, {
        json: {
          user_id: id,
          type,
        },
      })
      .json();

    return response;
  } catch (error: any) {
    if (error instanceof yup.ValidationError) {
      console.log('Validation failed:', error.errors);
      throw error;
    } else if (error?.response) {
      const errorData = await error.response.json();
      console.log('HTTP Error:', errorData);
      throw new Error(errorData.message || 'Something went wrong');
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};

export const loadUser = async (accessToken: string) => {
  try {
    const response: any = await instance
      .post(END_POINTS.LOAD_USER, {
        json: {
          accessToken,
        },
      })
      .json();

    return response?.payload;
  } catch (error: any) {
    if (error instanceof yup.ValidationError) {
      console.log('Validation failed:', error.errors);
      throw error;
    } else if (error?.response) {
      const errorData = await error.response.json();
      console.log('HTTP Error:', errorData);
      throw new Error(errorData.message || 'Something went wrong');
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};

export const forgetPasswordApply = async (email: string) => {
  try {
    const response: any = await instance
      .post(END_POINTS.FORGET_PASSWORD_APPLY, {
        json: {
          email,
        },
      })
      .json();

    return response;
  } catch (error: any) {
    if (error instanceof yup.ValidationError) {
      // console.log('Validation failed:', error.errors);
      throw error;
    } else if (error?.response) {
      const errorData = await error.response.json();
      // console.log('HTTP Error:', errorData);
      throw new Error(errorData.message || 'Something went wrong');
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};
export const forgetPasswordOTP = async (user_id: string, otp: string) => {
  try {
    const response: any = await instance
      .post(END_POINTS.FORGET_PASSWORD_VERIFICATION, {
        json: {
          userId: user_id,
          otp,
        },
      })
      .json();

    return response;
  } catch (error: any) {
    if (error instanceof yup.ValidationError) {
      // console.log('Validation failed:', error.errors);
      throw error;
    } else if (error?.response) {
      const errorData = await error.response.json();
      // console.log('HTTP Error:', errorData);
      throw new Error(errorData.message || 'Something went wrong');
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};
export const forgetPassword = async (userId: string, data: IForgetPassword) => {
  try {
    const response: any = await instance
      .post(END_POINTS.FORGET_PASSWORD, {
        json: {
          userId,
          password: data.newPassword,
          confirmPassword: data.confirmNewPassword,
        },
      })
      .json();

    return response;
  } catch (error: any) {
    if (error instanceof yup.ValidationError) {
      throw error;
    } else if (error?.response) {
      const errorData = await error.response.json();
      throw new Error(errorData.message || 'Something went wrong');
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};

export const logout = async () => {
  try {
    await CometChat.logout();
    await instance.get(END_POINTS.LOGOUT);
  } catch (error: any) {
    console.error('Logout:', error?.message || error);
  }
};

export const changePassword = async (userId: string, data: IChangePassword) => {
  try {
    const response: any = await instance
      .post(END_POINTS.CHANGE_PASSWORD, {
        json: {
          userId,
          ...data,
        },
      })
      .json();

    return response;
  } catch (error: any) {
    if (error instanceof yup.ValidationError) {
      throw error;
    } else if (error?.response) {
      const errorData = await error.response.json();
      throw new Error(errorData.message || 'Something went wrong');
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};

export const updateProfile = async (userId: string, data: any) => {
  try {
    let isFilePresent = false;
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      if (!_.isEmpty(data[key])) {
        if (key == 'profileImage') {
          formData.append(key, convertAssetToFile(data.profileImage));
        } else if (key == 'activitiesToAdd') {
          data[key]?.forEach((item:string) => {
            formData.append('activitiesToAdd[]', item)
          })
        } else if (key == 'activitiesToDelete') {
          data[key]?.forEach((item:string) => {
            formData.append('activitiesToDelete[]', item)
          })
        } else {
          formData.append(key, data[key]);
        }
      }
    });


    const response: any = await instance
      .post(`${END_POINTS.UPDATE_PROFILE}/${userId}`, {
        body: formData,
      })
      .json();

    console.log('responnse  -----: ', response);

    return response?.payload;
  } catch (error: any) {
    if (error instanceof yup.ValidationError) {
      throw error;
    } else if (error?.response) {
      const errorData = await error.response.json();
      console.log('Error update ', errorData?.message);

      throw new Error(errorData.message || 'Something went wrong');
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};
