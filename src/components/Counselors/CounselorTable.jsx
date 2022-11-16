import useGetCounselorsExcelData from "../../hooks/useGetCounselorExcelData";
import ExportReactCSV from "../ExportReactCSV";
import AllExportReactCSV from "../AllExportReactCSV";
import CounselorTableRow from "./CounselorTableRow"

function CounselorTable({ data, allCounselorsData }) {
    const dataCsv = useGetCounselorsExcelData(data);
    const allData = useGetCounselorsExcelData(allCounselorsData);

  return (
    <>
        <div>
            <div className="mb-4 flex">
                <div className="mr-4">
                    <ExportReactCSV csvData={dataCsv} fileName={"generated-counselor.csv"}/>
                </div>
                <div>
                    <AllExportReactCSV csvData={allData} fileName={"generated-all-counselors.csv"}/>
                </div>
            </div>
        <div className="bg-slate-100 shadow-md rounded-md overflow-x-scroll text-center">
            <table className="w-full">
                <thead>
                    <tr className="border-b border-b-gray-300 bg-white text-center">
                        <th className="p-4 font-semibold text-gray-700 text-sm uppercase whitespace-nowrap">S.no</th>
                        <th className="p-4 font-semibold text-gray-700 text-sm uppercase whitespace-nowrap">Image</th>
                        <th className="p-4 font-semibold text-gray-700 text-sm uppercase whitespace-nowrap">Name</th>
                        <th className="p-4 font-semibold text-gray-700 text-sm uppercase whitespace-nowrap">Email</th>
                        <th className="p-4 font-semibold text-gray-700 text-sm uppercase whitespace-nowrap">Edit</th>
                        <th className="p-4 font-semibold text-gray-700 text-sm uppercase whitespace-nowrap">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.length > 0 && data.map((item, index) => {
                            return (
                                <CounselorTableRow item={item} key={index} index={index} />      
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
        </div>
    </>
  )
}

export default CounselorTable;