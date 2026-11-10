import { Navigate } from "react-router";
import { getHomePath, getSessionUser } from "@/utils/session";

export default function RoleGate({ roles, children }) {
    const user = getSessionUser();
    const token = localStorage.getItem("jwt");

    if (!user || !token) {
        return <Navigate to="/login" replace />;
    }
    if (!roles.includes(user.role)) {
        return <Navigate to={getHomePath(user.role)} replace />;
    }
    return children;
}
