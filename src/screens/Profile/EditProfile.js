import AdminNav from "../../components/AdminNav";
import ProfileEditForm from "../../components/Profile/ProfileEditForm";
import Sidebar from "../../components/Sidebar";
import { useState, useEffect } from "react";

function EditProfile() {
  const [sideBar, setSideBar] = useState("-left-64");

  const openSidebar = () => {
    setSideBar("-left-0");
  };

  const closeSidebar = () => {
    setSideBar("-left-64");
  };

  useEffect(() => {
    document.title = 'Edit Profile | Edlyf - Inquiry Management System';
  }, []);

  return (
    <div className="">
      <Sidebar side={sideBar} closeSidebar={closeSidebar} />
      <AdminNav openSidebar={openSidebar} />
      <section className="ml-0 sm:ml-64 bg-slate-200 min-h-screen sm:pt-10 pt-[115px] p-4">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-medium text-gray-600">
            <span className="">{"Edit"}</span>Profile
          </h1>
        </div>
        <div className="">
          <ProfileEditForm />
        </div>
      </section>
    </div>
  );
}

export default EditProfile;
