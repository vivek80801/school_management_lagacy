import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { serverURL } from "../../constants";

interface IHomework {
  homework: {
    title: string;
    classs: { id: number; class_name: string };
    section: { id: number; section: string };
    subject: { id: number; subject_name: string };
    homework: string;
    created_by: number;
  }[];
  loading: boolean;
  err: [];
}

const homeworkState: IHomework = {
  homework: [],
  loading: false,
  err: [],
};

export const createHomework = createAsyncThunk(
  "homeWork/createHomeWork",
  async (
    {
      title,
      classs,
      section,
      subject,
      homework,
      created_by,
    }: {
      title: string;
      classs: { id: number; class_name: string };
      section: { id: number; section: string };
      subject: { id: number; subject_name: string };
      homework: string;
      created_by: number;
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await fetch(serverURL + "/homework/index.php", {
        method: "POST",
        body: JSON.stringify({
          title,
          classs,
          section,
          subject,
          homework,
          created_by,
        }),
      });
      const data = await res.json();
      if (data.msg) {
        return data.data;
      } else {
        return rejectWithValue("something went wrong");
      }
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

const homeworkSlice = createSlice({
  name: "homework",
  initialState: homeworkState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createHomework.pending, (state) => {
      state.loading = true;
      state.err = [];
    });
    builder.addCase(createHomework.fulfilled, (state, action) => {
      state.loading = false;
      state.homework = action.payload;
      state.err = [];
    });
    builder.addCase(createHomework.rejected, (state, action) => {
      state.loading = false;
      state.err = Array.isArray(action.payload)
        ? [...action.payload]
        : [action.payload];
    });
  },
});

export default homeworkSlice.reducer;
