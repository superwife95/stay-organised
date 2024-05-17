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
        id=localStorage.getItem('id');
        uname=localStorage.getItem('userName');
        setStylesforProfile(val,localStorage.getItem('name'));
        document.getElementById('db').href=`home.html?cid=${localStorage.getItem('id')}`;
       
    }
    else if(sessionStorage.getItem('name')!=null&&sessionStorage.getItem('name')!=undefined){
        id=sessionStorage.getItem('id');
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
        gettodos(id);
        let frame=document.getElementsByTagName('iframe');
        if(urlParams.has("tid") === true){
               let tid=urlParams.get('tid');
              let f=document.getElementById('fr');
                let frame=document.createElement('iframe');
                frame.setAttribute('src',`details.html?cid=${id}&tid=${tid}`);
                f.appendChild(frame);

             }
             else if(urlParams.has("teid") === true){
                let tid=urlParams.get('tid');
               let f=document.getElementById('fr');
                 let frame=document.createElement('iframe');
                 frame.setAttribute('src',`details.html?cid=${id}&teid=${tid}`);
                 f.appendChild(frame);
 
              }
             else{
                let tid=urlParams.get('tid');
              let f=document.getElementById('fr');
                let frame=document.createElement('iframe');
                frame.setAttribute('src',`details.html?cid=${id}`);
                f.appendChild(frame);
             }
             
    
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
            todoList.setAttribute('class','mt-5 text-center')
           todoList.innerHTML="No tasks for you yet";
           todoList.style.fontSize='20px';
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
                ti.innerHTML=`<a href=home.html?cid=${id}&tid=${data[i].id} data-bs-toggle='off-canvas'><i style='float:right;' class="fa fa-info-circle ms-2" aria-hidden="true"></i>
                <a href=home.html?cid=${id}&teid=${data[i].id} data-bs-toggle='off-canvas'><i style='float:right' class="fa fa-edit" aria-hidden="true"></i>
                `;
                b.appendChild(ti);
                let ti1 = document.createElement('h5');
                ti1.setAttribute('class','card-text h5');
                ti1.innerHTML=data[i].description;
                ti.appendChild(ti1);
                let d = document.createElement('div');
                d.setAttribute('class','footer ps-1');
                d.innerHTML=`Complete by: ${data[i].deadline}`;
                card.appendChild(d);
                todoList.appendChild(card);
                if(data[i].completed==true){
                    card.style.backgroundColor="lightgreen";
                    card.style.color="black";
                }
                else{
                    card.style.backgroundColor="yellow";
                    card.style.color="black";
                }
            }
        }
    });
}
