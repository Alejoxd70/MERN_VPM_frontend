import usePatients from "../hooks/usePatients";
import Patient from "./Patient";

const PatientsList = () => {
    const { patients, loading} = usePatients();
    if(loading) return;

    return (
        <>
            {patients.length ?
                (
                    <>
                        <h2 className="font-black text-3xl text-center">Patients List</h2>

                        <p className="text-xl mt-5 mb-10 text-center">
                            Manage your {""}
                            <span className="text-pink-600 font-bold">Patients</span>
                        </p>

                        {patients.map(patient => (
                            <Patient
                                key={patient._id}
                                patient={patient}
                            />
                        ))}
                    </>
                ) :
                (
                    <>
                        <h2 className="font-black text-3xl text-center">There are not Patients yet</h2>

                        <p className="text-xl mt-5 mb-10 text-center">
                            Add your patients {""}
                            <span className="text-pink-600 font-bold">to show them here!</span>
                        </p>
                    </>
                )}
        </>
    )
}

export default PatientsList;