import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { TextInput, Button } from "react-native-paper";
import { View } from "react-native";
import { useAppDispatch, useAppSelector } from "../hooks";
import { login } from "../../features/teacherlogin/teacherloginSlice";
import { i18n } from "./index";

export default function TeacherLogin() {
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");

  const router = useRouter();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.teacherlogin.loading);

  const handleTeacherLogin = async () => {
    try {
      const result = await dispatch(login({ name, password }));
      const err = result.payload;
      if (result.meta.requestStatus === "rejected") {
        console.log("Error: ", err);
      }
      setName("");
      setPassword("");
      if (result.meta.requestStatus === "fulfilled") {
        router.push("teacherDashboard");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView>
      <View>
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
          onPress={handleTeacherLogin}
          style={{ margin: 5 }}
          mode="contained"
          disabled={isLoading ? true : false}
        >
          {isLoading ? i18n.t("loading") : i18n.t("login")}
        </Button>
      </View>
    </SafeAreaView>
  );
}
