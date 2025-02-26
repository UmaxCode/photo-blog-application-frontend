import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { Toaster } from "./components/ui/sonner.tsx";
import { ConfigProvider } from "./contexts/ConfigContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfigProvider>
      <AuthProvider>
        <App />
        <Toaster />
      </AuthProvider>
    </ConfigProvider>
  </StrictMode>
);
