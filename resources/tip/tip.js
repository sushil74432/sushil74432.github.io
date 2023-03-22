function calcTip(){
    var total = document.getElementById("subtotal").value;
    var tip = document.getElementById("tip").value;
    if (total == "" || tip == "") {
        alert("Please completely fill the form!");
        return;
    }
    var tipAmt = parseInt(total)+ (tip/100)*total
    console.log(tipAmt);
    document.getElementById("total").textContent = "$"+tipAmt;
}