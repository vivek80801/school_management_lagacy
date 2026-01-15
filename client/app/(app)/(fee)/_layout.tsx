import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PaperProvider } from "react-native-paper";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer  } from "expo-router/drawer";

export default function FeeLayout() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  React.useEffect(() => {
    (async () => {
      const jwt = await AsyncStorage.getItem("jwt");
      if (jwt) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    })();
  }, []);
  return (
    <PaperProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Drawer>
          <Drawer.Screen
            name="fees"
            options={{
              drawerLabel: "Fee Structure",
              title: "Fee Structure",
              drawerItemStyle: { display: isLoggedIn ? "flex" : "none" },
            }}
          />
          <Drawer.Screen
            name="receiveFee"
            options={{
              drawerLabel: "Receive Fee",
              title: "Receive Fee",
              drawerItemStyle: { display: isLoggedIn ? "flex" : "none" },
            }}
          />
          <Drawer.Screen
            name="dueFee"
            options={{
              drawerLabel: "Due Fee",
              title: "Due Fee",
              drawerItemStyle: { display: isLoggedIn ? "flex" : "none" },
            }}
          />
        </Drawer>
      </GestureHandlerRootView>
    </PaperProvider>
  );
}
