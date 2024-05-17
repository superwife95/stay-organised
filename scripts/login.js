import { getUsers } from "./util.js";
if(localStorage.getItem('id')!=null&&localStorage.getItem('id')!=undefined){
    window.location.href=`/home.html?cid=${localStorage.getItem('id')}`;
}
window.onload=function(){
    let loginBtn = document.getElementById("login");
    loginBtn.onclick=login;
}
function login(){
    document.getElementById('uError').innerHTML="";
    document.getElementById('pwdError').innerHTML="";
    let userName=document.getElementById('uEmail').value;
    let password=document.getElementById('name').value;
    let isChecked= document.getElementById('remMe').checked;
    if(userName==''||userName==null||userName==undefined){
       
        document.getElementById('uError').innerHTML="User Name should not be empty";
        document.getElementById('uError').style.color="red";
        
    }
    else if(password==''||password==null||password==undefined){
        
        document.getElementById('pwdError').innerHTML="Password should not be empty";
        document.getElementById('pwdError').style.color="red";
        
    }
    else{
        let users = Promise.resolve(getUsers('http://localhost:8083/api/users'));
        users.then(data=>{
            for (const [key, value] of Object.entries(data)) {
             if(value.username==userName && value.password==password){
                if(isChecked==true){
                    localStorage.setItem("id",value.id);
                    localStorage.setItem("name",value.name);
                    localStorage.setItem('userName',value.username);
                }
                else{
                    sessionStorage.setItem("id",value.id);
                    sessionStorage.setItem("name",value.name);
                    sessionStorage.setItem('userName',value.username);
                }
                window.location.href=`/home.html?cid=${sessionStorage.getItem('id')}`;
                break;
             }
             else{
                document.getElementById('uError').innerHTML="Invalid User Name or password";
                document.getElementById('uError').style.color="red";
             }
        }
        
      });
       
         
    }
   
}