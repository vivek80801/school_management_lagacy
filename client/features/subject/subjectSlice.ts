import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { serverURL } from "../../constants";

interface ISubject {
  loading: boolean;
  subjects: Array<{ id: number; subject_name: string }>;
  err: Array<string>;
}

const subjectState: ISubject = {
  subjects: [],
  err: [],
  loading: false,
};

export const getAllSubjects = createAsyncThunk(
  "subject/getSubject",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(serverURL + "/subject/index.php");
      const data: {
        msg: string;
        data: { id: number; subject_name: string }[];
      } = await res.json();
      if (data.msg === "ok") {
        return data.data;
      } else {
        rejectWithValue(data);
      }
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const createSubject = createAsyncThunk(
  "subject/createSubject",
  async (subject: string, { rejectWithValue }) => {
    try {
      const res = await fetch(serverURL + "/subject/index.php", {
        method: "POST",
        body: JSON.stringify({ subject }),
      });
      const data: {
        msg: string;
        data: { id: number; subject_name: string }[];
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

export const deleteSubject = createAsyncThunk(
  "subject/deleteSubject",
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await fetch(serverURL + "/subject/index.php", {
        method: "DELETE",
        body: JSON.stringify({ id }),
      });
      const data: {
        msg: string;
        data: { id: number; subject_name: string }[];
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

export const editSubject = createAsyncThunk(
  "subject/editSubject",
  async (
    { subjectName, id }: { subjectName: string; id: number },
    { rejectWithValue }
  ) => {
    try {
      const res = await fetch(serverURL + "/subject/index.php", {
        method: "PUT",
        body: JSON.stringify({ subjectName, id }),
      });
      const data: {
        msg: string;
        data: { id: number; subject_name: string }[];
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

const subjectSlice = createSlice({
  name: "subject",
  initialState: subjectState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllSubjects.pending, (state) => {
      state.loading = true;
      state.err = [];
    });
    builder.addCase(getAllSubjects.fulfilled, (state, action) => {
      state.loading = false;
      state.subjects = action.payload === undefined ? [] : action.payload;
    });
    builder.addCase(getAllSubjects.rejected, (state, action) => {
      state.loading = false;
      state.err = Array.isArray(action.payload)
        ? [...action.payload]
        : [action.payload];
    });
    builder.addCase(createSubject.pending, (state) => {
      state.loading = true;
      state.err = [];
    });
    builder.addCase(createSubject.fulfilled, (state, action) => {
      state.loading = false;
      state.subjects = action.payload === undefined ? [] : action.payload;
    });
    builder.addCase(createSubject.rejected, (state, action) => {
      state.loading = false;
      state.err = Array.isArray(action.payload)
        ? [...action.payload]
        : [action.payload];
    });
    builder.addCase(editSubject.pending, (state) => {
      state.loading = true;
      state.err = [];
    });
    builder.addCase(editSubject.fulfilled, (state, action) => {
      state.loading = false;
      state.subjects = action.payload === undefined ? [] : action.payload;
    });
    builder.addCase(editSubject.rejected, (state, action) => {
      state.loading = false;
      state.err = Array.isArray(action.payload)
        ? [...action.payload]
        : [action.payload];
    });
    builder.addCase(deleteSubject.pending, (state) => {
      state.loading = true;
      state.err = [];
    });
    builder.addCase(deleteSubject.fulfilled, (state, action) => {
      state.loading = false;
      state.subjects = action.payload === undefined ? [] : action.payload;
    });
    builder.addCase(deleteSubject.rejected, (state, action) => {
      state.loading = false;
      state.err = Array.isArray(action.payload)
        ? [...action.payload]
        : [action.payload];
    });
  },
});

export default subjectSlice.reducer;
