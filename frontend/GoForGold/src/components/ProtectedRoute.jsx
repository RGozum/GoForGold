import React, {useContext} from "react";
import {Navigate} from "react-router-dom";
import { AuthContext } from "../AuthContext";


export default function ProtectedRoute({allowedRoles, children}) {
    const {user, loading} = useContext(AuthContext);

    if (loading) return <div>Loading...</div>;

    if (!user) return <Navigate to="/login" />;

    if (allowedRoles && !allowedRoles.includes(user.user_role)) return <Navigate to="/unauthorized" />;

    return children;
}