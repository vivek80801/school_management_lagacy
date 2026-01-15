import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text } from "react-native";
import { Button, TextInput, Divider } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import { serverURL } from "../../../constants";
import { Link } from "expo-router";

export default function Fees() {
  const [fee, setFee] = React.useState("");
  const [feeStructure, setFeeStructure] = React.useState<
    { id: number; class_name: string; class: number; fee: number }[]
  >([]);
  const [classForStudent, setClassForStudent] = React.useState("");
  const [classes, setClasses] = React.useState<
    { class_name: string; id: number }[]
  >([]);

  React.useEffect(() => {
    (async () => {
      try {
        const res = await fetch(serverURL + "/class/class.php");
        const data: {
          data: { class_name: string; id: number }[];
          msg: "ok";
        } = await res.json();
        if (data.msg === "ok") {
          setClasses([...data.data]);
        }
      } catch (e) {
        console.log(e);
      }
    })();

    (async () => {
      try {
        const res = await fetch(serverURL + "/fees/create_fee.php");
        const data: {
          data: {
            id: number;
            class_name: string;
            class: number;
            fee: number;
          }[];
          msg: "ok";
        } = await res.json();
        if (data.msg === "ok") {
          setFeeStructure([...data.data]);
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  const handleCreateFee = async () => {
    try {
      const res = await fetch(serverURL + "/fees/create_fee.php", {
        method: "POST",
        body: JSON.stringify({ fee, classForStudent }),
      });
      const data = await res.json();
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView>
      <Text>Create Fee for a particular class</Text>
      <View>
        <TextInput
          onChangeText={(Text) => setFee(Text)}
          value={fee}
          label={"Fee"}
        />

        <Picker
          selectedValue={classForStudent}
          onValueChange={(itemValue) => setClassForStudent(itemValue)}
          prompt="Select class"
          mode="dialog"
        >
          {classes.length > 0 &&
            classes.map((classs) => (
              <Picker.Item
                key={classs.id}
                label={classs.class_name}
                value={classs.id}
              />
            ))}
        </Picker>
        <Button
          onPress={() => handleCreateFee()}
          style={{ margin: 5 }}
          mode="contained"
        >
          Create Fee
        </Button>
      </View>
      <Text style={{ textAlign: "center", fontSize: 24 }}> Fee Structure</Text>
      {feeStructure.length > 0 ? (
        feeStructure.map((feeStru) => (
          <View
            style={{
              marginTop: 10,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            key={feeStru.id}
          >
            <Text>Class: {feeStru.class_name}</Text>
            <Text>Fee: {feeStru.fee}</Text>
            <Divider />
          </View>
        ))
      ) : (
        <Text>No Fee Structure found</Text>
      )}
      <Link style={{ textAlign: "center", color: "#0000ff", marginTop: 40 }} href={"/"}>
        <Text>Home</Text>
      </Link>
    </SafeAreaView>
  );
}
