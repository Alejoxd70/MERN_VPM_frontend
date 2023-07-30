import { useState, useEffect } from "react";
import Alert from "./Alert";
import usePatients from "../hooks/usePatients";



const Form = () => {
    const [name, setName] = useState("");
    const [owner, setOwner] = useState("");
    const [email, setEmail] = useState("");
    const [date, setDate] = useState("");
    const [issues, setIssues] = useState("");
    const [id, setId] = useState(null);

    const [alert, setAlert] = useState({});

    const { savePatient, patient } = usePatients();

    useEffect(() => {
        if(patient?.name) {
            setName(patient.name);
            setOwner(patient.owner);
            setEmail(patient.email);
            setDate(new Date(patient.date).toLocaleDateString("en-CA"));
            setIssues(patient.issues);
            setId(patient._id);
        }
    }, [patient]);

    const handleSubmit = e => {
        e.preventDefault();

        if ([name, owner, email, date, issues].includes("")) {
            setAlert({ msg: "All fields are required", error: true });
            setTimeout(() => {
                setAlert({});
            }, 3000);
            return;
        }

        savePatient({ name, owner, email, date, issues, id });
        setAlert({msg: "Changes saved correctly!"});
        setTimeout(() => {
            setAlert({});
        }, 3000);

        setName("");
        setOwner("");
        setEmail("");
        setDate("");
        setIssues("");
        setId("");
    }

    const { msg } = alert;

    return (
        <>
            <h2 className="font-black text-3xl text-center">Patients Manager</h2>
            <p className="text-xl mt-5 mb-10 text-center">
                Add your patients and {""}
                <span className="text-pink-600 font-bold">Manage them</span>
            </p>
                                

            {msg && <Alert
                alert={alert}
            />}
            <form onSubmit={handleSubmit} className="bg-white py-10 px-5 mb-10 lg:mb-5 shadow-md rounded-md">
                <div className="mb-5">
                    <label htmlFor="name" className="text-gray-700 uppercase font-bold">Pet Name</label>
                    <input
                        type="text"
                        id="name"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md focus:outline-pink-500"
                        placeholder="Pet name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="owner" className="text-gray-700 uppercase font-bold">Owner Name</label>
                    <input
                        type="text"
                        id="owner"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md focus:outline-pink-500"
                        placeholder="Owner name"
                        value={owner}
                        onChange={e => setOwner(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="email" className="text-gray-700 uppercase font-bold">Owner Email</label>
                    <input
                        type="email"
                        id="email"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md focus:outline-pink-500"
                        placeholder="Owner Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="date" className="text-gray-700 uppercase font-bold">Date</label>
                    <input
                        type="date"
                        id="date"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md focus:outline-pink-500"
                        value={date}
                        onChange={e => setDate(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="issues" className="text-gray-700 uppercase font-bold">Issues</label>
                    <textarea
                        id="issues"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md focus:outline-pink-500"
                        placeholder="Describe issues"
                        value={issues}
                        onChange={e => setIssues(e.target.value)}
                    />
                </div>

                <input
                    type="submit"
                    className="bg-pink-600 w-full p-3 text-white uppercase font-bold hover:bg-pink-700 cursor-pointer transition-colors rounded-md focus:outline-pink-500"
                    value={id ? "Save Changes" : "Add Patient"}
                />
            </form>

        </>
    )
}

export default Form;