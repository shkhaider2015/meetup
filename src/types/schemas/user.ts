import { z } from 'zod';
import * as yup from "yup";

export const userSchema = z.object({
	name: z.string(),
});

export const userLoginSchema = yup.object().shape({
	email: yup.string().email('Invalid email address').required('Email is required'),
	password: yup.string().min(6, 'Password must be at least 6 characters long').required('Password is required'),
  });