

import router from "next/router";
import { baseURL , header } from "../utils/mongodb";

export async function getAll(route) {
    

    const res = await fetch(baseURL+route,{
        method: 'GET', 
        headers: {
            ...header,
            "authorization": "DoNada "+localStorage.getItem('token')
        },
      })
      if(res){
          return res.json()
      }else{
          return "Error"
      }
 }

export async function get(id, route) {
    var getRoute = "";
    if(id){
        getRoute = baseURL+route+"/"+id
    }else{
        getRoute = baseURL+route
    }

    const res = await fetch(getRoute,{
        method: 'GET', 
        headers:  {
            ...header,
            "authorization": "DoNada "+localStorage.getItem('token')
        },
      })
      if(res){
          return res.json()
      }else{
          return "Error"
      }
 }

export async function post(data, route) {

    const res = await fetch(baseURL+route,{
        method: 'POST', 
        headers: {
            ...header,
            "authorization": "DoNada "+localStorage.getItem('token')
        },
        body: JSON.stringify(data)
      })
      if(res){
          return res.json()
      }else{
          return "Error"
      }
 }

 export async function put(data, route) {

    const res = await fetch(baseURL+route+"/"+data._id,{
        method: 'PUT', 
        headers:  {
            ...header,
            "authorization": "DoNada "+localStorage.getItem('token')
        },
        body: JSON.stringify(data)
      })
      if(res){
          return res.json()
      }else{
          return "Error"
      }
 }

 export async function del(id, route) {

    const res = await fetch(baseURL+route+"/"+id,{
        method: 'DELETE', 
        headers:  {
            ...header,
            "authorization": "DoNada "+localStorage.getItem('token')
        },
      })
      if(res){
          return res.json()
      }else{
          return "Error"
      }
 }

 export async function logout() {

    localStorage.removeItem('token')
    localStorage.removeItem('user')

    router.push('/admin')


 }