import "./App.css";
import { Button } from "./components/ui/button";
import { BrowserRouter, Routes, Route } from "../node_modules/react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Onboarding from "./pages/Onboarding";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index path="/" element={<Home />} />
          <Route path="/onboarding" element={<Onboarding />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
