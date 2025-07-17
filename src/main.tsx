import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { FontProvider } from "./FontContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FontProvider>
      <App />
    </FontProvider>
  </StrictMode>
);
