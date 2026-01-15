import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  TextInput,
  Button,
  Divider,
  ActivityIndicator,
} from "react-native-paper";
import { View, Text, ScrollView, Modal } from "react-native";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  getAllSubjects,
  createSubject,
  deleteSubject,
  editSubject,
} from "../../features/subject/subjectSlice";

export default function Subject() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editSubjectName, setEditSubjectName] = React.useState("");
  const [editId, setEditId] = React.useState(0);
  const [subject, setSubject] = React.useState("");

  React.useEffect(() => {
    getSubject();
  }, []);

  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.subject.loading);
  const subjects = useAppSelector((state) => state.subject.subjects);

  const getSubject = async () => {
    try {
      const result = await dispatch(getAllSubjects());
      const err = result.payload;
      if (result.meta.requestId === "rejected") {
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleCreateSubject = async () => {
    try {
      setSubject("");
      const result = await dispatch(createSubject(subject));
      const err = result.payload;
      if (result.meta.requestId === "rejected") {
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeleteSubject = async (id: number) => {
    try {
      const result = await dispatch(deleteSubject(id));
      const err = await result.payload;
      if (result.meta.requestId === "rejected") {
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleEditSubject = async () => {
    try {
      setIsModalOpen(false);
      const result = await dispatch(
        editSubject({ subjectName: editSubjectName, id: editId })
      );
      const err = await result.payload;
      if (result.meta.requestId === "rejected") {
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView>
      <View>
        <TextInput
          label={"Subject"}
          onChangeText={(Text) => setSubject(Text)}
          value={subject}
        />
        <Button
          style={{ margin: 5 }}
          mode="contained"
          onPress={() => handleCreateSubject()}
        >
          Create
        </Button>
      </View>
      {isLoading ? (
        <View>
          <Text>Loading....</Text>
          <ActivityIndicator />
        </View>
      ) : (
        <ScrollView>
          {subjects.length > 0 &&
            subjects.map((sub) => (
              <View style={{ marginTop: 20, marginBottom: 30 }} key={sub.id}>
                <Text style={{ textAlign: "center" }}>
                  Subject: {sub.subject_name}
                </Text>
                <Button
                  buttonColor="#224453"
                  mode="contained"
                  style={{ margin: 10 }}
                  onPress={() => {
                    setIsModalOpen(true);
                    setEditSubjectName(sub.subject_name);
                    setEditId(sub.id);
                  }}
                >
                  Edit
                </Button>
                <Button
                  onPress={() => handleDeleteSubject(sub.id)}
                  buttonColor="red"
                  mode="contained"
                  style={{ margin: 10 }}
                >
                  Delete
                </Button>
                <Divider />
              </View>
            ))}
        </ScrollView>
      )}
      <Button onPress={() => getSubject()}>Rfresh</Button>
      <Modal visible={isModalOpen}>
        <View style={{ marginTop: 50 }}>
          <Text style={{ fontSize: 30, textAlign: "center" }}>
            Edit Subject
          </Text>
          <TextInput
            label={"Suject"}
            onChangeText={(Text) => setEditSubjectName(Text)}
            value={editSubjectName}
          />

          <Button
            mode="contained"
            style={{ margin: 10 }}
            buttonColor={"#0000ff"}
            onPress={() => handleEditSubject()}
          >
            Edit
          </Button>
          <Button
            mode="contained"
            style={{ margin: 10 }}
            buttonColor={"#333"}
            onPress={() => setIsModalOpen(false)}
          >
            Close
          </Button>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
