import { createContext, useState, useEffect } from "react";
import axiosClient from "../config/axios";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2"


const PatientsContext = createContext();

export const PatientsProvider = ({ children }) => {
    const [patients, setPatients] = useState([]);
    const [patient, setPatient] = useState({});

    const [loading, setLoading] = useState(true);

    const { auth } = useAuth();

    useEffect(() => {
        const getPatients = async () => {
            try {
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
                const { data } = await axiosClient("/patients", config);
                setPatients(data);
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        }
        getPatients();
    }, [auth]);

    const savePatient = async patient => {
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        if (patient.id) {
            try {
                const { data } = await axiosClient.put(`/patients/${patient.id}`, patient, config);
                const patientUpdated = patients.map(patientState => patientState._id === data._id ? data : patientState);
                setPatients(patientUpdated);
            } catch (error) {
                console.log(error);
            }
        } else {
            try {

                const { data } = await axiosClient.post("/patients", patient, config);
                // eslint-disable-next-line no-unused-vars
                const { createdAt, updatedAt, __v, ...patientSaved } = data;

                setPatients([patientSaved, ...patients]);
            } catch (error) {
                console.log(error);
            }
        }
    }

    const setEdition = patient => {
        setPatient(patient);
    }

    const deletePatient = async id => {
        const alertComfirm = await Swal.fire({
            title: 'Are you sure to delete this patient?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
            if (result.isConfirmed) {
                return true;
            } else {
                return false;
            }
        })

        if(alertComfirm){
            try {
                const token = localStorage.getItem("token");
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                
                await axiosClient.delete(`/patients/${id}`, config);
                const patientsUpdated = patients.filter(patientState => patientState._id !== id);
                setPatients(patientsUpdated)
                toastMixin.fire({
                    animation: true,
                    title: 'Deleted correctly'
                });
            } catch (error) {
                console.log(error);
            }
        }
    }

    //sweetAlert
    const toastMixin = Swal.mixin({
        toast: true,
        icon: 'success',
        title: 'Title',
        animation: false,
        position: 'top-right',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    });

    return (
        <PatientsContext.Provider
            value={{
                patients,
                loading,
                patient,
                savePatient,
                setEdition,
                deletePatient
            }}
        >
            {children}
        </PatientsContext.Provider>
    )
}


export default PatientsContext;


