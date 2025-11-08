import React from "react";
import ReactDOM from "react-dom/client";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import App from "./App.jsx";
import AdminPanel from "./pages/Hello.jsx";
import AccountCreation from "./pages/AccountCreation.jsx";
import LogIn from "./pages/LogIn.jsx";
import StudentDash from "./pages/StudentDash.jsx";
import FacultyDash from "./pages/FacultyDash.jsx";

import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {path: "login", element: <LogIn />},
      {
        path: "adminpanel",
        element: (
          <ProtectedRoute allowedRoles={["Administrator"]}>
              <AdminPanel />
          </ProtectedRoute>
        ),
      },
      {
        path: "accountcreation",
        element: (
          <ProtectedRoute allowedRoles={["Administrator"]}>
              <AccountCreation />
          </ProtectedRoute>
        ),
      },
      {
        path: "studentdashboard",
        element: (
          <ProtectedRoute allowedRoles={["Student"]}>
            <StudentDash />
          </ProtectedRoute>
        )
      },
      {
        path: "facultydashboard",
        element: (
          <ProtectedRoute allowedRoles={["Administrator", "Faculty"]}>
            <FacultyDash />
          </ProtectedRoute>
        )
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
