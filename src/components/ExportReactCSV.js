import { CSVLink } from 'react-csv';
// import { CloudArrowDownIcon } from '@heroicons/react/20/solid';

function ExportReactCSV({ csvData, fileName }) {
  // console.log(csvData);
  return (
    <div>
        <button className='bg-primary text-white rounded-sm shadow-md py-2 px-8 hover:bg-green-600 transition-all'>
            <CSVLink data={csvData} filename={fileName} className="flex justify-center items-center">
                <span className='ml-1'>Export</span>
            </CSVLink>
        </button>
    </div>
  )
}

export default ExportReactCSV