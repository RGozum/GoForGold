// App.jsx
import React from "react";
import { AuthProvider } from "./AuthContext";
import { Link, Outlet } from "react-router";

function App() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}

export default App;
