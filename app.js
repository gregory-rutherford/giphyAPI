//key WLXZ77HfPkwbMGs80cGMtM6qj1hK88MD
var topics = [
  "Ozzy Osbourne",
  "ET",
  "Megaman",
  "Pulp",
  "The Karate Kid",
  "Slay the Spire",
  "Metallica",
  "The Warriors",
  "Dead Cells"
];
var gifUrl;


//upon clicking the new or old button the giphy database is queried, and the gif frame will display 10 new gifs based on the query results
$(document).on("click touchstart", "#button", function() {
  var gifSearch = $(this).text();
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
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
//returns a img tag with the source set to the giphy query results,
//also holds the still source and the data-state attribute
function displayGif(obj) {
  const gifToDisplay = obj.images.fixed_height_still.url;
  const animatedGif = obj.images.fixed_height.url;
  const rating = obj.rating;
  const title = obj.title;
  const source = obj.url;
  return `
    <img class="gif" src="${gifToDisplay}"
    data-animated="${animatedGif}"
    data-still="${gifToDisplay}"
    data-state="still"/>
    <p>${rating}</p>
    <p>${title}</p>
    <a href="${source}">GIPHY source</a>
    `;
}
//click the gif to change the "state" (source) to still or animated
$(document).on("click touchstart", ".gif", function() {
  var state = $(this).attr("data-state");
  if (state === "still") {
    $(this).attr("data-state", "animated")
    $(this).attr("src", $(this).attr("data-animated"))
  } else  {
    $(this).attr("data-state", "still")
    $(this).attr("src", $(this).attr("data-still"))
  }
});


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
$(document).on("click touchstart", "#submit", function() {
  var newButton = $("#userInput").val();
  event.preventDefault();
  $("#buttonFrame").append(makeButton(newButton));
});
//goes through each entry in the topics array and makes a button for each entry
$("#buttonFrame").html(topics.map(makeButton));