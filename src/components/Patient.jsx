import usePatients from "../hooks/usePatients";


const Patient = ({ patient }) => {

    const { name, owner, email, date, issues, _id } = patient;

    const { setEdition, deletePatient } = usePatients();

    const dateFormat = (date) => {
        const newDate = new Date(date)
        newDate.setMinutes(newDate.getMinutes() + newDate.getTimezoneOffset());
        return Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(newDate);
    }


    return (
        <>
            <div className=" mx-40 my-10 bg-white shadow-md rounded-xl py-10 px-5">

                <p className="font-bold uppercase text-pink-700 my-2">Name: {""}
                    <span className="font-normal normal-case text-black">{name}</span>
                </p>

                <p className="font-bold uppercase text-pink-700 my-2">Owner: {""}
                    <span className="font-normal normal-case text-black">{owner}</span>
                </p>

                <p className="font-bold uppercase text-pink-700 my-2">Email: {""}
                    <span className="font-normal normal-case text-black">{email}</span>
                </p>

                <p className="font-bold uppercase text-pink-700 my-2">Date: {""}
                    <span className="font-normal normal-case text-black">{dateFormat(date)}</span>
                </p>

                <p className="font-bold uppercase text-pink-700 my-2">Issues: {""}
                    <span className="font-normal normal-case text-black">{issues}</span>
                </p>

                <div className="flex justify-between my-5">
                    <button
                        type="button"
                        className="py-2 px-10 bg-pink-600 hover:bg-pink-700 text-white uppercase font-bold rounded-lg"
                        onClick={() => setEdition(patient)}
                    >Edit</button>

                    <button
                        type="button"
                        className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white uppercase font-bold rounded-lg "
                        onClick={() => deletePatient(_id)}
                    >Delete</button>
                </div>

            </div>
        </>
    )
}

export default Patient;