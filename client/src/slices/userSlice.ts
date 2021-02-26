import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_ENDPOINT_USERS =
  "https://shoppinglist-api-mkt.herokuapp.com/api/a1/users";
axios.defaults.headers.post["Content-Type"] = "application/json";

// Types
interface IUserInfo {
  username: string;
  email: string;
  _id: string;
  token: string;
  success: boolean;
  role?: "benutzer" | "admin";
}

interface IInitState {
  userInfo: IUserInfo;
  error: any;
  loading: boolean;
  msg: string;
  type: "success" | "error" | "default";
}
// ASYNC OPERATIONS as extrareducers
// register
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (
    {
      username,
      password,
      email,
    }: { username: string; password: string; email: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const { data } = await axios.post(`${API_ENDPOINT_USERS}/register`, {
        username,
        password,
        email,
      });
      // console.log(data);
      dispatch(userSlice.actions.toastSuccess("erfolgreich registriert"));
      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      // console.log(error.response.data.message);
      dispatch(userSlice.actions.toastFail(error.response.data.message));

      return rejectWithValue(error.response.data.message);
    }
  }
);
// login
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (
    { email, password }: { email: string; password: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const { data } = await axios.post(`${API_ENDPOINT_USERS}/login`, {
        email,
        password,
      });
      dispatch(userSlice.actions.toastSuccess("erfolgreich eingeloggt"));
      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      dispatch(userSlice.actions.toastFail(error.response.data.message));

      return rejectWithValue(error.response.data.message);
    }
  }
);
// logout
export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (_, { dispatch, rejectWithValue }) => {
    dispatch(userSlice.actions.toastSuccess("erfolgreich ausgeloggt"));
    localStorage.removeItem("userInfo");
    return initState;
  }
);

// initState
const initState: IInitState = {
  // as response from server
  userInfo: {
    username: "",
    email: "",
    _id: "",
    token: "",

    success: false,
  },
  // extra
  error: "",
  loading: false,
  type: "default",
  msg: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState: initState,
  reducers: {
    // logoutUser: (state) => {
    //   localStorage.removeItem("userInfo");
    //   return (state = initState)
    // },
    toastSuccess: (state, { payload }: { payload: string }) => {
      state.msg = payload;
      state.type = "success";
      return state;
    },
    toastFail: (state, { payload }: { payload: string }) => {
      state.msg = payload;
      state.type = "error";
      return state;
    },
    clearToast: (state) => {
      state.msg = "";
      state.type = "default";
      return state;
    },
  },
  extraReducers:
    // REGISTER
    // pending
    (builder) => {
      builder.addCase(registerUser.pending, (state) => {
        state.loading = true;
      });
      // fullfilled
      builder.addCase(registerUser.fulfilled, (state, { payload }) => {
        // console.log(payload);
        state.loading = false;
        state.error = "";
        state.userInfo = payload;
      });
      // rejected
      builder.addCase(registerUser.rejected, (state, { payload }) => {
        // console.log(payload);
        state.loading = false;
        state.error = payload;
      });
      builder.addCase(loginUser.pending, (state) => {
        state.loading = true;
      });
      // fullfilled
      builder.addCase(loginUser.fulfilled, (state, { payload }) => {
        // console.log(payload);
        state.loading = false;
        state.error = "";
        state.userInfo = payload;
      });
      // rejected
      builder.addCase(loginUser.rejected, (state, { payload }) => {
        // console.log(payload);
        state.loading = false;
        state.error = payload;
      });
      // LOGOUT
      builder.addCase(logoutUser.fulfilled, (state) => {
        // console.log(payload);

        return initState;
      });
    },
});

// export actions => actions and reducer name are the same
export const { clearToast, toastSuccess, toastFail } = userSlice.actions;
