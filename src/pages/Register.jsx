import { useState } from "react";
import { Link } from "react-router-dom";
import Alert from "../components/Alert";
import axiosClient from "../config/axios";


const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [comfirmPassword, setComfirmPassword] = useState("");

    const [alert, setAlert] = useState({});

    const handleSubmit = async e => {
        e.preventDefault();

        if([name, email, password, comfirmPassword].includes("")){
            setAlert({msg: "All fields are required", error: true});
            return;
        }

        if(password !== comfirmPassword) {
            setAlert({msg: "The password are not the same", error: true});
            return;
        }

        if(password.length < 6) {
            setAlert({msg: "The password is very short, must be at least 6 characters", error: true});
            return;
        }

        setAlert({});

        // Create the user in the API
        try {
            await axiosClient.post(`/veterinarians`, {name, email, password});
            setAlert({msg: "User was created correctly, check your email to comfirm your account", error:false});
            setName("");
            setEmail("");
            setPassword("");
            setComfirmPassword("");
        } catch (error) {
            setAlert({msg: error.response.data.msg, error: true});
        }

    }

    const {msg} = alert

    return (
        <>
            <div>
                <h1 className="font-black text-6xl text-pink-600">
                    Create your account and manage {""}<span className="text-black">your Patients </span>
                </h1>
            </div>

            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">

                {msg && <Alert
                    alert={alert}
                />}
                <form onSubmit={handleSubmit}>
                    <div className="my-5">
                        <label htmlFor="" className="uppercase text-gray-600 block text-xl font-bold">
                            Name
                        </label>
                        <input 
                            type="text" 
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl focus:outline-pink-500" 
                            placeholder="Your name"
                            value={name}
                            onChange={e => setName(e.target.value)} 
                        />
                    </div>

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

                    <div className="my-5">
                        <label htmlFor="" className="uppercase text-gray-600 block text-xl font-bold">
                            Password
                        </label>
                        <input 
                            type="password"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl focus:outline-pink-500" 
                            placeholder="Your Password"
                            value={password} 
                            onChange={e => setPassword(e.target.value)} 
                        />
                    </div>

                    <div className="my-5">
                        <label htmlFor="" className="uppercase text-gray-600 block text-xl font-bold">
                            Comfirm Password
                        </label>
                        <input 
                            type="password" 
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl focus:outline-pink-500" 
                            placeholder="Comfirm your Password"
                            value={comfirmPassword} 
                            onChange={e => setComfirmPassword(e.target.value)}  
                        />
                    </div>

                    <input type="submit" value="Create account" className="bg-pink-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-pink-800 md:w-auto" />
                </form>

                <nav className="mt-10 lg:flex lg:justify-between">
                    <Link to="/" className="block text-center my-5 text-gray-500">
                        Do you already have an account? Sign in
                    </Link>
                    <Link to="/forgot-password" className="block text-center my-5 text-gray-500">
                        Change Password
                    </Link>
                </nav>
            </div>
        </>
    )
}

export default Register