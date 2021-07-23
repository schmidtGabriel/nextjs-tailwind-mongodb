import moment from 'moment'
require('moment/locale/pt-br.js');
const message = require("./messages");


export async function getlocalUser(){

if (typeof window !== "undefined") {
   const user = await localStorage.getItem('user')
   return JSON.parse(user)
}
   return null
}

export async function getlocalToken(){

   if (typeof window !== "undefined") {
      const token = await localStorage.getItem('token')
      return token
   }
      return ""
}

export async function validateError(error){

   for (const field in error.errors) {
      switch (error.errors[field].kind) {
          case 'required':
              return message(4, field)
              break;
          default:
              return message(1)
              break;
      }
  }
}

export function classNames(...classes) {
   return classes.filter(Boolean).join(' ')
 }
 
export function FirstUppercase(string: string){

    const text = string.slice(0,1).toUpperCase() + string.slice(1, string.length)

    return text
    
 }

 export function formatDate(data: string){
 
   return moment(data).locale('pt-br').format('L')
}


