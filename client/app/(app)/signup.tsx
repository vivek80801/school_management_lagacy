import React from "react";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, TextInput } from "react-native-paper";
import { Text, View, StyleSheet } from "react-native";
import { useAppSelector, useAppDispatch } from "../hooks";
import { signup } from "../../features/auth/authSlice";
import { i18n } from "./index";

export default function SignUp() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [signUpErr, setSignUpErr] = React.useState<string[]>([]);

  const isLoading = useAppSelector((state) => state.auth.loading);
  const dispatch = useAppDispatch();

  const router = useRouter();

  const handleSignUP = async () => {
    try {
      const result = await dispatch(
        signup({ username: name, email, password })
      );
      const err = result.payload;
      if (result.meta.requestStatus === "rejected") {
        setSignUpErr([...err]);
      } else {
        setName("");
        setEmail("");
        setPassword("");
        router.push("login");
      }
    } catch (e) {
      console.log("signup err: ", e);
    }
  };

  return (
    <SafeAreaView>
      {signUpErr.length > 0 &&
        signUpErr.map((err, idx) => (
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
        label={i18n.t("email")}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        label={i18n.t("password")}
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <Button
        style={{ margin: 5 }}
        mode="contained"
        onPress={handleSignUP}
        disabled={isLoading}
      >
        {isLoading ? "Loading" : i18n.t("signup")}
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
