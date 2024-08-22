import * as yup from "yup";

export const userSchema = yup.object().shape({
  name: yup.string().required(),
  email : yup.string().email().required(),
  token: yup.string().required(),
  profile_image: yup.string().required()
})

export const userLoginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters long")
    .required("Password is required"),
});

export const userSignupSchema = yup.object().shape({
  full_name: yup
    .string()
    .min(3, "Full Name is too short")
    .max(50, "Full Name is too long")
    .required("Full Name is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters long")
    .required("Password is required"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm Password is reqiuired"),
  terms_and_condition: yup
    .boolean()
    .oneOf([true], "You must agree to the terms and conditions"),
});


