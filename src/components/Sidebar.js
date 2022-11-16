import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/reducers/authReducer';
import jwtDecode from 'jwt-decode';

function Sidebar({ side, closeSidebar }) {
  const [open, setOpen] = useState(false);
  const [openCounselor, setOpenCounselor] = useState(false);
  const token = useSelector(state => state.authReducer.adminToken);
  const [identity, setIdentity] = useState({
    id: '',
    name: '',
    role: ''
  });

  const dispatch = useDispatch();
  const adminLogout = (e) => {
   dispatch(logout());
  }
  
  const leadsHandler = () => {
    if(open === true) {
      setOpen(false)
      setOpen(!open)
    } else {
      setOpen(!open)
    }
  }

  const counselorsHandler = () => {
    if(!open) {
      setOpenCounselor(!openCounselor)
    } else {
      setOpen(!open)
      setOpenCounselor(!openCounselor)
    }
  }

  useEffect(() => {
    if(token) {
        const decodeToken = jwtDecode(token);

        setIdentity({
            id: decodeToken.id,
            name: decodeToken.name,
            role: decodeToken.role
        });
    }
  }, [token]);

  return (
    <>
    <div className={`fixed overflow-y-auto top-0 ${side} sm:left-0 w-64 h-screen bg-slate-100 font-primary z-10 transition-all`}>
        <i className="bi bi-x-lg absolute top-4 right-4 font-semibold sm:hidden block cursor-pointer text-lg" onClick={closeSidebar}></i>
        <div className='p-4 flex justify-center items-center flex-col'>
            <img src="/logo192.png" alt="Company Logo" className='block w-16 mb-2' />
            <p>React Dashboard</p>
        </div>

        <ul className='border-b border-b-gray-300 p-6'>
            <li className='p-3 text-md font-medium cursor-pointer bg-white rounded-md mb-5'>
                <i className="bi bi-collection mr-3 px-2 py-1 bg-primary-gradient text-xl text-white rounded"></i>
                <Link to="/dashboard">Dashboard</Link>
            </li>

            <li className={`p-3 text-md font-medium cursor-pointer bg-white ${open ? 'rounded-t-md' : 'rounded-md'} flex items-center`} onClick={leadsHandler}>
                <i className="bi bi-person-lines-fill mr-3 px-2 py-1 bg-primary-gradient text-xl text-white rounded"></i>
                <p className='inline'>Leads</p>
                <i className={`bi ${open ? `bi-caret-up-fill` :`bi-caret-down-fill`} ml-auto mr-3`}></i>
            </li>

            {open && 
                <div className='w-full bg-white items-center p-3 mb-5 rounded-b-md'>
                    <ul>
                        { identity.role === "admin" &&
                            <li className='flex mb-3 items-center font-medium'>
                                <i className="bi bi-layers-fill px-2 py-1 bg-primary-gradient text-xl text-white rounded mr-3"></i>
                                <Link to="/dashboard/leads/pages/1">Show All Leads</Link>
                            </li>
                        }

                        {
                            identity.role === "counselor" && 
                            <li className='flex mb-3 items-center font-medium'>
                                <i className="bi bi-layers-fill px-2 py-1 bg-primary-gradient text-xl text-white rounded mr-3"></i>
                                <Link to="/dashboard/leads/pages/1">Show My Leads</Link>
                            </li>
                        }

                        <li className='flex items-center font-medium mb-3'>
                            <i className="bi bi-plus px-2 py-1 bg-primary-gradient text-xl text-white rounded mr-3"></i>
                            <Link to="/dashboard/leads/create-new-lead">Create Lead</Link>
                        </li>
                        { identity.role === "admin" &&
                            <li className='flex items-center font-medium'>
                                <i className="bi bi-trash-fill px-2 py-1 bg-primary-gradient text-xl text-white rounded mr-3"></i>
                                <Link to="/dashboard/leads/trash/pages/1">Discarded Leads</Link>
                            </li>
                        }
                    </ul>
                </div>
            }

            { identity.role === "admin" &&
                <li className={`p-3 text-md font-medium cursor-pointer bg-white rounded-md ${open ? '' : 'mt-4'} ${open ? 'rounded-t-md' : 'rounded-md'} flex items-center`} onClick={counselorsHandler}>
                    <i className="bi bi-people-fill mr-3 px-2 py-1 bg-primary-gradient text-xl text-white rounded"></i>
                    <p className='font-medium inline'>Counselors</p>
                    <i className={`bi ${openCounselor ? `bi-caret-up-fill` : `bi-caret-down-fill`} ml-auto mr-3`}></i>
                </li>
            }
                

            {openCounselor && 
                <div className='w-full bg-white items-center p-3 mb-5 rounded-b-md'>
                    <ul>
                        <li className='flex mb-3 items-center -mt-3 font-medium'>
                            <i className="bi bi-layers-fill px-2 py-1 bg-primary-gradient text-xl text-white rounded mr-3"></i>
                            <Link to="/dashboard/counselors/pages/1" className='text-sm'>Show All Counselors</Link>
                        </li>

                        <li className='flex items-center font-medium mb-3'>
                            <i className="bi bi-person-plus-fill px-2 py-1 bg-primary-gradient text-xl text-white rounded mr-3"></i>
                            <Link to="/dashboard/counselors/create-new-counselor" className='text-sm'>Create a Counselor</Link>
                        </li>
                        <li className='flex items-center font-medium'>
                            <i className="bi bi-trash-fill px-2 py-1 bg-primary-gradient text-xl text-white rounded mr-3"></i>
                            <Link to="/dashboard/counselors/trash/pages/1">Discarded Counselors</Link>
                        </li>
                    </ul>
                </div>
            }
        </ul>

        <p className='px-8 font-medium py-2 text-xs uppercase text-gray-500'>Account</p>

        <ul className='px-6 py-2'>
            <li className='p-3 text-md font-medium cursor-pointer bg-white rounded-md mb-5'>
                <i className="bi bi-person-square mr-3 px-2 py-1 bg-primary-gradient text-xl text-white rounded"></i>
                <Link to="/dashboard/profile">Profile</Link>
            </li>

            <li className='p-3 text-md font-medium cursor-pointer bg-white rounded-md mb-5' onClick={adminLogout}>
                <i className="bi bi-box-arrow-left mr-3 px-2 py-1 bg-primary-gradient text-xl text-white rounded"></i>
                <Link to="/">Logout</Link>
            </li>
        </ul>
    </div>
    </>
  )
}

export default Sidebar;