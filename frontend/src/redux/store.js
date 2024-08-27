import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import postReducer from "./post/postSlice";
import chatReducer from "./chat/chatSlice";
import socketReducer from "./socket/socketSlice";
import rtnReducer from "./notification/rtnSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  user: userReducer,
  post: postReducer,
  chat: chatReducer,
  socket: socketReducer,
  rtn:rtnReducer,
});

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
