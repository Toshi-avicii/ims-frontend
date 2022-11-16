import { useState, useEffect } from 'react'
import { useGetCounselorsQuery } from '../store/services/counselorService';
import { changeFilters, resetFilters } from '../store/reducers/globalReducer';
import { useDispatch } from 'react-redux';
import { useGetFilteredLeadsMutation } from '../store/services/leadService';

function Filters({ page }) {
    const response = useGetCounselorsQuery();
    const [counselors, setCounselors] = useState([]);
    const [appliedFilters, setAppliedFilters] = useState([]);
    const dispatch = useDispatch();

    const [getFilteredLeads, filteredResponse] = useGetFilteredLeadsMutation();

    const [filterData, setFilterData] = useState({
        month: '',
        status: '',
        year: '',
        course: '',
        counselor: ''
    });

    const changeEvent = (e) => {
        setFilterData({ ...filterData, [e.target.name]: e.target.value });
    }

    const filterHandler = (e) => {
        e.preventDefault();

        dispatch(changeFilters({
            month: filterData.month,
            status: filterData.status,
            counselor: filterData.counselor
        }));

        getFilteredLeads({
            page: page,
            status: filterData.status,
            month: filterData.month,
            counselor: filterData.counselor
        })
    }

    const resetFiltersHandler = (e) => {
        dispatch(resetFilters());
        getFilteredLeads({
            page: page,
            status: '',
            month: '',
            counselor: ''
        });
    }

    useEffect(() => {
        if(!response.isFetching && response.status === "fulfilled") {
            setCounselors(response.data.counselors);
        }

        if(!response.isFetching && response.status === "rejected") {
            console.log(response.data);
        }

        
        let arr = [];
        for(const [key, value] of Object.entries(filterData)) {
            if(value !== '') {
                arr.push({ [key]: value });
                setAppliedFilters(arr);
            } else {
                continue;
            }
        }
    }, [response, filterData]);

  return (
    <div className='flex lg:flex-col items-stretch lg:justify-center lg:items-center'>
        <form className='flex flex-col lg:flex-row lg:justify-start lg:items-center w-full' onSubmit={filterHandler}>
            <div className='bg-slate-100 p-0 rounded shadow-sm flex justify-center items-center'>
                <div className='sm:p-0 my-3 lg:my-0'>
                    <input type="month" className='px-4 py-2 bg-transparent' name="month" value={filterData.month} onChange={changeEvent} />
                </div>
            </div>

            <div className='bg-slate-100 p-0 rounded shadow-sm flex justify-center items-center md:ml-2'>
                <div className='p-0 flex'>
                    <select
                        id="status"
                        className="block w-full px-6 py-2 outline-none rounded-lg bg-transparent"
                        name="status"
                        value={filterData.status}
                        onChange={changeEvent}
                    >
                        <option value="" disabled>Status</option>
                        <option value="">All</option>
                        <option value="Pending">Pending</option>
                        <option value="Resolved">Resolved</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>
            </div>

            <div className='bg-slate-100 p-0 rounded shadow-sm flex justify-center items-center md:ml-2'>
                <div className='p-0 flex'>
                    <select
                        id="counselor"
                        className="block w-full px-6 py-2 outline-none rounded-lg bg-transparent"
                        name="counselor"
                        value={filterData.counselor}
                        onChange={changeEvent}
                    >
                        <option value="" disabled>Counselor</option>
                        <option value="">All</option>
                        {counselors.map((item, index) => {
                            return (
                                <option value={item.name} key={index}>{item.name}</option>
                            )
                        })}
                    </select>
                </div>
            </div>

            <div className='bg-slate-100 p-0 rounded-sm shadow-sm flex justify-center items-center md:ml-2'>
                <div className='p-4 h-full w-full sm:p-0'>
                    <input type="submit" className='w-full block sm:inline px-4 py-2 cursor-pointer bg-orange-400 text-white text-sm h-full' value="Apply filters" />
                </div>
            </div>
            <div className='bg-slate-100 p-4 sm:p-0 rounded-sm shadow-sm flex justify-center items-center md:ml-2'>
                <button type="button" className='w-full block sm:inline sm:my-0 px-4 py-2 cursor-pointer bg-purple-600 text-white text-sm h-full' onClick={resetFiltersHandler}>Reset Filters</button>
            </div>
        </form>
        
    </div>
  )
}

export default Filters