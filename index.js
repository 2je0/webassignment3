$('input').prop('readonly', true);

let loginPageLayer = document.getElementById('loginpage');
let pinPageLayer = document.getElementById('pinpage');
// loginpageFunction
let accountNumber = ["123", "456","789","6742","1234567812345678","1234567890123456"];
let pinNumber = ["123", "456","789","6742","0000","1234"];
let accountBalance = [2000, 1000, 0, 0, 0, 2000];
let pinTryArray = [5, 5, 5, 5, 5, 5];
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
function passwordClick(num) {
    
    if(num =='E'){
        if (accountNumber.indexOf(loginPagePassword.value) != -1) {
        // if (accountNumber.includes(loginPagePassword.value)) {
            nowAccount = accountNumber.indexOf(loginPagePassword.value);
            if (pinTryArray[nowAccount] == 0) {
                alert('Attempts exceeded');
                return;
            }
            else
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


// let pinTry = 5;
let pinPagePassword = document.getElementById('pinPagePasswordId');
function pinClick(num){
    if(num =='E'){
        if (pinNumber[nowAccount] == pinPagePassword.value) {
            pinTryArray[nowAccount] = 5;
            transPinToWelcome();
        }
        else{
            // pinTry--;
            pinTryArray[nowAccount]--;
            // alert('Incorrect PIN. You have '+pinTry+ ' attempts left');
            alert('Incorrect PIN. You have '+pinTryArray[nowAccount]+ ' attempts left');
        }
        pinPagePassword.value = "";
        
    }
    else if (num == 'D'){
        pinPagePassword.value = "";
    }
    else{
        pinPagePassword.value = pinPagePassword.value + num;
    }
    if (pinTryArray[nowAccount] == 0) {
        alert('Attempts exceeded');
        transPinToLogin();
    }
    // if(pinTry == 0){
    //     pinTry =5;
    //     transPinToLogin();
    // }
    
}

function transPinToWelcome() {
    pinPageLayer.style.display = 'none';
    welcomePageLayer.style.display = 'block';
    addDropdownMenu('fromid', accountNumber[nowAccount]);
    for (let i = 0; i < accountNumber.length; i++){
        if (i == nowAccount) continue;
        addDropdownMenu('Toid', accountNumber[i]);
    }


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
function transWelcomToLogin() {
    welcomePageLayer.style.display = 'none';
    loginPageLayer.style.display = 'block';
    removeTransferAccount();
}
// welcomepageFunction

// informationpageFunction
function newGetDate(){ //날짜문자열 형식은 자유로운 편 
    let today = new Date();   
    let week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'];
    let Month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let dayOfWeek = week[today.getDay()]; 
    let monthOfYear = Month[today.getMonth()];
    return dayOfWeek + ' ' + monthOfYear + ' ' + today.getDate() + ' ' + today.getFullYear() + ' ' + today.toLocaleTimeString('en-US') + ' GMT+0900 (Korean Standard Time)' ; 
}

let informationTableVariable = document.getElementById('informationTableId');
function addRow(date , fout, fin, rbalance) {
    // accountBalance[nowAccount] = accountBalance[nowAccount] + fin - fout;
    let newRow = informationTableVariable.insertRow();

    let newCell1 = newRow.insertCell(0);
    let newCell2 = newRow.insertCell(1);
    let newCell3 = newRow.insertCell(2);
    let newCell4 = newRow.insertCell(3);

    // newCell1.innerText = newGetDate();
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
    if(parseInt(num) > accountBalance[nowAccount]) alert('Lack of Balance');
    else withdrawInputVariable.value = num;
}
function withdrawPlus(num) {
    let sum = parseInt(withdrawInputVariable.value) + parseInt(num);
    if (sum > 300) alert('$300 is the limit to withdraw from the ATM');
    else if (sum < 0) alert('$0 is the limit to withdraw from the ATM');
    else if (sum > accountBalance[nowAccount]) alert('Lack of Balance');
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
    updateInformation(nowAccount,0, withdrawInputVariable.value);
    // accountDate[nowAccount].push(newGetDate());
    // accountFundOut[nowAccount].push(withdrawInputVariable.value);
    // accountFundIn[nowAccount].push(0);
    // accountBalance[nowAccount] -= parseInt(withdrawInputVariable.value);
    // accountRunningBalance[nowAccount].push(accountBalance[nowAccount]);
    withdrawInputVariable.value = 0;
}
function transWithdrawCompleteToWithdraw() {
    withdrawCompletePageLayer.style.display = 'none';
    withdrawPageLayer.style.display = 'block';
}

function transWithdrawCompleteToWelcome() {
    withdrawCompletePageLayer.style.display = 'none';
    welcomePageLayer.style.display = 'block';
}
function transWithdrawCompleteToLogin() {
    withdrawCompletePageLayer.style.display = 'none';
    loginPageLayer.style.display = 'block';
    removeTransferAccount();
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
    }
    else if (num == 'D'){
        depositValue.value = "";
    }
    else{
        depositValue.value = depositValue.value + num;
    }
}
function transdepositTodepositquestion() {
    if (isNaN(depositValue.value)) {
        alert('Please input Number');
        return;
    }
    if (depositValue.value == "") depositValue.value = '0';
    if (numOfHotPoint(depositValue.value) > 1) {
        alert('Please input Number');
        return;
    }
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
function transDepositToWelcome() {
    
    depositPageLayer.style.display = 'none';
    welcomePageLayer.style.display = 'block';
}

let moneyintoATMPageLayer = document.getElementById('moneyintoATMpage');
function transDepositToMoneyintoATM() {
    
    depositQuestionPageLayer.style.display = 'none';
    moneyintoATMPageLayer.style.display = 'block';
}
let depositCompletePageLayer = document.getElementById('depositcompletepage');
function transMoneyintoATMToDepositComplete() {
    
    moneyintoATMPageLayer.style.display = 'none';
    depositCompletePageLayer.style.display = 'block';
    updateInformation(nowAccount,depositValue.value,0);
    depositValue.value = "";
    
}
function updateInformation(Id,fin,fout){
    accountDate[Id].push(newGetDate());
    accountFundIn[Id].push(fin);
    accountFundOut[Id].push(fout);
    accountBalance[Id] += parseFloat(fin);
    accountBalance[Id] -= parseFloat(fout);
    accountRunningBalance[Id].push(accountBalance[Id]);
}
function transDepositCompleteToWelcome() {
    
    depositCompletePageLayer.style.display = 'none';
    welcomePageLayer.style.display = 'block';
}
function transDepositCompleteToDeposit() {
    
    depositCompletePageLayer.style.display = 'none';
    depositPageLayer.style.display = 'block';
}
function transDepositCompleteToLogin() {
    
    depositCompletePageLayer.style.display = 'none';
    loginPageLayer.style.display = 'block';
    removeTransferAccount();
}

//depositpageFunction end

//transfer page function start
let transferAccountFrom="";
let transferAccountTo="";
let transferValue = document.getElementById('transferPageInputId');
let transferQuestionFromSpan = document.getElementById('transferQuestionFromId');
let transferQuestionToSpan = document.getElementById('transferQuestionToId');
let transferQuestionValueSpan = document.getElementById('transferValueSpanId');
let transferPageLayer = document.getElementById('transferpage');
let transferQuestionPageLayer = document.getElementById('transferquestionpage');
let transferCompletePageLayer = document.getElementById('transfercompletepage');
// $('#fromid li > a').on('click', function () {
// 	$('#dropdownMenuButton2_left').text($(this).text());
//     transferAccountFrom = $(this).text();
//     alert(transferAccountFrom);
// });
// $('#Toid li > a').on('click', function () {
// 	$('#dropdownMenuButton2_right').text($(this).text());
//     transferAccountTo = $(this).text();

// });
// $(document).on("click","#fromid li",function(){
//     alert($(this).text());
// });
$("#fromid").on("click","li", function(e){ 
    $('#dropdownMenuButton2_left').text($(this).text());
    transferAccountFrom = $(this).text();
});
$("#Toid").on("click","li", function(e){ 
    $('#dropdownMenuButton2_right').text($(this).text());
    transferAccountTo = $(this).text();
});
function removeTransferAccount() {
    let listFrom = document.getElementById('fromid');
    let listTo = document.getElementById('Toid');
    let listFromItem = listFrom.getElementsByTagName('li');
    let listToItem = listTo.getElementsByTagName('li');
    while (listFromItem.length > 0) listFromItem[0].remove();
    while (listToItem.length > 0) listToItem[0].remove();
}



function transferClick(num) {
    if (num == 'E') {
        if (transferValue.value == "")
            transferValue.value = 0;
        transTransferToQuestion();
    }
    else if (num == 'D'){
        transferValue.value = "";
    }
    else{
        transferValue.value = transferValue.value + num;
    }
}
function transTransferToWelcome() {
    transferPageLayer.style.display = 'none';
    welcomePageLayer.style.display = 'block';
}
function transWelcomeToTransfer() {
    welcomePageLayer.style.display = 'none';
    transferPageLayer.style.display = 'block';
}

function transTransferToQuestion() {
    if (transferAccountFrom == "" || transferAccountTo == "") {
        alert('Choose Account');
        return;
    }
    if (isNaN(transferValue.value)) {
        alert('Please input Number');
        return;
    }
    // if (numOfHotPoint(transferValue.value) > 1) {
    //     alert('Please input Number');
    //     return;
    // }
    // if (transferValue.value = "") {
    //     alert('Please input Number');
    //     return;
    // }
    let accountFromIdx =accountNumber.indexOf(transferAccountFrom);
    if (transferValue.value > accountBalance[accountFromIdx]) {
       alert('Lack of Balance');
        return;
    }
    transferPageLayer.style.display = 'none';
    transferQuestionPageLayer.style.display = 'block';
    transferQuestionValueSpan.innerHTML = transferValue.value;
    transferQuestionToSpan.innerHTML = transferAccountTo;
    transferQuestionFromSpan.innerHTML = transferAccountFrom;
}
function transQuestionToTransfer() {
    transferValue.value = "";
    transferQuestionPageLayer.style.display = 'none';
    transferPageLayer.style.display = 'block';
}
function transQuestionToComplete() {
    transferQuestionPageLayer.style.display = 'none';
    transferCompletePageLayer.style.display = 'block';
    let accountFromIdx =accountNumber.indexOf(transferAccountFrom);
    let accountToIdx = accountNumber.indexOf(transferAccountTo);
    updateInformation(accountFromIdx, 0, transferValue.value);
    updateInformation(accountToIdx, transferValue.value, 0);
    transferValue.value = "";
    document.getElementById('dropdownMenuButton2_right').innerHTML = "Choose an Account";
    document.getElementById('dropdownMenuButton2_left').innerHTML = "Choose an Account";
    transferAccountFrom="";
    transferAccountTo="";
}
function transCompleteToWelcome() {
    transferCompletePageLayer.style.display = 'none';
    welcomePageLayer.style.display = 'block';
}
function transCompleteToTransfer() {
    transferCompletePageLayer.style.display = 'none';
    transferPageLayer.style.display = 'block';
}
function transCompleteToLogin() {
    transferCompletePageLayer.style.display = 'none';
    loginPageLayer.style.display = 'block';
    removeTransferAccount();
}
function addDropdownMenu(where,str) {
    let li_a = document.createElement('a');
    li_a.setAttribute('href', '#');
    li_a.className += "dropdown-item";
    let textNode = document.createTextNode(str);
    li_a.appendChild(textNode);
    let li = document.createElement('li');
    li.appendChild(li_a);
    document.getElementById(where).appendChild(li);  
}

function numOfHotPoint(str) {
    var text = str;
    var count = 0;
    var searchChar = '.'; // 찾으려는 문자
    var pos = text.indexOf(searchChar); //pos는 0의 값을 가집니다.

    while (pos !== -1) {
    count++;
    pos = text.indexOf(searchChar, pos + 1); // 첫 번째 a 이후의 인덱스부터 a를 찾습니다.
    }

    return count; // 로그에 14를 출력합니다.
}

//To do : when complete transfer, change transferAccont ""
//value = 0
//fill transfer page dropdown menu with account ids

//transfer page function start

