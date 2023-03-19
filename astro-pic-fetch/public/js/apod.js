$(document).ready(function () {
  $("#view_button").click(fetchPicture);
});

// function getPicture() {
//   $.ajax({
//     url: "https://api.nasa.gov/planetary/apod",
//     type: "GET",
//     data: { api_key: "DEMO_KEY", date: $("#date").val() },
//     dataType: "json",
//     success: showPicture,
//     error: noPicture,
//   });
// }



function fetchPicture() {
  fetch("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date="+$("#date").val()+"")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    showPicture(data);
  })
  .catch((err)=>{
    noPicture(err);
  })
}

function showPicture(data) {
  $("#pic").attr("src", data.url);
  $("#title").html(data.title);
}
function noPicture(error) {
  alert(error.responseText);
}
