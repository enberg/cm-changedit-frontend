import { Navigate, Outlet } from "react-router-dom"
import auth from "../lib/auth"

const RequireAuth = () => {
    if (auth.isSignedIn()) {
        return <Outlet />
    } else {
        return <Navigate to="/sign-in" replace />
    }
}

export default RequireAuth;