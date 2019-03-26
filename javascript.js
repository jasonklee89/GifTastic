$(function() {
    populateButtons(searchArray, "searchButton", "#buttonsArea")
    console.log("Page Loaded");
})

var searchArray = ["Bruce Lee", "Pikachu", "Vegeta"];

function populateButtons(searchArray, classToAdd, areaToAddTo) {
    // Empty out buttons area everytime we add new button
    $(areaToAddTo).empty();
    for (var i = 0; i < searchArray.length; i++) {
        var a = $("<button>");
        a.addClass(classToAdd);
        // Assign the data-type to string from array
        a.attr("data-type", searchArray[i]);
        // Text of button is equal to string in array
        a.text(searchArray[i]);
        $(areaToAddTo).append(a);
    }
}

$(document).on("click", ".searchButton", function () {
    // Setting up API for ajax
    var type = $(this).data("type");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=YIqIv8zoSIgK1EYl0t4OsFtJzXhQZZiH&limit=10"
    // Ajax call
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        for (var i = 0; i < response.data.length; i++) {
            var searchDiv = $("<div class = 'search-item'>")
            var rating = response.data[i].rating;
            var p = $("<p>").text("Rating: " + rating);
            var animated = response.data[i].images.fixed_height.url;
            var still = response.data[i].images.fixed_height_still.url;
            var image = $("<img>");
            // Setting attributes for whether image is still or animated
            image.attr("src", still);
            image.attr("data-still", still);
            image.attr("data-animated", animated);
        }
    })
});