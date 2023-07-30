import { useState, createContext, useEffect } from "react";
import axiosClient from "../config/axios";


const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const authenticateUser = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                setLoading(false);
                return;
            }

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            try {
                const { data } = await axiosClient("/veterinarians/profile", config);
                setAuth(data);
            } catch (error) {
                console.log(error.response.data.msg);
                setAuth({});
            }
            setLoading(false);
        }
        authenticateUser();
    }, []);

    const signOut = () => {
        localStorage.removeItem("token");
        setAuth({});
    }

    const updateProfile = async dataProfile => {
        const token = localStorage.getItem("token");

        if (!token) {
            setLoading(false);
            return;
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        try {
            await axiosClient.put(`/veterinarians/profile/${dataProfile._id}`, dataProfile, config);
            return {
                msg: "Information saved correctly"
            }
        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true
            }
        }
    }

    const savePassword = async password => {
        const token = localStorage.getItem("token");

        if (!token) {
            setLoading(false);
            return;
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        try {
            const { data } = await axiosClient.put("/veterinarians/update-password", password, config);
            return {
                msg: data.msg
            }
        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true,
            }
        }
    }


    return (
        <AuthContext.Provider
            value={{
                auth,
                loading,
                setAuth,
                signOut,
                updateProfile,
                savePassword,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider,
}

export default AuthContext;

