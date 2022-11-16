import { Link } from 'react-router-dom';

function Pagination({ page, perPage, count }) {
    const totalLinks = Math.ceil(count / perPage);
    let startLoop = page;
    let diff = totalLinks - page;

    if(diff < 3) {
        startLoop = totalLinks - 1; 
    }

    let endLoop = startLoop + 1;

    const links = () => {
        const allLinks = [];
        for(let i = startLoop; i < endLoop; i++) {
            if(i > 0) {
                allLinks.push(
                    <li key={i} className='px-3 py-1 rounded-sm bg-primary text-white mr-4'>
                        <Link to={`/dashboard/counselors/pages/${i}`}>{i}</Link>
                    </li>
                )
            }
        }

        return allLinks;
    }

    const next = () => {
        if(page < totalLinks) {
            return <li className='px-2 py-1 rounded-sm bg-primary text-white'>
                <Link to={`/dashboard/counselors/pages/${page + 1}`}>
                    <i className="bi bi-caret-right-fill"></i>
                </Link></li>
        }
    }

    const prev = () => {
        if(page > 1) {
            return <li className='px-2 py-1 rounded-sm bg-primary text-white mr-4'>
                <Link to={`/dashboard/counselors/pages/${page - 1}`}>
                    <i className="bi bi-caret-left-fill"></i>
                </Link></li>
        }
    }
      return (
    count > 3 && 
    <ul className='flex w-2/4 m-auto justify-center mt-9 pb-9'>
        {prev()}
        {links()}
        {next()}
    </ul>
  )
}

export default Pagination