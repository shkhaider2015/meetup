import * as yup from 'yup';

export const userSchema = yup.object().shape({
  id: yup.string().required(),
  name: yup.string().required(),
  email: yup.string().email().required(),
  token: yup.string().required(),
  profileImage: yup.string().required(),
  isActivated: yup.boolean().required(),
  cometchat: yup.object().shape({
    authToken: yup.string().required(),
    id: yup.string().required(),
  }),
  activities: yup.array().of(yup.string().required()).required(),
  bio: yup.string()
});