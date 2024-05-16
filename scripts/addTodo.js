import {getUsers} from './util.js';
window.onload=function(){
     let catSelect = document.getElementById('cat');
     let cat=Promise.resolve(getUsers('http://localhost:8083/api/categories'));
    cat.then(data=>{
        for(let i=0;i<data.length;i++){
            let opt = new Option();
            opt.id=data[i].id;
            opt.value=data[i].name.trim();
            opt.innerHTML=data[i].name;
            catSelect.appendChild(opt);
        }
    });
   
        let us = document.getElementById('assign');
       let users=Promise.resolve(getUsers('http://localhost:8083/api/users'));
       users.then(data=>{
        for (const [key, value] of Object.entries(data)) {
            let opt = new Option();
            opt.value=value.id;
            opt.innerHTML=value.name;
            us.appendChild(opt);
        }
    });
}