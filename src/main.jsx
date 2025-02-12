import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HeroUIProvider } from "@heroui/react";
import { AuthProvider } from "./context/authProvider.jsx";
import "./index.css";
import App from "./App.jsx";

// Creates the root element where the React app will be rendered
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Wraps the app with authentication provider to manage user login sessions */}
    <AuthProvider>
      {/* Wraps the app with Hero UI provider to use its components */}
      <HeroUIProvider>
        <App /> {/* Main application component that contains all the pages */}
      </HeroUIProvider>
    </AuthProvider>
  </StrictMode>
);
