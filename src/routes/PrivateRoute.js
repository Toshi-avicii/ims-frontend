import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PrivateRoute({ children }) {
  const adminToken = useSelector(state => state.authReducer.adminToken);

  return adminToken ? children : <Navigate to="/" />
}

export default PrivateRoute