function alertBox(){
    alert("Clicked!!!");
}

function increaseSize(){
    var curSize = document.getElementById("text").style.fontSize;
    // document.getElementById("text").style.fontSize = "24px";
    setInterval(() => {
        if (curSize == ""){
            document.getElementById("text").style.fontSize = curSize = "12pt";
        }
        var newSize = parseInt(document.getElementById("text").style.fontSize)+2;
        console.log(newSize+"pt");
        document.getElementById("text").style.fontSize = newSize+"pt";
    }, 500);
}

function bling(){
    var chk = document.getElementById("bling").checked;
    if(chk){
        document.getElementById("text").style.fontWeight = "bold";
        document.getElementById("text").style.color = "green";
        document.getElementById("text").style.textDecoration = "underline";
        document.getElementsByTagName("body")[0].style.backgroundImage = "url(http://www.cs.washington.edu/education/courses/190m/CurrentQtr/labs/6/hundred-dollar-bill.jpg)"

    } else {
        document.getElementById("text").style.fontWeight = "";
        document.getElementById("text").style.color = "";
        document.getElementById("text").style.textDecoration = "";
        document.getElementsByTagName("body")[0].style.backgroundImage = "";
    }
}

function malovich(){
    var str = document.getElementById("text").value;
    var stringArr = str.split(" ");
    var newStrArr =[];
    stringArr.forEach(element => {
        if(element.length >= 5) {
            newStrArr.push("Malkovich");
        } else {
            newStrArr.push(element);
        }
    });
    document.getElementById("text").value = newStrArr.join(" ");
}

function pig() {
    var txt = document.getElementById("text").value;
    var newWrd = "";
    const vowels = ["a", "e", "i", "o", "u"];
    var newTxtArr = [];
    var txtArr = txt.split(" ");
    txtArr.forEach(word => {
        const firstLetter = word.charAt(0);  
        if (vowels.includes(firstLetter)) {
          newWrd = word + "ay";
        } else {
          let clusterEnd = 1;
          while (!vowels.includes(word.charAt(clusterEnd))) {
            clusterEnd++;
          }
          newWrd = word.slice(clusterEnd) + word.slice(0, clusterEnd) + "ay";
        } 
        newTxtArr.push(newWrd);
    });
    document.getElementById("text").value = newTxtArr.join(" ");
  }
  