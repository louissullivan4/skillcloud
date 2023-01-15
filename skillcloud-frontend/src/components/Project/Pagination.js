import React from 'react'

import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";

const Pagination = ({ nPages, currentPage, setCurrentPage }) => {
    const pageNumbers = [...Array(nPages + 1).keys()].slice(1)
    const nextPage = () => {
            if(currentPage !== nPages) setCurrentPage(currentPage + 1)
    }
    const prevPage = () => {
        if(currentPage !== 1) setCurrentPage(currentPage - 1)
    }

    return (
        <div className='pagination'>
            <div className="page-item">
                <a className="page-link" onClick={prevPage} href='#'>
                    <BiLeftArrowAlt style={{fontSize: '30px'}}/>
                </a>
            </div>
            {pageNumbers.map((number, k) => (
                <div className="page-item" key={k}>
                    <a className="page-link" onClick={() => setCurrentPage(number)} href='#'>
                        {number}
                    </a>
                </div>
            ))}
            <div className="page-item">
                <a className="page-link" onClick={nextPage} href='#'>
                    <BiRightArrowAlt style={{fontSize: '30px'}}/>
                </a>
            </div>
        </div>
    )
}
export default Pagination