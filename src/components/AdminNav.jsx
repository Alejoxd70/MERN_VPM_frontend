import { Link } from "react-router-dom"

const AdminNav = () => {
    return (
        <>
            <nav className="flex gap-10">
                <Link
                    to="/admin/profile"
                    className="font-bold uppercase text-gray-500"
                >Profile</Link>

                <Link
                    to="/admin/change-password"
                    className="font-bold uppercase text-gray-500"
                >Change your Password</Link> 

            </nav>
        </>
    )
}

export default AdminNav