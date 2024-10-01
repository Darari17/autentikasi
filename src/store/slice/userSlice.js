import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosIns } from "../../lib/axios";

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (userData) => {
    const response = await axiosIns.post("/users", userData);
    return response.data;
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userData, { getState }) => {
    const { users } = getState().user;
    const user = users.find(
      (u) =>
        u.username === userData.username && u.password === userData.password
    );
    if (user) {
      return user;
    } else {
      throw new Error("Invalid Credentials");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    currentUser: null,
    isAuth: false,
    status: "idle",
    error: null,
  },
  reducers: {
    logoutUser: (state) => {
      state.currentUser = null;
      state.isAuth = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // untuk register
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users.push(action.payload);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // untuk login
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentUser = action.payload;
        state.isAuth = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
