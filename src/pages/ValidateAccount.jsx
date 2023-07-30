import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Alert from "../components/Alert";
import axiosClient from "../config/axios";


const ValidateAccount = () => {
    const [accountComfirmed, setAccountComfirm] = useState(false);
    const [loading, setLoading] = useState(true); //while axios get data from the DB
    const [alert, setAlert] = useState({});

    const params = useParams();
    const {token} = params;

    useEffect(() => {
        const comfirmAccount = async () => {
            try {
                const url = `/veterinarians/userToken/${token}`;
                const {data} = await axiosClient(url);
                setAccountComfirm(true);
                setAlert({msg: data.msg, error: false});
            } catch (error) {
                setAlert({msg: error.response.data.msg , error: true});
            }

            setLoading(false);
        }
        comfirmAccount();
    },[token]);


    return (
        <>
            <div>
                <h1 className="font-black text-6xl text-pink-600">
                    Comfirm your account! and start to manage {""}<span className="text-black">your Patients</span>
                </h1>
            </div>

            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
                {!loading && <Alert
                    alert={alert}
                />}

                {accountComfirmed && (
                    <Link to="/" className="block text-center my-5 text-gray-500">
                        Sign in
                    </Link>
                )}
            </div>
        </>
    )
}

export default ValidateAccount;