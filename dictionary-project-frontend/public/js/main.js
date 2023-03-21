var server = "http://localhost:3000/"
$(document).ready(()=>{
   
    $("#searchBtn").click(()=>{
        let word = $("#searchTxt").val();
        $.ajax({
            url: server+"define/"+word,
            type: "GET",
            dataType: "json",
            success: showDefinition,
            error: notFound,
        })
    });
})

const showDefinition = (data)=> {
    console.log(data);
    let node = "";
    if(data !== null){
        data.forEach(def => {
            node += "<li> <span class = \"type\">("+def.wordtype+")</span> "+ def.definition+"</li>";
        });
        $("#definations ol").html(node);
    } else {
        $("#definations ol").html("<li>No definition found for this word in dictionary!</li>");
    }
}

const notFound = (data)=> {
    console.log("Failed", data);
}