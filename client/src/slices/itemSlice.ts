import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { toastFail, toastSuccess } from "./userSlice";

const API_ENDPOINT_ITEMS =
  "https://shoppinglist-api-mkt.herokuapp.com/api/a1/shoppingItems";
axios.defaults.headers.post["Content-Type"] = "application/json";

// Types
export interface IItemInfo {
  _id: string;
  name: string;
  user: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface IInitState {
  itemInfo: {
    success?: boolean;
    totalCount?: number;
    data?: IItemInfo[];
  };
  singleItem: {
    success?: boolean;
    totalCount?: number;
    data?: IItemInfo;
  };
  error: any;
  loading: boolean;

  änderungen?: boolean;
}

// extraReducers CRUD operations
export const getItems = createAsyncThunk(
  "item/getItems",
  async (_, thunkApi) => {
    try {
      const { data } = await axios.get(API_ENDPOINT_ITEMS);
      // console.log(data);
      return data;
    } catch (error) {
      thunkApi.dispatch(toastFail(error.response.data.message));
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  }
);
export const addItem = createAsyncThunk(
  "item/addItem",
  async (
    { name }: { name: string },
    { dispatch, getState, rejectWithValue }
  ) => {
    try {
      // get user credentials
      const {
        user: { userInfo },
      } = getState() as RootState;

      // Bearer Token
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(API_ENDPOINT_ITEMS, { name }, config);
      // console.log(data);
      dispatch(toastSuccess("Item erfolgreich eingefügt"));
      return data;
    } catch (error) {
      dispatch(toastFail(error.response.data.message));
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const deleteItem = createAsyncThunk(
  "item/deleteItem",
  async (
    { userId }: { userId: string },
    { dispatch, getState, rejectWithValue }
  ) => {
    try {
      // get user credentials
      const {
        user: { userInfo },
      } = getState() as RootState;

      // Bearer Token
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.delete(
        `${API_ENDPOINT_ITEMS}/${userId}`,
        config
      );
      // console.log(userId);
      dispatch(toastSuccess("Item wurde gelöscht"));
      return data;
    } catch (error) {
      dispatch(toastFail(error.response.data.message));
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getItemById = createAsyncThunk(
  "item/getItemById",
  async ({ id }: { id: string }, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API_ENDPOINT_ITEMS}/${id}`);
      return data;
    } catch (error) {
      dispatch(toastFail(error.response.data.message));
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateItem = createAsyncThunk(
  "item/updateItem",
  async (
    { name, id }: { name: string; id: string },
    { dispatch, getState, rejectWithValue }
  ) => {
    try {
      // get user credentials
      const {
        user: { userInfo },
      } = getState() as RootState;

      // Bearer Token
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.put(
        `${API_ENDPOINT_ITEMS}/${id}`,
        { name },
        config
      );
      // console.log(userId);
      dispatch(toastSuccess("Item wurde geändert"));
      return data;
    } catch (error) {
      dispatch(toastFail(error.response.data.message));
      return rejectWithValue(error.response.data.message);
    }
  }
);
//==================================== ADMIN============================
export const deleteItemAdmin = createAsyncThunk(
  "item/deleteItemAdmin",
  async ({ id }: { id: string }, { dispatch, getState, rejectWithValue }) => {
    try {
      // get user credentials
      const {
        user: { userInfo },
      } = getState() as RootState;

      // Bearer Token
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.delete(
        `${API_ENDPOINT_ITEMS}/admin/${id}`,
        config
      );
      // console.log(userId);
      dispatch(toastSuccess("Item wurde gelöscht (ADMIN)"));
      return data;
    } catch (error) {
      dispatch(toastFail(error.response.data.message));
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateItemAdmin = createAsyncThunk(
  "item/updateItemAdmin",
  async (
    { name, id }: { name: string; id: string },
    { dispatch, getState, rejectWithValue }
  ) => {
    try {
      // get user credentials
      const {
        user: { userInfo },
      } = getState() as RootState;

      // Bearer Token
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.put(
        `${API_ENDPOINT_ITEMS}/admin/${id}`,
        { name },
        config
      );
      // console.log(userId);
      dispatch(toastSuccess("Item wurde geändert (ADMIN)"));
      return data;
    } catch (error) {
      dispatch(toastFail(error.response.data.message));
      return rejectWithValue(error.response.data.message);
    }
  }
);
// initState
const initState: IInitState = {
  // as response from server
  itemInfo: {},
  singleItem: {},
  // extra
  error: "",
  loading: false,
};

// slice
export const itemSlice = createSlice({
  name: "item",
  initialState: initState,
  reducers: {
    clearState: (state) => {
      state.singleItem = {};
      state.änderungen = false;
      return state;
    },
  },
  //==================== EXTRA REDUCERS===========================================
  extraReducers: (builder) => {
    // pending
    builder.addCase(getItems.pending, (state) => {
      state.loading = true;
    });
    // fullfilled
    builder.addCase(getItems.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.itemInfo = payload;
    });
    // rejected
    builder.addCase(getItems.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    //==================== ADD ITEM===========================================
    // pending
    builder.addCase(addItem.pending, (state) => {
      state.loading = true;
    });
    // fullfilled
    builder.addCase(addItem.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.itemInfo.data?.push(payload.data);
    });
    // rejected
    builder.addCase(addItem.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    //=========================== DELETE ITEM========================
    // pending
    builder.addCase(deleteItem.pending, (state) => {
      state.loading = true;
    });
    // fullfilled
    builder.addCase(deleteItem.fulfilled, (state) => {
      state.loading = false;
      state.änderungen = true;
    });
    // rejected
    builder.addCase(deleteItem.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    //============================ GET ITEM BY ID==========================
    // pending
    builder.addCase(getItemById.pending, (state) => {
      state.loading = true;
    });
    // fullfilled
    builder.addCase(getItemById.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.singleItem = payload;
    });
    // rejected
    builder.addCase(getItemById.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    //=========================== UPDATE ITEM====================
    // pending
    builder.addCase(updateItem.pending, (state) => {
      state.loading = true;
    });
    // fullfilled
    builder.addCase(updateItem.fulfilled, (state) => {
      state.loading = false;
      state.änderungen = true;
    });
    // rejected
    builder.addCase(updateItem.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    //=========================== DELETE ITEM ADMIN====================
    // pending
    builder.addCase(deleteItemAdmin.pending, (state) => {
      state.loading = true;
    });
    // fullfilled
    builder.addCase(deleteItemAdmin.fulfilled, (state) => {
      state.loading = false;
      state.änderungen = true;
    });
    // rejected
    builder.addCase(deleteItemAdmin.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    //=========================== UPDATE ITEM ADMIN====================
    // pending
    builder.addCase(updateItemAdmin.pending, (state) => {
      state.loading = true;
    });
    // fullfilled
    builder.addCase(updateItemAdmin.fulfilled, (state) => {
      state.loading = false;
      state.änderungen = true;
    });
    // rejected
    builder.addCase(updateItemAdmin.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export const { clearState } = itemSlice.actions;
