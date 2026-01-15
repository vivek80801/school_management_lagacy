import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text } from "react-native";
import { Link } from "expo-router";
import { useAppSelector } from "../hooks";
import { i18n } from "./index";

export default function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const user = useAppSelector((state) => state.auth.user);
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
    <SafeAreaView>
      {isLoggedIn ? (
        <View>
          <Text style={{ fontSize: 26 }}>
            {i18n.t("welcome_user")}, {user.name}
          </Text>
          <Text>
            {i18n.t("email")}: {user.email}
          </Text>
          <View style={{ height: 20 }}></View>
          <Text>{i18n.t("app_help")}</Text>
        </View>
      ) : (
        <View>
          <Text>
            Please, Logged in first <Link href={"login"}>Login</Link>
          </Text>
        </View>
      )}
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
