import React from "react";
import { TextInput, Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Task() {
  return (
    <SafeAreaView>
      <TextInput label={"Title"} />
      <TextInput label={"Description"} />
      <Button>Create</Button>
    </SafeAreaView>
  );
}
