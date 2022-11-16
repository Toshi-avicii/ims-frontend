import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminNav from "../../../components/AdminNav";
import CounselorsTrashTable from "../../../components/Counselors/CounselorsTrashTable";
import Sidebar from "../../../components/Sidebar";
import { useGetTrashedCounselorsQuery } from "../../../store/services/trashCounselorService";
import TrashCounselorsPagination from "../../../components/Counselors/TrashCounselorsPagination"

function ShowCounselorsTrash() {
  const [sideBar, setSidebar] = useState("-left-64");
  const [trashedCounselor, setTrashedCouselor] = useState([]);
  const [paginationData, setPaginationData] = useState({
    perPage: 0,
    count: 0,
  });

  let { page } = useParams();
  page = Number(page);

  const { data = [], isFetching } = useGetTrashedCounselorsQuery(
    page ? page : 1
  );

  useEffect(() => {
    document.title = 'Discarded Counselors | Edlyf - Inquiry Management System';
    if (!isFetching) {
      setTrashedCouselor(data.data);
      setPaginationData({
        perPage: data.perPage,
        count: data.count,
      });
    }
  }, [data, isFetching]);

  if (!page) {
    page = 1;
  }

  const openSidebar = () => {
    setSidebar("-left-0");
  };

  const closeSidebar = () => {
    setSidebar("-left-64");
  };

  return (
    <>
      <Sidebar side={sideBar} closeSidebar={closeSidebar} />
      <AdminNav openSidebar={openSidebar} />

      <section className="ml-0 sm:ml-64 bg-slate-200 min-h-screen pt-28 px-4">
        <div className="text-justify rounded-md">
          <div className="mb-4">
            <h1 className="text-2xl font-medium text-gray-600">
              All Trashed Counselors
            </h1>
          </div>
          {trashedCounselor && trashedCounselor.length > 0 && (
            <div className="">
              <CounselorsTrashTable data={trashedCounselor} />
              <TrashCounselorsPagination
                page={parseInt(page)}
                count={paginationData.count}
                perPage={paginationData.perPage}
              />
            </div>
          )}

          {!trashedCounselor && (
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

export default ShowCounselorsTrash;
