import { Svg, Path, Circle } from "react-native-svg";



const ExploreIcon = (props: ITabIcon) => {
  const {darkColor='#222222', lightColor='#7E869E', size=24} = props;

  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <Circle cx="12" cy="12" r="9" fill={lightColor} fill-opacity="0.25" />
      <Path
        d="M9.83107 7.84286C10.6807 8.30117 12.928 9.60727 13.7321 11C14.5361 12.3927 14.5436 14.9919 14.5157 15.9569C14.5106 16.1352 14.3259 16.2418 14.1689 16.1571C13.3193 15.6988 11.072 14.3927 10.268 13C9.46387 11.6073 9.45637 9.00806 9.48429 8.04308C9.48945 7.86476 9.67406 7.75817 9.83107 7.84286Z"
        fill={darkColor}
      />
    </Svg>
  );
};

const ChatIcon = (props: ITabIcon) => {
    const {darkColor='#222222', lightColor='#7E869E', size=24} = props;
  
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" >
        <Path fill-rule="evenodd" clip-rule="evenodd" d="M19.3259 5.77772C20 6.78661 20 8.19108 20 11C20 13.8089 20 15.2134 19.3259 16.2223C19.034 16.659 18.659 17.034 18.2223 17.3259C17.3409 17.9148 16.1577 17.9892 14 17.9986V18L12.8944 20.2111C12.5259 20.9482 11.4741 20.9482 11.1056 20.2111L10 18V17.9986C7.8423 17.9892 6.65907 17.9148 5.77772 17.3259C5.34096 17.034 4.96596 16.659 4.67412 16.2223C4 15.2134 4 13.8089 4 11C4 8.19108 4 6.78661 4.67412 5.77772C4.96596 5.34096 5.34096 4.96596 5.77772 4.67412C6.78661 4 8.19108 4 11 4H13C15.8089 4 17.2134 4 18.2223 4.67412C18.659 4.96596 19.034 5.34096 19.3259 5.77772Z" fill={lightColor} fill-opacity="0.25"/>
        <Circle cx="16" cy="11" r="1" fill={darkColor}/>
        <Circle cx="12" cy="11" r="1" fill={darkColor}/>
        <Circle cx="8" cy="11" r="1" fill={darkColor}/>
        </Svg>
        
    );
  };

  const NotificationsIcon = (props: ITabIcon) => {
    const {darkColor='#222222', lightColor='#7E869E', size=24} = props;
  
    return (
        <Svg width={size} height={size} viewBox="0 0 23 23" fill="none" >
        <Path d="M5.74994 7.66663C5.74994 4.49099 8.3243 1.91663 11.4999 1.91663V1.91663C14.6756 1.91663 17.2499 4.49099 17.2499 7.66663V9.42129C17.2499 10.7815 17.6196 12.1161 18.3194 13.2824L18.8498 14.1663C19.1682 14.6971 19.3274 14.9625 19.3522 15.1772C19.4019 15.6087 19.1673 16.023 18.7717 16.2024C18.5749 16.2916 18.2654 16.2916 17.6465 16.2916H5.35348C4.73451 16.2916 4.42503 16.2916 4.22819 16.2024C3.83259 16.023 3.59804 15.6087 3.64774 15.1772C3.67247 14.9625 3.8317 14.6971 4.15015 14.1663L4.6805 13.2824C5.38029 12.1161 5.74994 10.7815 5.74994 9.42132V7.66663Z" fill={lightColor} fill-opacity="0.25"/>
        <Path d="M13.7459 17.25C13.8287 17.25 13.8966 17.3173 13.8886 17.3997C13.8441 17.8533 13.5991 18.2813 13.1942 18.6052C12.7448 18.9647 12.1355 19.1666 11.5 19.1666C10.8646 19.1666 10.2552 18.9647 9.80593 18.6052C9.40096 18.2813 9.15594 17.8533 9.11153 17.3997C9.10345 17.3173 9.17137 17.25 9.25421 17.25L11.5 17.25L13.7459 17.25Z" fill={darkColor}/>
        </Svg>
        
    );
  };

  const PostIcon = (props: ITabIcon) => {
    const {darkColor='#222222', lightColor='#7E869E', size=24} = props;
  
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" >
        <Circle cx="12" cy="12" r="9" fill={lightColor} fill-opacity="0.25"/>
        <Path d="M12 15L12 9" stroke={darkColor} stroke-width="1.2" stroke-linecap="square"/>
        <Path d="M15 12L9 12" stroke={darkColor} stroke-width="1.2" stroke-linecap="square"/>
        </Svg>
        
    );
  };

  const ProfileIcon = (props: ITabIcon) => {
    const {darkColor='#222222', lightColor='#7E869E', size=24} = props;
  
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" >
        <Circle cx="12" cy="8" r="4" fill={darkColor}/>
        <Path d="M5.33788 17.3206C5.99897 14.5269 8.77173 13 11.6426 13H12.3574C15.2283 13 18.001 14.5269 18.6621 17.3206C18.79 17.8611 18.8917 18.4268 18.9489 19.0016C19.0036 19.5512 18.5523 20 18 20H6C5.44772 20 4.99642 19.5512 5.0511 19.0016C5.1083 18.4268 5.20997 17.8611 5.33788 17.3206Z" fill={lightColor} fill-opacity="0.25"/>
        </Svg>
        
    );
  };

export interface ITabIcon {
  darkColor?: string;
  lightColor?: string;
  size?: number;
}

export {
    ExploreIcon,
    ChatIcon,
    PostIcon,
    ProfileIcon, 
    NotificationsIcon
}
