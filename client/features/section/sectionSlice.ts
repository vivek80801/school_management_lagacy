import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { serverURL } from "../../constants";

interface ISection {
  sections: Array<{
    id: number;
    section: string;
  }>;
  err: string[];
  loading: boolean;
}

const sectionState: ISection = {
  sections: [],
  err: [],
  loading: false,
};

export const getAllSections = createAsyncThunk(
  "section/getSections",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(serverURL + "/section/section.php");
      const data: {
        data: { id: number; section: string }[];
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

export const createSection = createAsyncThunk(
  "section/createSection",
  async (nameOfSection: string, { rejectWithValue }) => {
    try {
      const res = await fetch(serverURL + "/section/create_section.php", {
        method: "POST",
        body: JSON.stringify({ section: nameOfSection }),
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

export const editSectionById = createAsyncThunk(
  "section/editSection",
  async (
    { sectionName, sectionId }: { sectionName: string; sectionId: number },
    { rejectWithValue }
  ) => {
    try {
      const res = await fetch(serverURL + "/section/section.php", {
        method: "PUT",
        body: JSON.stringify({ sectionName, sectionId }),
      });
      const data: {
        data: { id: number; section: string }[];
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

export const deleteSectionById = createAsyncThunk(
  "section/deleteSection",
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await fetch(serverURL + "/section/section.php", {
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

const sectionSlice = createSlice({
  name: "section",
  initialState: sectionState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllSections.pending, (state) => {
      state.loading = true;
      state.err = [];
    }),
      builder.addCase(getAllSections.fulfilled, (state, action) => {
        state.loading = false;
        state.sections = action.payload;
        state.err = [];
      }),
      builder.addCase(getAllSections.rejected, (state, action) => {
        state.loading = false;
        state.err = Array.isArray(action.payload)
          ? [...action.payload]
          : [action.payload];
      }),
      builder.addCase(createSection.pending, (state) => {
        state.loading = true;
        state.err = [];
      });
    builder.addCase(createSection.fulfilled, (state, action) => {
      state.loading = false;
      state.sections = action.payload;
      state.err = [];
    });
    builder.addCase(createSection.rejected, (state, action) => {
      state.loading = false;
      state.err = Array.isArray(action.payload)
        ? [...action.payload]
        : [action.payload];
    });
    builder.addCase(deleteSectionById.pending, (state) => {
      state.loading = true;
      state.err = [];
    });
    builder.addCase(deleteSectionById.fulfilled, (state, action) => {
      state.loading = false;
      state.sections = action.payload;
      state.err = [];
    });
    builder.addCase(deleteSectionById.rejected, (state, action) => {
      state.loading = false;
      state.err = Array.isArray(action.payload)
        ? [...action.payload]
        : [action.payload];
    });
    builder.addCase(editSectionById.pending, (state) => {
      state.loading = true;
      state.err = [];
    });
    builder.addCase(editSectionById.fulfilled, (state, action) => {
      state.loading = false;
      state.sections = action.payload;
      state.err = [];
    });
    builder.addCase(editSectionById.rejected, (state, action) => {
      state.loading = false;
      state.err = Array.isArray(action.payload)
        ? [...action.payload]
        : [action.payload];
    });
  },
});

export default sectionSlice.reducer;
