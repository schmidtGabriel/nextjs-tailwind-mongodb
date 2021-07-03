import {
    PhoneIcon,
    AtSymbolIcon,
  } from '@heroicons/react/outline'
import NoImage from 'components/Image/NoImage';
  import React, {useState} from "react";

export default function UserCard({data}) {

    return (
        <div className="flex flex-row px-4 py-2 items-center">
        {data.imageURL ? 
                <img className="h-20 w-20 rounded-full" src={data.imageURL} alt="" />
                :
                <span className="inline-block h-20 w-20 mr-4 rounded-full overflow-hidden bg-white">
                <NoImage/>
                </span>
        }  
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