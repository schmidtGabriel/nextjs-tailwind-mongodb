import {
    PhoneIcon,
    AtSymbolIcon,
  } from '@heroicons/react/outline'
  import React, {useState} from "react";

export default function UserCard({data}) {

    return (
        <div className="flex flex-row px-4 py-2 items-center">
       <span className="inline-block h-16 w-16 mr-2 rounded-full overflow-hidden bg-white">
          <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </span>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">{data.name}</h1>
        <div className="flex flex-row gap-4">
        <div className="flex flex-row content-center">
        <PhoneIcon
        className="text-black-400 h-5 w-5 mt-0.5"
        aria-hidden="true"
        />
        <span className="text-base"> {data.phone} </span>
        </div>
        <div className="flex flex-row content-center items-stretch">
        <AtSymbolIcon
        className="text-black-400 h-5 w-5 mt-0.5"
        aria-hidden="true"
        />
        <span className="text-base">  {data.email} </span>
        </div>
        </div>
      </div>
    </div>
    )
  }