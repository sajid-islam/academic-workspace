import { configureStore } from "@reduxjs/toolkit";

import { userApi } from "./apis/user/user.slice";
import ThemeReducer from "./stores/theme/theme.slice";

export const store = configureStore({
  reducer: {
    theme: ThemeReducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(userApi.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
