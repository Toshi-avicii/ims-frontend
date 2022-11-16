import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import AdminNav from "../../components/AdminNav";
import CounselorsAddForm from "../../components/CounselorsAddForm";

function LeadForm() {
    const [sideBar, setSidebar] = useState('-left-64')
    const openSidebar = () => {
        setSidebar('-left-0');
    }
      
    const closeSidebar = () => {
        setSidebar('-left-64');
    }

    useEffect(() => {
        document.title = 'Add New Counselor | Edlyf - Inquiry Management System';
    }, [])
  
  return (
    <>
        <Sidebar side={sideBar} closeSidebar={closeSidebar} />
        <AdminNav openSidebar={openSidebar} />
        <section className="ml-0 sm:ml-64 bg-slate-200 min-h-screen lg:pt-5 md:pt-[90px] sm:pt-[92px] pt-24">
            <div className="text-justify rounded-md flex flex-col items-center p-4">
                <div className='mb-5'>
                    <h1 className='text-2xl font-medium text-gray-600'>Create A new Counselor</h1>
                </div>                
                <CounselorsAddForm />
            </div>
        </section>
    </>
  )
}

export default LeadForm