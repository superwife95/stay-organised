 import { getUsers,deleteData} from "./util.js";
 var id;
 var uname;
 var name;
 let menu = document.getElementById('navmenu');
    let catSelect=document.getElementById('categeories');
    var pt=0,ht=0,ft=0,wt=0,ho=0,er=0;
    var a=0;
    var xValues = [];
    var yValues = [];
    var barColors = ["red", "green","blue","orange","brown","yellow"];
    var user;
  window.onload=function load(){
    let val=document.getElementById('letter');
    if(localStorage.getItem('name')!=null&&localStorage.getItem('name')!=undefined){
        id=localStorage.getItem('id');
        uname=localStorage.getItem('userName');
        name=localStorage.getItem('name');
        setStylesforProfile(val,name);
        document.getElementById('db').href=`home.html?cid=${localStorage.getItem('id')}`;
       
    }
    else if(sessionStorage.getItem('name')!=null&&sessionStorage.getItem('name')!=undefined){
        id=sessionStorage.getItem('id');
        uname=sessionStorage.getItem('userName');
        name=sessionStorage.getItem('name');
        setStylesforProfile(val,name);
        document.getElementById('db').href=`home.html?cid=${sessionStorage.getItem('id')}`
       
    }
    const urlParams = new URLSearchParams(location.search);
	// location.search returns the query string part of the URL
        if (urlParams.has("cid") === true)
        {
        id = urlParams.get("cid");
        }
        if(urlParams.has('name')){
              user=urlParams.get('name');
              if(user==name||user=='undefined'||user==null){
                user='your';
                document.getElementById('user').innerHTML=`Welcome Back!! ${name}, Find your tasks below.`
              }
              else{
                document.getElementById('user').innerHTML=`Welcome Back!! ${name}, Find, ${user} tasks below.`
              }
             
        }
        else{
             document.getElementById('user').innerHTML=`Welcome Back!! ${name}, Find your tasks below.`;
        }
        gettodos(id);
        loadusers('http://localhost:8083/api/users','dropdown-item btn',menu);
        
        if(urlParams.has("tid") === true){
               let tid=urlParams.get('tid');
              let f=document.getElementById('fr');
                let frame=document.createElement('iframe');
                frame.setAttribute('src',`details.html?cid=${id}&tid=${tid}&name=${user}`);
                f.appendChild(frame);

             }
             else if(urlParams.has("teid") === true){
                let tid=urlParams.get('teid');
               let f=document.getElementById('fr');
                 let frame=document.createElement('iframe');
                 frame.setAttribute('src',`details.html?cid=${id}&teid=${tid}&name=${user}`);
                 f.appendChild(frame);
 
              }
              else if(urlParams.has("tuid") === true){
                let f=document.getElementById('fr');
                let frame=document.createElement('iframe');
                frame.setAttribute('src',`update.html`);
                f.appendChild(frame);
                window.location.href=`/home.html?cid=${id}&name=${user}`
              }
             else{
                let tid=urlParams.get('tid');
              let f=document.getElementById('fr');
                let frame=document.createElement('iframe');
                frame.setAttribute('src',`details.html?cid=${id}&name=${user}`);
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
          tag.href=`home.html?cid=${value.id}&name=${value.name}`;
          eve.appendChild(tag);
          if(ce.includes('flex-sm-fill')===true){
            xValues.push(value.name);
            if(value.name=='Financial Task'){
                yValues.push(ft);
                getBadgeCount(ft,value.id);
            }
            else if(value.name=='Work Task'){
                yValues.push(wt);
                getBadgeCount(wt,value.id);
            }
            else if(value.name=='Errand'){
                yValues.push(er);
                getBadgeCount(er,value.id);
            }
            else if(value.name=='Personal Task'){
                yValues.push(pt);
                getBadgeCount(pt,value.id);
            }
            else if(value.name=='Household Task'){
                yValues.push(ht);
                getBadgeCount(ht,value.id);
            }
            else if(value.name=='Help Others'){
                yValues.push(ho);
                getBadgeCount(ho,value.id);
            }
            new Chart("myChart", {
                type: "bar",
                data: {
                  labels: xValues,
                  datasets: [{
                    backgroundColor: barColors,
                    data: yValues
                  }]
                },
                options: {
                  legend: {display: false},
                  title: {
                    display: true,
                    text: "todo tasks overview",
                  },
                  scales: {
                    yAxes: [{
                        ticks: {
                            color:"lightpink",
                            beginAtZero: true,
                            userCallback: function(label, index, labels) {
                                // when the floored value is the same as the value we have a whole number
                                if (Math.floor(label) === label) {
                                    return label;
                                }
           
                            },
                        }
                    }],
                },
                },
              });
           
          }
     }
 });
}

function setStylesforProfile(event,value){
    event.innerHTML=value.charAt(0);
    event.style.backgroundColor= "green";
    event.style.float= "right";
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
    todoList.style.marginTop="50px";
    let todo = Promise.resolve(getUsers(`http://localhost:8083/api/todos/byuser/${id}`));
    todo.then(data=>{
        todoList.style.marginBottom='-200px';
        if(data.length==0){
            todoList.setAttribute('id','catMar');
            todoList.setAttribute('class','mt-5 text-center')
           todoList.innerHTML="No tasks for you yet";
           todoList.style.fontSize='20px';
           document.getElementById('myChart').style.display='none';
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
                card.setAttribute('class','card me-2 mt-2 col-12');
                let h= document.createElement('div');
                let b=document.createElement('div');
                b.setAttribute('class','card-body');
                card.appendChild(b);
                let ti = document.createElement('h5');
                ti.setAttribute('class','card-title h5');
                ti.innerHTML=`<a href=home.html?cid=${id}&tid=${data[i].id}&name=${user} data-bs-toggle='off-canvas'><i style='float:right;' class="fa fa-info-circle ms-2" aria-hidden="true"></i>
                <a href=home.html?cid=${id}&teid=${data[i].id}&name=${user} data-bs-toggle='off-canvas'><i style='float:right' class="fa fa-edit" aria-hidden="true"></i>
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
    loadusers('http://localhost:8083/api/categories','flex-sm-fill text-sm-center nav-link mb-2 rounded-5 disabled col-8 offset-2',catSelect);
}
function getBadgeCount(count,id){
    let i = document.getElementById(id);
    let span=document.createElement('span');
                span.setAttribute('class','badge rounded-5 bg-secondary');
               span.style.float="right";
                span.innerHTML=count;
                i.appendChild(span);
}
