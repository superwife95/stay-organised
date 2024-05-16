export function getUsers(url){
  return fetch(url,{
        method:"get",
    }).then(response=>response.json())
    .then(data=>{return data});
}
export async function addData(url,data){
   return await fetch(url,{
    method:"POST",
    headers:{
      "Content-type":"application/json;charset=UTF-8",},
    body:JSON.stringify(data)
   }).then(response=>response.status)
}