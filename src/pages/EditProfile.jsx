import { useEffect, useState } from "react";
import AdminNav from "../components/AdminNav";
import useAuth from "../hooks/useAuth";
import Alert from "../components/Alert";

const EditProfile = () => {

    const { auth, updateProfile } = useAuth();
    const [profile, setProfile] = useState({});
    const [alert, setAlert] = useState({});

    useEffect(() => {
        setProfile(auth);
    }, [auth]);

    const handleSubmit = async e => {
        e.preventDefault();
        const {name, email} = profile;
        if([name, email].includes("")){
            setAlert({msg: "Name and Email are required", error: true});
            setTimeout(() => {
                setAlert({});
            }, 3000);
            return;
        }

        const result = await updateProfile(profile);
        setAlert(result);
        setTimeout(() => {
            setAlert({});
        }, 3000);
    }

    const { msg } = alert;

    return (
        <>
            <AdminNav />

            <h2 className="font-black text-3xl text-center mt-10">Edit Profile</h2>
            <p className="text-xl mt-5 mb-10 text-center">Modify your {""}
                <span className="text-pink-600 font-bold">Information</span>
            </p>

            <div className="flex justify-center">
                <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
                    {msg && <Alert
                        alert={alert}
                    />}
                    <form onSubmit={handleSubmit}>
                        <div className="my-3">
                            <label htmlFor="name" className="uppercase font-bold text-gray-600">Name</label>
                            <input
                                type="text"
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg focus:outline-pink-500"
                                id="name"
                                name="name"
                                value={profile.name || ""}
                                onChange={e => setProfile({
                                    ...profile,
                                    [e.target.name]: e.target.value
                                })}
                            />
                        </div>
                        <div className="my-3">
                            <label htmlFor="web" className="uppercase font-bold text-gray-600">Web Site</label>
                            <input
                                type="text"
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg focus:outline-pink-500"
                                id="web"
                                name="web"
                                value={profile.web || ""}
                                onChange={e => setProfile({
                                    ...profile,
                                    [e.target.name]: e.target.value
                                })}
                            />
                        </div>
                        <div className="my-3">
                            <label htmlFor="tel" className="uppercase font-bold text-gray-600">Phone number</label>
                            <input
                                type="tel"
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg focus:outline-pink-500"
                                id="tel"
                                name="telNumber"
                                value={profile.telNumber || ""}
                                onChange={e => setProfile({
                                    ...profile,
                                    [e.target.name]: e.target.value
                                })}
                            />
                        </div>
                        <div className="my-3">
                            <label htmlFor="email" className="uppercase font-bold text-gray-600">Email</label>
                            <input
                                type="email"
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg focus:outline-pink-500"
                                id="email"
                                name="email"
                                value={profile.email || ""}
                                onChange={e => setProfile({
                                    ...profile,
                                    [e.target.name]: e.target.value
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

export default EditProfile