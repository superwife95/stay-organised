import { getUsers,addData } from "./util.js";
let ne=document.getElementById('noEd');
    var params = new URLSearchParams(location.search);
window.onload=function()
{
   
if(params.has('tid')===true){
   getTodo(params.get('tid'),false);
   document.getElementById("form").innerHTML="";
}
else if(params.has('teid')===true){
    document.getElementById('det').innerHTML="Update The Task";
    getTodo(params.get('teid'),true);
    document.getElementById('form').style.marginTop="-80px";
    
 }
else{
    console.log(window.location.href);
    document.getElementById('form').innerHTML="";
    ne.setAttribute('class','mt-2 ps-0 col-12')
    ne.innerHTML="Get the details of the todo you select here";
}
function getTodo(id,bool){
    let users = Promise.resolve(getUsers(`http://localhost:8083/api/todos/${id}`));
    let table=document.getElementById('details');
    users.then(data=>{
        if(bool===false){
            for(const [key,value] of Object.entries(data)){
            
                let row=table.insertRow(-1);
                let cell1=row.insertCell(0);
                let cell2=row.insertCell(1);
                cell1.innerHTML=key+": ";
                cell2.innerHTML=value;
            }
        }
        else{
             document.getElementById('cat').value=data.category;
             document.getElementById('todoData').value=data.description;
             document.getElementById('deadline').value=data.deadline;
             document.getElementById('priority').value=data.priority;
             document.getElementById('completed').value=data.completed;

        }
             
       
    });
}

}
document.getElementById('UpdateTodo').onclick=updateTodo;
function updateTodo(){
    let data={
        "id":params.get('teid'),
        "userid":params.get('cid'),
        "category":document.getElementById('cat').value,
        "description":document.getElementById('todoData').value,
        "deadline": document.getElementById('deadline').value.toLocaleString(),
        "priority":document.getElementById('priority').value,
        "completed": document.getElementById('completed').value
       }
       let d = Promise.resolve(addData("PUT",`http://localhost:8083/api/todos/${params.get('teid')}`,data));
        d.then(data=>{
            if(data==200){

                alert("Task updated successfully");
                parent.location.href=`/home.html?cid=${params.get('cid')}`;
            }
        });
        

}