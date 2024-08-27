import { ISignupForm, IUserLoginForm } from "@/types/forms";
import { userSchema } from "@/types/schemas/user";
import * as yup from "yup";
import { instance } from "../instance";
import { END_POINTS } from "@/constants";
import { CometChat } from "@cometchat/chat-sdk-react-native";

export const login = async (data: IUserLoginForm) => {
  try {
    const response: any = await instance
      .post(END_POINTS.LOGIN, {
        json: data,
      })
      .json();

    await CometChat.login(response?.payload?.cometchat?.authToken);

    return userSchema.validate(response?.payload);
  } catch (error: any) {
    if (error instanceof yup.ValidationError) {
      console.log("Validation failed:", error.errors);
      throw error;
    } else if (error?.response) {
      const errorData = await error.response.json();
      console.log("HTTP Error:", errorData);
      throw new Error(errorData.message || "Something went wrong");
    } else {
      throw new Error(error?.message || "An unknown error occurred");
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
      console.error("Validation failed:", error.errors);
      throw error;
    } else if (error?.response) {
      const errorData = await error.response.json();
      console.error("HTTP Error:", errorData);
      throw new Error(errorData.message || "Something went wrong");
    } else {
      throw new Error("An unknown error occurred");
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
      console.log("Validation failed:", error.errors);
      throw error;
    } else if (error?.response) {
      const errorData = await error.response.json();
      console.log("HTTP Error:", errorData);
      throw new Error(errorData.message || "Something went wrong");
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};

export const resendAccountVarification = async (id: string) => {
  try {
    const response = await instance.get(END_POINTS.RESEND_ACTIVATION_CODE, {
      searchParams: {
        id,
      },
    });

    return response;
  } catch (error: any) {
    if (error instanceof yup.ValidationError) {
      console.log("Validation failed:", error.errors);
      throw error;
    } else if (error?.response) {
      const errorData = await error.response.json();
      console.log("HTTP Error:", errorData);
      throw new Error(errorData.message || "Something went wrong");
    } else {
      throw new Error("An unknown error occurred");
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

    return userSchema.validate(response?.payload);
  } catch (error: any) {
    if (error instanceof yup.ValidationError) {
      console.log("Validation failed:", error.errors);
      throw error;
    } else if (error?.response) {
      const errorData = await error.response.json();
      console.log("HTTP Error:", errorData);
      throw new Error(errorData.message || "Something went wrong");
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};

export const logout = async () => {
  try {
    await CometChat.logout()
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("");
      }, 2000);
    });
  } catch (error: any) {
    if (error instanceof yup.ValidationError) {
      console.error("Validation failed:", error.errors);
    } else {
      console.error("Failed to fetch user:", error);
    }
  }
};
