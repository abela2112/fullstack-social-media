import "./App.css";

import {
  Navigate,
  Route,
  Routes,
} from "../node_modules/react-router-dom/dist/index";
import LoginPage from "scenes/loginpage/index";
import HomePage from "scenes/homepage/index";
import ProfilePage from "scenes/profilepage/index";
import { useMemo } from "react";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { themeSettings } from "theme";
import { useSelector } from "react-redux";
import axios from "axios";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));
  const token = useSelector((state) => state.token);
  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  axios.defaults.headers.post["Content-Type"] = "application/json";
  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route index element={<LoginPage />} />

          <Route
            path="/home"
            element={isAuth ? <HomePage /> : <Navigate to={"/"} />}
          />
          <Route
            path="/profile/:userId"
            element={isAuth ? <ProfilePage /> : <Navigate to={"/"} />}
          />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
