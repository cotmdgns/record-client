import "./assets/reset.css";
import React from "react";
import ReactDOM from "react-dom/client";
import router from "./router";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { UserSaveListProvider } from "./contexts/UserSaveListContext";
import "../src/assets/completion.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <UserSaveListProvider>
      <RouterProvider router={router} />
    </UserSaveListProvider>
  </AuthProvider>
);
