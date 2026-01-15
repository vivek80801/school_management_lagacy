import React from "react";
import { StyleSheet, View, Text, ScrollView, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput, Button } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import { getAllClassess } from "../../features/class/classSlice";
import { getAllSections } from "../../features/section/sectionSlice";
import { getAllSubjects } from "../../features/subject/subjectSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { createHomework } from "../../features/homework/homeworkSlice";
import { serverURL } from "../../constants";

export default function HomeWork() {
  const [title, setTitle] = React.useState("");
  const [selectedClass, setSelectedClass] = React.useState<{
    class_name: string;
    id: number;
  }>({ class_name: "", id: 0 });
  const [selectedSection, setSelectedSection] = React.useState<{
    id: number;
    section: string;
  }>({
    id: 0,
    section: "",
  });
  const [sectectedSubject, setSelectedSubject] = React.useState<{
    id: number;
    subject_name: string;
  }>({
    id: 0,
    subject_name: "",
  });
  const [homework, setHomewrok] = React.useState("");
  const [homeworkByLoggedInTeacher, setHomewrokByLoggedInTeacher] =
    React.useState<
      {
        class: number;
        created_by: number;
        homework: string;
        id: number;
        section: number;
        subject: number;
        title: string;
      }[]
    >([]);
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [editHomeWorkTitle, setEditHomeWorkTitle] = React.useState("");
  const [editHomeWorkClass, setEditHomeWorkClass] = React.useState(0);
  const [editHomeWorkSection, setEditHomeWorkSection] = React.useState(0);
  const [editHomeWorkSubject, setEditHomeWorkSubject] = React.useState(0);
  const [editHomeWorkText, setEditHomeWorkText] = React.useState("");

  React.useEffect(() => {
    refresh();
    handleGetHomeWork();
  }, []);

  const dispatch = useAppDispatch();
  const classes = useAppSelector((state) => state.class.classes);
  const sections = useAppSelector((state) => state.section.sections);
  const subjects = useAppSelector((state) => state.subject.subjects);
  const loggedInTeacher = useAppSelector(
    (state) => state.teacherlogin.teacher.id
  );

  const refresh = () => {
    if (classes.length <= 0) {
      dispatch(getAllClassess());
    }
    if (sections.length <= 0) {
      dispatch(getAllSections());
    }
    if (subjects.length <= 0) {
      dispatch(getAllSubjects());
    }
  };

  const handleGetHomeWork = async () => {
    try {
      const res = await fetch(
        serverURL + "/homework/index.php?id=" + loggedInTeacher
      );
      const data: {
        msg: string;
        data: {
          class: number;
          created_by: number;
          homework: string;
          id: number;
          section: number;
          subject: number;
          title: string;
        }[];
      } = await res.json();
      if (data.msg === "ok") {
        setHomewrokByLoggedInTeacher(data.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const findSubject = (id: number) => {
    let subject = "";
    for (let i = 0; i < subjects.length; i++) {
      if (subjects[i].id === id) {
        subject = subjects[i].subject_name;
      }
    }
    return subject;
  };

  const findSection = (id: number) => {
    let section = "";
    for (let i = 0; i < sections.length; i++) {
      if (sections[i].id === id) {
        section = sections[i].section;
        break;
      }
    }
    return section;
  };

  const findClass = (id: number) => {
    let class_name = "";
    for (let i = 0; i < classes.length; i++) {
      if (classes[i].id === id) {
        class_name = classes[i].class_name;
        break;
      }
    }
    return class_name;
  };

  const handleCreateHomeWork = async () => {
    try {
      const result = await dispatch(
        createHomework({
          title,
          classs: selectedClass,
          subject: sectectedSubject,
          section: selectedSection,
          homework,
          created_by: loggedInTeacher,
        })
      );
      const err = result.payload;
      if (result.meta.requestStatus === "rejected") {
      }
      setTitle("");
      setHomewrok("");
      setSelectedClass({ id: 0, class_name: "" });
      setSelectedSection({ id: 0, section: "" });
      setSelectedSubject({ id: 0, subject_name: "" });
      handleGetHomeWork();
    } catch (e) {
      console.log(e);
    }
  };

  const handleEditHomeWork = async () => {
    setIsModalOpen(true);
  };

  const handleDeleteHomeWork = async () => {};

  return (
    <SafeAreaView>
      <ScrollView>
        <TextInput
          label={"Title"}
          value={title}
          onChangeText={(text) => setTitle(text)}
        />
        <Picker
          selectedValue={selectedClass.id}
          onValueChange={(itemValue) =>
            setSelectedClass({ id: itemValue, class_name: "" })
          }
          prompt="select class"
          mode={"dialog"}
        >
          {classes.length > 0 &&
            classes.map((cls) => (
              <Picker.Item value={cls.id} key={cls.id} label={cls.class_name} />
            ))}
        </Picker>
        <Picker
          selectedValue={selectedSection.id}
          onValueChange={(itemValue) =>
            setSelectedSection({ id: itemValue, section: "" })
          }
          prompt="select section"
          mode={"dialog"}
        >
          {sections.length > 0 &&
            sections.map((sec) => (
              <Picker.Item key={sec.id} label={sec.section} value={sec.id} />
            ))}
        </Picker>
        <Picker
          selectedValue={sectectedSubject.id}
          onValueChange={(itemValue) =>
            setSelectedSubject({ id: itemValue, subject_name: "" })
          }
          prompt="select subject"
          mode={"dialog"}
        >
          {subjects.length > 0 &&
            subjects.map((sub) => (
              <Picker.Item
                key={sub.id}
                label={sub.subject_name}
                value={sub.id}
              />
            ))}
        </Picker>
        <TextInput
          style={styles.multilineTextInput}
          onChangeText={(Text) => setHomewrok(Text)}
          label={"Homework"}
          multiline={true}
        />
        <Button
          mode="contained"
          style={{ margin: 10 }}
          onPress={() => handleCreateHomeWork()}
        >
          Create HomeWork
        </Button>
        {homeworkByLoggedInTeacher.length > 0 &&
          homeworkByLoggedInTeacher.map((hw, idx) => (
            <View
              style={{
                padding: 8,
                margin: 10,
              }}
              key={idx}
            >
              <Text>Title: {hw.title}</Text>
              <Text>Class: {findClass(hw.class)}</Text>
              <Text>Section: {findSection(hw.section)}</Text>
              <Text>Subject: {findSubject(hw.subject)}</Text>
              <Text style={{ marginBottom: 5 }}>HomeWork: {hw.homework}</Text>
              <Button
                mode="contained"
                onPress={() => handleEditHomeWork()}
                style={{ backgroundColor: "#ff00ff", marginBottom: 5 }}
              >
                Edit
              </Button>
              <Button
                mode="contained"
                onPress={() => handleDeleteHomeWork()}
                style={{ backgroundColor: "#ff1122", marginTop: 5 }}
              >
                Delete
              </Button>
            </View>
          ))}
      </ScrollView>
      <Modal visible={isModalOpen}>
        <View style={{ marginTop: 50 }}>
          <TextInput
            label={"Title"}
            value={editHomeWorkTitle}
            onChangeText={(Text) => setEditHomeWorkTitle(Text)}
          />
          <Picker
            selectedValue={editHomeWorkClass}
            onValueChange={(itemValue) => setEditHomeWorkClass(itemValue)}
            prompt="select class"
            mode={"dialog"}
          >
            {classes.length > 0 &&
              classes.map((cls) => (
                <Picker.Item
                  value={cls.id}
                  key={cls.id}
                  label={cls.class_name}
                />
              ))}
          </Picker>
          <Picker
            selectedValue={selectedSection.id}
            onValueChange={(itemValue) =>
              setSelectedSection({ id: itemValue, section: "" })
            }
            prompt="select section"
            mode={"dialog"}
          >
            {sections.length > 0 &&
              sections.map((sec) => (
                <Picker.Item key={sec.id} label={sec.section} value={sec.id} />
              ))}
          </Picker>
          <Picker
            selectedValue={sectectedSubject.id}
            onValueChange={(itemValue) =>
              setSelectedSubject({ id: itemValue, subject_name: "" })
            }
            prompt="select subject"
            mode={"dialog"}
          >
            {subjects.length > 0 &&
              subjects.map((sub) => (
                <Picker.Item
                  key={sub.id}
                  label={sub.subject_name}
                  value={sub.id}
                />
              ))}
          </Picker>
          <Button
            mode="contained"
            style={{ margin: 10, backgroundColor: "#2233ff" }}
          >
            Edit
          </Button>
          <Button
            mode="contained"
            style={{ margin: 10, backgroundColor: "#ff9944" }}
            onPress={() => setIsModalOpen(false)}
          >
            Close
          </Button>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  multilineTextInput: {
    minHeight: 80,
    textAlignVertical: "top",
    marginBottom: 10,
  },
});
