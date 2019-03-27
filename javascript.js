$(function() {
    populateButtons(searchArray, "searchButton", "#buttonsArea");
    console.log("Page Loaded");
})

var searchArray = ["Bruce Lee", "Pikachu", "Vegeta", "Jackie Chan", "Spiderman", "Afro Samurai", "Samuel L Jackson", "John Travolta", "Pulp Fiction", "Kill Bill"];

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
            var searchDiv = $('<div class="search-item">')
            var rating = response.data[i].rating;
            var p = $("<p>").text("Rating: " + rating);
            var animated = response.data[i].images.fixed_height.url;
            var still = response.data[i].images.fixed_height_still.url;
            var image = $("<img>");
            // Setting attributes for whether image is still or animated, and adding searchImage class
            image.attr("src", still);
            image.attr("data-still", still);
            image.attr("data-animated", animated);
            image.attr("data-state", "still");
            image.addClass("searchImage");
            // Adding the rating and image to HTML and adding new searches to the top of the list
            searchDiv.append(p);
            searchDiv.append(image);
            $("#searches").prepend(searchDiv);
        }
    })
});

$(document).on("click", ".searchImage", function() {
    // Switch from animated to still and vice versa
    var state = $(this).attr("data-state");
    if (state == "still") {
        $(this).attr("src", $(this).data("animated"));
        $(this).attr("data-state", "animated");
    } else {
        $(this).attr("src", $(this).data("still"));
        $(this).attr("data-state", "still");
    }
})

$("#addSearch").on("click", function() {
    // Grab what is stored within textbox and place it into variable of newSearch
    var newSearch = $("input").eq(0).val();
    // Add newSearch onto the searchArray
    searchArray.push(newSearch);
    // Populate the buttons with newSearch
    populateButtons(searchArray, "searchButton", "#buttonsArea");
    return false;
})