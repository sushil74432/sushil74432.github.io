function calcTip(){
    var total = document.getElementById("subtotal").value;
    var tip = total/10;
    document.getElementById("tip").value = tip;
    document.getElementById("total").textContent = parseInt(total)+parseInt(tip);
}