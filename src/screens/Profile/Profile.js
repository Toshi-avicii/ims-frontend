import React, { useEffect, useState } from 'react';
import AdminNav from '../../components/AdminNav';
import ProfileHeader from '../../components/Profile/ProfileHeader';
import Sidebar from '../../components/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { useGetUserProfileQuery } from '../../store/services/profileService'
import { fetchProfileData } from '../../store/reducers/profileReducer';

function Profile() {
  const [sideBar, setSidebar] = useState('-left-64');
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    photo: '',
    role: '',
  });

  const openSidebar = () => {
    setSidebar('-left-0');
  }

  const closeSidebar = () => {
    setSidebar('-left-64');
  }

  const dispatch = useDispatch();
  // const userName = useSelector(state => state.profileReducer.name);
  // const userEmail = useSelector(state => state.profileReducer.email);
  // const userPhoto = useSelector(state => state.profileReducer.photo);
  // const userRole = useSelector(state => state.profileReducer.role);

  const token = useSelector(state => state.authReducer.adminToken);
  const userDecode = jwtDecode(token);

  const { data, isFetching } = useGetUserProfileQuery(userDecode);
  
  useEffect(() => {
    document.title = 'Profile | Edlyf - Inquiry Management System';
    if(!isFetching) {
      setUserData({
        name: data.data.name,
        email: data.data.email,
        photo: data.data.photo,
        role: data.data.role
      });

      let profilePic = '';
      if(data.data.photo.startsWith('http://')) {
        profilePic = data.data.photo;
      } else {
        profilePic = `http://localhost:5000/${data.data.photo}`;
      }

      dispatch(fetchProfileData({
        name: data.data.name,
        email: data.data.email,
        photo: profilePic,
        role: data.data.role
      }))
    }
  },[data, dispatch, isFetching])
    
  return (
    <>
      <div className=''>
      <Sidebar side={sideBar} closeSidebar={closeSidebar} />
      <AdminNav openSidebar={openSidebar} />
        <section className='ml-0 sm:ml-64 bg-white min-h-screen pt-24 sm:pt-4 px-4 sm:px-4'>
        <ProfileHeader userData={userData} />
        </section>
      </div>
    </>
  )
}

export default Profile