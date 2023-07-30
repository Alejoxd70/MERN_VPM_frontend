import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Header = () => {

    const {signOut} = useAuth();

    return (
        <>
            <header className="py-10 bg-pink-600">
                <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
                    <h1 className="font-bold text-2xl text-pink-200 text-center">
                        Veterinary Patients {""}<span className="text-white font-black">Manager</span>
                    </h1>

                    <nav className="flex flex-col items-center lg:flex-row gap-10 mt-5 lg:mt-0 ">
                        <Link to="/admin" className="text-white text-sm uppercase font-bold">Patients</Link>
                        <Link to="/admin/profile" className="text-white text-sm uppercase font-bold">Profile</Link>
                        <button 
                            type="button"
                            className="text-white text-sm uppercase font-bold"
                            onClick={signOut}
                        >Sign out</button>
                    </nav>
                </div>


            </header>

        </>
    )
}

export default Header;