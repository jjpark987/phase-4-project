import React from "react";

function Pagination({ nPages, currentPage, setCurrentPage }) {
    const pageNumbers = [...Array(nPages + 1).keys()].slice(1);

    function goNextPage() {
        if (currentPage !== nPages) {
            setCurrentPage(currentPage + 1);
        }
    }

    function showPages() {
        if (currentPage < 7) {
            return [0, 11]
        } else {
            return [currentPage - 6, currentPage + 5]
        }
    }

    function goPrevPage() {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    return (
        <div id='pagination'>
            <div>
                <button className='navigation' onClick={() => setCurrentPage(1)}>{'\u00AB'}</button>
            </div>
            <div>
                <button className='navigation' onClick={goPrevPage}>{'\u2039'}</button>
            </div>
            <div id='show-pages'>
                {pageNumbers.slice(...showPages()).map(page => (
                    page === currentPage ?                     
                    <button id='current-page' key={page} onClick={() => setCurrentPage(page)}>{page}</button> :
                    <button key={page} onClick={() => setCurrentPage(page)}>{page}</button>))}
            </div>
            <div>
                <button className='navigation' onClick={goNextPage}>{'\u203A'}</button>
            </div>
            <div>
                <button className='navigation' onClick={() => setCurrentPage(nPages)}>{'\u00BB'}</button>
            </div>
        </div>
    );
}

export default Pagination;
