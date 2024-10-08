import { activityData } from "@/constants/activities";
import store from "@/store";
import { Dimensions, PermissionsAndroid, Platform } from "react-native";
import { Asset } from "react-native-image-picker";
import { request, PERMISSIONS, RESULTS, check } from "react-native-permissions";

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

export const requestLocationPermissionCross = async () => {
  const status = await check(
    Platform.OS === 'ios'
      ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
      : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
  );

  if (status === RESULTS.DENIED) {
    const result = await request(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
    );

    if (result === RESULTS.GRANTED) {
      console.log('Location permission granted');
      return true
    } else if (result === RESULTS.DENIED) {
      console.log('Location permission denied');
      return false
    } else if (result === RESULTS.BLOCKED) {
      console.log('Location permission blocked');
      return false
    }
  } else if (status === RESULTS.GRANTED) {
    console.log('Location permission already granted');
    return true
  } else if (status === RESULTS.BLOCKED) {
    console.log('Location permission blocked');
    return false
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
  let deltaX = maxX - minX;
  let deltaY = maxY - minY;

  if(deltaX === 0) deltaX = 0.2
  if(deltaY === 0) deltaY = 0.2

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
  const convertedUrl = url.replace("http://localhost:3010/", baseUrl);

  return convertedUrl;
};


export const getToken = () => {
  const state = store.getState();
  return state.user.token; 
}

export const getIconByID = (id:string) => {
  const icon = activityData.find(item => item.id === id)?.Icon ;

  return icon
}

export const convertAssetToFile = (asset:Asset|undefined) => {
  if(!asset) return
  return {
    uri: asset.uri,
    name: asset.fileName || `file-${Date.now()}.jpg`,
    type: asset.type,
  };
};

export const widthInPercentage = (percentage: number) => {
  const width = Dimensions.get('screen').width;
  return (width * percentage) / 100;
};

export const heightInPercentage = (percentage: number) => {
  const height = Dimensions.get('screen').height;
  return (height * percentage) / 100;
};