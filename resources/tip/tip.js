function calcTip(){
    var total = document.getElementById("subtotal").value;
    var tip = document.getElementById("tip").value;
    var tipAmt = parseInt(total)+ (tip/total)*100
    document.getElementById("total").textContent = "$"+tipAmt;
}