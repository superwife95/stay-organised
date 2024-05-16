export function getUsers(url){
  return fetch(url,{
        method:"get",
    }).then(response=>response.json())
    .then(data=>{return data});
}