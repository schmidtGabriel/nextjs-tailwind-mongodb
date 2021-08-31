import Navbar from "components/Navbars/Navbar";
import Admin from "layouts/Admin";
import React, {useEffect, useState} from "react";
import User from "../../models/User";
import InputMask from 'react-input-mask';
import NoImage from "components/Image/NoImage";
import user from "pages/api/user";
import { classNames, getlocalUser } from "utils/functions";
import dynamic from 'next/dynamic'
import { postFile } from "utils/Api";

const tabs = [
  { name: 'My Account', href: '#', current: true },
]


  export default function CategoryForm(props) {
    const [data, setData] = useState(props.data != undefined? props.data: {})
    const [file, setFile] = useState(null)

    const handleSubmit = async (e) => {
    e.preventDefault();
      props.onSubmitEvent(data, file);
  };

  const handleChange = async (e) =>{
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  // const fileSelectHandler = async (e) =>{
  //   var file = e.target.files[0]
  //   var reader = new FileReader();
  //   var url = reader.readAsDataURL(file);
  //   setFile(file)
  //  reader.onloadend = function (e) {
  //   setData({
  //     ...data,
  //     'imageURL': reader.result,
  //   })
  //   }.bind(this);

  //   await postFile(file, "api/user/image/"+data._id)

  // }



    return (
      <>
    <form onSubmit={handleSubmit}>
      <div className="mt-4 bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6 space-y-6 ">

        <div className="md:grid md:grid-cols-3 md:gap-3">
                  <div className="md:col-span-1 py-2">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Category Information</h3>
                  <p className="mt-1 text-sm text-gray-500">.</p>
                  </div>
              <div className="md:col-span-2">
              <div className="grid grid-cols-6 gap-6 ">
                <div className="col-span-6 sm:col-span-6">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={data.name || ''}
                      onChange={handleChange}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Shirt..."
                    />
                  </div>
                </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-5">
          <button
            type="submit"
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  </>
    )
  }

