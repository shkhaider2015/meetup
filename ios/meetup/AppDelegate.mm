#import "AppDelegate.h"
#import <Firebase.h>


#import <React/RCTBundleURLProvider.h>

#import <GoogleMaps/GoogleMaps.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [FIRApp configure];
  [GMSServices provideAPIKey:@"AIzaSyDo0GR9qo2eeNWbxSS9e935vGURoBuqO5M"]; // add this line using the api key obtained from Google Console
  self.moduleName = @"meetup";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};

  BOOL ret = [super application:application didFinishLaunchingWithOptions:launchOptions];
  if (ret == YES)
  { 
    [RNSplashScreen show];
  }
  return ret;

  // return [super application:application didFinishLaunchingWithOptions:launchOptions]; // This line was remove when added react native splash screen
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self bundleURL];
}

- (NSURL *)bundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
