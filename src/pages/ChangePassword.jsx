import { useState } from "react";
import useAuth from "../hooks/useAuth";
import AdminNav from "../components/AdminNav";
import Alert from "../components/Alert";

const ChangePassword = () => {
    const [alert, setAlert] = useState({});
    const [password, setPassword] = useState({
        pwd_old: "",
        pwd_new: ""
    });
    const {savePassword} = useAuth();

    const handleSubmit = async e => {
        e.preventDefault();

        if(Object.values(password).some(field => field === "")) {
            setAlert({msg: "All fields are required", error: true});
            setTimeout(() => {
                setAlert({});
            }, 3000);
            return;
        }

        if(password.pwd_new.length < 6) {
            setAlert({msg: "The new Password  must be at least 6 characters", error: true});
            setTimeout(() => {
                setAlert({});
            }, 3000);
            return;
        }

        const result = await savePassword(password);
        setAlert(result);
        setTimeout(() => {
            setAlert({});
        }, 3000);
    }

    const { msg } = alert;


    return (
        <>
            <AdminNav/>

            <h2 className="font-black text-3xl text-center mt-10 mb-10">Change your Password</h2>
            <div className="flex justify-center">
                <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
                    {msg && <Alert
                        alert={alert}
                    />}
                    <form onSubmit={handleSubmit}>
                        <div className="my-3">
                            <label htmlFor="current-password" className="uppercase font-bold text-gray-600">Current Password</label>
                            <input
                                type="password"
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg focus:outline-pink-500"
                                id="current-password"
                                name="pwd_old"
                                placeholder="Your current Password"
                                onChange={e => setPassword({
                                    ...password,
                                    [e.target.name] : e.target.value
                                })}
                            />
                        </div>
                        <div className="my-3">
                            <label htmlFor="new-password" className="uppercase font-bold text-gray-600">New Password</label>
                            <input
                                type="password"
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg focus:outline-pink-500"
                                id="new-password"
                                name="pwd_new"
                                placeholder="New Password"
                                onChange={e => setPassword({
                                    ...password,
                                    [e.target.name] : e.target.value
                                })}
                            />
                        </div>
                        
                        <input
                            type="submit"
                            className="bg-pink-600 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5 hover:cursor-pointer hover:bg-pink-700"
                            value="Save Changes"
                        />
                    </form>
                </div>
            </div>
        </>
    )
}

export default ChangePassword