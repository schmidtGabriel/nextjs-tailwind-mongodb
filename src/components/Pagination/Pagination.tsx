import { useState } from "react";
import { classNames } from "utils/functions";

export default function Pagination(props){
    const page = props.page
    const limit = props.limit
    const dataLength = props.dataLength
    const skip = page * limit
  
    async function fetchData(number, type){
      if(number >= 0 && type == 'prev' || dataLength == limit && type == 'next' || type=='start'){
        props.onPaginateEvent(number);
      }
    }
  
    return(
    <>
      <nav
          className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
          aria-label="Pagination"
        >
          <div className="hidden sm:block">
            <p 
            className={classNames(
                dataLength == 0
                  ? 'hidden'
                  : 'text-sm text-gray-700'
              )}>
              Showing <span className="font-medium">{skip + 1}</span> to <span className="font-medium">{skip+dataLength}</span> Results
            </p>
          </div>
          <div className="flex-1 flex justify-start md:justify-end">
            <a
              onClick={() => fetchData(page-1, 'prev')}
              className={classNames(
                page == 0
                  ? 'bg-gray-200 cursor-not-allowed'
                  : 'cursor-pointer bg-white hover:bg-gray-50',
                  'relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700'
              )}
              
            >
              Previous
            </a>
            <a
              onClick={() => fetchData(page+1, 'next')}
              className={classNames(
                dataLength < limit
                  ? 'bg-gray-200 cursor-not-allowed'
                  : 'cursor-pointer bg-white hover:bg-gray-50',
                  'ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700'
              )}
              >
              Next
            </a>
          </div>
        </nav>
        </>
    )
  
  }
  