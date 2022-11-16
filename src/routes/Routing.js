import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminLogin from '../screens/auth/Login';
import Products from '../screens/dashboard/Products';
import ShowLeads from '../screens/leads/ShowLeads';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import LeadForm from '../screens/leads/LeadForm';
import ShowCounselors  from '../screens/counselors/ShowCounselors';
import Profile from '../screens/Profile/Profile';
import CounselorForm from '../screens/counselors/CounselorForm';
import EditProfile from '../screens/Profile/EditProfile';
import ShowLeadsTrash from '../screens/trash/leadsTrash/ShowLeadsTrash';
import ShowCounselorsTrash from '../screens/trash/counselorsTrash/ShowCounselorsTrash';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import jwtDecode from 'jwt-decode';
import ShowCounselorLeads from '../screens/leads/ShowCounselorLeads';

function Routing() {
  const adminToken = useSelector(state => state.authReducer.adminToken);
  const [token, setToken] = useState({
    name: '',
    id: '',
    role: ""
  })
  useEffect(() => {
    if(adminToken) {
      const decodeToken = jwtDecode(adminToken);
      setToken(decodeToken);
    }
  }, [adminToken]);

  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<PublicRoute><AdminLogin /></PublicRoute>} />
            <Route path='/dashboard'>
              <Route path="" element={<PrivateRoute><Products /></PrivateRoute>} />
              <Route path="profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
              <Route path="profile/edit-profile" element={<PrivateRoute><EditProfile /></PrivateRoute>} />
              <Route path="leads/create-new-lead" element={<PrivateRoute><LeadForm /></PrivateRoute>} />
              <Route path="leads/pages/:page" element={token.role === "admin" ? <PrivateRoute><ShowLeads /></PrivateRoute> : <PrivateRoute><ShowCounselorLeads /></PrivateRoute>} />
              <Route path="leads/trash/pages/:page" element={<PrivateRoute><ShowLeadsTrash /></PrivateRoute>} />
              <Route path='counselors/pages/:page' element={<PrivateRoute><ShowCounselors /></PrivateRoute>} />
              <Route path="counselors/trash/pages/:page" element={<PrivateRoute><ShowCounselorsTrash /></PrivateRoute>} />
              <Route path="counselors/create-new-counselor" element={<PrivateRoute><CounselorForm /></PrivateRoute>} />
            </Route>
            <Route path='*' element={<div><p>Page not found</p></div>} />
        </Routes>
    </BrowserRouter>
  )
}

export default Routing