// import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import profileImg from '../../Pictures/person-circle.svg';
import ProfileStats from './ProfileStats';

function ProfileHeader({ userData }) {
  const userImg = useSelector(state => state.profileReducer.photo);
  return (
    <div className="bg-slate-200">
      <div className="bg-black sm:h-50 h-[180px] rounded-t-md profile-bg"></div>
      <div className="flex -mt-[180px] relative justify-between items-center md:items-end flex-col sm:flex-col md:flex-row w-full px-5 sm:px-10 py-8 sm:py-10">
        <div className="flex items-center flex-col md:flex-row p-1">
          <div className="w-[180px] rounded-md flex flex-col justify-between">
            <div className='w-full h-[200px]'>
            <img
            // userData.photo ? `http://localhost:5000/${userData.photo}` : 
              src={userImg ? userImg : profileImg}
              alt="profileImage"
              className="block bg-white w-full p-1 shadow-md rounded-md"
            />
            </div>
            <button className="transition-all w-full py-2 text-lg text-white shadow-md bg-primary-gradient rounded-sm hover:bg-white">
              <Link to='/dashboard/profile/edit-profile'>EDIT PROFILE</Link>
            </button>
          </div>

          <div className="text-center lg:text-start md:absolute md:top-[80px] md:right-11 lg:static">
            <h2 className="text-xl md:text-white lg:w-min ml-2 mb-6">
              {userData.name}
            </h2>
          </div>
        </div>

        <div className="bg-primary-gradient p-2 rounded-md">
          <ProfileStats 
          stat={`Email: ${userData.email}`}
          name={''}
          />
          <ProfileStats 
          stat={`Role: ${userData.role}`}
          name={''}
          />
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
