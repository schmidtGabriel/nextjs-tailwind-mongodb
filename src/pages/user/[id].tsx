import UserCard from "components/Cards/UserCard";
import UserForm from "components/Forms/UserForm";
import Navbar from "components/Navbars/Navbar";
import Admin from "layouts/Admin";
import React from "react";


  export default function UserEdit() {
    return (
      <>
      <Admin>
      <UserCard/>
      <UserForm/>
      </Admin>
      </>
    )
  }