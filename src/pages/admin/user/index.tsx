import Navbar from "components/Navbars/Navbar";
import Admin from "layouts/Admin";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import User from "../../../models/User";
import dbConnect from '../../../utils/mongodb';
import { getAll, del } from "utils/Api";
import { classNames, formatDate} from "utils/functions";
import { TrashIcon } from "@heroicons/react/outline";
import Pagination from "components/Pagination/Pagination";


 function Users({props}) {
  const [data, setData] = useState(props)
  const [page, setPage] = useState(0)
  const limit = 1

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
                      Title
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
                      Role
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Cadastro
                    </th>
                    <th scope="col" className="relative px-2 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                    <th scope="col" className="relative px-2 py-3">
                      <span className="sr-only">Delete</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data.map((person) => (
                    <tr key={person.email} className="px-4">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            {person.imageURL?(
                            <img className="h-10 w-10 rounded-full" src={person.imageURL} alt="" />
                            ):(
                            <span className="inline-block h-10 w-10 rounded-full overflow-hidden bg-gray-100">
                            <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                          </span>
                          )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{person.name}</div>
                            <div className="text-sm text-gray-500">{person.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{person.title}</div>
                        <div className="text-sm text-gray-500">{person.department}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{person.roles.map((role) => role)}</td>

                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(person.createdAt)}</td>

                      <td className="py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a href={`user/${person._id}`} className="text-indigo-600 hover:text-indigo-900">
                          Edit
                        </a>
                      </td>
                      <td className="pr-3 whitespace-nowrap text-right">
                         <TrashIcon onClick={() => deleteItem(person._id)} className="cursor-pointer text-red-600 hover:text-red-900 text-4xl"/>
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
    .limit(1)

    return {
      props: {
        props: JSON.parse(JSON.stringify(data))
      },
    };
}

export default Users