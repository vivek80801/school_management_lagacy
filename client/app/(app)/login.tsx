import React from "react";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, StyleSheet } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useAppSelector, useAppDispatch } from "../hooks";
import { login } from "../../features/auth/authSlice";
import { i18n } from "./index";

export default function LogIn() {
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loginErr, setLoginErr] = React.useState<string[]>([]);

  const isLoading = useAppSelector((state) => state.auth.loading);
  const dispatch = useAppDispatch();

  const router = useRouter();

  const handleLogin = async () => {
    try {
      const result = await dispatch(login({ name, password }));
      const err = result.payload;
      if (result.meta.requestStatus === "rejected") {
        setLoginErr([...err]);
      } else {
        setName("");
        setPassword("");
        router.push("dashboard");
      }
    } catch (e) {
      console.log("login err: ", e);
    }
  };

  return (
    <SafeAreaView>
      {loginErr.length > 0 &&
        loginErr.map((err, idx) => (
          <View key={idx} style={styles.alert}>
            <Text>{err}</Text>
          </View>
        ))}
      <TextInput
        label={i18n.t("name")}
        value={name}
        onChangeText={(text) => setName(text)}
      />

      <TextInput
        label={i18n.t("password")}
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <Button
        disabled={isLoading}
        style={{ margin: 5 }}
        mode="contained"
        onPress={handleLogin}
      >
        {isLoading ? i18n.t("loading") : i18n.t("login")}
      </Button>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  alert: {
    textAlign: "center",
    color: "#ff0000",
    backgroundColor: "#e4b0b0",
    padding: 10,
    margin: 10,
  },
});
