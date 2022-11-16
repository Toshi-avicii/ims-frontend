import React from 'react'
import { logout } from '../store/reducers/authReducer';
import { useDispatch } from 'react-redux';

function AdminNav({ openSidebar }) {
  const dispatch = useDispatch();
  const adminLogout = (e) => {
   dispatch(logout());
  }

  return (
     <nav className='fixed left-0 sm:left-64 top-4 right-0 mx-1 md:hidden sm:hidden lg:hidden'>
        <div className='bg-white w-full flex p-4 justify-between items-center rounded-md sm:justify-end'>
            <i className="bi bi-filter-left text-2xl cursor-pointer sm:hidden" onClick={openSidebar}></i>
            <button className='py-2 px-4 bg-indigo-600 text-white rounded-md' onClick={adminLogout}>Logout</button>
        </div>
     </nav>
  )
}

export default AdminNav;