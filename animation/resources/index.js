// var index = 0;
var play;
var curText;
$(document).ready(function() {
    // console.log(ANIMATIONS)
    // ANIMATIONS.forEach((v, i) => {
    //     console.log("here");
    //     console.log(i);
    // });

    $("#type").bind("change", function(){
        var val = $("#type").val();
        // console.log(ANIMATIONS[val]);
        $("#animationBox").val(ANIMATIONS[val]);
    });
    
    $("#size").bind("change", function(){
        var val = $("#size").val();
        $("#animationBox").css("font-size", val);
    });

    $("#start").bind("click", runAnimation);
    $("#stop").bind("click", stopAnimation);

    $("#speed").bind("click", function(){
        console.log("clicked turbo");
        clearInterval(play);
        runAnimation();
    });
});

function runAnimation(){
    $('#type').prop('disabled', true);
    $('#start').prop('disabled', true);
    $('#animationBox').prop('readonly', true);
    $('#stop').prop('disabled', false);

    // $('#size').prop('disabled', true);

    var speed = $('#speed').is(":checked") ? 50 : 250;
    console.log("Running Animation with frame rate : "+speed);
    var index = 0;
    var type = $("#type").val()
    // var frames = ANIMATIONS[type].split("=====\n");
    curText = $("#animationBox").val()
    var frames = curText.split("=====\n")
    play = setInterval(() => {
        console.log("Running Animation");
        if(index >= frames.length){
            index = 0;
        }
        $("#animationBox").val(frames[index]);
        index++;
    }, speed);
}

function stopAnimation(){
    $('#type').prop('disabled', false);
    $('#size').prop('disabled', false);
    $('#start').prop('disabled', false);
    $('#stop').prop('disabled', true);
    $('#animationBox').prop('readonly', false);
    clearInterval(play);
    $("#animationBox").val(curText);
}