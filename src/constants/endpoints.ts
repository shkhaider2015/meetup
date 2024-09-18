export const _makeAPI_URL = (endPoint: string): string => {
  let URL = __DEV__ ? process.env.PROD_API_URL : process.env.DEV_API_URL;
  URL = URL + endPoint;
  return URL;
};

const APIEndPoints = {
  // User
  LOGIN: 'auth/login',
  SIGNUP: 'auth/signup',
  LOGOUT: 'auth/logout',
  ACCOUNT_ACTIVATION: 'auth/activate-user',
  RESEND_ACTIVATION_CODE: 'auth/resent-activation-code',
  LOAD_USER: 'auth/verify-user-token',
  CATEGORIES: 'categories/all',
  FORGET_PASSWORD_APPLY: 'auth/check-email',
  FORGET_PASSWORD_VERIFICATION: 'auth/verify-otp',
  FORGET_PASSWORD: 'auth/reset-password',
  CHANGE_PASSWORD: 'user/change-password',
  UPDATE_PROFILE: 'user/update-profile',
  USER: 'USER',

  // Posts
  POST: 'post',
  ALL_POST_BY_USER: 'post/user',
};

export default APIEndPoints;
