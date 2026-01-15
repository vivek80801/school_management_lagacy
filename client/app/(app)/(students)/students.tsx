import React from "react";
import { Modal, StyleSheet, Text, View, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import {
  Button,
  TextInput,
  Divider,
  ActivityIndicator,
} from "react-native-paper";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Link } from "expo-router";
import {
  deleteStudentById,
  editStudentById,
  getStudents,
} from "../../../features/student/studentSlice";
import { getAllClassess } from "../../../features/class/classSlice";
import { getAllSections } from "../../../features/section/sectionSlice";

export default function Students() {
  const [editId, setEditId] = React.useState<number>();
  const [editName, setEditName] = React.useState("");
  const [editFatherName, setEditFatherName] = React.useState("");
  const [editFatherWork, setEditFatherWork] = React.useState("");
  const [editMotherName, setEditMotherName] = React.useState("");
  const [editMotherWork, setEditMotherWork] = React.useState("");
  const [editClassForStudents, setEditClassForStudents] =
    React.useState<number>();
  const [editSection, setEditSection] = React.useState<number>();
  const [editRollNoPlaceHolder, setEditRollNoPlaceHolder] = React.useState("");
  const [editRollNo, setEditRollNo] = React.useState<number>();
  const [editStudentErr, setEditStudentErr] = React.useState<string[]>([]);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [classes, setClasses] = React.useState<
    { class_name: string; id: number }[]
  >([]);
  const [sections, setSections] = React.useState<
    { section: string; id: number }[]
  >([]);
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
    (async () => {
      try {
        const result = await dispatch(getAllClassess());
        if (result.meta.requestStatus === "fulfilled") {
          //@ts-ignore
          setClasses([...result.payload]);
        }
      } catch (e) {
        console.log(e);
      }
    })();

    (async () => {
      try {
        const result = await dispatch(getAllSections());
        if (result.meta.requestStatus === "fulfilled") {
          //@ts-ignore
          setSections([...result.payload]);
        }
      } catch (e) {
        console.log(e);
      }
    })();
    obtainStudents();
  }, []);

  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.student.loading);

  const obtainStudents = async () => {
    try {
      const result = await dispatch(getStudents());
      if (result.meta.requestStatus === "fulfilled") {
        //@ts-ignore
        setStudents([...result.payload]);
      }
    } catch (e) {
      console.log("getStudents err: ", e);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const result = await dispatch(deleteStudentById(id));
      if (result.meta.requestStatus === "fulfilled") {
        //@ts-ignore
        setStudents([...result.payload]);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleEditStudent = async () => {
    setModalVisible(false);
    try {
      const result = await dispatch(
        editStudentById({
          name: editName,
          father_name: editFatherName,
          father_work: editFatherWork,
          mother_name: editMotherName,
          mother_work: editMotherWork,
          classForStudent:
            editClassForStudents === undefined ? 0 : editClassForStudents,
          section: editSection === undefined ? 0 : editSection,
          rollNo: editRollNo === undefined ? 0 : editRollNo,
          id: editId === undefined ? 0 : editId,
        })
      );

      if (result.meta.requestStatus === "fulfilled") {
        //@ts-ignore
        setStudents([...result.payload]);
      }
    } catch (e) {
      console.log("Error: ", e);
    }
  };

  return (
    <ScrollView>
      {isLoading ? (
        <View>
          <Text>Loading....</Text>
          <ActivityIndicator animating={true} />
        </View>
      ) : (
        <View>
          <Text style={{ fontSize: 30, textTransform: "capitalize" }}>
            Welcome to student page
          </Text>
          {students.length > 0 ? (
            students.map((student) => (
              <View style={{ margin: 10 }} key={student.id}>
                <Text>Name: {student.name}</Text>
                <Text>Class: {student.class_name}</Text>
                <Text>Roll: {student.roll_no}</Text>
                <Text>Section: {student.section_name}</Text>
                <Text>Father's Name: {student.father_name}</Text>
                <Text>Father's Work: {student.father_work}</Text>
                <Text>Mother's Name: {student.mother_name}</Text>
                <Text>Mother's Work: {student.mother_work}</Text>
                <View style={{ padding: 10 }}>
                  <Button
                    style={{ margin: 5 }}
                    mode="contained"
                    onPress={() => {
                      setModalVisible(true);
                      setEditId(student.id);
                      setEditName(student.name);
                      setEditFatherName(student.father_name);
                      setEditFatherWork(student.father_work);
                      setEditMotherName(student.mother_name);
                      setEditMotherWork(student.mother_work);
                      setEditClassForStudents(student.section);
                      setEditSection(student.class);
                      setEditRollNo(student.roll_no);
                      setEditRollNoPlaceHolder(JSON.stringify(student.roll_no));
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    onPress={() => handleDelete(student.id)}
                    buttonColor="red"
                    textColor="white"
                    style={{ margin: 5 }}
                  >
                    Delete
                  </Button>
                </View>
                <Divider bold={true} theme={{ colors: { primary: "blue" } }} />
              </View>
            ))
          ) : (
            <View>
              <Text>No student found</Text>
            </View>
          )}
          <View>
            {students.length > 0 && (
              <Text>Total Students: {students.length}</Text>
            )}
          </View>
          <Divider bold={true} theme={{ colors: { primary: "blue" } }} />
          <Button
            onPress={() => obtainStudents()}
            buttonColor="blue"
            textColor="white"
            style={{ margin: 5 }}
          >
            Refresh
          </Button>

          <View style={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>Edit</Text>
                  <ScrollView>
                    {editStudentErr.length > 0 &&
                      editStudentErr.map((err, idx) => (
                        <View key={idx} style={styles.alert}>
                          <Text>{err}</Text>
                        </View>
                      ))}
                    <View style={{ width: 250 }}>
                      <TextInput
                        label={"Name"}
                        onChangeText={(Text) => setEditName(Text)}
                        value={editName}
                      />
                      <TextInput
                        label={"Father Name:"}
                        onChangeText={(Text) => setEditFatherName(Text)}
                        value={editFatherName}
                      />
                      <TextInput
                        label={"Father Work:"}
                        onChangeText={(Text) => setEditFatherWork(Text)}
                        value={editFatherWork}
                      />
                      <TextInput
                        label={"Mother Name:"}
                        onChangeText={(Text) => setEditMotherName(Text)}
                        value={editMotherName}
                      />
                      <TextInput
                        label={"Mother Work:"}
                        onChangeText={(Text) => setEditMotherWork(Text)}
                        value={editMotherWork}
                      />
                      <Picker
                        selectedValue={editClassForStudents}
                        onValueChange={(itemValue) =>
                          setEditClassForStudents(itemValue)
                        }
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
                      <Divider
                        bold={true}
                        theme={{ colors: { primary: "green" } }}
                      />
                      <Picker
                        selectedValue={editSection}
                        onValueChange={(itemValue) => setEditSection(itemValue)}
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
                      <Divider
                        bold={true}
                        theme={{ colors: { primary: "green" } }}
                      />
                      <TextInput
                        label={"Roll Number:"}
                        keyboardType="numeric"
                        onChangeText={(Text) => {
                          setEditRollNoPlaceHolder(Text);
                          setEditRollNo(parseInt(Text));
                        }}
                        value={editRollNoPlaceHolder}
                      />
                      <Button
                        onPress={() => handleEditStudent()}
                        style={{ margin: 5 }}
                        mode="contained"
                      >
                        Edit
                      </Button>
                      <Button
                        style={{ margin: 5, backgroundColor: "gray" }}
                        mode="contained"
                        onPress={() => setModalVisible(!modalVisible)}
                      >
                        <Text style={styles.textStyle}>Close</Text>
                      </Button>
                    </View>
                  </ScrollView>
                </View>
              </View>
            </Modal>
          </View>
          <Link
            style={{
              textAlign: "center",
              color: "#0000ff",
              marginTop: 40,
              marginBottom: 50,
            }}
            href={"/"}
          >
            <Text>Home</Text>
          </Link>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "gray",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  alert: {
    padding: 1,
  },
});
