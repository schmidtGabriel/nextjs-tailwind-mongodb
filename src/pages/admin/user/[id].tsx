import UserCard from "components/Cards/UserCard";
import UserForm from "components/Forms/UserForm";
import Navbar from "components/Navbars/Navbar";
import Admin from "layouts/Admin";
import { Collection } from "mongoose";
import React, {useEffect, useState, useLayoutEffect} from "react";
import { toast } from "react-toastify";
import { postFile, put } from "utils/Api";
import { getlocalUser } from "utils/functions";
import User from "../../../models/User";
import dbConnect from '../../../utils/mongodb';

  export default function UserEdit({data}) {
  const [user, setUser] = useState(data)
  const [formData, setFormData] = useState(null)

  
  const onSave = async (data, file) => {
    try{
      data.imageURL = ""
      const res = await put(data, "api/user")
      if(res.$success){
       setUser(user => res.$success.info)
       if(file){
        // const form = new FormData()
        // form.append('file', file)
        // await postFile(file, "api/user/image/"+user._id)
       }

       toast.success('Success: '+res.$success.msg);
      }else{
        toast.error('Error: '+res.$error.info);
      }
      
    }catch(err){
      toast.error('Error: '+err);

    }
    
  }

    return (
      <>
      <Admin>
      <UserCard data={user} />
      <UserForm data={user} formData={formData} onSubmitEvent={onSave}/>
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

