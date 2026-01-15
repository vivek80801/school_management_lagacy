import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { serverURL } from "../../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface IAuth {
  user: {
    name: string;
    email: string;
  };
  isLoggedIn: boolean;
  loading: boolean;
  err: string[];
}

const authState: IAuth = {
  user: {
    name: "",
    email: "",
  },
  isLoggedIn: false,
  loading: false,
  err: [],
};

export const login = createAsyncThunk(
  "user/login",
  async (user: { name: string; password: string }, { rejectWithValue }) => {
    try {
      const res = await fetch(serverURL + "/login.php", {
        method: "POST",
        body: JSON.stringify({ name: user.name, password: user.password }),
      });
      const data = await res.json();
      if (data.err) {
        return rejectWithValue(data.err);
      }
      if (data.msg === "ok") {
        await AsyncStorage.setItem("jwt", data.jwt);
        await AsyncStorage.setItem("role", "user");
        return data.data;
      }
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const signup = createAsyncThunk(
  "user/signup",
  async (
    user: { username: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await fetch(serverURL + "/signup.php", {
        method: "POST",
        body: JSON.stringify({
          name: user.username,
          email: user.email,
          password: user.password,
        }),
      });
      const data = await res.json();
      if (data.err) {
        return rejectWithValue(data.err);
      }
      if (data.msg === "ok") {
        return data;
      }
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const logout = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(serverURL + "/logout.php");
      const data = await res.json();
      if (data.msg === "ok") {
        await AsyncStorage.removeItem("jwt");
        return;
      } else {
        return rejectWithValue("something happpen");
      }
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: authState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signup.pending, (state) => {
      state.loading = true;
      state.err = [];
    }),
      builder.addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.err = [];
      }),
      builder.addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.err = Array.isArray(action.payload)
          ? [...action.payload]
          : [action.payload];
      });

    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.err = [];
    }),
      builder.addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.err = [];
      }),
      builder.addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.user = authState.user;
        state.err = Array.isArray(action.payload)
          ? [...action.payload]
          : [JSON.stringify(action.payload)];
      });

    builder.addCase(logout.pending, (state) => {
      state.loading = true;
      state.err = [];
    }),
      builder.addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = authState.user;
        state.err = [];
      }),
      builder.addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.err = Array.isArray(action.payload)
          ? [...action.payload]
          : [action.payload];
      });
  },
});

export default authSlice.reducer;
