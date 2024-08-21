import { PermissionsAndroid } from "react-native";
import { request, PERMISSIONS, RESULTS } from "react-native-permissions";

export const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Geolocation Permission",
        message: "Can we access your location?",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      }
    );
    console.log("granted", granted);
    if (granted === "granted") {
      console.log("You can use Geolocation");
      return true;
    } else {
      console.log("You cannot use Geolocation");
      return false;
    }
  } catch (err) {
    return false;
  }
};

export const requestLocationPermissionIOS = async () => {
  try {
    const result = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

    if (result === RESULTS.GRANTED) {
      console.log("You can use Geolocation");
      return true;
    } else {
      console.log("You cannot use Geolocation");
      return false;
    }
  } catch (err) {
    console.error("Failed to request location permission", err);
    return false;
  }
};

export function getRegionForCoordinates(
  points: { latitude: number; longitude: number }[]
) {
  // points should be an array of { latitude: X, longitude: Y }
  let minX: number, maxX: number, minY: number, maxY: number;

  // init first point
  ((point) => {
    minX = point.latitude;
    maxX = point.latitude;
    minY = point.longitude;
    maxY = point.longitude;
  })(points[0]);

  // calculate rect
  points.map((point) => {
    minX = Math.min(minX, point.latitude);
    maxX = Math.max(maxX, point.latitude);
    minY = Math.min(minY, point.longitude);
    maxY = Math.max(maxY, point.longitude);
  });

  const midX = (minX + maxX) / 2;
  const midY = (minY + maxY) / 2;
  const deltaX = maxX - minX;
  const deltaY = maxY - minY;

  return {
    latitude: midX,
    longitude: midY,
    latitudeDelta: deltaX,
    longitudeDelta: deltaY,
  };
}

export const convertImageURLforngRok = (url: string) => {
  const baseUrl = process.env.DEV_API_URL || "";

  // Replace the hardcoded base URL with the environment variable
  const convertedUrl = url.replace("http://localhost:3000/", baseUrl);

  return convertedUrl;
};