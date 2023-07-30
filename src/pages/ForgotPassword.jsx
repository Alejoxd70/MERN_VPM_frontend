import { Link } from "react-router-dom";
import { useState } from "react";
import Alert from "../components/Alert";
import axiosClient from "../config/axios";


const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [alert, setAlert] = useState({});

    const handleSubmit = async e => {
        e.preventDefault();

        if (email === "") {
            setAlert({ msg: "Email is required", error: true });
            return;
        }

        try {
            const { data } = await axiosClient.post("/veterinarians/forgot-password", { email });
            setAlert({ msg: data.msg });
        } catch (error) {
            setAlert({ msg: error.response.data.msg, error: true });
        }

    }

    const { msg } = alert;

    return (
        <>
            <div>
                <h1 className="font-black text-6xl text-pink-600">
                    Change your password, do not lose your {""}<span className="text-black">Patients</span>
                </h1>
            </div>

            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
                {msg && <Alert
                    alert={alert}
                />}
                <form onSubmit={handleSubmit}>
                    <div className="my-5">
                        <label htmlFor="" className="uppercase text-gray-600 block text-xl font-bold">
                            Email
                        </label>
                        <input
                            type="email"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl focus:outline-pink-500"
                            placeholder="Your Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>

                    <input type="submit" value="Send Email" className="bg-pink-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-pink-800 md:w-auto" />
                </form>
                <nav className="mt-10 lg:flex lg:justify-between">
                    <Link to="/" className="block text-center my-5 text-gray-500">
                        Do you already have an account? Sign in
                    </Link>
                    <Link to="/register" className="block text-center my-5 text-gray-500">
                        Do not have an account? Create your account
                    </Link>
                </nav>
            </div>

        </>
    )
}

export default ForgotPassword;