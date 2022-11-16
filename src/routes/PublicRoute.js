import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PublicRoute({ children }) {
    const adminToken = useSelector(state => state.authReducer.adminToken);
    return adminToken ? <Navigate to="/dashboard" /> : children;
}

export default PublicRoute