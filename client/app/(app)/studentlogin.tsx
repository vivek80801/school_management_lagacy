import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput, Button } from "react-native-paper";
import { useRouter } from "expo-router";
import { View } from "react-native";
import { useAppDispatch, useAppSelector } from "../hooks";
import { studentLogin } from "../../features/studentlogin/studentloginSlice";

export default function StudentLogin() {
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");

  const router = useRouter();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.studentlogin.loading);

  const handleStudentLogin = async () => {
    try {
      const result = await dispatch(studentLogin({ name, password }));

      if (result.meta.requestStatus === "fulfilled") {
        router.navigate("/(app)/(students)/studentDashboard");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView>
      <View>
        <TextInput
          label={"Name"}
          value={name}
          onChangeText={(Text) => setName(Text)}
        />
        <TextInput
          label={"Password"}
          value={password}
          onChangeText={(Text) => setPassword(Text)}
          secureTextEntry
        />
        <Button
          onPress={() => handleStudentLogin()}
          mode="contained"
          style={{ margin: 5 }}
          disabled={isLoading}
        >
          {isLoading ? "loading.." : "Log In"}
        </Button>
      </View>
    </SafeAreaView>
  );
}
