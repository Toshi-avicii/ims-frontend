import LeadTrashTableRow from './LeadTrashTableRow';
import ExportReactCSV from './ExportReactCSV';

function LeadTrashTable({ data }) {
  return (
    <div>
        <div className='mb-4'>
            <ExportReactCSV csvData={[...data]} fileName={"deleted-leads.csv"} />
        </div>
        <div className='bg-slate-100 shadow-md rounded-md overflow-x-scroll'>
            <table>
                <thead>
                    <tr className='border-b border-b-gray-300 bg-white'>
                        <th className='p-5 font-semibold text-gray-700 text-sm uppercase text-left whitespace-nowrap'>S.no</th>
                        <th className='p-5 font-semibold text-gray-700 text-sm uppercase text-left whitespace-nowrap'>Name</th>
                        <th className='p-5 font-semibold text-gray-700 text-sm uppercase text-left whitespace-nowrap'>Email</th>
                        <th className='p-5 font-semibold text-gray-700 text-sm uppercase text-left whitespace-nowrap'>Phone</th>
                        <th className='p-5 font-semibold text-gray-700 text-sm uppercase text-left whitespace-nowrap'>Date</th>
                        <th className='p-5 font-semibold text-gray-700 text-sm uppercase text-left whitespace-nowrap'>Course Interested</th>
                        <th className='p-5 font-semibold text-gray-700 text-sm uppercase text-left whitespace-nowrap'>Status</th>
                        <th className='p-5 font-semibold text-gray-700 text-sm uppercase text-left whitespace-nowrap'>Lead Title</th>
                        <th className='p-5 font-semibold text-gray-700 text-sm uppercase text-left whitespace-nowrap'>Lead Description</th>
                        <th className='p-5 font-semibold text-gray-700 text-sm uppercase text-left whitespace-nowrap'>Lead Reference</th>
                        <th className='p-5 font-semibold text-gray-700 text-sm uppercase text-left whitespace-nowrap'>Recover</th>
                        <th className='p-5 font-semibold text-gray-700 text-sm uppercase text-left whitespace-nowrap'>Delete</th>
                    </tr>
                </thead>
                <tbody>

                    { data.map((item, index) => {
                        let date = new Date(item.date);
                        let dayNum = date.getDate();
                        let month = date.getMonth();
                        let year = date.getFullYear();
                        let day = date.getDay();
                        let hour = date.getHours();
                        let minute = date.getMinutes();

                        return (
                            <LeadTrashTableRow 
                                item={item} 
                                key={index} 
                                index={index}
                                day={day}
                                year={year}
                                month={month}
                                hour={hour}
                                minute={minute}
                                dayNum={dayNum}
                            />
                        )
                    })}
                </tbody>
        </table> 
        </div>
    </div>
  )
}

export default LeadTrashTable