import "./assets/reset.css";
import React from "react";
import ReactDOM from "react-dom/client";
import router from "./router";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { UserProvider } from "./contexts/userContext";
import "../src/assets/completion.scss";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserProvider>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </UserProvider>
);
