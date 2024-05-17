 import { getUsers,deleteData} from "./util.js";
 var id;
 var uname;
 let menu = document.getElementById('navmenu');
    let catSelect=document.getElementById('categeories');
    loadusers('http://localhost:8083/api/users','dropdown-item btn',menu);
    loadusers('http://localhost:8083/api/categories','flex-sm-fill text-sm-center nav-link mb-2',catSelect);
  window.onload=function load(){
    let val=document.getElementById('letter');

    if(localStorage.getItem('name')!=null&&localStorage.getItem('name')!=undefined){
        uname=localStorage.getItem('userName');
        setStylesforProfile(val,localStorage.getItem('name'));
        document.getElementById('db').href=`home.html?cid=${localStorage.getItem('id')}`;
       
    }
    else if(sessionStorage.getItem('name')!=null&&sessionStorage.getItem('name')!=undefined){
        uname=sessionStorage.getItem('userName')
        setStylesforProfile(val,sessionStorage.getItem('name'));
        document.getElementById('db').href=`home.html?cid=${sessionStorage.getItem('id')}`
       
    }
    const urlParams = new URLSearchParams(location.search);
	// location.search returns the query string part of the URL
        if (urlParams.has("cid") === true)
        {
        id = urlParams.get("cid");
        }
        if(urlParams.has("tid")===true){
            todoEdit(urlParams.get("tid"));
        }
    gettodos(id);
   document.getElementById('subBtn').onclick=signOut;
   document.getElementById('delBtn').onclick=deleteAccount;

}
function loadusers(url,ce,eve){
    let users = Promise.resolve(getUsers(url));
    users.then(data=>{
     for (const [key, value] of Object.entries(data)) {
         let tag = document.createElement('a');
          tag.setAttribute('class',ce);
          tag.innerHTML=value.name;
          tag.setAttribute('id',value.id);
          tag.style.color="black";
          tag.href=`home.html?cid=${value.id}`;
          eve.appendChild(tag);
     }
 });
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
function deleteAccount(){
    let status = Promise.resolve(deleteData(`http://localhost:8083/api/users/${uname}`));
    status.then(response=>console.log(response))
    .catch(error=>console.log(error.message));
}
function gettodos(id){
    let todoList = document.getElementById('todoList');
    let todo = Promise.resolve(getUsers(`http://localhost:8083/api/todos/byuser/${id}`));
    todo.then(data=>{
        todoList.style.marginBottom='-200px';
        if(data.length==0){
            todoList.setAttribute('id','catMar');
           todoList.innerHTML="Sorry no tasks for you yet";
           todoList.style.fontSize='40px';
        }
        else{
            for(let i=0;i<data.length;i++){
                let card= document.createElement('div');
                card.setAttribute('class','card me-2 mt-2');
                let h= document.createElement('div');
                let b=document.createElement('div');
                b.setAttribute('class','card-body');
                console.log(data[i].description);
                card.appendChild(b);
                let ti = document.createElement('h5');
                ti.setAttribute('class','card-title h5');
                ti.innerHTML=data[i].description+`<a href=home.html?tid=${data[i].id} data-bs-toggle='off-canvas'><i style='float:right' class='fa fa-edit'></i></a>`;
                b.appendChild(ti);
                let d = document.createElement('div');
                d.setAttribute('class','footer ps-1');
                d.innerHTML=`Complete by: ${data[i].deadline}`;
                card.appendChild(d);
                todoList.appendChild(card);
                if(data[i].completed==true){
                    card.style.backgroundColor="green";
                    card.style.color="white";
                }
                else{
                    card.style.backgroundColor="yellow";
                    card.style.color="black";
                }
            }
        }
    });
}
