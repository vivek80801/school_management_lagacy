import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { serverURL } from "../../constants";

interface IFee {
  fees: any[];
  err: string[];
  loading: boolean;
}

const feeState: IFee = {
  fees: [],
  err: [],
  loading: false,
};

const getFees = createAsyncThunk(
  "fee/getFees",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(serverURL + "/fees/create_fee.php");
      const data: {
        data: {
          id: number;
          class_name: string;
          class: number;
          fee: number;
        }[];
        msg: "ok";
      } = await res.json();
      if (data.msg === "ok") {
        return data.data;
      }
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

const handleCreateFee = createAsyncThunk(
  "fee/createFee",
  async (
    { fee, classForStudent }: { fee: number; classForStudent: number },
    { rejectWithValue }
  ) => {
    try {
      const res = await fetch(serverURL + "/fees/create_fee.php", {
        method: "POST",
        body: JSON.stringify({ fee, classForStudent }),
      });
      const data = await res.json();
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

const handleFeeRecevie = createAsyncThunk(
  "fee/feeRecevie",
  async (
    { id, amount }: { id: number; amount: number },
    { rejectWithValue }
  ) => {
    try {
      const res = await fetch(serverURL + "/fees/receive_fee.php", {
        method: "POST",
        body: JSON.stringify({ id, amount }),
      });
      const data = await res.json();
      if (data.msg === "ok") {
        return data.data;
      }
      console.log(data.data);
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

const feeSlice = createSlice({
  name: "fee",
  initialState: feeState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(handleFeeRecevie.pending, (state) => {
      state.loading = true;
      state.err = [];
    });
    builder.addCase(handleFeeRecevie.fulfilled, (state, action) => {
      state.loading = false;
      state.fees = action.payload;
      state.err = [];
    });
    builder.addCase(handleFeeRecevie.rejected, (state, action) => {
      state.loading = false;
      state.err = Array.isArray(action.payload)
        ? [...action.payload]
        : [action.payload];
    });
    builder.addCase(handleCreateFee.pending, (state) => {
      state.loading = true;
      state.err = [];
    });
    builder.addCase(handleCreateFee.fulfilled, (state, action) => {
      state.loading = false;
      state.fees = action.payload;
      state.err = [];
    });
    builder.addCase(handleCreateFee.rejected, (state, action) => {
      state.loading = false;
      state.err = Array.isArray(action.payload)
        ? [...action.payload]
        : [action.payload];
    });
    builder.addCase(getFees.pending, (state) => {
      state.loading = true;
      state.err = [];
    });
    builder.addCase(getFees.fulfilled, (state, action) => {
      state.loading = false;
      state.fees = action.payload !== undefined ? action.payload : [];
      state.err = [];
    });
    builder.addCase(getFees.rejected, (state, action) => {
      state.loading = false;
      state.err = Array.isArray(action.payload)
        ? [...action.payload]
        : [action.payload];
    });
  },
});

export default feeSlice.reducer;
