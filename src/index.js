import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { UserProvider } from "./components/UserContext";

const root = document.getElementById("root");

const reactRoot = ReactDOM.createRoot(root);

reactRoot.render(
  <UserProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </UserProvider>
);
