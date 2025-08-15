import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import StackNavigator from "./navigation/stackNavigator";
import { ModalPortal } from "react-native-modals";
import FlashMessage from "react-native-flash-message";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StackNavigator />
          <ModalPortal />
        <FlashMessage position="top" />
      </SafeAreaProvider>
    </Provider>
  );
}
