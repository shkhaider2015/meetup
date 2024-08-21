import { ISignupForm, IUserLoginForm } from "@/types/forms";
import { userSchema } from "@/types/schemas/user";
import * as yup from "yup";
import { instance } from "../instance";
import { END_POINTS } from "@/constants";

export const login = async (data: IUserLoginForm) => {
  try {
    const response:any = await instance
      .post(END_POINTS.LOGIN, {
        json: data,
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
