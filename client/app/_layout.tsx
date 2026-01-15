import React from "react";
import { PaperProvider } from "react-native-paper";
import { Provider } from "react-redux";
import { Slot } from "expo-router";
import { store } from "./store";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <Slot />
      </PaperProvider>
    </Provider>
  );
}
