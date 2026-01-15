import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Text, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useAppSelector, useAppDispatch } from "../hooks";
import { logout } from "../../features/teacherlogin/teacherloginSlice";

export default function TeacherLogout() {
  const router = useRouter();

  const isLoading = useAppSelector((state) => state.auth.loading);
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      const result = await dispatch(logout());
      await AsyncStorage.removeItem("role");
      if (result.meta.requestStatus === "fulfilled") {
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
