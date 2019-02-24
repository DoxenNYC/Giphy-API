var players = [
    "Lebron James", "Kevin Durant", "Kawhi Leonard", "Kyrie Irving", "Paul George", "James Harden", "Stephen Curry", "Russell Westbrook", "Giannis Antetokounmpo", "Damian Lillard"
  ];
  
  $(document).on("click", "button", function() {
    var playerList = $(this).attr("data-person");
  
    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" + playerList + "&api_key=256Yui0vM0BJjz1GIjBE5mAwgtYieH5V&limit=10";
  
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response.data);
  
      var playerResult = response.data;
  
      $("#playerImg").empty();
      for (var i = 0; i < playerResult.length; i++) {
        var listGif = $("<div>");
        listGif.attr({
          class: "players"
        });

        var listRating = playerResult[i].rating;
        var playerInfo = $("<p>").text("Rating: " + listRating);
  
        var playerGif = $(
          "<img src='" + response.data[i].images.fixed_height_still.url + "'>"
        );
        playerGif.attr({
          "data-state": "still",
          "data-still": response.data[i].images.fixed_height_still.url,
          "data-animate": response.data[i].images.fixed_height.url
        });
  
        listGif.prepend(playerInfo);
        
        listGif.prepend(playerGif);
  
        $("#playerImg").prepend(listGif);
      }
    });
  });
  
  function newPlayerButton() {
    $("#playerButtons").empty();
    $("#playerImg").empty();
  
    for (i = 0; i < players.length; i++) {
      var playerBtn = $("<button>").text(players[i]);
  
      playerBtn.attr("data-person", players[i]);
  
      $("#playerButtons").append(playerBtn);
    }
  }
  
  $(document).on("click", "img", function() {
    
    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });
  
  $("#submit").on("click", function(event) {
    event.preventDefault();
  
    var addPlayer = $("#player-input")
      .val()
      .trim();
  
    players.push(addPlayer);
    var name = $("<p>");
    name.text(addPlayer);
  
    newPlayerButton();
  });
  
  newPlayerButton();