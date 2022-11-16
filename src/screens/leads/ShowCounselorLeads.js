import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AdminNav from '../../components/AdminNav';
import LeadsTable from '../../components/LeadsTable';
import Sidebar from '../../components/Sidebar';
import Pagination from '../../components/Pagination';
import { useGetLeadsByOneCounselorQuery } from '../../store/services/leadService';
import { useSelector } from 'react-redux';
import jwtDecode from 'jwt-decode';

function ShowCounselorLeads() {
  const [sideBar, setSidebar] = useState('-left-64');
  const [leads, setLeads] = useState([]);
  const [paginationData, setPaginationData] = useState({
    perPage: 0,
    count: 0
  });

  const token = useSelector(state => state.authReducer.adminToken);
  const decodeToken = jwtDecode(token);

  let { page } = useParams();
  if(!page) {
    page = 1;
  }
  const { data = [], isFetching } = useGetLeadsByOneCounselorQuery(decodeToken.id);

  const openSidebar = () => {
    setSidebar('-left-0');
  }
  
  const closeSidebar = () => {
    setSidebar('-left-64');
  }

  useEffect(() => {
    if(!isFetching) {
      console.log(data);
        const leadData = data?.data;
        setLeads(leadData); 
        setPaginationData({
          perPage: data.perPage,
          count: data.count
        });
    }
  }, [isFetching, data]);

  return (
    <>
        <Sidebar side={sideBar} closeSidebar={closeSidebar} />
        <AdminNav openSidebar={openSidebar} />

        <section className="ml-0 sm:ml-64 bg-slate-200 min-h-screen pt-28 px-4">
        <div className="text-justify rounded-md">
          <div className='mb-4'>
                <h1 className='text-2xl font-medium text-gray-600'>All Leads</h1>
          </div>
          {
            leads && leads.length > 0 && 
            <div>
              <LeadsTable data={leads} page={page} />
              <Pagination page={parseInt(page)} perPage={paginationData.perPage} count={paginationData.count}  />
            </div>
          }

          {
            !leads && <div>
              <p className='mt-6'>No leads Found</p>
            </div>
          }
          {
            leads && leads.length === 0 && 
              <div className='mt-6'>
                <p>No leads found</p>
              </div>
          }
        </div>
      </section>
    </>
  )
}

export default ShowCounselorLeads