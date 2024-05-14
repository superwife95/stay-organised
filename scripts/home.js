
  window.onload=function(){
    let val=document.getElementById('letter');
    if(localStorage.getItem('name')!=null&&localStorage.getItem('name')!=undefined){
        setStylesforProfile(val,localStorage.getItem('name'));
       
    }
    else if(sessionStorage.getItem('name')!=null&&sessionStorage.getItem('name')!=undefined){
        
        setStylesforProfile(val,sessionStorage.getItem('name'));
       
    }
   document.getElementById('subBtn').onclick=signOut;

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