import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Button, Text } from "react-native";
import { useAppSelector, useAppDispatch } from "../hooks";
import { logout } from "../../features/auth/authSlice";

export default function LogOut() {
  const router = useRouter();

  const isLoading = useAppSelector((state) => state.auth.loading);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    handleLogout();
  }, []);

  const handleLogout = async () => {
    try {
      const result = await dispatch(logout());
      console.log(isLoading);
      if (result.meta.requestStatus === "fulfilled") {
        console.log("logout fullfiled");
        router.push("login");
      } else {
        console.log("result: ", result);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView>
      {isLoading ? (
        <Text>Logging Out......</Text>
      ) : (
        <Button onPress={() => handleLogout()} title="log out" />
      )}
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
