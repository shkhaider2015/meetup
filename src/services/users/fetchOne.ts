import { instance } from "@/services/instance";
import { userSchema } from "@/types/schemas/user";
import { END_POINTS } from "@/constants";
import { IUserLoginForm } from "@/types/templates/user";
import * as yup from "yup";

export default async (id: number) => {
  const response = await instance.get(`users/${id}`).json();
  return userSchema.validate(response);
};

export const login = async (data: IUserLoginForm) => {
  try {
    // const response = await instance
    //   .post(END_POINTS.LOGIN, {
    //     json: data,
    //   })
    //   .json();
	let fakeResponse = {
		...data,
		full_name: 'Shakeel',
		isLoggedIn: true
	}

	await new Promise((resolve, reject) => {
		setTimeout(() => {
			userSchema.validate(fakeResponse);
			resolve("")
		}, 2000)
	})

  } catch (error: any) {
    if (error instanceof yup.ValidationError) {
      console.error("Validation failed:", error.errors);
    } else {
      console.error("Failed to fetch user:", error);
    }
  }
};

export const logout = async () => {
  try {

	await new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve("")
		}, 2000)
	})

  } catch (error: any) {
    if (error instanceof yup.ValidationError) {
      console.error("Validation failed:", error.errors);
    } else {
      console.error("Failed to fetch user:", error);
    }
  }
}

