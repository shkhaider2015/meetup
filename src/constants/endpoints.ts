export const _makeAPI_URL = (endPoint:string):string => {
    let URL = __DEV__ ? process.env.PROD_API_URL : process.env.DEV_API_URL
    URL = URL + endPoint;
    return URL
}

const APIEndPoints = {
    LOGIN: 'auth/login',
    SIGNUP: 'auth/signup'
}

export default APIEndPoints;