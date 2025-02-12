import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HeroUIProvider } from "@heroui/react";
import { AuthProvider } from "./context/authProvider.jsx";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <AuthProvider>
    <HeroUIProvider>
      <App />
    </HeroUIProvider>
  </AuthProvider>
  //  </StrictMode>
);
