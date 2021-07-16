import Navbar from "components/Navbars/Navbar";
import Admin from "layouts/Admin";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import User from "../../../models/User";
import dbConnect from '../../../utils/mongodb';
import { getAll, del } from "utils/Api";
import { classNames, FirstUppercase, formatDate} from "utils/functions";
import { CheckIcon, PencilAltIcon, TrashIcon } from "@heroicons/react/outline";
import Pagination from "components/Pagination/Pagination";
import router from "next/router";


 function Users({props}) {
  const [data, setData] = useState(props)
  const [page, setPage] = useState(0)
  const limit = 10

  async function deleteItem(id){
    const res = await del(id,"api/user")

    if(res){
      alert("Success")
      fetchData(page, 'start')
    }
  }

 const fetchData = async (number, type) => {
    const query = `?page=${number}&limit=${limit}`
    const res = await getAll("api/user"+query)
    setPage(number)
    setData(res.data)
  }
  

  return (
    <>
      <Admin>
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Contact
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Roles
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Register Date
                    </th>
                    <th scope="col" className="relative px-4 py-3">
                      <span className="sr-only">Edit/Delete</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data.map((item) => (
                    <tr key={item.email} className="px-4">
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            {item.imageURL?(
                            <img className="h-10 w-10 rounded-full" src={item.imageURL} alt="" />
                            ):(
                            <span className="inline-block h-10 w-10 rounded-full overflow-hidden bg-gray-100">
                            <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                          </span>
                          )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{item.name}</div>
                            <div className="text-sm text-gray-500">{item.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-sm text-left text-gray-500">
                            {item.phone}
                      </td>
                      <td>
                        <div className="p-4 flex flex-col gap-1">
                        <span className="px-1 py-1 text-xs leading-5 font-semibold text-center rounded-full  bg-green-100 text-green-800">
                          Active
                        </span>
                        </div>
                       
                      </td>
                      <td>
                      <div className="p-4 flex flex-col gap-1">
                        {item.roles.slice().sort().map((role) => 
                      <span 
                      className={classNames(
                          role == 'admin'
                          ? 'bg-green-100 text-green-800'
                          : role == 'owner'
                          ? 'bg-blue-100 text-blue-800'
                          : role == 'user'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800',
                          ' px-1 py-1 text-xs leading-5 font-semibold text-center rounded-full '
                      )}>
                     {FirstUppercase(role)}
                      </span>
                      )}
                      </div>
                      </td>

                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(item.createdAt)}</td>
                      <td>
                        <div className="p-4 flex flex-row justify-end items-center gap-2">
                          <PencilAltIcon onClick={() => router.push(`user/${item._id}`)} className=" w-6 h-6 cursor-pointer text-indigo-600 hover:text-indigo-900 " />
                          <TrashIcon onClick={() => deleteItem(item._id)} className=" w-6 h-6 cursor-pointer text-red-600 hover:text-red-900"/>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination 
                page={page} 
                limit={limit} 
                dataLength={data.length} 
                onPaginateEvent={fetchData} />
            </div>
          </div>
        </div>
        </div>
      </Admin>
    </>
  )
}

// export async function getStaticProps() {
//   // Call an external API endpoint to get posts
//     const data = await User.find({})
//     .skip(0)
//     .limit(10)  
//   return {
//     props: {
//       props: JSON.parse(JSON.stringify(data))
//     },
//   }
// }

export async function getServerSideProps(context) {

    const data = await User.find()
    .skip(0)
    .limit(10)

    return {
      props: {
        props: JSON.parse(JSON.stringify(data))
      },
    };
}

export default Users