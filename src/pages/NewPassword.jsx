import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom";
import Alert from "../components/Alert";
import axiosClient from "../config/axios";

const NewPassword = () => {
    const [password, setPassword] = useState("");
    const [alert, setAlert] = useState({});
    const [tokenValid, setTokenValid] = useState(false);
    const [passwordModified, setPasswordModified] = useState(false);

    const { token } = useParams();

    useEffect(() => {
        const checkToken = async () => {
            try {
                await axiosClient(`/veterinarians/forgot-password/${token}`);
                setAlert({ msg: "Change your password" });
                setTokenValid(true);
            } catch (error) {
                setAlert({ msg: "Unexpected link error", error: true })
            }
        }
        checkToken();
    }, [token]);

    const handleSubmit = async e => {
        e.preventDefault();

        if (password === "") {
            setAlert({ msg: "Password is required", error: true });
            return;
        }
        if (password.length < 6) {
            setAlert({ msg: "The password is very short, must be at least 6 characters", error: true });
            return;
        }

        try {
            const { data } = await axiosClient.post(`/veterinarians/forgot-password/${token}`, { password });
            setAlert({ msg: data.msg });
            setPassword("");
            setPasswordModified(true);

        } catch (error) {
            setAlert({ msg: error.response.data.msg, error: true })
        }

    }

    const { msg } = alert;

    return (
        <>
            <div>
                <h1 className="font-black text-6xl text-pink-600">
                    Change your password, {""}<span className="text-black">do not lose your Patients </span>
                </h1>
            </div>

            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
                {msg && <Alert
                    alert={alert}
                />}

                {tokenValid && (
                    <>
                        <form onSubmit={handleSubmit}>
                            <div className="my-5">
                                <label htmlFor="" className="uppercase text-gray-600 block text-xl font-bold">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    className="border w-full p-3 mt-3 bg-gray-50 rounded-xl focus:outline-pink-500"
                                    placeholder="Your New Password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </div>

                            <input
                                type="submit"
                                className="bg-pink-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-pink-800 md:w-auto"
                                value="Save New Password"
                            />
                        </form>
                        {passwordModified && <Link to="/" className="block text-center my-5 text-gray-500">
                            Sign in
                        </Link>}
                    </>
                )}
            </div>





        </>
    )
}

export default NewPassword