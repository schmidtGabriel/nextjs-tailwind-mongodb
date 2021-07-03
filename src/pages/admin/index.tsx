import {useRouter} from "next/router"
import { getlocalUser } from "utils/functions"
import React, { useEffect } from "react";
import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import { get } from "utils/Api";

const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Marketplace', href: '#' },
  { name: 'Company', href: '#' },
]
export default function Admin(){

  const router = useRouter()

  useEffect(() => {

    async function fetchMyAPI() {
        const user = getlocalUser()
        const res = await get(null,'api/auth/me')
        if(res.success){
            router.push('admin/dashboard')
        }else{        
            router.push('admin/login')
        }
      }
      
      fetchMyAPI()
  },[])

        return (
        <div className="flex h-screen justify-center items-center bg-gray-100 animate-pulse" >
            <div className="m-auto text-center text-gray-500 text-4xl ">
                Carregando...
            </div>
        </div>
        )
         

}