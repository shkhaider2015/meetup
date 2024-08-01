import "react-native-gesture-handler";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MMKV } from "react-native-mmkv";

import { ThemeProvider } from "@/theme";

import ApplicationNavigator from "./navigators/Application";
import "./translations";
import { Provider } from "react-redux";
import store from "./store";
import { StrictMode } from "react";

export const queryClient = new QueryClient();

export const storage = new MMKV();

function App() {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider storage={storage}>
          <Provider store={store}>
            <ApplicationNavigator />
          </Provider>
        </ThemeProvider>
      </QueryClientProvider>
    </StrictMode>
  );
}

export default App;
