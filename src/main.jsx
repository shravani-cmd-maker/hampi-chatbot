import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="799415567891-au90u47va2t5qcqcr4nquagmocgdkm6k.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </StrictMode>
);