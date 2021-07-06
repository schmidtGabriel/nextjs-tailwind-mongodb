import UserForm from "components/Forms/UserForm";
import Navbar from "components/Navbars/Navbar";
import Admin from "layouts/Admin";
import User from "models/User";
import router from "next/router";
import React, {useState} from "react";
import { toast } from "react-toastify";
import {post} from "../../../utils/Api";

  export default function UserCreate() {
    const [user, setUser] = useState({})

    const onSave = async (data) => {
      try{
        const res = await post(data, "api/user")
        
          if(res.$success){
            const user = res.$success.info
            toast.success('Success: '+res.$success.msg);
            router.push(user._id)

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
      <UserForm data={user} onSubmitEvent={onSave}/>
      </Admin>
      </>
    )
  }

 