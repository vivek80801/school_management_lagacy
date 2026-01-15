import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput, Button } from "react-native-paper";
import { View, Text } from "react-native";
import { serverURL } from "../../constants";

export default function Staff() {
  const [name, setName] = React.useState("");
  const [work, setWork] = React.useState("");
  const [staffs, setStaffs] = React.useState<
    Array<{ id: number; name: string; work: string }>
  >([]);

  React.useEffect(() => {
    getStaff();
  }, []);

  const handleCreateStaff = async () => {
    try {
      const res = await fetch(serverURL + "/staff/index.php", {
        method: "POST",
        body: JSON.stringify({ name, work }),
      });
      const data = await res.json();
      if (data.msg === "ok") {
        getStaff();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getStaff = async () => {
    try {
      const res = await fetch(serverURL + "/staff/index.php");
      const data: {
        msg: string;
        data: Array<{ id: number; name: string; work: string }>;
      } = await res.json();
      if (data.msg === "ok") {
        setStaffs([...data.data]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeleteStaff = async (id: number) => {
    try {
      const res = await fetch(serverURL + "/staff/index.php", {
        method: "DELETE",
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.msg === "ok") {
        getStaff();
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView>
      <View>
        <TextInput
          label={"Name"}
          onChangeText={(Text) => setName(Text)}
          value={name}
        />
        <TextInput
          label={"Work"}
          onChangeText={(Text) => setWork(Text)}
          value={work}
        />
        <Button onPress={() => handleCreateStaff()}>Create</Button>
      </View>
      <View>
        {staffs.length > 0 && (
          <Text style={{ textAlign: "center" }}>Staffs</Text>
        )}
        {staffs.length > 0 ? (
          staffs.map((staff) => (
            <View>
              <Text style={{ textAlign: "center" }}>Name: {staff.name} </Text>
              <Text style={{ textAlign: "center" }}>Work: {staff.work} </Text>
              <Button mode="contained" style={{ margin: 10 }}>
                Edit
              </Button>
              <Button
                buttonColor="#ff0022"
                mode="contained"
                style={{ margin: 10 }}
                onPress={() => handleDeleteStaff(staff.id)}
              >
                Delete
              </Button>
            </View>
          ))
        ) : (
          <Text>No staff found</Text>
        )}
      </View>
    </SafeAreaView>
  );
}
