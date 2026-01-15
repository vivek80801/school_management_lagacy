import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { serverURL } from "../../constants";

interface ITeacher {
  loading: boolean;
  err: Array<string>;
  teachers: Array<{
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
  }>;
}

export const editTeacher = createAsyncThunk(
  "teacher/editTeacher",
  async (
    {
      id,
      teacherName,
      classes,
      subjects,
    }: {
      id: number;
      teacherName: string;
      classes: Array<{
        id: number;
        class_name: number;
      }>;
      subjects: Array<{ id: number; subject_name: number }>;
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await fetch(serverURL + "/teacher/index.php", {
        method: "PUT",
        body: JSON.stringify({
          id,
          teacherName,
          classes,
          subjects,
        }),
      });
      const data: { msg: string } = await res.json();
      if (data.msg === "ok") {
        return data;
      } else {
        return rejectWithValue("something went worng");
      }
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const deleteTeacher = createAsyncThunk(
  "teacher/deleteTeacher",
  async ({ id }: { id: number }, { rejectWithValue }) => {
    try {
      const res = await fetch(serverURL + "/teacher/index.php", {
        method: "DELETE",
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.msg === "ok") {
        return data;
      } else {
        return rejectWithValue("something went worng");
      }
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const login = createAsyncThunk(
  "teacher/login",
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
        return data.data;
      } else {
        return rejectWithValue("something went worng");
      }
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const createTeacher = createAsyncThunk(
  "teacher/createTeacher",
  async (
    {
      nameOfTeacher,
      subjects,
      classes,
      password,
    }: {
      nameOfTeacher: string;
      subjects: Array<{
        id: number;
        subject_name: number;
      }>;
      classes: Array<{
        id: number;
        class_name: number;
      }>;
      password: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await fetch(serverURL + "/teacher/index.php", {
        method: "POST",
        body: JSON.stringify({
          nameOfTeacher,
          subjects,
          classes,
          password,
        }),
      });
      const data = await res.json();
      if (data.msg === "ok") {
        return data;
      } else {
        return rejectWithValue("something went wrong");
      }
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const getAllTeachers = createAsyncThunk(
  "teacher/getTeachers",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(serverURL + "/teacher/index.php");
      const data: {
        msg: string;
        data: {
          id: number;
          name: string;
          subjects: Array<{
            id: number;
            subject_id: number;
            teacher_id: number;
            subject_name: string;
          }>;
          classes: Array<{
            id: number;
            class_id: number;
            teacher_id: number;
            class_name: string;
          }>;
        }[];
      } = await res.json();
      if (data.msg === "ok") {
        return data.data;
      } else {
        return rejectWithValue("something went worng");
      }
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

const teacherState: ITeacher = {
  teachers: [],
  err: [],
  loading: false,
};

const teacherSlice = createSlice({
  name: "teacher",
  initialState: teacherState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllTeachers.pending, (state) => {
      state.loading = true;
      state.err = [];
    });
    builder.addCase(getAllTeachers.fulfilled, (state, action) => {
      state.loading = false;
      state.teachers = action.payload;
      state.err = [];
    });
    builder.addCase(getAllTeachers.rejected, (state, action) => {
      state.loading = false;
      state.err = Array.isArray(action.payload)
        ? [...action.payload]
        : [action.payload];
    });
    builder.addCase(createTeacher.pending, (state) => {
      state.loading = true;
      state.err = [];
    });
    builder.addCase(createTeacher.fulfilled, (state, action) => {
      state.loading = false;
      state.err = [];
    });
    builder.addCase(createTeacher.rejected, (state, action) => {
      state.loading = false;
      state.err = Array.isArray(action.payload)
        ? [...action.payload]
        : [action.payload];
    });
    builder.addCase(editTeacher.pending, (state) => {
      state.loading = true;
      state.err = [];
    });
    builder.addCase(editTeacher.fulfilled, (state, action) => {
      state.loading = false;
      state.err = [];
    });
    builder.addCase(editTeacher.rejected, (state, action) => {
      state.loading = false;
      state.err = Array.isArray(action.payload)
        ? [...action.payload]
        : [action.payload];
    });
    builder.addCase(deleteTeacher.pending, (state) => {
      state.loading = true;
      state.err = [];
    });
    builder.addCase(deleteTeacher.fulfilled, (state, action) => {
      state.loading = false;
      state.err = [];
    });
    builder.addCase(deleteTeacher.rejected, (state, action) => {
      state.loading = false;
      state.err = Array.isArray(action.payload)
        ? [...action.payload]
        : [action.payload];
    });
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.err = [];
    });
    builder.addCase(login.fulfilled, (state) => {
      state.loading = false;
      state.err = [];
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.err = Array.isArray(action.payload)
        ? [...action.payload]
        : [action.payload];
    });
  },
});

export default teacherSlice.reducer;
