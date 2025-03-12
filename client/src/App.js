import "./App.css";

import {
  Navigate,
  Route,
  Routes,
} from "../node_modules/react-router-dom/dist/index";
import LoginPage from "scenes/loginpage/index";
import HomePage from "scenes/homepage/index";
import ProfilePage from "scenes/profilepage/index";
import { useEffect, useMemo } from "react";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { themeSettings } from "theme";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import SettingPage from "scenes/SettingPage";
import RegisterPage from "scenes/signuppage";
import EditProfilePage from "scenes/editProfile";
import ChatHomepage from "scenes/chat/ChatHomepage";
import ChatPage from "scenes/chat/ChatHomepage";
import { getSocket } from "socketio";
import { setOnlineUsers } from "state";

function App() {
  const mode = useSelector((state) => state.auth.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.auth.token));

  const token = useSelector((state) => state?.auth?.token);
  axios.defaults.baseURL = "http://localhost:4000/";
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  axios.defaults.headers.post["Content-Type"] = "application/json";

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route index element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route
            path="/home"
            element={isAuth ? <HomePage /> : <Navigate to={"/"} />}
          />

          <Route
            path="/profile/:userId/edit"
            element={isAuth ? <EditProfilePage /> : <Navigate to={"/"} />}
          />
          <Route
            path="/profile/:userId"
            element={isAuth ? <ProfilePage /> : <Navigate to={"/"} />}
          />

          <Route
            path="/settings"
            element={isAuth ? <SettingPage /> : <Navigate to={"/"} />}
          />

          <Route
            path="/chat"
            element={isAuth ? <ChatPage /> : <Navigate to={"/"} />}
          />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
