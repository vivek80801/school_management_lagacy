import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Modal } from "react-native";
import { Button, TextInput, ActivityIndicator } from "react-native-paper";
import { useAppSelector, useAppDispatch } from "../hooks";
import {
  createClass,
  deleteClassById,
  getAllClassess,
  editClass,
} from "../../features/class/classSlice";

export default function Classes() {
  const [editClassName, setEditClassName] = React.useState("");
  const [editClassId, setEditClassId] = React.useState(0);
  const [newClass, setNewClass] = React.useState("");
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const isLoading = useAppSelector((state) => state.class.loading);
  const dispatch = useAppDispatch();
  const classes = useAppSelector((state) => state.class.classes);

  React.useEffect(() => {
    getClassess();
  }, []);

  const getClassess = async () => {
    try {
      const result = await dispatch(getAllClassess());
      const err = result.payload;
      if (result.meta.requestId === "rejected") {
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleCreateClass = async () => {
    try {
      const result = await dispatch(createClass(newClass));
      const err = result.payload;
      if (result.meta.requestId === "rejected") {
      }
    } catch (e) {
      console.log(e);
    }
  };

  const deleteClass = async (id: number) => {
    try {
      const result = await dispatch(deleteClassById(id));
      const err = result.payload;
      if (result.meta.requestId === "rejected") {
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleEditClass = async () => {
    setIsModalOpen(false);
    try {
      const result = await dispatch(
        editClass({ className: editClassName, id: editClassId })
      );
      const err = result.payload;
      if (result.meta.requestId === "rejected") {
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleEditClassBtn = (className: string, id: number) => {
    setIsModalOpen(true);
    setEditClassName(className);
    setEditClassId(id);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Text style={{ fontSize: 30, textTransform: "capitalize" }}>
            Create your class
          </Text>
        </View>
        <View>
          <TextInput
            onChangeText={(Text) => setNewClass(Text)}
            label={"Class"}
            value={newClass}
          />
          <Button
            onPress={() => handleCreateClass()}
            style={{ margin: 5 }}
            mode="contained"
          >
            Create
          </Button>
        </View>

        {isLoading ? (
          <View>
            <Text>Loading...</Text>
            <ActivityIndicator />
          </View>
        ) : (
          <View style={{ marginTop: 20, padding: 2 }}>
            <Text style={{ fontSize: 24, textAlign: "center" }}> Classes </Text>
            {classes.length > 0 ? (
              classes.map((classs) => (
                <View
                  style={{
                    margin: 10,
                  }}
                  key={classs.id}
                >
                  <Text style={{ textAlign: "center" }}>
                    Class: {classs.class_name}
                  </Text>
                  <Button
                    buttonColor="darkblue"
                    style={{ marginHorizontal: 20, marginVertical: 2 }}
                    mode="contained"
                    onPress={() =>
                      handleEditClassBtn(classs.class_name, classs.id)
                    }
                  >
                    Edit
                  </Button>
                  <Button
                    onPress={() => deleteClass(classs.id)}
                    buttonColor="red"
                    style={{ marginHorizontal: 20, marginVertical: 2 }}
                    mode="contained"
                  >
                    Delete
                  </Button>
                </View>
              ))
            ) : (
              <View>
                <Text>No Class found</Text>
              </View>
            )}
            {classes.length > 0 && <Text>Total Class: {classes.length}</Text>}
            <Button
              onPress={() => getClassess()}
              buttonColor="#0022ff"
              mode="contained"
              style={{ margin: 20 }}
            >
              Refresh
            </Button>
          </View>
        )}
      </ScrollView>
      <Modal visible={isModalOpen}>
        <View style={{ marginTop: 50 }}>
          <Text style={{fontSize: 30, textAlign: "center"}}>Edit Class</Text>
          <TextInput
            placeholder="Class"
            onChangeText={(Text) => setEditClassName(Text)}
            value={editClassName}
          />
          <Button
            mode="contained"
            style={{ margin: 10 }}
            onPress={() => handleEditClass()}
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
