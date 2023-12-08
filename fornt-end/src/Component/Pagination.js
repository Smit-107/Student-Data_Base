  import React, { useEffect, useState } from 'react';

  const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = [];

    // const [width, setWidth] = useState(false);


    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    const goToNextPage = () => {
      if (currentPage < totalPages) {
        onPageChange(currentPage + 1);
      }
     else {
        onPageChange(currentPage = 1);
      }
    };
  
    const goToPreviousPage = () => {
      if (currentPage > 1) {
        onPageChange(currentPage - 1);
      }
      else {
        onPageChange(currentPage = totalPages);
      }
    };

    const [isMobile, setIsMobile] = useState(window.innerWidth < 900);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

    return (
      <div className="bg-gray-100 w-full">
        <span>
          <div
            style={{ boxShadow: "0px 0px 20px #D9D9DB" }}
            className="bg-white rounded sm:px-4 sm:py-3 p-2 flex items-center sm:justify-between "
          >
            <div className="flex items-center">

              <button onClick={goToPreviousPage} className={`mr-2 sm:p-2 p-1 rounded-md border border-x-2 border-gray-400 bg-gray-200 focus:outline-none`}>
              {isMobile ? <span>Previous</span> : (
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokellinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                )}
                
              </button>

              <span className="text-gray-700 flex">
                {/* Page {currentPage} of {totalPages} */}
                Page {currentPage} <span className='hidden sm:block ms-0.5'>of {totalPages}</span>

              </span>
            </div>
            <div className="flex items-center">

              <button onClick={goToNextPage} className="mx-2 sm:p-2 p-1 rounded-md border border-x-2 border-gray-400 bg-gray-200 focus:outline-none">
              {isMobile ? <span>next</span> : (<svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokellinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>)}
                
              </button>

              
              {/* {pageNumbers.map((val,id) => {
                if (val !== currentPage) {
                  return (
                    <button onClick={()=>{onPageChange(currentPage = val)}} key={id} className="px-2 py-1 me-1 rounded-md hover:bg-gray-200 border border-x-2 border-gray-400  focus:outline-none focus:ring focus:ring-blue-200">
                      {val}
                    </button>
                  );
                } else {
                  return null; // or any other placeholder, if needed
                }
              })} */}
              {isMobile ? null : (
              pageNumbers.map((val, id) => {
                if (val !== currentPage) {
                  return (
                    <button onClick={() => { onPageChange(val) }} key={id} className="px-2 py-1 me-1 rounded-md hover:bg-gray-200 border border-x-2 border-gray-400  focus:outline-none focus:ring focus:ring-blue-200">
                      {val}
                    </button>
                  );
                } else {
                  return null; // or any other placeholder, if needed
                }
              })
            )}
            </div>
          </div>
        </span>
      </div>
    );
  };

  export default Pagination;

