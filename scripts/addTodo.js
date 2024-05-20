import {getUsers,addData,loadUserCat} from './util.js';
window.onload=function(){
    loadUserCat();
    document.getElementById('signUp').onclick=()=>{
        let categorie = document.getElementById('cat').value;
        let task = document.getElementById('todoData').value;
        let deadline = document.getElementById('deadline').value.toLocaleString();
        let priority=document.getElementById("priority").value;
        let user=document.getElementById('assign').value;
        document.getElementById('catError').innerHTML='';
        document.getElementById('taskError').innerHTML='';
        document.getElementById('deadlineError').innerHTML='';
        document.getElementById('prioError').innerHTML='';
        document.getElementById('assignError').innerHTML='';
        if(categorie==null||categorie==undefined||categorie==''||categorie=='null'){
           error( document.getElementById('catError'),'select category');
        }
        else if(task==null||task==undefined||task==''){
            error( document.getElementById('taskError'),'Enter task');
        }
        else if(deadline==null||deadline==undefined||deadline==''){
            
            error( document.getElementById('deadlineError'),'select Deadline date');
        }
        else if(priority==null||priority==undefined||priority==''||priority=='null'){
            error( document.getElementById('prioError'),'Select Priority');
        }
        else if(user==null||user==undefined||user==''||user=='null'){
            error( document.getElementById('assignError'),'Select a user');
        }
        else{
            let data={
                "userid":user,
                "category":categorie,
                "description":task,
                "deadline":deadline,
                "priority":priority,
            };
            let d = Promise.resolve(addData("POST",'http://localhost:8083/api/todos',data));
            d.then(data=>{
                if(data==201){
                    alert("Task added successfully");
                    window.location.href="/home.html";
                }
            });
        }
    }
}
function error(event,data){
    event.innerHTML=data;
    event.style.color="red";
}