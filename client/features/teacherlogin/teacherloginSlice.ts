import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { serverURL } from "../../constants";

interface ITeacherLogin {
  teacher: {
    name: string;
    id: number;
  };
  isLoggedIn: boolean;
  loading: boolean;
  err: string[];
}

const teacherLoginState: ITeacherLogin = {
  teacher: {
    name: "",
    id: 0,
  },
  isLoggedIn: false,
  loading: false,
  err: [],
};

export const logout = createAsyncThunk(
  "teacherlogin/logout",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(serverURL + "/logout.php");
      const data = await res.json();
      if (data.msg === "ok") {
        await AsyncStorage.removeItem("jwt");
        return { name: "", id: 0 };
      } else {
        return rejectWithValue("something went wrong");
      }
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const login = createAsyncThunk(
  "teacherlogin/login",
  async (
    { name, password }: { name: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await fetch(serverURL + "/teacher/teacherlogin.php", {
        method: "POST",
        body: JSON.stringify({ name, password }),
      });
      const data = await res.json();
      if (data.msg === "ok") {
        await AsyncStorage.setItem("jwt", data.jwt);
        await AsyncStorage.setItem("role", "teacher");
        console.log(data);
        return data.data;
      } else {
        return rejectWithValue("something went worng");
      }
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

const teacherloginSlice = createSlice({
  name: "teacherlogin",
  initialState: teacherLoginState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.teacher = action.payload;
      state.isLoggedIn = true;
      state.err = [];
    }),
      builder.addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.teacher = teacherLoginState.teacher;
        state.err = Array.isArray(action.payload)
          ? [...action.payload]
          : [JSON.stringify(action.payload)];
      });
    builder.addCase(logout.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.loading = false;
      state.teacher = action.payload;
      state.isLoggedIn = false;
      state.err = [];
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.loading = false;
      state.teacher = teacherLoginState.teacher;
      state.err = Array.isArray(action.payload)
        ? [...action.payload]
        : [JSON.stringify(action.payload)];
    });
  },
});

export default teacherloginSlice.reducer;
