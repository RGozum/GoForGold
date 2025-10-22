import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import App from "./App.jsx";
import AdminPanel from "./pages/Hello.jsx";
import AccountCreation from "./pages/AccountCreation.jsx";
import SignUp from "./pages/SignUp.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "adminpanel", element: <AdminPanel /> },
      { path: "accountcreation", element: <AccountCreation /> },
      {path: "signup", element: <SignUp />}
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
