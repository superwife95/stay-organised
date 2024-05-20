 import { getUsers,deleteData} from "./util.js";
 var id;
 var uname;
 let menu = document.getElementById('navmenu');
    let catSelect=document.getElementById('categeories');
    var pt=0,ht=0,ft=0,wt=0,ho=0,er=0;
    var a=0;

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
        loadusers('http://localhost:8083/api/users','dropdown-item btn',menu);
        if(urlParams.has("tid") === true){
               let tid=urlParams.get('tid');
              let f=document.getElementById('fr');
                let frame=document.createElement('iframe');
                frame.setAttribute('src',`details.html?cid=${id}&tid=${tid}`);
                f.appendChild(frame);

             }
             else if(urlParams.has("teid") === true){
                let tid=urlParams.get('teid');
               let f=document.getElementById('fr');
                 let frame=document.createElement('iframe');
                 frame.setAttribute('src',`details.html?cid=${id}&teid=${tid}`);
                 f.appendChild(frame);
 
              }
              else if(urlParams.has("tuid") === true){
                let f=document.getElementById('fr');
                let frame=document.createElement('iframe');
                frame.setAttribute('src',`update.html`);
                f.appendChild(frame);
                window.location.href=`/home.html?cid=${id}`
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
          if(ce.includes('lex-sm-fill')===true){
            if(value.name=='Financial Task'){
                getBadgeCount(ft,value.id);
            }
            else if(value.name=='Work Task'){
                getBadgeCount(wt,value.id);
            }
            else if(value.name=='Errand'){
                getBadgeCount(er,value.id);
            }
            else if(value.name=='Personal Task'){
                getBadgeCount(pt,value.id);
            }
            else if(value.name=='Household Task'){
                getBadgeCount(ht,value.id);
            }
            else if(value.name=='Help Others'){
                getBadgeCount(ho,value.id);
            }
           
          }
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
           getBadgeCount(a,'all');
        }
        else{
            for(let i=0;i<data.length;i++){
                a++;
                if(data[i].category=='Financial Task'){
                    ft++;
                }
                else if(data[i].category=='Work Task'){
                    wt++;
                }
                else if(data[i].category=='Errand'){
                    er++;
                }
                else if(data[i].category=='Personal Task'){
                    pt++;
                }
                else if(data[i].category=='Household Task'){
                    ht++;
                }
                else if(data[i].category=='Help Others'){
                    ho++;
                }
                let card= document.createElement('div');
                card.setAttribute('class','card me-2 mt-2');
                let h= document.createElement('div');
                let b=document.createElement('div');
                b.setAttribute('class','card-body');
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
                    if(data[i].priority=='High'){
                        card.style.backgroundColor='rgb(255, 165, 0)';
                    }
                    else
                    card.style.backgroundColor="yellow";
                    card.style.color="black";
                }
            }
            getBadgeCount(a,'all');
        }
    });
    loadusers('http://localhost:8083/api/categories','flex-sm-fill text-sm-center nav-link mb-2',catSelect);
}
function getBadgeCount(count,id){
    let i = document.getElementById(id);
    let span=document.createElement('span');
                span.setAttribute('class','badge rounded-3 bg-primary');
               span.style.float="right";
                span.innerHTML=count;
                i.appendChild(span);
}
