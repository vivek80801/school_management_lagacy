import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { serverURL } from "../../constants";

interface IStudent {
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
  password: string;
}

interface InitialState {
  loading: boolean;
  students: IStudent[];
  err: Array<string>;
}

const initialState: InitialState = {
  loading: false,
  students: [],
  err: [],
};

export const getStudents = createAsyncThunk(
  "user/getStudents",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(serverURL + "/students/students.php");
      const data: {
        msg: "ok";
        data: {
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
          password: string;
        }[];
      } = await res.json();
      if (data.msg === "ok") {
        return data.data;
      } else {
        return rejectWithValue(data);
      }
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const createStudent = createAsyncThunk(
  "student/createStudent",
  async (
    {
      name,
      father_name,
      father_work,
      mother_name,
      mother_work,
      classForStudent,
      section,
      addmitionDate,
      password,
    }: {
      name: string;
      father_name: string;
      father_work: string;
      mother_name: string;
      mother_work: string;
      classForStudent: string;
      section: string;
      addmitionDate: string;
      password: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await fetch(serverURL + "/students/register.php", {
        method: "POST",
        body: JSON.stringify({
          name: name,
          fatherName: father_name,
          fatherWork: father_work,
          motherName: mother_name,
          motherWork: mother_work,
          classForStudent: classForStudent,
          section: section,
          addmitionDate: addmitionDate,
          password: password,
        }),
      });
      const data: {
        msg: "ok";
        data: {
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
          password: string;
        }[];
      } = await res.json();
      if (data.msg === "ok") {
        return data.data;
      } else {
        return rejectWithValue(data);
      }
    } catch (e) {
      rejectWithValue(e);
    }
  }
);

export const deleteStudentById = createAsyncThunk(
  "student/deleteStudent",
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await fetch(serverURL + "/students/students.php", {
        method: "DELETE",
        body: JSON.stringify({ id }),
      });
      const data: {
        msg: "ok";
        data: {
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
        }[];
      } = await res.json();
      if (data.msg === "ok") {
        return data.data;
      } else {
        return rejectWithValue(data);
      }
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const editStudentById = createAsyncThunk(
  "student/editStudent",
  async (
    {
      name,
      father_name,
      father_work,
      mother_name,
      mother_work,
      classForStudent,
      section,
      rollNo,
      id,
    }: {
      name: string;
      father_name: string;
      father_work: string;
      mother_name: string;
      mother_work: string;
      classForStudent: number;
      section: number;
      id: number;
      rollNo: number;
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await fetch(serverURL + "/students/students.php", {
        method: "PUT",
        body: JSON.stringify({
          id,
          name,
          fatherName: father_name,
          fatherWork: father_work,
          motherName: mother_name,
          motherWork: mother_work,
          class: classForStudent,
          section: section,
          rollNo,
        }),
      });
      const data = await res.json();
      if (data.msg === "ok") {
        return data.data;
      } else {
        return rejectWithValue(data);
      }
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

const studentSlice = createSlice({
  name: "student",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getStudents.pending, (state) => {
      state.loading = true;
      state.err = [];
    });
    builder.addCase(getStudents.fulfilled, (state, action) => {
      state.loading = false;
      state.students = action.payload;
    });
    builder.addCase(getStudents.rejected, (state, action) => {
      state.loading = false;
      state.err = Array.isArray(action.payload)
        ? [...action.payload]
        : [action.payload];
    });
    builder.addCase(createStudent.pending, (state) => {
      state.loading = true;
      state.err = [];
    });
    builder.addCase(createStudent.fulfilled, (state, action) => {
      state.loading = false;
      state.students = action.payload === undefined ? [] : action.payload;
    });
    builder.addCase(createStudent.rejected, (state, action) => {
      state.loading = false;
      state.err = Array.isArray(action.payload)
        ? [...action.payload]
        : [action.payload];
    });
    builder.addCase(editStudentById.pending, (state) => {
      state.loading = true;
      state.err = [];
    });
    builder.addCase(editStudentById.fulfilled, (state, action) => {
      state.loading = false;
      state.students = action.payload === undefined ? [] : action.payload;
    });
    builder.addCase(editStudentById.rejected, (state, action) => {
      state.loading = false;
      state.err = Array.isArray(action.payload)
        ? [...action.payload]
        : [action.payload];
    });
    builder.addCase(deleteStudentById.pending, (state) => {
      state.loading = true;
      state.err = [];
    });
    builder.addCase(deleteStudentById.fulfilled, (state, action) => {
      state.loading = false;
      state.students = action.payload === undefined ? [] : action.payload;
    });
    builder.addCase(deleteStudentById.rejected, (state, action) => {
      state.loading = false;
      state.err = Array.isArray(action.payload)
        ? [...action.payload]
        : [action.payload];
    });
  },
});

export default studentSlice.reducer;
