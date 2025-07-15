// App.tsx
import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Onboarding from "./pages/Onboarding";
import { useFont } from "./FontContext";
import { useEffect } from "react";
import type { UserData } from "./models/userData";

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

function AppRoutes() {
  const { enableFont, disableFont } = useFont();
  const location = useLocation();

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      let storedData = JSON.parse(userData) as UserData;
      if (storedData.disabilities.includes("dyslexia")) {
        enableFont();
      } else {
        disableFont();
      }
    }
  }, [location.pathname]);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index path="/" element={<Home />} />
        <Route path="/onboarding" element={<Onboarding />} />
      </Route>
    </Routes>
  );
}

export default App;
