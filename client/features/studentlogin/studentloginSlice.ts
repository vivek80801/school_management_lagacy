import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { serverURL } from "../../constants";

interface IStudentLogin {
  student: {
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
  };
  err: [];
  loading: boolean;
}

const loggedInStudent: IStudentLogin = {
  student: {
    class: 0,
    section: 0,
    class_name: "",
    father_name: "",
    father_work: "",
    id: 0,
    mother_name: "",
    mother_work: "",
    name: "",
    roll_no: 0,
    section_name: "",
  },
  err: [],
  loading: false,
};

export const studentLogin = createAsyncThunk(
  "studentlogin/studentlogin",
  async (
    student: {
      name: string;
      password: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await fetch(serverURL + "/students/studentlogin.php", {
        method: "POST",
        body: JSON.stringify(student),
      });
      const data = await res.json();
      if (data.msg === "ok") {
        await AsyncStorage.setItem("jwt", data.jwt);
        await AsyncStorage.setItem("role", "student");
        return data.data;
      } else {
        return rejectWithValue("something went worng");
      }
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

const studentSlice = createSlice({
  name: "studentlogin",
  initialState: loggedInStudent,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(studentLogin.pending, (state) => {
      state.loading = false;
      state.err = [];
    });
  },
});

export default studentSlice.reducer;
