import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import jwtDecode from 'jwt-decode';

function CounselorRoute({ children }) {
  const adminToken = useSelector(state => state.authReducer.adminToken);
  const [token, setToken] = useState({
    name: '',
    id: '',
    role: ""
  })
  useEffect(() => {
    const decodeToken = jwtDecode(adminToken);
    setToken(decodeToken);
  }, [jwtDecode]);

  return token.role === "counselor" ? children : <Navigate to="/" />
}

export default CounselorRoute