import UserForm from "components/Forms/UserForm";
import Navbar from "components/Navbars/Navbar";
import Admin from "layouts/Admin";
import React from "react";

const tabs = [
  { name: 'My Account', href: '#', current: true },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

  export default function UserCreate() {
    return (
      <>
      <Admin>
      <UserForm/>
      </Admin>
      </>
    )
  }