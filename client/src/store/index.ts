import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "../slices/userSlice";
import { itemSlice } from "../slices/itemSlice";

const userInfoFromLocalStorage = () => {
  const userInfo = localStorage.getItem("userInfo");
  if (userInfo) {
    return JSON.parse(userInfo);
  } else {
    return {
      username: "",
      email: "",
      _id: "",
      token: "",
    };
  }
};

interface IPreloadedState {
  user: {
    userInfo: any;
    error: string;
    loading: boolean;
    type: "default";
    msg: string;
  };
}

const preloadedState: IPreloadedState = {
  user: {
    userInfo: userInfoFromLocalStorage(),
    error: "",
    loading: false,
    type: "default",
    msg: "",
  },
};
export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    item: itemSlice.reducer,
  },
  preloadedState,
});

export type RootState = ReturnType<typeof store.getState>;
