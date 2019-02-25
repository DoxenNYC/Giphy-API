//still having issues making old gifs disappear once a new player is selected
//maybe add a 10th player for an even 10
//add a player button still has bugs
var players = [ 
	"Lebron James", "Kevin Durant", "Kyrie Irving", "Paul George", "Russell Westbrook", "Kawhi Leonard", "Stephen Curry", "James Harden", "Damian Lillard"
];

for(var i = 0; i < players.length; i++) {
	var button = $("<button>").text(players[i]);
	button.attr("data-player", players[i]);
	button.addClass("player-button");
	$("#button-group").append(button);
}

$(document).on("click", ".player-button", function() {
	var player = $(this).attr("data-player");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        player + "&api_key=256Yui0vM0BJjz1GIjBE5mAwgtYieH5V&limit=10";

    $.ajax({
    	url: queryURL,
    	method: "GET"
    }).done(function(response) {
    	var outcome = response.data;
    

		var outcomeSection = $("<section class='outcome-container'>");

    	for(var i = 0; i < outcome.length; i++) {
    		var oneOutcome = $("<div class='outcome-container'>");
    		
    		var rating = outcome[i].rating;

    		var p = $("<p>").text("Rating: " + rating);

    		var playerImg = $("<img class='outcome'>");
    		playerImg.attr("src", outcome[i].images.fixed_height_still.url);
    		playerImg.attr("data-state", "still");
    		playerImg.attr("data-still", outcome[i].images.fixed_height_still.url);
    		playerImg.attr("data-animate", outcome[i].images.fixed_height.url);

    		oneOutcome.prepend(playerImg);
    		oneOutcome.prepend(p);

    		outcomeSection.prepend(oneOutcome);
    	}

    	$("#players-group").prepend(outcomeSection);
    });
});

$("#add-player-button").on("click", function(e) {
	e.preventDefault();
	if($("#new-player-input").val() !== "" && alreadyExist === false) {
		var newPlayer = $("#new-player-input").val().toLowerCase();
		players.push(newPlayer);
		var button = $("<button>").text(newPlayer);
		button.attr("data-player", newPlayer);
		button.addClass("payer-button");
		$("#button-group").append(button);
	}
	$("#new-player-input").val("");
});

$(document).on("click", ".outcome", function() {
	var state = $(this).attr("data-state");

	if(state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});