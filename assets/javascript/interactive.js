$(document).ready(function () {
    var arrayOfButtons = ["Music", "Movies", "Animals", "Kids"];


    function gifDetails() {
        var data = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + data + "&api_key=UogcJWs3yhlJmWBoGkpQPL4WDPayChcK&limit=10";
        var bool = true;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            var bool = true;
            var gifSpot = $("#putGifsHere");
            var stillGIFs = [];
            var movingGIFs = [];

            for (var i = 0; i < 10; i++) {
                var still = "<img src='" + response.data[i].images['480w_still'].url + " class='stillIndex'>";
                stillGIFs.push(still);
                var moving = "<img src='" + response.data[i].images.downsized.url + " class='movingIndex'>";
                movingGIFs.push(moving);
            }

            for (var j = 0; j < stillGIFs.length; j++) {
                gifSpot.prepend(stillGIFs[i]);
            }

            // $(".index").click(function() {
            //     $(this).toggleClass();
            // });

        });
    }










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