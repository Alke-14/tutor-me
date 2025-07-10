import "./App.css";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import Home from "./pages/Home";
import Onboarding from "./pages/Onboarding";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index path="/" element={<Home />} />
            <Route path="/onboarding" element={<Onboarding />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
