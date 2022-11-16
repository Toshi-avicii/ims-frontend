import { CSVLink } from 'react-csv';

function allExportReactCSV({ csvData, fileName }) {
  return (
    <div>
        <button className='bg-primary text-white rounded-sm shadow-md py-2 px-8 hover:bg-green-600 transition-all'>
            <CSVLink data={csvData} filename={fileName}>
                <span>Export All Pages </span> <i className="bi bi-file-earmark-spreadsheet"></i>
            </CSVLink>
        </button>
    </div>
  )
}

export default allExportReactCSV;