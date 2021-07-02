import UserForm from "components/Forms/UserForm";
import Navbar from "components/Navbars/Navbar";
import Admin from "layouts/Admin";
import User from "models/User";
import router from "next/router";
import React, {useState} from "react";
import {post} from "../../utils/Api";

  export default function UserCreate() {
    const [user, setUser] = useState({})

    const onSave = async (data) => {
      try{
        const res = await post(data, "api/user")
        
        if(res){
          const user = res.data
          router.push(user._id)
        }
        
      }catch(err){
    
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

 