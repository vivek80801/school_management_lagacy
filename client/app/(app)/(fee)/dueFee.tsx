import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { serverURL } from "../../../constants";
import { Divider, TextInput, Button } from "react-native-paper";
import { Link } from "expo-router";
import { useAppDispatch, useAppSelector } from "../../hooks";

export default function DueFee() {
  const [name, setName] = React.useState("");
  const [classForStudent, setClassForStudent] = React.useState("");
  const [rollNo, setRollNo] = React.useState("");
  const [section, setSection] = React.useState("");
  const [classes, setClasses] = React.useState<
    { class_name: string; id: number }[]
  >([]);
  const [sections, setSections] = React.useState<
    { section: string; id: number }[]
  >([]);

  const [dueFee, setDueFee] = React.useState<
    {
      class: number;
      created_at: string;
      current_student_required: number;
      father_name: string;
      father_work: string;
      id: number;
      mother_name: string;
      mother_work: string;
      name: string;
      roll_no: number;
      section: number;
      student_id: number;
      total_recevied: number;
      class_name: string;
      section_name: string;
      total_required: number;
      total_due: number;
      current_date: string;
    }[]
  >([]);

  React.useEffect(() => {
    getClasses();
    getSctions();
    getDueFee();
  }, []);

  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.fee.loading);
  const fees = useAppSelector((state) => state.fee.fees);

  const handleSearch = async () => {
    try {
      const res = await fetch(serverURL + "/fees/due_fee.php", {
        method: "POST",
        body: JSON.stringify({ name, classForStudent, section, rollNo }),
      });
      const data: {
        data: Array<{
          class: number;
          created_at: string;
          current_student_required: number;
          father_name: string;
          father_work: string;
          id: number;
          mother_name: string;
          mother_work: string;
          name: string;
          roll_no: number;
          section: number;
          student_id: number;
          total_recevied: number;
          class_name: string;
          section_name: string;
          total_required: number;
          total_due: number;
          current_date: string;
        }>;
        msg: "ok";
      } = await res.json();
      if (data.msg === "ok") {
        setDueFee(data.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getClasses = async () => {
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
  };

  const getSctions = async () => {
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
  };
  const getDueFee = async () => {
    try {
      const res = await fetch(serverURL + "/fees/due_fee.php");
      const data: {
        data: Array<{
          class: number;
          created_at: string;
          current_student_required: number;
          father_name: string;
          father_work: string;
          id: number;
          mother_name: string;
          mother_work: string;
          name: string;
          roll_no: number;
          section: number;
          student_id: number;
          total_recevied: number;
          class_name: string;
          section_name: string;
          total_required: number;
          total_due: number;
          current_date: string;
        }>;
        msg: "ok";
      } = await res.json();
      if (data.msg === "ok") {
        setDueFee(data.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Button
            mode="contained"
            style={{ margin: 10 }}
            onPress={() => getDueFee()}
          >
            Refresh
          </Button>
        </View>
        <View>
          <TextInput
            onChangeText={(Text) => setName(Text)}
            value={name}
            label={"search student by name"}
          />
          <Picker
            selectedValue={classForStudent === "" ? "I" : classForStudent}
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
            selectedValue={section === "" ? "B" : section}
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
          <Divider bold={true} theme={{ colors: { primary: "green" } }} />
          <TextInput
            onChangeText={(Text) => setRollNo(Text)}
            value={rollNo}
            label={"search student by roll number"}
          />
          <Button onPress={() => handleSearch()}>Search</Button>
        </View>
        <ScrollView>
          {dueFee.length > 0 ? (
            dueFee.map((dueF) => (
              <View style={{ margin: 30 }} key={dueF.student_id}>
                <View
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 30,
                    backgroundColor: dueF.total_due > 0 ? "#ff0000" : "#00ff00",
                    position: "absolute",
                    top: 30,
                    right: 100,
                  }}
                ></View>
                <Text>Name: {dueF.name}</Text>
                <Text>Class: {dueF.class_name}</Text>
                <Text>Section: {dueF.section_name}</Text>
                <Text>Roll No: {dueF.roll_no}</Text>
                <Text>
                  Current Date:{" "}
                  {dueF.current_date.split("-").reverse().join("-")}
                </Text>
                <Text>
                  Addmition Date:{" "}
                  {dueF.created_at.split("-").reverse().join("-")}
                </Text>
                <Text>Total money recevied: {dueF.total_recevied}</Text>
                <Text>
                  Required Money per month: {dueF.current_student_required}
                </Text>
                <Text>Total Required: {dueF.total_required}</Text>
                <Text>
                  Total {dueF.total_due < 0 ? "Advanced" : "Due"}:{" "}
                  <Icon name="rupee" size={3} />
                  {Math.abs(dueF.total_due)}
                </Text>
                <Divider />
              </View>
            ))
          ) : (
            <Text>No Student found.</Text>
          )}
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 50,
            }}
          >
            <Link href={"/"}>
              <Text style={{ textAlign: "center", color: "#0000ff" }}>
                Home
              </Text>
            </Link>
          </View>
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}
