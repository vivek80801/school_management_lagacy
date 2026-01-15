import React from "react";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, TextInput, Divider } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { serverURL } from "../../../constants";
import { Link } from "expo-router";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { createStudent } from "../../../features/student/studentSlice";

export default function Register() {
  const [addmitionDate, setAddmitionDate] = React.useState(new Date());
  const [name, setName] = React.useState("");
  const [fatherName, setFatherName] = React.useState("");
  const [fatherWork, setFatherWork] = React.useState("");
  const [motherName, setMotherName] = React.useState("");
  const [motherWork, setMotherWork] = React.useState("");
  const [classForStudent, setClassForStudent] = React.useState("");
  const [section, setSection] = React.useState("");
  const [studentErr, setStudentErr] = React.useState<string[]>([]);
  const [classes, setClasses] = React.useState<
    { class_name: string; id: number }[]
  >([]);
  const [sections, setSections] = React.useState<
    { section: string; id: number }[]
  >([]);
  const [password, setPassword] = React.useState("");

  const router = useRouter();

  React.useEffect(() => {
    setStudentErr([]);
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
        const res = await fetch(serverURL + "/section/section.php");
        const data: {
          data: { section: string; id: number }[];
          msg: "ok";
        } = await res.json();
        if (data.msg === "ok") {
          setSections([...data.data]);
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.student.loading);

  const onChange = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined
  ) => {
    const currentDate = selectedDate;
    setAddmitionDate(currentDate === undefined ? new Date() : currentDate);
  };

  const showMode = (currentMode: "date" | "time") => {
    DateTimePickerAndroid.open({
      value: addmitionDate,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const handleRegisterStudent = async () => {
    try {
      const result = await dispatch(
        createStudent({
          name,
          father_name: fatherName,
          father_work: fatherWork,
          mother_name: motherName,
          mother_work: motherWork,
          classForStudent,
          section,
          // addmitionDate.getMonth is 0 indexed if don't added one. it will give previous month.
          addmitionDate:
            addmitionDate.getFullYear() +
            "-" +
            (addmitionDate.getMonth() + 1) +
            "-" +
            addmitionDate.getDay(),
          password,
        })
      );

      if (result.meta.requestStatus === "fulfilled") {
        setStudentErr([]);
        console.log("student created successfully");
        router.navigate("/(students)/students");
      }
      if (result.meta.requestStatus === "rejected") {
          console.log("student creating rejected")
      }
      //if (data.msg === "ok") {
      //  setStudentErr([]);
      //  console.log("student created successfully");
      //  router.navigate("/(students)/students");
      //}
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        {studentErr.length > 0 &&
          studentErr.map((err, idx) => (
            <View key={idx} style={styles.alert}>
              <Text>{err}</Text>
            </View>
          ))}
        <TextInput
          label={"Name"}
          onChangeText={(Text) => setName(Text)}
          value={name}
        />
        <TextInput
          label={"Father Name:"}
          onChangeText={(Text) => setFatherName(Text)}
          value={fatherName}
        />
        <TextInput
          label={"Father Work:"}
          onChangeText={(Text) => setFatherWork(Text)}
          value={fatherWork}
        />
        <TextInput
          label={"Mother Name:"}
          onChangeText={(Text) => setMotherName(Text)}
          value={motherName}
        />
        <TextInput
          label={"Mother Work:"}
          onChangeText={(Text) => setMotherWork(Text)}
          value={motherWork}
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
        <Divider bold={true} theme={{ colors: { primary: "green" } }} />
        <Picker
          selectedValue={section}
          onValueChange={(itemValue) => setSection(itemValue)}
          prompt="Select section"
          mode="dialog"
        >
          {sections.length > 0 &&
            sections.map((secttionItem) => (
              <Picker.Item
                key={secttionItem.id}
                label={secttionItem.section}
                value={secttionItem.id}
              />
            ))}
        </Picker>
        <TextInput
          label={"password"}
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
        <Divider bold={true} theme={{ colors: { primary: "green" } }} />
        <Button onPress={() => showDatepicker()}>Choose Date</Button>
        <Divider bold={true} theme={{ colors: { primary: "green" } }} />
        <Button
          onPress={handleRegisterStudent}
          style={{ margin: 5 }}
          mode="contained"
        >
          Register
        </Button>
      </ScrollView>
      <Link
        style={{ textAlign: "center", color: "#0000ff", marginTop: 40 }}
        href={"/"}
      >
        <Text>Home</Text>
      </Link>
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
