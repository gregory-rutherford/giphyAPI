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
//returns a button with the text passed through as the name
function makeButton(nameOfButton) {
  return `
    <button type="button" class="btn btn-primary"  id="button">
    ${nameOfButton}
    </button>
    `;
}
//after clicking the submit button, a new button with the 
//users text as the name of the button, is displayed on the page
$(document).on("click", "#submit", function() {
  var newButton = $("#userInput").val();
  event.preventDefault();
  $(".buttonFrame").append(makeButton(newButton));
});
//goes through each entry in the topics array and makes a button for each entry
$(".buttonFrame").html(topics.map(makeButton));
//returns a img tag with the source set to the giphy query results,
//also holds the still source and the data-state attribute
function displayGif(obj) {
  const gifToDisplay = obj.images.fixed_height.url;
  const stillGif = obj.images.fixed_height_still.url;
  return `
    <img class="gif" src="${gifToDisplay}"
    data-still="${stillGif}"
    data-animated="${gifToDisplay}"
    data-state="animated"
    />
    `;
}
//upon clicking the new or old button the giphy database is queried, and the gif frame will display 10 new gifs based on the query results
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

$(document).on("click", ".gif", function() {
  var state = $(".gif").attr("data-state");
  if (state === "animated") {
    $(this).attr("data-state", "still")
    $(this).attr("src", $(this).attr("data-still"))
  } else {
    $(this).attr("data-state", "animated")
    $(this).attr("src", $(this).attr("data-animated"))
  }
});