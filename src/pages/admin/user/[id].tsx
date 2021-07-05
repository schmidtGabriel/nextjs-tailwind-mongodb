import UserCard from "components/Cards/UserCard";
import UserForm from "components/Forms/UserForm";
import Navbar from "components/Navbars/Navbar";
import Admin from "layouts/Admin";
import { Collection } from "mongoose";
import React, {useEffect, useState, useLayoutEffect} from "react";
import { put } from "utils/Api";
import { getlocalUser } from "utils/functions";
import User from "../../../models/User";
import dbConnect from '../../../utils/mongodb';

  export default function UserEdit({data}) {
  const [user, setUser] = useState(data)

  
  const onSave = async (data) => {
    try{
      const res = await put(data, "api/user")
      
      if(res.success){
       setUser(user => res.data) 
      }
      
    }catch(err){
  
    }
    
  }

    return (
      <>
      <Admin>
      <UserCard data={user}/>
      <UserForm data={user} onSubmitEvent={onSave}/>
      </Admin>
      </>
    )
  }


  export async function getServerSideProps({params}) {
    await dbConnect();

    const user = await User
      .findById(params.id)
      .lean()

    return { props: {
         data: JSON.parse(JSON.stringify(user))
    }};
}

