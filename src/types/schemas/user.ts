import * as yup from 'yup';

export const userSchema = yup.object().shape({
  id: yup.string().required(),
  name: yup.string().required(),
  email: yup.string().email().required(),
  token: yup.string().required(),
  profile_image: yup.string().required(),
  isActivated: yup.boolean().required(),
  cometchat: yup.object().shape({
    authToken: yup.string().required(),
    id: yup.string().required(),
  }),
});

export const userLoginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .required('Password is required'),
});

export const userSignupSchema = yup.object().shape({
  full_name: yup
    .string()
    .min(3, 'Full Name is too short')
    .max(50, 'Full Name is too long')
    .required('Full Name is required'),
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .required('Password is required'),
  confirm_password: yup
    .string()
    .oneOf([yup.ref('password'), undefined], 'Passwords must match')
    .required('Confirm Password is reqiuired'),
  terms_and_condition: yup
    .boolean()
    .oneOf([true], 'You must agree to the terms and conditions'),
});

export const forgetPasswordSchema = yup.object().shape({
  email: yup.string().email('Email is not valid').required('Email is required'),
});

export const forgetPasswordChangeSchema = yup.object().shape({
  newPassword: yup
    .string()
    .min(8, 'New Password must be at least 8 characters long')
    .required('New Password is required'),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref('newPassword'), undefined], 'Passwords must match')
    .required('Confirm New Password is reqiuired'),
});

export const editProfileSchema = yup.object().shape({
  name: yup
    .string()
    .min(5, 'Name is too small')
    .max(50, 'Name is too large')
    .required('Display name is required'),
  bio: yup.string(),
  interests: yup.string()

});

export const ChangePasswordSchema = yup.object().shape({
  currentPassword: yup.string().required("Current Password is required"),
  newPassword: yup
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .max(50, "Password should not be greater than 50 characters")
    .notOneOf([yup.ref('currentPassword')], 'New Password must be different from the current password')
    .required('New Password is required'),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref('newPassword'), undefined], 'Passwords must match')
    .required('Confirm Password is reqiuired'),
})