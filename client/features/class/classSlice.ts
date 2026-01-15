import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { serverURL } from "../../constants";

interface IClass {
  classes: Array<{
    class_name: string;
    id: number;
  }>;
  err: string[];
  loading: boolean;
}

const classState: IClass = {
  classes: [],
  err: [],
  loading: false,
};

export const deleteClassById = createAsyncThunk(
  "class/deleteClass",
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await fetch(serverURL + "/class/class.php", {
        method: "DELETE",
        body: JSON.stringify({ id }),
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

export const createClass = createAsyncThunk(
  "class/createClass",
  async (newClass: string, { rejectWithValue }) => {
    try {
      const res = await fetch(serverURL + "/class/create_class.php", {
        method: "POST",
        body: JSON.stringify({ newClass }),
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

export const getAllClassess = createAsyncThunk(
  "class/getClassess",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(serverURL + "/class/class.php");
      const data: {
        data: { class_name: string; id: number }[];
        msg: "ok";
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

export const editClass = createAsyncThunk(
  "classs/editClass",
  async (
    { className, id }: { className: string; id: number },
    { rejectWithValue }
  ) => {
    try {
      const res = await fetch(serverURL + "/class/class.php", {
        method: "PUT",
        body: JSON.stringify({ className, id }),
      });
      const data: {
        data: { class_name: string; id: number }[];
        msg: "ok";
      } = await res.json();
      return data.data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

const classSlice = createSlice({
  name: "class",
  initialState: classState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllClassess.pending, (state) => {
      state.loading = true;
      state.err = [];
    });
    builder.addCase(getAllClassess.fulfilled, (state, action) => {
      state.loading = false;
      state.classes = action.payload;
      state.err = [];
    });
    builder.addCase(getAllClassess.rejected, (state, action) => {
      state.loading = false;
      state.err = Array.isArray(action.payload)
        ? [...action.payload]
        : [action.payload];
    });
    builder.addCase(createClass.pending, (state) => {
      state.loading = true;
      state.err = [];
    });
    builder.addCase(createClass.fulfilled, (state, action) => {
      state.loading = false;
      state.classes = action.payload;
      state.err = [];
    });
    builder.addCase(createClass.rejected, (state, action) => {
      state.loading = false;
      state.err = Array.isArray(action.payload)
        ? [...action.payload]
        : [action.payload];
    });
    builder.addCase(deleteClassById.pending, (state) => {
      state.loading = true;
      state.err = [];
    });
    builder.addCase(deleteClassById.fulfilled, (state, action) => {
      state.loading = false;
      state.classes = action.payload;
      state.err = [];
    });
    builder.addCase(deleteClassById.rejected, (state, action) => {
      state.loading = false;
      state.err = Array.isArray(action.payload)
        ? [...action.payload]
        : [action.payload];
    });
    builder.addCase(editClass.pending, (state) => {
      state.loading = true;
      state.err = [];
    });
    builder.addCase(editClass.fulfilled, (state, action) => {
      state.loading = false;
      state.classes = action.payload;
    });
    builder.addCase(editClass.rejected, (state, action) => {
      state.loading = false;
      state.err = Array.isArray(action.payload)
        ? [...action.payload]
        : [action.payload];
    });
  },
});

export default classSlice.reducer;
