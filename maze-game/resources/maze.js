$(document).ready(function(){
    // bindActions();
    $("#start").click(startMaze);
})

var contact = 0;
var started = 0;

function bindActions(){
    $(".boundary").hover(hoverOnBackground);
    // $("#start").click(startMaze);
    $("#end").hover(endMaze);
}

function startMaze(){
    contact = 0;
    started = 1;
    removeBackground();
    bindActions();
    $("#maze").mouseleave(leftMaze);
}

function hoverOnBackground(){
    if(started !== 0){
        started = 0;
        $(".boundary").addClass("touched");
        contact++;
        // setTimeout(function(){
        //     alert("Sorry, You lost. :[ . Click \"S\" to start again.");
        // }, 200);
        $("#status").text("Sorry, You lost. :[ . Click \"S\" to start again.");
        $("#end").unbind("hover");
        $("#maze").unbind("mouseleave");
    }
}

function removeBackground(){
    $(".boundary").removeClass("touched");
}

function endMaze(){
    console.log("Inside end maze");
    if(started === 1 && contact === 0){
        // console.log(this);
        // alert("You win!!! :]");
        $("#status").text("You win!!! :]");
        $("#maze").unbind("mouseleave");
        $(".boundary").unbind("hover");
        $("#end").unbind("hover");
    }
}

function leftMaze(){
    alert("You cannot reach end from outside.");
    hoverOnBackground();
    // $(".boundary").addClass("touched");
    $("#end").unbind("hover");
}