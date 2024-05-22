export function getUsers(url){
  return fetch(url,{
        method:"get",
    }).then(response=>response.json())
    .then(data=>{return data});
}
export async function addData(method,url,data){
   return await fetch(url,{
    method:method,
    headers:{
      "Content-type":"application/json;charset=UTF-8",},
    body:JSON.stringify(data)
   }).then(response=>response.status)
}
export async function deleteData(url){
     return fetch(url,{
      method:"DELETE",
     }).then(response=>response.status);
}
export function loadUserCat(){
  let catSelect = document.getElementById('cat');
  let cat=Promise.resolve(getUsers('http://localhost:8083/api/categories'));
 cat.then(data=>{
     for(let i=0;i<data.length;i++){
         let opt = new Option();
         opt.id=data[i].id;
         opt.value=data[i].name;
         opt.innerHTML=data[i].name;
         catSelect.appendChild(opt);
     }
 });

     let us = document.getElementById('assign');
    let users=Promise.resolve(getUsers('http://localhost:8083/api/users'));
    users.then(data=>{
     for (const [key, value] of Object.entries(data)) {
         let opt = new Option();
         opt.value=value.id;
         opt.innerHTML=value.name;
         us.appendChild(opt);
     }
 });
}
