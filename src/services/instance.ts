import ky from 'ky';

const DEV_API_URL = process.env.DEV_API_URL || "";
const PROD_API_URL = process.env.PROD_API_URL || "";

const prefixUrl = __DEV__ ? DEV_API_URL : PROD_API_URL;

console.log("Prefix URL ", prefixUrl)
export const instance = ky.extend({
	prefixUrl: prefixUrl,
	headers: {
		Accept: 'application/json',
	},
});
