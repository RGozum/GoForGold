import React, {createContext, useState, useEffect} from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await axios.get("http://localhost:3001/auth/check", {
                    withCredentials: true,
                });
                console.log(res.data);
                setUser(res.data.user);
            } catch(err) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
        }, []);

        const logout = async() => {
            await axios.post("http://localhost:3001/auth/logout", {}, {withCredentials: true});
            setUser(null);
        };

        return (
            <AuthContext.Provider value={{user, setUser, logout, loading}}> 
                {children}
            </AuthContext.Provider>
        );
};