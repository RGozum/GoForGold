import React from "react";
import ReactDOM from "react-dom/client";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import App from "./App.jsx";
import AdminPanel from "./pages/Hello.jsx";
import AccountCreation from "./pages/AccountCreation.jsx";
import LogIn from "./pages/LogIn.jsx";
import StudentDash from "./pages/StudentDash.jsx";
import FacultyDash from "./pages/FacultyDash.jsx";
import Search from "./pages/Search.jsx";
import ProfilePage from "./pages/Profile.jsx";
import SendOTP from "./pages/SendOTP.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import HonorRoll from "./pages/HonorRoll.jsx";
import Unauthorized from "./pages/Unauthorized.jsx";
import Attendance from "./pages/Attendance.jsx";
import BasePage from "./pages/BasePage.jsx";


import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {path: "", element: <BasePage /> },
      {path: "login", element: <LogIn />},
      {path: "requestreset", element: <SendOTP />},
      {path: "resetpassword", element: <ResetPassword />},
      {path: "unauthorized", element: <Unauthorized />},
      {
        path: "adminpanel",
        element: (
          <ProtectedRoute allowedRoles={["Administrator"]}>
              <AdminPanel />
          </ProtectedRoute>
        ),
      },
      {
        path: "honorroll",
        element: (
          <ProtectedRoute allowedRoles={["Administrator"]}>
              <HonorRoll />
          </ProtectedRoute>
        ),
      },
      {
        path: "search",
        element: (
          <ProtectedRoute allowedRoles={["Administrator"]}>
            <Search />
          </ProtectedRoute>
        )
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
        path: "attendance",
        element: (
          <ProtectedRoute allowedRoles={["Administrator", "Faculty"]}>
              <Attendance />
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
      },
      {
        path: "/profile/:user_id",
        element: (
          <ProtectedRoute allowedRoles={["Administrator"]}>
            <ProfilePage />
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
