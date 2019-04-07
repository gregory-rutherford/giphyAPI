//key WLXZ77HfPkwbMGs80cGMtM6qj1hK88MD

var topics = ["Ozzy Osbourne", "E.T.", "Megaman", "Pulp", "The Karate Kid", "Slay the Spire"];



function makeButton (nameOfButton) {
    return `
    <button type="button" class="btn btn-primary"  id="button">
    ${nameOfButton}
    </button>
    `
};

$(document).on("click", "#submit", function(){
    var newButton = $("#userInput").val();
    event.preventDefault();
    $(".buttonFrame").append(makeButton(newButton));

});

$(".buttonFrame").html(topics.map(makeButton));


$(document).on("click", "#button", function(){
    var gifSearch = $(this).text();
    console.log(gifSearch);
    var queryURL = "http://api.giphy.com/v1/gifs/search?q="+gifSearch+"&api_key=WLXZ77HfPkwbMGs80cGMtM6qj1hK88MD&limit=10"
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response)
    })
})