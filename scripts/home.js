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
    var barColors = ["red", "green","blue","black","brown","pink"];
    var user;
    const offcan=document.getElementById("offcanvasExample");
    const bsOffcanvas = new bootstrap.Offcanvas(offcan) ;
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
                document.getElementById('user').innerHTML=`Welcome Back!! ${name}, Find ${user} tasks below.`
              }
             
        }
        else{
             document.getElementById('user').innerHTML=`Welcome Back!! ${name}, Find your tasks below.`;
        }
        gettodos(id);
        loadusers('http://localhost:8083/api/users','dropdown-item btn',menu);
        
        if(urlParams.has("tid") === true){
               let tid=urlParams.get('tid');
               bsOffcanvas.show();
              let f=document.getElementById('fr');
                let frame=document.createElement('iframe');
                frame.setAttribute('src',`details.html?cid=${id}&tid=${tid}&name=${user}`);
                f.appendChild(frame);

             }
             else if(urlParams.has("teid") === true){
                let tid=urlParams.get('teid');
                bsOffcanvas.show();
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
          if(ce.includes('col-xl-3 col-md-6 mb-4')===true){
            let icon;
            let tag=document.createElement('div');
            tag.setAttribute('class',ce);
            let card= document.createElement('div');
                card.setAttribute('class','card cardHeight rounded-3');
                let h= document.createElement('div');
                let b=document.createElement('div');
                h.setAttribute('class','card-body');
                b.setAttribute('class','row no-gutters align-items-center');
                let l=document.createElement('div');
                l.setAttribute('class','col mr-2');
                let tit = document.createElement('div');
                tit.setAttribute('class','h5 mb-0 font-weight-bold text-gray-800');
                l.appendChild(tit);
                let tit1 = document.createElement('div');
                tit1.setAttribute('class','col-auto');
                tit1.setAttribute('id',value.id);
                b.appendChild(tit1);
                b.appendChild(l);
                h.appendChild(b);
                card.appendChild(h);
                tag.appendChild(card);
                eve.appendChild(tag);

            xValues.push(value.name);
            if(value.name=='Financial Task'){
                yValues.push(ft);
                icon='<i class="fa fa-bank" style="float:right;font-size: 30px;" aria-hidden="true"></i>';
                tit.innerHTML=value.name + icon;
                getBadgeCount(ft,value.id);
            }
            else if(value.name=='Work Task'){
                yValues.push(wt);
                getBadgeCount(wt,value.id);
                icon='<i class="fa fa-briefcase" style="float:right;font-size: 30px;" aria-hidden="true"></i>';
                tit.innerHTML=value.name + icon;
            }
            else if(value.name=='Errand'){
                yValues.push(er);
                getBadgeCount(er,value.id);
                icon='<i class="fa fa-shopping-cart" style="float:right;font-size: 30px;" aria-hidden="true"></i>';
                tit.innerHTML=value.name + icon;
            }
            else if(value.name=='Personal Task'){
                yValues.push(pt);
                getBadgeCount(pt,value.id);
                icon="<i class='fa fa-user-circle' style='float:right;font-size: 30px;' aria-hidden='true'></i> ";
                tit.innerHTML=value.name + icon;
            }
            else if(value.name=='Household Task'){
                yValues.push(ht);
                getBadgeCount(ht,value.id);
                icon='<i class="fa fa-home" style="float:right;font-size: 30px;" aria-hidden="true"></i>';
                tit.innerHTML=value.name + icon;
            }
            else if(value.name=='Help Others'){
                yValues.push(ho);
                getBadgeCount(ho,value.id);
                icon='<i class="fas fa-hands-helping" style="float:right;font-size: 30px;"></i>';
                tit.innerHTML=value.name + icon;
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
                    maintainAspectRatio: false,
                    responsive: true,
                    
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
          else{
            let tag = document.createElement('a');
          tag.setAttribute('class',ce);
          tag.innerHTML=value.name;
          tag.setAttribute('id',value.id);
          tag.style.color="black";
          tag.href=`home.html?cid=${value.id}&name=${value.name}`;
          eve.appendChild(tag);
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
          document.querySelector('.wrapper').innerHTML="you dont have any tasks to show you the overview"
          document.querySelector('.wrapper').style.height="300px";
          document.querySelector('.wrapper').style.paddingTop="150px";
          document.querySelector('.wrapper').style.fontSize="20px";
          document.querySelector('.wrapper').style.textAlign="center";
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
                card.setAttribute('class','card me-2 mt-2 col-xl-12');
                let h= document.createElement('div');
                let b=document.createElement('div');
                b.setAttribute('class','card-body');
                card.appendChild(b);
                let ti = document.createElement('h5');
                ti.setAttribute('class','card-title h5');
                ti.innerHTML=`<a href=home.html?cid=${id}&tid=${data[i].id}&name=${user}><i style='float:right;' class="fa fa-info-circle ms-2" aria-hidden="true"></i>
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
    loadusers('http://localhost:8083/api/categories','col-xl-3 col-md-6 mb-4',catSelect);
}
function getBadgeCount(count,id){
    let i = document.getElementById(id);
    let span=document.createElement('span');
                span.setAttribute('class','badge rounded-5 bg-primary');
               span.style.float="right";
               span.style.marginTop="10px";
                span.innerHTML=count;
                i.appendChild(span);
}
document.getElementById('close').onclick=()=>{
    console.log("hi");
    bsOffcanvas.hide();
}
