'use strict';
import { addData , getUsers } from "./util.js";
localStorage.setItem('newUsr','yes');
window.onload=function(){
    let signUp=document.getElementById("signUp");
    signUp.addEventListener('click',onSignUp);
}
function onSignUp(){
   let name = document.getElementById('rName').value;
   let uName = document.getElementById('rUName').value;
   let pwd = document.getElementById('rUPwd').value;
   let cpwd = document.getElementById("rUcPwd").value;
   let res = /^[a-zA-Z]+$/.test(name);
   let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/.test(pwd);
   console.log(regex);
   document.getElementById('unErr').innerHTML="";
   document.getElementById('uuErr').innerHTML="";
   document.getElementById('upErr').innerHTML="";
   document.getElementById('ucpErr').innerHTML="";
   if(name==''||name==null||name==undefined){
      errorMessage(document.getElementById('unErr'),"Name should not be empty");
   }
   else if(name.length<5||name.length>12||res==false){
    errorMessage(document.getElementById('unErr'),"invalid name");
   }
   else if(uName==''||uName==null||uName==undefined){
    errorMessage(document.getElementById('uuErr'),"user Name should not be empty");
   }
   else if(uName.length<5 || uName.length>12){
    errorMessage(document.getElementById('uuErr'),"invalid User Name");
   }
   else if(pwd==''||pwd==null||pwd==undefined){
     errorMessage(document.getElementById('upErr'),"password should not be empty");
   }
   else if(regex==false){
    errorMessage(document.getElementById('upErr'),"invalid password");
   }
   else if(cpwd==''||cpwd==null||cpwd==undefined){
    errorMessage(document.getElementById('ucpErr')," confirm password should not be empty");
   }
   else if(pwd!=cpwd){
    errorMessage(document.getElementById('ucpErr'),"Password and Confirm Password should be same");
   }
   else{
     let isAvailable = getUsers(`http://localhost:8083/api/username_available/${uName}`);
     isAvailable.then(data=>{
        if( data.available==false){
            errorMessage(document.getElementById('uuErr'),"user Name already taken");
        }
        else{
            let data={
                    "name": name,
                    "username": uName,
                    "password": pwd
                };
                let user = Promise.resolve(addData('POST','http://localhost:8083/api/users',data));
                user.then(data=>{
                    if(data==201){
                        alert("Registered successfully");
                        window.location.href="/index.html";
                    }
                }).catch(error=>{
                    console.log(error.message);
                    alert("something went wrong");
                });
        }
    });
   
    }
}
function errorMessage(event,message){
    event.innerHTML=message;
    event.style.color="red";
    event.style.textAlign='center';
}