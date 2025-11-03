import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import AdminPanel from "./pages/Hello.jsx";
import AccountCreation from "./pages/AccountCreation.jsx";
import LogIn from "./pages/LogIn.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "adminpanel", element: <AdminPanel /> },
      { path: "accountcreation", element: <AccountCreation /> },
      {path: "login", element: <LogIn />}
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
