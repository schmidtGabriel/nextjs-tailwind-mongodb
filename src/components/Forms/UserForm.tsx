import Navbar from "components/Navbars/Navbar";
import Admin from "layouts/Admin";
import React, {useEffect, useState} from "react";
import User from "../../models/User";
import InputMask from 'react-input-mask';
import NoImage from "components/Image/NoImage";
import user from "pages/api/user";
import { classNames, getlocalUser } from "utils/functions";
import Notification, { show } from "components/Notification/Notification";
import dynamic from 'next/dynamic'

const tabs = [
  { name: 'My Account', href: '#', current: true },
]


  export default function UserForm(props) {
    const [data, setData] = useState(props.data != undefined? props.data: {})
    const [notify, setNotify] = useState({msg: "", info: "", type:null, show: true})
    let DynamicComponent = dynamic(null);

    const handleSubmit = async (e) => {
      e.preventDefault();

      // show({msg: "Success", info: "Parabens, atualizado com sucess", type: "success", show: false})
      setNotify({msg: "Success", info: "Parabens, atualizado com sucess", type: "success", show: true})


      // console.log(data)
    // props.onSubmitEvent(data);
  };

  const handleChange = async (e) =>{
    setData({
      ...data,
      [e.target.name]: e.target.value
    })

  }


    return (
      <>
      <div id="content">
      <Notification props={notify} fragment={this} />

      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        <select
          id="tabs"
          name="tabs"
          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          defaultValue={tabs.find((tab) => tab.current).name}
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <a
                key={tab.name}
                href={tab.href}
                className={classNames(
                  tab.current
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                  'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
                )}
                aria-current={tab.current ? 'page' : undefined}
              >
                {tab.name}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
    <div className="space-y-6 mt-4" >
      <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:grid md:grid-rows-6 md:col-span-1">
            <div className="md:col-span-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Personal Information</h3>
            <p className="mt-1 text-sm text-gray-500">Use a permanent address where you can receive mail.</p>
            </div>
            <div className={data._id ? 'hidden': 'row-start-3 row-end-3 mt-12'}>
              <h3 className="text-lg font-medium leading-6 text-gray-900">First Access</h3>
            <p className="mt-1 text-sm text-gray-500">To create a new user, please fill the password.</p>
            </div>
            <div className='row-start-4 row-end-5 mt-14'>
              <h3 className="text-lg font-medium leading-6 text-gray-900">Personal Address</h3>
            <p className="mt-1 text-sm text-gray-500">Please, provide your address</p>
            </div>
          </div>
          
          <div className="md:mt-0 md:col-span-2">
            <form onSubmit={handleSubmit}>
            <div className={!data._id? 'hidden': 'mb-4'}>
                <label className="block text-sm font-medium text-gray-700">Photo</label>
                <div className="mt-1 flex items-center space-x-5">
                {data.imageURL ? 
                <img className="h-20 w-20 rounded-full" src={data.imageURL} alt="" />
                :
                <span className="inline-block h-20 w-20 mr-2 rounded-full overflow-hidden bg-gray-100">
                <NoImage/>
                </span>
                }  
                  <button
                    type="button"
                    className="bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Change
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-6 gap-6 ">
              <div className="col-span-6 sm:col-span-3">
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
                    placeholder="Gabriel..."
                  />
                </div>
              </div>

              <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    autoComplete="email"
                    value={data.email || ''}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <InputMask mask="(99) 99999-9999" value={data.phone || ''} onChange={handleChange}>
                    {(inputProps) =>
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        {...inputProps}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    }
                  </InputMask>
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="birthday" className="block text-sm font-medium text-gray-700">
                    Birthday
                  </label>
                  <InputMask mask="99/99/9999" value={data.birthday || ''} onChange={handleChange}>
                  {(inputProps) =>
                    <input
                      type="tel"
                      name="birthday"
                      id="birthday"
                      {...inputProps}
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  }
                  </InputMask>
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <Roles roles={data.roles} />
                </div>

                  {/* PASSWORD */}
                <div className={data._id? 'hidden':'grid grid-cols-2 gap-6 col-span-12 sm:col-span-6 '}>
                  <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <input
                      type="tel"
                      name="password"
                      id="password"
                      value={data.password || ''}
                      onChange={handleChange}
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                      Confirm Password
                    </label>
                    <input
                      type="tel"
                      name="confirmPassword"
                      id="confirmPassword"
                      value={data.confirmPassword || ''}
                      onChange={handleChange}
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                </div>
                <div className="grid grid-cols-6 gap-6  mt-5">
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                    Country / Region
                  </label>
                  <select
                    id="country"
                    name="country"
                    autoComplete="country"
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option>United States</option>
                    <option>Canada</option>
                    <option>Mexico</option>
                  </select>
                </div>

                <div className="col-span-6">
                  <label htmlFor="street_address" className="block text-sm font-medium text-gray-700">
                    Street address
                  </label>
                  <input
                    type="text"
                    name="street_address"
                    id="street_address"
                    autoComplete="street-address"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                    State / Province
                  </label>
                  <input
                    type="text"
                    name="state"
                    id="state"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                  <label htmlFor="postal_code" className="block text-sm font-medium text-gray-700">
                    ZIP / Postal
                  </label>
                  <input
                    type="text"
                    name="postal_code"
                    id="postal_code"
                    autoComplete="postal-code"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
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
            </form>
          </div>
        </div>
      </div>
     
    </div>
      </>
    )
  }

  export function Roles(data){
    const [roles, setRoles] = useState({
      user: hasRole('user', data.roles),
      owner: hasRole('owner', data.roles),
      admin: hasRole('admin', data.roles)
    })
    const [disable, setDisable] = useState({
      user: false,
      owner: false,
      admin: false
    })

    useEffect(() => {
      async function fetchMyAPI() {
        const u = await getlocalUser()
        setDisable({
          user: hasRole('user', u.roles),
          owner: hasRole('owner', u.roles),
          admin: hasRole('admin', u.roles)
        })
      }
      
      fetchMyAPI()
  },[])
  
    
    const checkboxChange = async (e) =>{
      const index = data.roles.indexOf(e.target.name)

      if(index  > -1){
        data.roles.splice(index, 1)
      }else{
        data.roles.push(e.target.name)
      }

      setRoles({
        ...roles,
        [e.target.name]: hasRole(e.target.name, data.roles)
      })
      
    }

    function hasRole(e, data): boolean{
      const index = data.indexOf(e)
      if(index  > -1){
       return true
      }else{
        return false
      }
    }
    

    return(
      <div className="grid grid-cols-3 gap-2 col-span-6 ">
      <div className="col-span-6">Roles</div>
      <div className="flex items-center">
    <input
      id="admin"
      name="admin"
      type="checkbox"
      disabled={!disable.admin}
      checked={roles.admin}
      onChange={checkboxChange}
      className={classNames(
        !disable.admin
          ? 'text-gray-200'
          : 'focus:ring-indigo-500 text-indigo-600',
        'h-4 w-4 border-gray-300 rounded'
      )}
    />
    <label htmlFor="admin" className="ml-2 block text-sm text-gray-900">
      Admin
    </label>
  </div>
  
  <div className="flex items-center">
    <input
      id="owner"
      name="owner"
      type="checkbox"
      disabled={disable.user && !disable.admin}
      checked={roles.owner}
      onChange={checkboxChange}
      className={classNames(
        disable.user && !disable.admin
          ? 'text-gray-200'
          : 'focus:ring-indigo-500 text-indigo-600',
        'h-4 w-4 border-gray-300 rounded'
      )}
      />
    <label htmlFor="owner" className="ml-2 block text-sm text-gray-900">
      Owner
    </label>
  </div>
  <div className="flex items-center">
    <input
      id="user"
      name="user"
      type="checkbox"
      checked={roles.user}
      onChange={checkboxChange}
      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
    />
    <label htmlFor="user" className="ml-2 block text-sm text-gray-900">
      User
    </label>
  </div>
 
  </div>
    )
  }