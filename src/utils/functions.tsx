import moment from 'moment'
require('moment/locale/pt-br.js');


export function getlocalUser(){

if (typeof window !== "undefined") {
   const user = localStorage.getItem('user')

   return JSON.parse(user)
   }
   
   return null

}

export function FirstUppercase(string: string){

    const text = string.slice(0,1).toUpperCase() + string.slice(1, string.length)

    return text
    
 }

 export function formatDate(data: string){
 
   return moment(data).locale('pt-br').format('L')
}

