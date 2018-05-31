$(document).ready(function () {
    var arrayOfButtons = ["Music", "Movies", "Animals", "Kids"];
    var gifArray = [];

    var gifSpot = $("#putGifsHere");

    function gifDetails() {
        var data = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + data + "&api_key=UogcJWs3yhlJmWBoGkpQPL4WDPayChcK&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);


            for (var i = 0; i < 10; i++) {
                //create variables to assign to gifObject
                var still = response.data[i].images['480w_still'].url;
                var moving = response.data[i].images.downsized.url;
                var rating = response.data[i].rating;

                gifArray[i] = {
                    stillImage: still,
                    movingImage: moving,
                    rated: rating
                };
            }
        });
    }

    function displayGifs() {
        //tried ".gif", but doesn't work. Not sure why.
        $(this).click(function () {

            for (var i = 0; i < gifArray.length; i++) {
                
                //display image and rating
                var gifCard = $("<div class='index'>");
                var stillPosted = $("<img>").attr("src", gifArray[i].stillImage);
                var ratingPosted = gifArray[i].rated;
                // var movingPosted = "<img src='" + gifArray[i].movingImage + "'>";
                gifCard.append("GIF rating: " + ratingPosted.toUpperCase()).prepend(stillPosted);

                gifSpot.prepend(gifCard);
            }
        });
    }

    displayGifs();





    function renderButtons() {
        $("#putButtonsHere").empty();
        for (var i = 0; i < arrayOfButtons.length; i++) {
            var newButton = $("<button>");
            newButton.addClass("gif btn btn-outline-primary ")
                .attr("data-name", arrayOfButtons[i])
                .text(arrayOfButtons[i]);
            $("#putButtonsHere").append(newButton);

        }
    }

    $("#buttonCreator").on("click", function (event) {
        event.preventDefault();
        var inputInfo = $("#userInput").val().trim();
        arrayOfButtons.push(inputInfo);
        renderButtons();
        $("#userInput").val("");
    });

    $(document).on("click", ".gif", gifDetails);

    renderButtons();

});