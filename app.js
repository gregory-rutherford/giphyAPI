//key WLXZ77HfPkwbMGs80cGMtM6qj1hK88MD

var topics = [
  "Ozzy Osbourne",
  "ET",
  "Megaman",
  "Pulp",
  "The Karate Kid",
  "Slay the Spire"
];
var gifUrl;

function makeButton(nameOfButton) {
  return `
    <button type="button" class="btn btn-primary"  id="button">
    ${nameOfButton}
    </button>
    `;
}

$(document).on("click", "#submit", function() {
  var newButton = $("#userInput").val();
  event.preventDefault();
  $(".buttonFrame").append(makeButton(newButton));
});

$(".buttonFrame").html(topics.map(makeButton));

function displayGif(obj) {
  const gifToDisplay = obj.images.fixed_height.url;
  return `
    <img src="${gifToDisplay}"/>
    `;
}

$(document).on("click", "#button", function() {
  var gifSearch = $(this).text();
  var queryURL =
    "http://api.giphy.com/v1/gifs/search?q=" +
    gifSearch +
    "&api_key=WLXZ77HfPkwbMGs80cGMtM6qj1hK88MD&limit=10";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    var gifArray = response.data;
    console.log(response);
    console.log(gifArray);
    $("#gifFrame").prepend(response.data.map(displayGif));
  });
});
