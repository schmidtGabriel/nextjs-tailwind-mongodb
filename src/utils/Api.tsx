

import { baseURL , header } from "../utils/mongodb";


export async function getAll(route) {
    

    const res = await fetch(baseURL+route,{
        method: 'GET', 
        headers: {
            ...header,
            "authentication": "DoNada "+localStorage.getItem('token')
        },
      })
      if(res){
          return res.json()
      }else{
          return "Error"
      }
 }

export async function get(id, route) {

    const res = await fetch(baseURL+route+"/"+id,{
        method: 'GET', 
        headers:  {
            ...header,
            "authentication": "DoNada "+localStorage.getItem('token')
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
            "authentication": "DoNada "+localStorage.getItem('token')
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
            "authentication": "DoNada "+localStorage.getItem('token')
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
            "authentication": "DoNada "+localStorage.getItem('token')
        },
      })
      if(res){
          return res.json()
      }else{
          return "Error"
      }
 }