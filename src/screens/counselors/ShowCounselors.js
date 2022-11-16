import { useEffect, useState } from "react";
import { useGetCounselorsByPageQuery, useGetCounselorsQuery } from "../../store/services/counselorService";
import { useParams } from "react-router-dom";
import CounselorTable from "../../components/Counselors/CounselorTable";
import CounselorsPagination from "../../components/Counselors/CounselorsPagination";
import AdminNav from "../../components/AdminNav";
import Sidebar from "../../components/Sidebar";

function ShowCounselors() {
  const [sideBar, setSideBar] = useState("-left-64");
  const [counselors, setCounselors] = useState([]);
  const [paginationData, setPaginationData] = useState({
    perPage: 0,
    count: 0,
  });

  let { page } = useParams();
  page = Number(page);
  const { data = [], isFetching, isSuccess } = useGetCounselorsByPageQuery(
    page ? page : 1
  );

  let [allData, setAllData] = useState([]);

  const response = useGetCounselorsQuery();

  // for all data download of counselors csv file 
  useEffect(() => {
    document.title = 'All Counselors | Edlyf - Inquiry Management System';
    if(!response.isFetching && response.isSuccess) {
      setAllData(response.data.counselors);
    } 

    if(!response.isFetching && response.isError) {
      console.error('Error occurred');
    }

    if (!isFetching && isSuccess) {
      let counselorsData = data?.data;
      setCounselors(counselorsData);
      setPaginationData({
        perPage: data.perPage,
        count: data.count,
      });
    }
  }, [response, data, isFetching, isSuccess]);

  if (!page) {
    page = 1; 
  }

  const openSideBar2 = () => {
    setSideBar("-left-0");
  }

  const closeSidebar = () => {
    setSideBar("-left-64");
  }

  return (
    <>
      <Sidebar side={sideBar} closeSidebar={closeSidebar} />
      <AdminNav openSidebar={openSideBar2} />
      <section className="ml-0 sm:ml-64 pt-28 px-4 min-h-screen bg-slate-200">
        <div className="text-justify rounded-md">
          <div className="mb-4">
            <h1 className="text-center text-2xl font-medium text-gray-600">
              All Counselors
            </h1>
          </div>

          {counselors && counselors.length > 0 && (
            <div className="">
              <CounselorTable data={counselors} allCounselorsData={allData} />
              <CounselorsPagination
                page={parseInt(page)}
                perPage={paginationData.perPage}
                count={paginationData.count}
              />
            </div>
          )}

          {!counselors && (
            <div className="flex justify-center items-center h-[77vh]">
              <div
                className="flex p-8 mt-[-200px] ml-[-300px]  text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800 w-fit"
                role="alert"
              >
                <span className="font-bold text-[40px]">
                  No Counselors Found
                </span>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default ShowCounselors;