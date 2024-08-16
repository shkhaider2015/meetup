import "react-native-gesture-handler";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MMKV } from "react-native-mmkv";

import { ThemeProvider } from "@/theme";

import ApplicationNavigator from "./navigators/Application";
import "./translations";
import { Provider } from "react-redux";
import store from "@/store";
import { StrictMode } from "react";
import storage from "./storage";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { GlobalBottomSheetProvider, LoaderProvider } from "./components/Global";
import Toast from "react-native-toast-message";

export const queryClient = new QueryClient();

function App() {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider storage={storage}>
          <GestureHandlerRootView>
            <GlobalBottomSheetProvider>
              <Provider store={store}>
                <LoaderProvider>
                  <ApplicationNavigator />
                  <Toast />
                </LoaderProvider>
              </Provider>
            </GlobalBottomSheetProvider>
          </GestureHandlerRootView>
        </ThemeProvider>
      </QueryClientProvider>
    </StrictMode>
  );
}

export default App;
