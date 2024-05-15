'use strict';
window.onload=function(){
    let signUp=document.getElementById("signUp");
    signUp.addEventListener('click',onSignUp);
}
function onSignUp(){
   let name = document.getElementById('rName').value;
   let uName = document.getElementById('rUName').value;
   let pwd = document.getElementById('rUPwd').value;
   let res = /^[a-zA-Z]+$/.test(name);
   if(name==''||name==null||name==undefined){
      errorMessage(document.getElementById('unErr'),"Name should not be empty");
   }
   else if(name.length<5||name.length>10||res==false){
    errorMessage(document.getElementById('unErr'),"invalid name");
   }
   else if(uName==''||uName==null||uName==undefined){
    errorMessage(document.getElementById('uuErr'),"user Name should not be empty");
   }
   else if(uName.length<5 || uName.length>10){
    errorMessage(document.getElementById('uuErr'),"invalid User Name");
   }
   else if(pwd==''||pwd==null||pwd==undefined){
     errorMessage(document.getElementById('upErr'),"password should not be empty");
   }
   else if(pwd.length<5||pwd.length>10){
    errorMessage(document.getElementById('upErr'),"invalid password");
   }
   else{
    fetch(`http://localhost:8083/api/username_available/${uName}`,{
        method:"get",
    }).then(response=>response.json())
    .then(data=>{
        if( data.available==false){
            errorMessage(document.getElementById('uuErr'),"user Name already taken");
        }
        else{
            let data={
                    "name": name,
                    "username": uName,
                    "password": pwd
                };
                fetch('http://localhost:8083/api/users',{
                    method:"POST",
                    body:JSON.stringify(data),
                    headers:{
                        "Content-type": 
                        "application/json; charset=UTF-8"
                    }
                }).then(response=>{
                    if(response.status==201){
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