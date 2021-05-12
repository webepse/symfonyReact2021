import React from 'react';

const Pagination = (props) => {

    const pagesCount = Math.ceil(props.length / props.itemsPerPage)
    const pages = []

    for(let i=1; i<= pagesCount; i++)
    {
        pages.push(i)
    }


    return ( 
        <>
            <ul className="pagination pagination-sm justify-content-center">
                <li className={"page-item" + (props.currentPage === 1 ? " disabled" : null)}>
                    <button className="page-link" onClick={()=>props.onPageChanged(props.currentPage - 1)} >&laquo;</button>
                </li>
                {pages.map(page => (
                    <li key={page} className={"page-item" + (props.currentPage === page ? " active" : null)}>
                        <button className="page-link" onClick={() => props.onPageChanged(page)}>{page}</button>
                    </li>
                ))}

                

                <li className={"page-item" + (props.currentPage === pagesCount ? " disabled" : null)}>
                    <button className="page-link" onClick={()=>props.onPageChanged(props.currentPage + 1)} >&raquo;</button>
                </li>

            </ul>
        </>
     );
}


Pagination.getData = (items, currentPage, itemsPerPage) => {
    // array.slice(debut,fin)
    const start = currentPage * itemsPerPage - itemsPerPage
    //     20   =      3      *     10       -  10          
    return items.slice(start, start + itemsPerPage)
}
 
export default Pagination;