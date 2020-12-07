'use strict';

const username = document.querySelector('#username'),
        registerUser = document.querySelector('#registerUser'),
        login = document.querySelector('#login'),
        list = document.querySelector('#list');
        
    let fio = {},
        loginInt, 
        pass,
        Data = [],
        id,
        li,
        // listRegistry = list.querySelectorAll('.list-registry');
        deleteReg = list.querySelectorAll('.list-remove');
        
    
function registy() {
    do{
    fio = prompt('Введите Имя и Фамилию через пробел').split(' ');
    console.log(fio.length);
    }
    while (fio.length !== 2)
    loginInt = prompt('Введите логин');
    pass = prompt('Введите пароль');
    
    if(Data.length !== 0 ) {
        id = Data[Data.length - 1].id + 1;
        } else {id = 1;}   
    let newData = {
        id: id,
        fioreg: {
            name: fio[0],
            surName: fio[1]
        },
        loginInt: loginInt,
        pass: pass,
        dataReg: timeRegistery()
    };
    Data.push(newData);
    saveRegistry();
   
}

function getData() {

     if(JSON.parse(localStorage.getItem('registry')) !== null) {
         Data = JSON.parse(localStorage.getItem('registry'));
        render();
        
        if(localStorage.getItem('login') !== null) {
        let logoP = localStorage.getItem('login');
        for (let i = 0 ; i < Data.length; i++){
            if (Data[i].loginInt === logoP) {
                    username.textContent = Data[i].fioreg.name;
                    break;
                }
            }
        }
    }
}

function saveRegistry(){
    localStorage.setItem('registry', JSON.stringify(Data));
    render();
}

function timeRegistery() {
            let monthAll = ['января', 'февраля', 'марта', 'апреля', 'майя', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'],
                timeNow = new Date(),
                month = timeNow.getMonth();
            
                function decZero(n) {
                    if (n >= 0 && n < 10) {return '0'+n;}
                    return n;
                }
            
                return (timeNow.getDate() + ' ' + monthAll[month] + ' ' + timeNow.getFullYear() + ' г., '+ decZero(timeNow.getHours()) +":"+ decZero(timeNow.getMinutes()) + ":" + decZero(timeNow.getSeconds()));
}

function render() {
    list.textContent = '';
    if(Data !== null) {
        Data.forEach(function(item){
            let li = document.createElement('li');
            li.classList = 'list-registry';
            li.innerHTML = '<span class="list-text" id=' + item.id + '>Имя: ' +  item.fioreg.name + ', фамилия: ' + item.fioreg.surName + ', зарегистрирован: ' + item.dataReg +' </span><button class="list-remove">X</button>';
            list.append(li);
        });
      
        
        del();
    }
}

function del() {
    deleteReg = list.querySelectorAll('.list-remove');
    //     // let itemDelete = deleteReg.querySelectorAll('.list-remove');

        deleteReg.forEach((btn) =>{btn.addEventListener('click', () => {
            let b = Number(btn.closest('.list-registry').firstElementChild.id);
            for (let i = 0; i < Data.length; i++){
                if (Data[i].id === Number(btn.closest('.list-registry').firstElementChild.id)) {
                    Data.splice(i, 1);
                    saveRegistry();
                    render();
                }
            }
        });
    });
}

getData();

registerUser.addEventListener('click', function(){
    registy();    
});

login.addEventListener('click', function(){
        let logov = prompt('Ввведите логин');
    
            for (let i = 0 ; i < Data.length; i++){
                    console.log(Data[i].loginInt, logov);
                    console.log(typeof Data[i].loginInt, typeof logov);
                
                    if (Data[i].loginInt === logov) {
                    let passvord = prompt('Введите пароль');
                        if (Data[i].pass === passvord) {
                            localStorage.setItem('login', logov)
                            username.textContent = Data[i].fioreg.name;
                            break;
                        }

                    } 
                    
                    if (Data[i].loginInt !== logov && i === Data.length - 1) {
                        alert('Пользователь не найден');
                    }
            };
})