import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  TextInput,
  Button,
  Divider,
  ActivityIndicator,
} from "react-native-paper";
import { View, Text, ScrollView, Modal } from "react-native";
import { useAppSelector, useAppDispatch } from "../hooks";
import {
  createSection,
  deleteSectionById,
  editSectionById,
  getAllSections,
} from "../../features/section/sectionSlice";

export default function Section() {
  const [section, setSection] = React.useState("");
  const [editSectionName, setEditSectionName] = React.useState("");
  const [editSectionId, setEditSectionId] = React.useState(0);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const isLoading = useAppSelector((state) => state.section.loading);
  const sections = useAppSelector((state) => state.section.sections);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    getSections();
  }, []);

  const getSections = async () => {
    try {
      const result = await dispatch(getAllSections());
      const err = result.payload;
      if (result.meta.requestStatus === "rejected") {
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleCreateSection = async () => {
    try {
      const result = await dispatch(createSection(section));
      const err = result.payload;
      if (result.meta.requestStatus === "rejected") {
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeleteSection = async (id: number) => {
    try {
      const result = await dispatch(deleteSectionById(id));
      const err = result.payload;
      if (result.meta.requestStatus === "rejected") {
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleEditSectionBtn = async (sectionName: string, id: number) => {
    try {
      const result = await dispatch(
        editSectionById({ sectionId: id, sectionName })
      );
      const err = result.payload;
      if (result.meta.requestStatus === "rejected") {
      }
      setIsModalOpen(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView>
      <Text>Create Section</Text>
      <TextInput label={"Section"} onChangeText={(Text) => setSection(Text)} />
      <Button
        onPress={() => handleCreateSection()}
        style={{ margin: 5 }}
        mode="contained"
      >
        Create Section
      </Button>
      {isLoading ? (
        <View>
          <Text>Loading...</Text>
          <ActivityIndicator />
        </View>
      ) : (
        <ScrollView>
          {sections.length > 0 ? (
            sections.map((sec) => (
              <View style={{ marginTop: 20 }} key={sec.id}>
                <Text style={{ textAlign: "center" }}>
                  Section: {sec.section}
                </Text>
                <Button
                  buttonColor="green"
                  style={{
                    marginLeft: 20,
                    marginRight: 20,
                    marginTop: 5,
                    marginBottom: 5,
                  }}
                  mode="contained"
                  onPress={() => {
                    setIsModalOpen(true);
                    setEditSectionName(sec.section);
                    setEditSectionId(sec.id);
                  }}
                >
                  Edit
                </Button>
                <Button
                  onPress={() => handleDeleteSection(sec.id)}
                  buttonColor="red"
                  style={{
                    marginLeft: 20,
                    marginRight: 20,
                    marginTop: 5,
                    marginBottom: 5,
                  }}
                  mode="contained"
                >
                  Delete
                </Button>
                <Divider />
              </View>
            ))
          ) : (
            <Text>No section found</Text>
          )}
          <Button
            buttonColor="#0022ff"
            mode="contained"
            style={{ margin: 10 }}
            onPress={() => getSections()}
          >
            Refresh
          </Button>
        </ScrollView>
      )}
      {sections.length > 0 && <Text>Total Sections: {sections.length}</Text>}
      <Modal visible={isModalOpen}>
        <View style={{ marginTop: 50 }}>
          <Text style={{ fontSize: 30, textAlign: "center" }}>
            Edit Section
          </Text>
          <TextInput
            label={"Section"}
            onChangeText={(Text) => setEditSectionName(Text)}
            value={editSectionName}
          />
          <Button
            style={{ margin: 10 }}
            mode={"contained"}
            buttonColor={"#0022ff"}
            onPress={() => handleEditSectionBtn(editSectionName, editSectionId)}
          >
            Edit
          </Button>
          <Button
            mode="contained"
            buttonColor="#000000"
            style={{ margin: 10 }}
            onPress={() => setIsModalOpen(false)}
          >
            Close
          </Button>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
