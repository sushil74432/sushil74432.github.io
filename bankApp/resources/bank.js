class account{
    #accName;
    #amount;
    static accountInfoList = [];
    createAccount(name, amt){
        this.#accName = name;
        this.#amount = amt;
        console.log("Account Created");
    }

    getAccName(){
        return this.#accName;
    }
    getAmt(){
        return this.#amount
    }
    setAmt(amt){
        this.#amount = amt;
    }

}

function newAccount(){
    var accName = document.getElementById("accName").value;
    var amt = document.getElementById("deposit").value;
    if(accName == "" || amt == ""){
        alert("Account Name or Deposit can't be empty");
        return;
    }
    var acc = new account();
    acc.createAccount(accName, amt);
    account.accountInfoList.push(acc);
    loadTextarea();
    addOption(acc);
    saveToStorage(acc);
    clearInputText();
}

function accToString(){
    var text = "";
    var accList = account.accountInfoList;
    accList.forEach(e => {
        text += "Account name : "+e.getAccName()+"\t\t Balance : "+e.getAmt()+
        "\n------------------------------------------------------\n";
    });
    return text;
}

function loadTextarea(){
    var text = accToString();
    document.getElementById("accDetails").textContent = text;
}

function loadOptionList(){
    account.accountInfoList.forEach((e, i) => {
        // if(i == 0){
        //     const opt1 = document.createElement("option"); 
        //     const opt2 = document.createElement("option"); 
        //     opt1.value = opt2.value =  "";
        //     opt1.text = opt2.text = "";
        //     document.getElementById("accounts-deposit").appendChild(opt1);         
        //     document.getElementById("accounts-deposit").appendChild(opt2);         
        // }
        const option1 = document.createElement("option"); 
        const option2 = document.createElement("option");
        option1.value = option2.value =  i;
        option1.text = option2.text = e.getAccName();
        document.getElementById("accounts-deposit").appendChild(option1);
        document.getElementById("accounts-withdraw").appendChild(option2);
    });
}

function addOption(e){
    var len = document.getElementById("accounts-withdraw").options.length
    const opt = document.createElement("option");
    const opt1 = document.createElement("option");
    opt.value = opt1.value = len-1;
    opt.text = opt1.text = e.getAccName();
    document.getElementById("accounts-withdraw").appendChild(opt);
    document.getElementById("accounts-deposit").appendChild(opt1);
}

function showWrapper(){
    hideElement(document.getElementById("model-deposit"));
    hideElement(document.getElementById("model-withdraw"));
    showElement(document.getElementById("wrapper"));
}

function noAccountAlert(){
    if(account.accountInfoList.length == 0){
        alert("No accounts created yet!")
    }
}

function clearInputText(){
    document.getElementById("accName").value = "";
    document.getElementById("deposit").value = "";
}

function hideElement(elem){
    elem.style["display"] = "none" ;
}

function showElement(elem){
    elem.style["display"] = "block" ;
}

function closeElement(itm){
    console.log(itm);
}

function deposit(){
    // noAccountAlert();
    hideElement(document.getElementById("wrapper"));
    hideElement(document.getElementById("model-withdraw"));
    showElement(document.getElementById("model-deposit"));
}

function withdraw(){
    // noAccountAlert();
    hideElement(document.getElementById("wrapper"));
    hideElement(document.getElementById("model-deposit"));
    showElement(document.getElementById("model-withdraw"));
}

function depositOperation(){
    console.log("Selected value :: "+document.getElementById("accounts-deposit").value);
    const index = document.getElementById("accounts-deposit").value
    const accObj = account.accountInfoList[index];
    const depositAmt = document.getElementById("depositAmt").value;
    const newAmt = parseInt(accObj.getAmt())+parseInt(depositAmt);
    accObj.setAmt(newAmt);
    updateStorage(index, newAmt)
    loadTextarea();
    alert("Deposit Successful");
    showWrapper();
}

function withdrawOperation(){
    console.log("Selected value :: "+document.getElementById("accounts-withdraw").value);
    const index = document.getElementById("accounts-withdraw").value
    const accObj = account.accountInfoList[index];
    const withdrawAmt = document.getElementById("withdrawAmt").value;
    const newAmt = parseInt(accObj.getAmt())-parseInt(withdrawAmt);
    accObj.setAmt(newAmt);
    updateStorage(index, newAmt)
    loadTextarea();
    alert("Withdraw Successful");
    showWrapper()
}

function getFromStorage(){
    let data = localStorage.getItem('accounts');
    if(data == null){
        data = JSON.stringify([]);
    }
    return data;
}

function saveToStorage(acc){
    console.log(getFromStorage());
    let data = JSON.parse(getFromStorage());
    console.log(data);
    // data.push("{accName : "+acc.getAccName()+", amt: "+acc.getAmt()+"}");
    data.push("{\"accName\" : \""+acc.getAccName()+"\", \"amt\": "+acc.getAmt()+"}");
    localStorage.setItem("accounts", JSON.stringify(data));
}

function updateStorage(index, newAmt){
    let data = JSON.parse(getFromStorage());
    // console.log(data[index]);
    let row = JSON.parse(data[index]);
    // data[index]["amt"] = newAmt;
    row["amt"] = newAmt;
    data[index] = JSON.stringify(row);
    localStorage.setItem("accounts", JSON.stringify(data));
}

function loadDataFromStorage(){
    let data = JSON.parse(getFromStorage());
    data.forEach(e => {
        e = JSON.parse(e);
        console.log(e.accName, e.amt);
        var acc = new account();
        acc.createAccount(e.accName, e.amt);
        account.accountInfoList.push(acc);
    });
    loadTextarea();
    loadOptionList();

}

function disableButtons(){
    document.getElementById("newWithdraw").disabled = true;
    document.getElementById("newDeposit").disabled = true;
}

function toggleWithdrawButton(){
    if(document.getElementById("accounts-withdraw").value != ""){
        document.getElementById("newWithdraw").disabled = false;
    } else {
        document.getElementById("newWithdraw").disabled = true;
    }
}

function toggleDepositButton(){
    if(document.getElementById("accounts-deposit").value != ""){
        document.getElementById("newDeposit").disabled = false;
    } else {
        document.getElementById("newDeposit").disabled = true;
    }
}

function loadDummyData(){
    const dummy = ["{\"accName\" : \"Saving\", \"amt\": 1500}",
    "{\"accName\" : \"Checking\", \"amt\": 1000}"];
    localStorage.setItem("accounts", JSON.stringify(dummy));
    loadDataFromStorage();
}

window.onload = (event) => {
    loadDataFromStorage();
    if(document.getElementById('accDetails').textContent == ""){
        loadDummyData();
    }
    disableButtons();
};