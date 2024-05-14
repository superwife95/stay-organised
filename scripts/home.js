$(function () {
    $('#example').popover('show');
  });
  window.onload=function(){
    console.log(localStorage.getItem('name'));
    console.log(sessionStorage.getItem('name'));
    let val=document.getElementById('img');
    if(localStorage.getItem('name')!=null&&localStorage.getItem('name')!=undefined){
        val.innerHTML=localStorage.getItem('name').charAt(0);
    }
    else if(sessionStorage.getItem('name')!=null&&sessionStorage.getItem('name')){
        val.innerHTML=sessionStorage.getItem('name').charAt(0);

    }
  }