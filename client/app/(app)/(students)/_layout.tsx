import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PaperProvider } from "react-native-paper";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer} from "expo-router/drawer";

export default function Layout() {
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
            name="register"
            options={{
              drawerLabel: "Admition",
              title: "Register students",
              drawerItemStyle: { display: isLoggedIn ? "flex" : "none" },
            }}
          />
          <Drawer.Screen
            name="students"
            options={{
              drawerLabel: "Students",
              title: "Students",
              drawerItemStyle: { display: isLoggedIn ? "flex" : "none" },
            }}
          />
        </Drawer>
      </GestureHandlerRootView>
    </PaperProvider>
  );
}
