import React from "react";
import { View, Text } from "react-native";
import { TextInput, Button, Divider } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { serverURL } from "../../../constants";
import { Link } from "expo-router";

export default function RecevieFee() {
  const [name, setName] = React.useState("");
  const [amountPlaceHolder, setAmountPlaceHolder] = React.useState("");
  const [amount, setAmount] = React.useState<number>();
  const [chooseId, setChooseId] = React.useState<number>();
  const [totalRevenueForToday, setTotalRevenueForToday] =
    React.useState<number>();
  const [students, setStudents] = React.useState<
    {
      class: number;
      section: number;
      class_name: string;
      father_name: string;
      father_work: string;
      id: number;
      mother_name: string;
      mother_work: string;
      name: string;
      roll_no: number;
      section_name: string;
    }[]
  >([]);

  React.useEffect(() => {
    getTotalReveue();
  }, []);

  const handleFeeRecevie = async () => {
    try {
      const res = await fetch(serverURL + "/fees/receive_fee.php", {
        method: "POST",
        body: JSON.stringify({ id: chooseId, amount }),
      });
      const data = await res.json();
      console.log(data);
      if (data.msg === "ok") {
        setChooseId(0);
        setStudents([]);
        setAmountPlaceHolder("");
        setName("");
      }
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  const getTotalReveue = async () => {
    try {
      const res = await fetch(serverURL + "/fees/receive_fee.php");
      const data: {
        msg: string;
        total_revenue: number;
      } = await res.json();
      if (data.msg === "ok") {
        setTotalRevenueForToday(data.total_revenue);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getStudents = async () => {
    try {
      const res = await fetch(serverURL + "/students/search.php", {
        method: "POST",
        body: JSON.stringify({ name }),
      });
      const data: {
        msg: "ok";
        data: {
          class: number;
          section: number;
          class_name: string;
          father_name: string;
          father_work: string;
          id: number;
          mother_name: string;
          mother_work: string;
          name: string;
          roll_no: number;
          section_name: string;
        }[];
      } = await res.json();
      if (data.msg === "ok") {
        setStudents([...data.data]);
      } else {
        setStudents([]);
      }
    } catch (e) {
      console.log("Error: ", e);
    }
  };

  return (
    <SafeAreaView>
      <View>
        <TextInput
          label={"Enter Student Name to search"}
          onChangeText={(Text) => setName(Text)}
        />
        <Button
          onPress={() => getStudents()}
          style={{ margin: 5 }}
          mode="contained"
        >
          search
        </Button>
      </View>
      <View>
        <TextInput
          label={"Amount"}
          keyboardType="numeric"
          onChangeText={(Text) => {
            setAmountPlaceHolder(Text);
            setAmount(parseInt(Text));
          }}
          value={amountPlaceHolder}
        />
        <Button
          onPress={() => handleFeeRecevie()}
          style={{ margin: 5 }}
          mode="contained"
        >
          Recevied
        </Button>
      </View>
      <View>
        {students.length > 0 ? (
          students.map((student) => (
            <View
              style={{
                backgroundColor: chooseId === student.id ? "#cfcfcf" : "#fff",
              }}
              key={student.id}
            >
              <Text>Name: {student.name}</Text>
              <Text>Class: {student.class_name}</Text>
              <Text>Section: {student.section_name}</Text>
              <Text>Roll Number: {student.roll_no}</Text>
              <Text>Father Name: {student.father_name}</Text>
              <Text>Father work: {student.father_work}</Text>
              <Text>Mother Name: {student.mother_name}</Text>
              <Text>Mother work: {student.mother_work}</Text>
              <Button
                onPress={() => setChooseId(student.id)}
                mode="contained"
                style={{ margin: 5 }}
              >
                Choose
              </Button>
              <Divider bold={true} theme={{ colors: { primary: "blue" } }} />
            </View>
          ))
        ) : (
          <Text> No Students Found</Text>
        )}
        <Divider />
        <View style={{ margin: 30 }}>
          {totalRevenueForToday !== undefined && (
            <Text>Total Revenue For Today: {totalRevenueForToday}</Text>
          )}
        </View>
      </View>
      <Button onPress={() => getTotalReveue()}>Refresh</Button>
      <Link
        style={{ textAlign: "center", color: "#0000ff", marginTop: 40 }}
        href={"/"}
      >
        <Text>Home</Text>
      </Link>
    </SafeAreaView>
  );
}
