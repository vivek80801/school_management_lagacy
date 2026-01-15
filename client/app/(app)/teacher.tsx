import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppDispatch, useAppSelector } from "../hooks";
import { TextInput, Button, Divider } from "react-native-paper";
import { View, Text, ScrollView, Modal, ActivityIndicator } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { getAllClassess } from "../../features/class/classSlice";
import { getAllSubjects } from "../../features/subject/subjectSlice";
import {
  createTeacher,
  deleteTeacher,
  editTeacher,
  getAllTeachers,
} from "../../features/teacher/teacherSlice";

export default function Teacher() {
  const [editNameOfTeacher, setEditNameOfTeacher] = React.useState("");
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [nameOfTeacher, setNameOfTeacher] = React.useState("");
  const [teacherPassword, setTeacherPassword] = React.useState("");
  const [teacherEditPassword, setTeacherEditPassword] = React.useState("");
  const [selectedSubject, setSelectedSubject] = React.useState<
    Array<{ id: number; subject_name: number }>
  >([{ id: 0, subject_name: 0 }]);
  const [numOfSubjects, setNumOfSubjects] = React.useState<number>(1);
  const [numOfClasses, setNumOfClasses] = React.useState<number>(1);
  const [selectedClass, setSelectedClass] = React.useState<
    Array<{ id: number; class_name: number }>
  >([{ id: 0, class_name: 0 }]);
  const [editSelectedClass, setEditSelectedClass] = React.useState<
    Array<{ id: number; class_name: number; teacher_class_id: number }>
  >([{ id: 0, class_name: 0, teacher_class_id: 0 }]);
  const [editSelectedSubject, setEditSelectedSubject] = React.useState<
    Array<{ id: number; subject_name: number; teacher_subject_id: number }>
  >([{ id: 0, subject_name: 0, teacher_subject_id: 0 }]);
  const [editNumOfSubjects, setEditNumOfSubjects] = React.useState<number>(
    editSelectedSubject.length
  );
  const [editNumOfClasses, setEditNumOfClasses] = React.useState<number>(
    editSelectedClass.length
  );
  const [editId, setEditId] = React.useState<number>(0);

  React.useEffect(() => {
    refresh();
  }, []);

  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.teacher.loading);
  const classes = useAppSelector((state) => state.class.classes);
  const subjects = useAppSelector((state) => state.subject.subjects);
  const teachers = useAppSelector((state) => state.teacher.teachers);

  const refresh = () => {
    if (classes.length <= 0) {
      getClasses();
    }
    if (subjects.length <= 0) {
      getSubjects();
    }
    if (teachers.length <= 0) {
      getTeachers();
    }
  };

  const getClasses = async () => {
    try {
      const result = await dispatch(getAllClassess());
      const err = result.payload;
      if (result.meta.requestStatus === "rejected") {
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getSubjects = async () => {
    try {
      const result = await dispatch(getAllSubjects());
      const err = result.payload;
      if (result.meta.requestStatus === "rejected") {
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getTeachers = async () => {
    try {
      const result = await dispatch(getAllTeachers());
      const err = result.payload;
      if (result.meta.requestId === "rejected") {
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleCreateTeacher = async () => {
    setNameOfTeacher("");
    setNumOfSubjects(1);
    setNumOfClasses(1);
    try {
      const result = await dispatch(
        createTeacher({
          nameOfTeacher,
          subjects: selectedSubject,
          classes: selectedClass,
          password: teacherPassword,
        })
      );
      const err = result.payload;
      if (result.meta.requestId === "rejected") {
      }
      setSelectedClass([{ id: 0, class_name: 0 }]);
      setSelectedSubject([{ id: 0, subject_name: 0 }]);
      setTeacherPassword("");
      getTeachers();
    } catch (e) {
      console.log(e);
    }
  };

  const handleEditTeacher = async (id: number) => {
    try {
      const result = await dispatch(
        editTeacher({
          id,
          teacherName: editNameOfTeacher,
          subjects: editSelectedSubject,
          classes: editSelectedClass,
        })
      );
      const err = result.payload;
      if (result.meta.requestId === "rejected") {
      }
      setEditSelectedClass([{ class_name: 0, id: 0, teacher_class_id: 0 }]);
      getTeachers();
      console.log(teachers[0].classes);
    } catch (e) {
      console.log(e);
    } finally {
      setIsModalOpen(false);
    }
  };

  const handleDeleteTeacher = async (id: number) => {
    try {
      const result = await dispatch(deleteTeacher({ id }));
      const err = result.payload;
      if (result.meta.requestId === "rejected") {
      }
      getTeachers();
    } catch (e) {
      console.log(e);
    }
  };

  const handleOpenEditModal = (teacher: {
    id: number;
    name: string;
    subjects: Array<{
      id: number;
      subject_id: number;
      teacher_id: number;
      subject_name: string;
      teacher_subject_id: number;
    }>;
    classes: Array<{
      id: number;
      class_id: number;
      teacher_id: number;
      class_name: string;
      teacher_class_id: number;
    }>;
  }) => {
    setIsModalOpen(true);
    const tmpClasses: {
      id: number;
      class_name: number;
      teacher_class_id: number;
    }[] = [];
    const tmpSubjects: {
      id: number;
      subject_name: number;
      teacher_subject_id: number;
    }[] = [];
    console.log(teacher.classes);
    teacher.classes.forEach((classDetail) => {
      tmpClasses.push({
        id: classDetail.class_id,
        class_name: classDetail.class_id,
        teacher_class_id: classDetail.teacher_class_id,
      });
    });
    teacher.subjects.forEach((subjectDetail) => {
      tmpSubjects.push({
        id: subjectDetail.subject_id,
        subject_name: subjectDetail.subject_id,
        teacher_subject_id: subjectDetail.teacher_subject_id,
      });
    });
    setEditSelectedClass(tmpClasses);
    setEditSelectedSubject(tmpSubjects);
    setEditNumOfClasses(tmpClasses.length);
    setEditNumOfSubjects(tmpSubjects.length);
    setEditNameOfTeacher(teacher.name);
    setEditId(teacher.id);
  };

  const handleAddEditClass = () => {
    const newSelectedClass = {
      id:
        editSelectedClass.length <= 0
          ? 0
          : editSelectedClass[editSelectedClass.length - 1].id + 1,
      class_name: 0,
      teacher_class_id: 0,
    };
    setEditSelectedClass([...editSelectedClass, newSelectedClass]);
    setEditNumOfClasses(numOfClasses + 1);
  };

  const handleAddEditSubject = () => {
    const newSelectedSubject = {
      id:
        editSelectedSubject.length <= 0
          ? 0
          : editSelectedSubject[editSelectedSubject.length - 1].id + 1,
      subject_name: 0,
      teacher_subject_id: 0,
    };
    setEditSelectedSubject([...editSelectedSubject, newSelectedSubject]);
    setEditNumOfSubjects(editNumOfSubjects + 1);
  };

  const handleEditDeleteClass = (id: number) => {
    setEditSelectedClass([...editSelectedClass.filter((cls) => cls.id !== id)]);
    setEditNumOfClasses(editNumOfClasses - 1);
  };

  const handleEditDeleteSubject = (id: number) => {
    setEditSelectedSubject([
      ...editSelectedSubject.filter((sub) => sub.id !== id),
    ]);
    setEditNumOfSubjects(editNumOfSubjects - 1);
  };

  const handleAddSubject = () => {
    const newSelectedSubject = {
      id:
        selectedSubject.length <= 0
          ? 0
          : selectedSubject[selectedSubject.length - 1].id + 1,
      subject_name: 0,
    };
    setSelectedSubject([...selectedSubject, newSelectedSubject]);
    setNumOfSubjects(numOfSubjects + 1);
  };

  const handleAddClass = () => {
    const newSelectedClass = {
      id:
        selectedClass.length <= 0
          ? 0
          : selectedClass[selectedClass.length - 1].id + 1,
      class_name: 0,
    };
    setSelectedClass([...selectedClass, newSelectedClass]);
    setNumOfClasses(numOfClasses + 1);
  };

  const handleDeleteClass = (id: number) => {
    setSelectedClass([...selectedClass.filter((cls) => cls.id !== id)]);
    setNumOfClasses(numOfClasses - 1);
  };

  const handleDeleteSubject = (id: number) => {
    setSelectedSubject([...selectedSubject.filter((sub) => sub.id !== id)]);
    setNumOfSubjects(numOfSubjects - 1);
  };

  return (
    <SafeAreaView>
      {isLoading ? (
        <>
          <Text>Loading...</Text>
          <ActivityIndicator />
        </>
      ) : (
        <>
          <ScrollView>
            <View>
              <TextInput
                onChangeText={(Text) => setNameOfTeacher(Text)}
                value={nameOfTeacher}
                label={"Name of teacher"}
              />
              <TextInput
                onChangeText={(Text) => setTeacherPassword(Text)}
                value={teacherPassword}
                label={"Password For Teacher"}
              />
              <Button onPress={() => handleAddSubject()}>Add Subject</Button>
              {Array.from({ length: numOfSubjects }, (_, idx) => (
                <View key={idx}>
                  <Picker
                    selectedValue={
                      selectedSubject.length > 0
                        ? selectedSubject[idx].subject_name
                        : ""
                    }
                    onValueChange={(itemValue) => {
                      return setSelectedSubject([
                        ...selectedSubject.map((subj) =>
                          subj.id === idx
                            ? {
                                id: subj.id,
                                subject_name: parseInt(
                                  JSON.stringify(itemValue)
                                ),
                              }
                            : {
                                id: subj.id,
                                subject_name: subj.subject_name,
                              }
                        ),
                      ]);
                    }}
                    prompt="Select class"
                    mode="dialog"
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
                    onPress={() => handleDeleteSubject(idx)}
                    buttonColor="#ff0022"
                    textColor="#ffffff"
                    disabled={numOfSubjects <= 1 ? true : false}
                  >
                    Delete
                  </Button>
                </View>
              ))}
              <Divider bold={true} theme={{ colors: { primary: "green" } }} />
              <Button onPress={() => handleAddClass()}>Add Class</Button>
              {Array.from({ length: numOfClasses }, (_, idx) => (
                <View key={idx}>
                  <Picker
                    selectedValue={
                      selectedClass.length > 0
                        ? selectedClass[idx].class_name
                        : ""
                    }
                    onValueChange={(itemValue) => {
                      return setSelectedClass([
                        ...selectedClass.map((cls) =>
                          cls.id === idx
                            ? {
                                id: cls.id,
                                class_name: parseInt(JSON.stringify(itemValue)),
                              }
                            : {
                                id: cls.id,
                                class_name: cls.class_name,
                              }
                        ),
                      ]);
                    }}
                    prompt="Select class"
                    mode="dialog"
                  >
                    {classes.length > 0 &&
                      classes.map((cls) => (
                        <Picker.Item
                          key={cls.id}
                          label={cls.class_name}
                          value={cls.id}
                        />
                      ))}
                  </Picker>
                  <Button
                    onPress={() => handleDeleteClass(idx)}
                    buttonColor="#ff0022"
                    textColor="#ffffff"
                    disabled={numOfClasses <= 1 ? true : false}
                  >
                    Delete
                  </Button>
                </View>
              ))}
              <Divider bold={true} theme={{ colors: { primary: "green" } }} />
              <Button
                onPress={() => handleCreateTeacher()}
                mode="contained"
                style={{ margin: 10 }}
                disabled={isLoading}
              >
                {isLoading ? "Loading" : "Create"}
              </Button>
            </View>
            <Button
              onPress={() => refresh()}
              mode="contained"
              buttonColor="#2233ff"
              style={{ margin: 10 }}
            >
              Refresh
            </Button>
            {teachers.length > 0 ? (
              teachers.map((teacher) => (
                <View key={teacher.id}>
                  <Text style={{ textAlign: "center" }}>{teacher.name}</Text>
                  <View>
                    <Text style={{ textAlign: "center" }}>Subjects</Text>
                    {teacher.subjects.length > 0 &&
                      teacher.subjects.map((sub) => (
                        <View key={sub.id}>
                          <Text style={{ textAlign: "center" }}>
                            Subject: {sub.subject_name}
                          </Text>
                        </View>
                      ))}
                  </View>
                  <View>
                    <Text style={{ textAlign: "center" }}>Classes</Text>
                    {teacher.classes.length > 0 &&
                      teacher.classes.map((cls) => (
                        <View key={cls.id}>
                          <Text style={{ textAlign: "center" }}>
                            Class: {cls.class_name}
                          </Text>
                        </View>
                      ))}
                  </View>
                  <Button
                    buttonColor="#322244"
                    mode="contained"
                    style={{ margin: 10 }}
                    onPress={() => handleOpenEditModal(teacher)}
                  >
                    Edit
                  </Button>
                  <Button
                    buttonColor="#550011"
                    mode="contained"
                    style={{ margin: 10 }}
                    onPress={() => handleDeleteTeacher(teacher.id)}
                  >
                    {isLoading ? "Loading" : "Delete"}
                  </Button>
                  <Divider />
                </View>
              ))
            ) : (
              <Text>No Teacher found</Text>
            )}
          </ScrollView>
          <Modal visible={isModalOpen}>
            <View style={{ marginTop: 50 }}>
              <Text style={{ textAlign: "center", fontSize: 30 }}>
                Edit Teacher
              </Text>
              <TextInput
                label={"Name of Teacher"}
                onChangeText={(Text) => setEditNameOfTeacher(Text)}
                value={editNameOfTeacher}
              />
              <Button onPress={() => handleAddEditClass()}>Add Class</Button>
              {editSelectedClass.map((_, idx) => (
                <View key={idx}>
                  <Picker
                    selectedValue={
                      editSelectedClass.length > 0
                        ? editSelectedClass[idx].class_name
                        : ""
                    }
                    onValueChange={(itemValue) => {
                      return setEditSelectedClass([
                        ...editSelectedClass.map((cls) => {
                          return cls.id === _.id
                            ? {
                                id: cls.id,
                                class_name: parseInt(JSON.stringify(itemValue)),
                                teacher_class_id: cls.teacher_class_id,
                              }
                            : {
                                id: cls.id,
                                class_name: cls.class_name,
                                teacher_class_id: cls.teacher_class_id,
                              };
                        }),
                      ]);
                    }}
                    prompt="Select class"
                    mode="dialog"
                  >
                    {classes.length > 0 &&
                      classes.map((cls) => (
                        <Picker.Item
                          key={cls.id}
                          label={cls.class_name}
                          value={cls.id}
                        />
                      ))}
                  </Picker>
                  <Button
                    onPress={() => handleEditDeleteClass(_.id)}
                    buttonColor="#ff0022"
                    textColor="#ffffff"
                    disabled={editSelectedClass.length <= 1 ? true : false}
                  >
                    Delete
                  </Button>
                </View>
              ))}
              <Button onPress={() => handleAddEditSubject()}>
                Add Subject
              </Button>
              {editSelectedSubject.map((_, idx) => (
                <View key={idx}>
                  <Picker
                    selectedValue={
                      editSelectedSubject.length > 0
                        ? editSelectedSubject[idx].subject_name
                        : ""
                    }
                    onValueChange={(itemValue) => {
                      return setEditSelectedSubject([
                        ...editSelectedSubject.map((subj) => {
                          return subj.id === _.id
                            ? {
                                id: subj.id,
                                subject_name: parseInt(
                                  JSON.stringify(itemValue)
                                ),
                                teacher_subject_id: subj.teacher_subject_id,
                              }
                            : {
                                id: subj.id,
                                subject_name: subj.subject_name,
                                teacher_subject_id: subj.teacher_subject_id,
                              };
                        }),
                      ]);
                    }}
                    prompt="Select subject"
                    mode="dialog"
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
                    onPress={() => handleEditDeleteSubject(_.id)}
                    buttonColor="#ff0022"
                    textColor="#ffffff"
                    disabled={editSelectedSubject.length <= 1 ? true : false}
                  >
                    Delete
                  </Button>
                </View>
              ))}
              <Button
                mode="contained"
                style={{ margin: 10 }}
                buttonColor={"#0022ff"}
                onPress={() => handleEditTeacher(editId)}
              >
                {isLoading ? "Loading" : "Edit"}
              </Button>
              <Button
                mode="contained"
                style={{ margin: 10 }}
                buttonColor={"#333333"}
                onPress={() => setIsModalOpen(false)}
              >
                Close
              </Button>
            </View>
          </Modal>
        </>
      )}
    </SafeAreaView>
  );
}
