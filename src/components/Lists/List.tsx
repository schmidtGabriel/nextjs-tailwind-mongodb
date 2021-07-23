import ListLoading from "components/Loadings/ListLoading"
import Pagination from "components/Pagination/Pagination"
import React, { useState } from "react"
import NoRecord from "./NoRecord"

function List({header, body, data, loading, loadData, page, limit}){
  
    return(
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                {header}
                <ListLoading loading={loading} numCols={6}/> 
                {body}
              </table>
              <NoRecord dataLength={data.length} loading={loading}/>
              <Pagination 
                page={page} 
                limit={limit} 
                dataLength={data?data.length: 0} 
                onPaginateEvent={loadData} />
            </div>
          </div>
        </div>
        </div>
    )
}

export default List