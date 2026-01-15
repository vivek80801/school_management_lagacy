import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput, Button } from "react-native-paper";
import { View, Text, ScrollView } from "react-native";
import { serverURL } from "../../constants";

export default function Announcment() {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [announcements, setAnnouncements] = React.useState<
    Array<{ description: string; id: number; title: string }>
  >([]);
  React.useEffect(() => {
    getAnnouncement();
  }, []);

  const getAnnouncement = async () => {
    try {
      const res = await fetch(serverURL + "/announcement/index.php");
      const data: {
        msg: string;
        data: Array<{
          description: string;
          id: number;
          title: string;
        }>;
      } = await res.json();
      if (data.msg === "ok") {
        setAnnouncements([...data.data]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleCreateAnnouncement = async () => {
    try {
      const res = await fetch(serverURL + "/announcement/index.php", {
        method: "POST",
        body: JSON.stringify({ title, description }),
      });
      const data = await res.json();
      if (data.msg === "ok") {
        getAnnouncement();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeleteAnnouncement = async (id: number) => {
    try {
      const res = await fetch(serverURL + "/announcement/index.php", {
        method: "DELETE",
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.msg === "ok") {
        getAnnouncement();
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <TextInput
            label={"Title"}
            onChangeText={(Text) => setTitle(Text)}
            value={title}
          />
          <TextInput
            multiline
            label={"Description"}
            onChangeText={(Text) => setDescription(Text)}
            value={description}
          />
          <Button onPress={() => handleCreateAnnouncement()}>
            Create Announcement
          </Button>
          <Button onPress={() => getAnnouncement()}>Refresh</Button>
        </View>
        <View>
          <Text style={{ textAlign: "center" }}>
            {announcements.length > 0 ? "Announcement" : ""}
          </Text>
          {announcements.length > 0 ? (
            announcements.map((announcement) => (
              <View key={announcement.id}>
                <Text style={{ textAlign: "center" }}>
                  Title: {announcement.title}
                </Text>
                <Text style={{ textAlign: "center" }}>
                  Description: {announcement.description}
                </Text>
                <Button
                  style={{ margin: 10 }}
                  buttonColor="#ff2200"
                  textColor="#ffffff"
                  mode="contained"
                  onPress={() => handleDeleteAnnouncement(announcement.id)}
                >
                  Delete
                </Button>
              </View>
            ))
          ) : (
            <Text style={{ textAlign: "center" }}>Announcement not found</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
