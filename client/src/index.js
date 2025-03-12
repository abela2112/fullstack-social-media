import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { BrowserRouter } from "../node_modules/react-router-dom/dist/index";
import authReducer from "state";
import messageReducer from "state/messages";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import {
  persistReducer,
  persistStore,
  PAUSE,
  PURGE,
  PERSIST,
  REGISTER,
  REHYDRATE,
  FLUSH,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";
const persistConfig = { key: "root", storage, version: 1 };
// Combine reducers
const rootReducer = combineReducers({
  message: messageReducer,
  auth: authReducer,
});
// Persist the combined reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// const persistedReducer = persistReducer(persistConfig, authReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [PAUSE, PURGE, PERSIST, REGISTER, REHYDRATE, FLUSH],
      },
    }),
});
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
