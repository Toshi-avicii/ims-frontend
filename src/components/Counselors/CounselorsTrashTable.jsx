import CounselorsTrashRow from "./CounselorsTrashRow";

function CounselorsTrashTable({ data }) {
  return (
    <>
      <div className="bg-slate-100 shadow-md rounded-md overflow-x-auto text-center">
        <table className="w-full">
          <thead>
            <tr className="border-b border-b-gray-300 bg-white text-center">
              <th className="p-4 font-semibold text-gray-700 text-sm uppercase whitespace-nowrap">
                S.no
              </th>
              <th className="p-4 font-semibold text-gray-700 text-sm uppercase whitespace-nowrap">
                Image
              </th>
              <th className="p-4 font-semibold text-gray-700 text-sm uppercase whitespace-nowrap">
                Name
              </th>
              <th className="p-4 font-semibold text-gray-700 text-sm uppercase whitespace-nowrap">
                Email
              </th>
              <th className="p-4 font-semibold text-gray-700 text-sm uppercase whitespace-nowrap">
                Recover
              </th>
              <th className="p-4 font-semibold text-gray-700 text-sm uppercase whitespace-nowrap">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {
              data.length > 0 && data.map((item, index) => {
                return (
                  <CounselorsTrashRow item={item} index={index} key={index} />
                )
              })
            }           
          </tbody>
        </table>
      </div>
    </>
  );
}

export default CounselorsTrashTable;
