/* This example requires Tailwind CSS v2.0+ */
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FirstUppercase } from 'utils/functions'

export default function Navbar() {
  const router = useRouter()
  const path = router.asPath.replace("/", "").split("/");
  let title = path[1]
  if(path.length > 2){
    if(path[2]=="create"){
      title = path[1] +" - "+ "Create"
    }else{
      title = path[1] +" - "+ "Edit"
    }
  }

  let go = ""
  if(path[1] != "dashboard" && path[2] != "create"){
    go = "/admin/"+path[1]+"/create"
  }
  
  return (
    <div className="md:flex md:items-center md:justify-between py-5">
    <div className="flex-1 min-w-0">
      <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">{FirstUppercase(title)}</h2>
    </div>
    {go != "" && 
    <div className="mt-4 flex md:mt-0 md:ml-4"> 
        <Link href={go}>
        <button
        type="button"
        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Create {path[1]}
      </button>
        </Link>
     
    </div>
    }
  </div>
  )
}
