


let loginPageLayer = document.getElementById('loginpage');
let pinPageLayer = document.getElementById('pinpage');
// loginpageFunction
let accountNumber = ["123", "456"];
let pinNumber = ["123", "456"];
let accountBalance = [2000, 1000];
let accountDate = new Array(accountNumber.length);
let accountFundOut = new Array(accountNumber.length);
let accountFundIn = new Array(accountNumber.length);
let accountRunningBalance = new Array(accountNumber.length);
for(var i =0; i < accountDate.length; i++){
	accountDate[i] = new Array();
	accountFundOut[i] = new Array();
	accountFundIn[i] = new Array();
	accountRunningBalance[i] = new Array();
}
let nowAccount;
let loginPagePassword = document.getElementById('loginPagePasswordId');
function passwordClick(num){
    if(num =='E'){
        if (accountNumber.includes(loginPagePassword.value)) {
            nowAccount = accountNumber.indexOf(loginPagePassword.value);
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


let pinTry = 5;
let pinPagePassword = document.getElementById('pinPagePasswordId');
function pinClick(num){
    if(num =='E'){
        if(pinNumber.includes(pinPagePassword.value)){
            transPinToWelcome();
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

function transPinToWelcome() {
    pinPageLayer.style.display = 'none';
    welcomePageLayer.style.display = 'block';
}
// pinpageFunction

// welcomepageFunction
let welcomePageLayer = document.getElementById('welcomepage');
function transWelcomeToInfo() {
    welcomePageLayer.style.display = 'none';
    informationPageLayer.style.display = 'block';
    document.getElementById('balanceId').innerHTML = accountBalance[nowAccount];
    for (let i = 0; i < accountDate[nowAccount].length; i++){
        addRow(accountDate[nowAccount][i], accountFundOut[nowAccount][i], accountFundIn[nowAccount][i], accountRunningBalance[nowAccount][i]);
    }

}
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
function addRow(date , fout, fin, rbalance) {
    // accountBalance[nowAccount] = accountBalance[nowAccount] + fin - fout;
    let newRow = informationTableVariable.insertRow();

    let newCell1 = newRow.insertCell(0);
    let newCell2 = newRow.insertCell(1);
    let newCell3 = newRow.insertCell(2);
    let newCell4 = newRow.insertCell(3);

    // newCell1.innerText = getDate();
    newCell1.innerText = date;
    newCell2.innerText = fout;
    newCell3.innerText = fin;
    newCell4.innerText = rbalance;
}

let informationPageLayer = document.getElementById('informationpage')
function transInfoToWelcome() {
    informationPageLayer.style.display = 'none';
    welcomePageLayer.style.display = 'block';
    rem();

}
function rem() {
    while (informationTableVariable.rows.length > 1) {
        informationTableVariable.deleteRow(informationTableVariable.rows.length - 1);
    }

    
}
// informationpageFunction


//withdrawpageFunction
let withdrawPageLayer = document.getElementById('withdrawpage')

let withdrawInputVariable = document.getElementById('withdrawInputId');
let arrowLayer = document.getElementById('withdrawArrowId');
function withdrawUpdate(num) {
    withdrawInputVariable.value = num;
}
function withdrawPlus(num) {
    let sum = parseInt(withdrawInputVariable.value) + parseInt(num);
    if (sum > 300) alert('$300 is the limit to withdraw from the ATM');
    else if (sum <0) alert('$0 is the limit to withdraw from the ATM');
    else
        withdrawInputVariable.value = sum;
}
function transWithdrawToWelcome() {
    withdrawPageLayer.style.display = 'none';
    welcomePageLayer.style.display = 'block';
}
function transWelcomeToWithdraw() {
    welcomePageLayer.style.display = 'none';
    withdrawPageLayer.style.display = 'block';
}


//withdrawpageFunction end

//withdrawQuestionpageFunction start
let withdrawQuestionSpan = document.getElementById('withdrawValueId');
let withdrawQuestionPageLayer = document.getElementById('withdrawquestionpage');
let withdrawCompletePageLayer = document.getElementById('withdrawcompletepage');
function transWithdrawToWithdrawquestion() {
    withdrawQuestionSpan.innerHTML = withdrawInputVariable.value;
    withdrawPageLayer.style.display = 'none';
    withdrawQuestionPageLayer.style.display = 'block';
}
function transWithdrawquestionToWithdraw() {
    withdrawQuestionPageLayer.style.display = 'none';
    withdrawPageLayer.style.display = 'block';
    withdrawInputVariable.value = 0;
}
function transWithdrawquestionToWithdrawComplete() {
    withdrawQuestionPageLayer.style.display = 'none';
    withdrawCompletePageLayer.style.display = 'block';
    accountDate[nowAccount].push(getDate());
    accountFundOut[nowAccount].push(withdrawInputVariable.value);
    accountFundIn[nowAccount].push(0);
    accountBalance[nowAccount] -= parseInt(withdrawInputVariable.value);
    accountRunningBalance[nowAccount].push(accountBalance[nowAccount]);
    withdrawInputVariable.value = 0;
}
function transWithdrawCompleteToWithdraw() {
    withdrawCompletePageLayer.style.display = 'none';
    withdrawPageLayer.style.display = 'block';
}
//withdrawQuestionpageFunction end


//depositpageFunction start
let depositQuestionSpan = document.getElementById('depositQuestionValueId');
let depositValue = document.getElementById('depositPageInputId');
let depositPageLayer = document.getElementById('depositpage');
let depositQuestionPageLayer = document.getElementById('depositquestionpage');

function depositClick(num) {
    if(num =='E'){
        transdepositTodepositquestion();
        depositValue.value = "";
    }
    else if (num == 'D'){
        depositValue.value = "";
    }
    else{
        depositValue.value = depositValue.value + num;
    }
}
function transdepositTodepositquestion() {
    if (depositValue.value == "") depositValue.value = '0';
    depositQuestionSpan.innerHTML = depositValue.value;
    depositPageLayer.style.display = 'none';
    depositQuestionPageLayer.style.display = 'block';
}
function transdepositquestionTodeposit() {
    depositQuestionPageLayer.style.display = 'none';
    depositPageLayer.style.display = 'block';
}
function transWelcomeTodeposit() {
    welcomePageLayer.style.display = 'none';
    depositPageLayer.style.display = 'block';
}


//depositpageFunction end


