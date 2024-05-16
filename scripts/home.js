 import { getUsers } from "./util.js";
  window.onload=function(){
    let val=document.getElementById('letter');
    if(localStorage.getItem('name')!=null&&localStorage.getItem('name')!=undefined){
        setStylesforProfile(val,localStorage.getItem('name'));
       
    }
    else if(sessionStorage.getItem('name')!=null&&sessionStorage.getItem('name')!=undefined){
        
        setStylesforProfile(val,sessionStorage.getItem('name'));
       
    }
    let menu = document.getElementById('navmenu');
    let users = Promise.resolve(getUsers('http://localhost:8083/api/users'));
    users.then(data=>{
     for (const [key, value] of Object.entries(data)) {
         let tag = document.createElement('a');
          tag.setAttribute('class','dropdown-item');
          tag.innerHTML=value.name;
          tag.setAttribute('id',value.id);
          tag.style.color="black";
          menu.appendChild(tag);
     }
 });

   document.getElementById('subBtn').onclick=signOut;

}
function setStylesforProfile(event,value){
    event.innerHTML=value.charAt(0);
    event.style.backgroundColor= "green";
   event.style.borderRadius="100%";
}
function signOut(){
    if(localStorage.getItem('id')!=null||localStorage.getItem('id')!=undefined){
        localStorage.removeItem('id');
        localStorage.removeItem('name');
    }
    window.location.href='/index.html';
}