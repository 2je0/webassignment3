let passwordLayer = document.getElementById('passwordId');
let array = ['1'];
function btnplus() {
    let v = passwordLayer.value;
    passwordLayer.value = v+'a';
}

function addArr() {
    array.push('a');
    for (let i = 0; i < array.length; i++) {
        console.log(array[i]);
    }
}


let loginPageLayer = document.getElementById('loginpage');
let pinPageLayer = document.getElementById('pinpage');
// loginpageFunction
let accountNumber = ["123"];
let loginPagePassword = document.getElementById('loginPagePasswordId');
function passwordClick(num){
    if(num =='E'){
        if(accountNumber.includes(loginPagePassword.value)){
            transLoginToPin();
        }
        else{
            alert('That account number does not exist!');
        }
        loginPagePassword.value = "";
        
    }
    else if (num == 'D'){
        loginPagePassword.value = "";
    }
    else{
        loginPagePassword.value = loginPagePassword.value + num;
    }
    
}
// loginpageFunction
function transLoginToPin(){
    loginPageLayer.style.display = 'none';
    pinPageLayer.style.display = 'block';
}
function transPinToLogin(){
    pinPagePassword.value = "";
    loginPageLayer.style.display = 'block';
    pinPageLayer.style.display = 'none';
}
// pinpageFunction
let pinNumber = ["123"];
let pinTry = 5;
let pinPagePassword = document.getElementById('pinPagePasswordId');
function pinClick(num){
    if(num =='E'){
        if(pinNumber.includes(pinPagePassword.value)){
            alert('exist!');
        }
        else{
            pinTry--;
            alert('Incorrect PIN. You have '+pinTry+ ' attempts left');
        }
        pinPagePassword.value = "";
        
    }
    else if (num == 'D'){
        pinPagePassword.value = "";
    }
    else{
        pinPagePassword.value = pinPagePassword.value + num;
    }
    if(pinTry ==0){
        pinTry =5;
        transPinToLogin();
    }
    
}
// pinpageFunction

// welcomepageFunction

// welcomepageFunction

// informationpageFunction
let today = new Date();   
function getDate(){ //날짜문자열 형식은 자유로운 편 
    let week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'];
    let Month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let dayOfWeek = week[today.getDay()]; 
    let monthOfYear = Month[today.getMonth()];
    return dayOfWeek + ' ' + monthOfYear + ' ' + today.getDay() + ' ' + today.getFullYear() + ' ' + today.toLocaleTimeString('en-US') + ' GMT+0900 (Korean Standard Time)' ; 
}

let informationTableVariable = document.getElementById('informationTableId');
function addRow(){
    let newRow = informationTableVariable.insertRow();

    let newCell1 = newRow.insertCell(0);
    let newCell2 = newRow.insertCell(1);
    let newCell3 = newRow.insertCell(2);
    let newCell4 = newRow.insertCell(3);

    newCell1.innerText = getDate();
    newCell2.innerText = today.toLocaleTimeString('en-US');
    newCell3.innerText = today.toLocaleString('en-US');
    newCell4.innerText = today.toLocaleDateString('en-US');
}
// informationpageFunction