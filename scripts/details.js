import { getUsers } from "./util.js";
window.onload=function()
{
    let ne=document.getElementById('noEd');
    let params = new URLSearchParams(location.search);
if(params.has('tid')===true){
   getTodo(params.get('tid'),false);
}
else if(params.has('teid')===true){
    document.getElementById('det').innerHTML="Update The Task";
    getTodo(params.get('teid'),true);
    
 }
else{
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

        }
             
       
    });
}
}