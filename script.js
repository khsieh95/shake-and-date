$(".dropdown-trigger").dropdown();
$(".restaurants").hide();
$(".location").hide();

// Global Variables

var saveMovieButton = $(".save-button1");
var saveCuisineButton = $(".save-button2");
var displayMovie = $(".movie-display");
var movieSaveRow = $(".movie-save-row");
var clearButton = $(".clear-history-button");
var savedContainer = $(".final-container");
var savedDiv = $(".saved-div");
var restaurantOption = $(".restaurant-yes-no");
var restaurantDrop = $(".restaurantDrop");
var viewDate = $(".selected-date-here");

var movieStorage = JSON.parse(localStorage.getItem("movies")) || [];
var restaurantStorage = JSON.parse(localStorage.getItem("Restaurants")) || [];

///////////CLEAR FUNCTION USED TO EMPTY ELEMENTS BEFORE PRODUCING NEW CONTENT. CALLED RIGHT AFTER EVENTLISTENER///////////////////
function clear() {
  $(".movie-title").empty();
  $(".movie-poster").empty();
  $(".movie-synopsis").empty();
  $(".movie-rating").empty();
  $(".movie-stream").empty();
  $(".movie-rent").empty();
}
//////////////FUNCTION FOR GRABING CITY ID FROM COURT//////////////////////
function cityIdSnatcher() {
  $(".cityOptions").on("click", function (event) {
    var cityId = $(event.target).val();
    console.log(cityId);
  });
}

var objectStreem = {
  "HBO Max": "https://www.hbomax.com/",
  "HBO Now": "https://play.hbonow.com/page/urn:hbo:page:home",
  DIRECTV: "https://www.directv.com/",
  "Sling TV": "https://watch.sling.com/",
  FXNow: "https://fxnow.fxnetworks.com/",
  "Disney Plus": "https://www.disneyplus.com/",
  Netflix: "https://www.netflix.com/",
  "Spectrum On Demand": "https://www.spectrumondemand.com/",
  fuboTV: "https://www.fubo.tv/welcome",
  Starz: "https://www.starz.com/us/en/",
  Hulu: "https://www.hulu.com/",
  IndieFlix: "https://www.indieflix.com/",
  "Max Go": "https://play.maxgo.com/page/urn:hbo:page:home",
  "Amazon Prime Video": "https://www.amazon.com/Amazon-Video/",
  TNT: "https://www.tntdrama.com/",
  TBS: "https://www.tbs.com/",
  "USA Network": "https://www.usanetwork.com/",
};

var objectRent = {
  "Apple iTunes": "https://tv.apple.com/",
  "Google Play Movies": "https://play.google.com/store/movies?hl=en_US&gl=US",
  "Amazon Video":
    "https://www.amazon.com/gp/video/storefront/ref=atv_scout_redirect#ace-g7448806443",
  YouTube: "https://www.youtube.com/",
  Vudu: "https://www.vudu.com/",
  "Microsoft Store": "https://www.microsoft.com/en-us/store/movies-and-tv",
  Redbox: "https://www.redbox.com/",
  DIRECTV: "https://www.directv.com/",
  "AMC on Demand": "https://www.amctheatres.com/on-demand",
};
//////////////////// DISPLAYCONTROL PRODUCES ELEMENTS TO THE SCREEN IF CLASS === YES//////////////////
function displayControl() {
  $(".movieDrop").on("click", function (event) {
    if ($(event.target).attr("class") === "yes") {
      $(".showMovie").css("display", "block");
      $(".random-button-1").css("display", "flex");
      $(".random-button-1").css("justify-content", "center");
      $(".phase1IfYes").css("display", "none");
    }
    if ($(event.target).attr("class") === "no") {
      $(".movie").hide();
      $(".movie-display").hide();
      // $(".body-container").prepend($(".location").show());
      restaurantOption.removeClass("hide");
      movieStorage.push(" ");
    }
  });
}
displayControl();

function displayRestaurant() {
  restaurantDrop.on("click", function (event) {
    if ($(event.target).attr("class") === "yes") {
      console.log("hi");
      $(".body-container").prepend($(".location").show());
      restaurantOption.hide();
    }
    if ($(event.target).attr("class") === "no") {
      $(".final-date").removeClass("hide");
      restaurantOption.hide();
      viewDate.append($(".movie-display"));
      $(".movie-display").show();
    }
  });
}
displayRestaurant();

/////////////////////EVENT LISTENER SELECTS RANDOM GENRE AND PLUGS IT INTO STREEM FUNCTION////////////////////////////
$(".rando").on("click", function () {
  clear();
  var randomGenre = [
    "28",
    "12",
    "16",
    "35",
    "99",
    "18",
    "10751",
    "14",
    "27",
    "10402",
    "9648",
    "10749",
    "878",
    "53",
    "10752",
    "37",
  ];
  var randomNumber = Math.floor(Math.random() * 15);
  var genre = randomGenre[randomNumber];
  var movieList =
    "https://api.themoviedb.org/3/discover/movie?api_key=dc7d76692b192b772ecce4d938dfa475&language=en-US&sort_by=vote_count.desc&include_adult=false&include_video=false&page=1&with_genres=" +
    genre;
  $.ajax({
    url: movieList,
    method: "GET",
  }).then(function (movies) {
    console.log(movies);
    var genreRandomMovie = Math.floor(Math.random() * 19);
    var movieId = movies.results[genreRandomMovie].id;
    ///calls streem function with movieId as variable
    streem(movieId);
  });
  displayMovie.removeClass("hide");
  saveMovieButton.removeClass("hide");
  movieSaveRow.removeClass("hide");
});
///////////////////Click Event Targets Genre and plugs in streem Function///////////////////////////
$(".genreDropdown").on("click", function (event) {
  clear();
  var textContent = $(event.target).text();
  $(".dropdown-genres").text(textContent);
  var genre = $(event.target).attr("data-id");
  console.log(genre);
  var movieList =
    "https://api.themoviedb.org/3/discover/movie?api_key=dc7d76692b192b772ecce4d938dfa475&language=en-US&sort_by=vote_count.desc&include_adult=false&include_video=false&page=1&with_genres=" +
    genre;
  $.ajax({
    url: movieList,
    method: "GET",
  }).then(function (movies) {
    var genreRandomMovie = Math.floor(Math.random() * 19);
    var movieId = movies.results[genreRandomMovie].id;
    ///calls streem function with movieId as variable
    streem(movieId);
  });
  displayMovie.removeClass("hide");
  saveMovieButton.removeClass("hide");
  movieSaveRow.removeClass("hide");
});

// Function For Streeming Data//Insert movieId where x is.
function streem(x) {
  var streemLocation =
    "https://api.themoviedb.org/3/movie/" +
    x +
    "?api_key=dc7d76692b192b772ecce4d938dfa475&language=en-US&append_to_response=watch%2Fproviders";
  $.ajax({
    url: streemLocation,
    method: "GET",
  }).then(function (streeming) {
    console.log(streeming);
    var poster = streeming.poster_path; // For poster
    var title = streeming.title; //For title
    var synops = streeming.overview; //For Synopsys
    var voterRate = streeming.vote_average; // For voteer rating
    $(".movie-title").text(title);
    $(".movie-poster").append(
      $("<img>").attr("src", "https://image.tmdb.org/t/p/w500" + poster)
    );
    $("img").attr("height", "320vw");
    $(".movie-synopsis").append(synops);
    $(".movie-rating").append(voterRate);
    var movieArray = [poster, title, synops, voterRate];
    movieStorage.push(movieArray);
    /////////////////////Streeming And Rental Results/////////////////////////////////
    var subscription = streeming["watch/providers"].results.US.flatrate;
    try {
      for (var i = 0; i < subscription.length; i++) {
        for (
          var index = 0;
          index < Object.entries(objectStreem).length;
          index++
        ) {
          if (
            subscription[i].provider_name ===
            Object.entries(objectStreem)[index][0]
          ) {
            movieArray.push(
              Object.entries(objectStreem)[index][1],
              subscription[i].provider_name
            );
            $(".streaming-header").text("Streaming Availability:");
            $(".movie-stream").append(
              $("<ul>").append(
                $("<a>")
                  .attr("href", Object.entries(objectStreem)[index][1])
                  .text(subscription[i].provider_name)
                  .css({ "margine-left": "1vw", "margin-right": "1vw" })
                  .attr("target", "_blank")
                  .addClass("streaming-list")
              )
            );
          }
        }
      }
    } catch (err) {
      $(".movie-stream").append(
        $("<div>").text("No known subscription service.")
      );
    }
    var rental = streeming["watch/providers"].results.US.rent;
    try {
      for (var i = 0; i < 4; i++) {
        for (
          var index = 0;
          index < Object.entries(objectRent).length;
          index++
        ) {
          if (
            rental[i].provider_name === Object.entries(objectRent)[index][0]
          ) {
            movieArray.push(
              Object.entries(objectRent)[index][1],
              rental[i].provider_name
            );
            $(".rental-header").text("Rental Availability:");
            $(".movie-rent").append(
              $("<ul>").append(
                $("<a>")
                  .attr("href", Object.entries(objectRent)[index][1])
                  .text(rental[i].provider_name)
                  .css({ "margine-left": "1vw", "margin-right": "1vw" })
                  .attr("target", "_blank")
                  .addClass("rental-list")
              )
            );
            console.log(Object.entries(objectRent)[index][1]);
          }
        }
      }
    } catch (erro) {
      $(".movie-rent").append($("<div>").text("No known rental service."));
    }
    // localStorage.setItem("movies", movieStorage)
  });
}

////////////////////////////FUNCTION FOR DIRECT MOVIE SEARCH/////////////////////////////
//   $(".search").on("click", function(){
// var movieSearch = $("#prompt1").val()
// var searchName = "https://api.themoviedb.org/3/search/movie?api_key=dc7d76692b192b772ecce4d938dfa475&query=" + movieSearch
//   $.ajax({
//       url: searchName,
//       method: "GET"
//   }).then(function(movieName){
//     movieName.results[i].id

//   })

// })

// Restaurant Code Here

$(".city-search-btn").on("click", function (event) {
  $(".city-search-btn").hide();
  $(".city-drop").show();
  var searchedCity = $(".search-city").val();
  var cityUrl =
    "https://developers.zomato.com/api/v2.1/cities?q=" + searchedCity;

  $.ajax({
    method: "GET",
    url: cityUrl,
    headers: {
      "user-key": "b23ce13853bea993b459518ec134302f",
      "content-type": "application/json",
    },
    //<li><a href="#!" data-foodid="1">American</a></li>
  }).then(function (city) {
    for (var i = 0; i < city.location_suggestions.length; i++) {
      $(".city-option").append(
        $("<li>")
          .attr("href", "#!")
          .text(city.location_suggestions[i].name)
          .css("color", "#039be5")
          .addClass("cityOptions")
          .val(city.location_suggestions[i].id)
      );
    }
    $(".cityOptions").on("click", function (event) {
      // $(".body-container").prepend($(".restaurants").show());
      // $(".location").hide();
      var cityId = $(event.target).val();
      console.log(cityId);
      console.log(city);
      $(".search-city").val($(event.target).text());

      lucky();
      $(".food-option").on("click", function (event) {
        $(".restaurant-display").removeClass("hide");
        $(".cuisineSelector").text($(event.target).text());
        var cuisineid = $(event.target).attr("data-foodid");
        cuisineurl =
          "https://developers.zomato.com/api/v2.1/search?entity_id=" +
          cityId +
          "&entity_type=city&count=20&radius=20%2C000&cuisines=" +
          cuisineid +
          "&sort=rating&order=desc";
        console.log(cuisineurl); //maybe bubble affect? why does it run again? needs looking into

        $.ajax({
          method: "GET",
          url: cuisineurl,
          headers: {
            "user-key": "b23ce13853bea993b459518ec134302f",
            "content-type": "application/json",
          },
        }).then(function (response) {
          try {
            var randomeRestaurant = Math.floor(
              Math.random() * response.restaurants.length
            );
            var astablishmentName =
              response.restaurants[randomeRestaurant].restaurant.name;
            $(".restaurant-name").text(astablishmentName);
            var establishmentCuisine =
              response.restaurants[randomeRestaurant].restaurant.cuisines;
            $(".restaurant-cuisines").text(establishmentCuisine);
            var establishmentCity =
              response.restaurants[randomeRestaurant].restaurant.location.city;
            $(".restaurant-city").text(establishmentCity);
            var establishmentAddress =
              response.restaurants[randomeRestaurant].restaurant.location
                .address;
            $(".restaurant-address").text(establishmentAddress);
            var establishmentRating =
              response.restaurants[randomeRestaurant].restaurant.user_rating
                .aggregate_rating;
            $(".restaurant-rating").text(establishmentRating);
            var establishmentMenu =
              response.restaurants[randomeRestaurant].restaurant.menu_url;
            $(".restaurant-menu").attr("href", establishmentMenu);
            $(".restaurant-menu").text("View Menu");
            $(".restaurant-menu").attr("target", "_blank");
            var establishmentImg =
              response.restaurants[randomeRestaurant].restaurant.featured_image;
            $(".restaurant-featuredimage").attr("src", establishmentImg);
            $(".restaurant-featuredimage").attr("height", "200vw");
            var establishmentContact =
              response.restaurants[randomeRestaurant].restaurant.phone_numbers;
            $(".restaurant-contact").text(establishmentContact);
          } catch (err) {
            $(".restaurant-name").text("No Restaurants Found!");
          }
          ////////////////////////////////////////Pushing array into globaly defined array and localStorage//////////////////////////////////////////////////
          var restArray = [
            astablishmentName,
            establishmentCuisine,
            establishmentCity,
            establishmentAddress,
            establishmentRating,
            establishmentMenu,
            establishmentImg,
            establishmentContact,
          ];
          restaurantStorage.push(restArray);

          saveCuisineButton.removeClass("hide").prepend($("<br>"));
        });
      });
    });
  });
});

var randomCuisine = ["1", "25", "156", "55", "60", "67", "73", "99", "308"];

function lucky() {
  var cityId = $(event.target).val();
  console.log(cityId);
  $(".restaurant-random").on("click", function () {
    var randomCuisineid = Math.floor(Math.random() * 8);
    var cuisine = randomCuisine[randomCuisineid];
    $(".restaurant-display").removeClass("hide");
    var cuisineurl =
      "https://developers.zomato.com/api/v2.1/search?entity_id=" +
      cityId +
      "&entity_type=city&count=20&radius=20%2C000&cuisines=" +
      cuisine +
      "&sort=rating&order=desc";
    $.ajax({
      method: "GET",
      url: cuisineurl,
      headers: {
        "user-key": "b23ce13853bea993b459518ec134302f",
        "content-type": "application/json",
      },
    }).then(function (response) {
      try {
        var randomeRestaurant = Math.floor(
          Math.random() * response.restaurants.length
        );
        var astablishmentName =
          response.restaurants[randomeRestaurant].restaurant.name;
        $(".restaurant-name").text(astablishmentName);
        var establishmentCuisine =
          response.restaurants[randomeRestaurant].restaurant.cuisines;
        $(".restaurant-cuisines").text(establishmentCuisine);
        var establishmentCity =
          response.restaurants[randomeRestaurant].restaurant.location.city;
        $(".restaurant-city").text(establishmentCity);
        var establishmentAddress =
          response.restaurants[randomeRestaurant].restaurant.location.address;
        $(".restaurant-address").text(establishmentAddress);
        var establishmentRating =
          response.restaurants[randomeRestaurant].restaurant.user_rating
            .aggregate_rating;
        $(".restaurant-rating").text(establishmentRating);
        var establishmentMenu =
          response.restaurants[randomeRestaurant].restaurant.menu_url;
        $(".restaurant-menu").attr("href", establishmentMenu);
        $(".restaurant-menu").text("View Menu");
        $(".restaurant-menu").attr("target", "_blank");
        var establishmentImg =
          response.restaurants[randomeRestaurant].restaurant.featured_image;
        $(".restaurant-featuredimage").attr("src", establishmentImg);
        $(".restaurant-featuredimage").attr("height", "200vw");
        $(".restaurant-featuredimage").attr("margin", "0vw");
        var establishmentContact =
          response.restaurants[randomeRestaurant].restaurant.phone_numbers;
        $(".restaurant-contact").text(establishmentContact);
      } catch (err) {
        $(".restaurant-name").text("No Restaurants Found!");
      }
      var restArray = [
        astablishmentName,
        establishmentCuisine,
        establishmentCity,
        establishmentAddress,
        establishmentRating,
        establishmentMenu,
        establishmentImg,
        establishmentContact,
      ];
      restaurantStorage.push(restArray);
    });
    saveCuisineButton.removeClass("hide").prepend($("<br>"));
  });
}

////////////////// SAVE BUTTON FUNCTIONS.....WILL USE FOR LOCAL STORAGE////////////////////////
function saveMovie() {
  saveMovieButton.on("click", function () {
    saveMovieButton.hide();
    movieSaveRow.hide();
    $(".movie").hide();
    $(".movie-display").hide();
    // $(".body-container").append($(".location").show());
    restaurantOption.removeClass("hide");
  });
}
saveMovie();

function saveCuisine() {
  $(".location").append(saveCuisineButton); ////////
  saveCuisineButton.css("margine-left", "50%"); ////
  saveCuisineButton.on("click", function () {
    saveCuisineButton.hide();
    // $(".location").hide();
    $(".rando").hide(); //
    $("#genre-question").hide(); //
    $(".dropdown-genres").hide(); //
    $(".body-container").prepend($(".final-date").removeClass("hide"));
    viewDate.append($(".movie-display"));
    viewDate.append($(".restaurant-display"));
    // $(".movie").show();
    $(".movie-display").show();
    $(".buttons").remove();
    $(".final-save").hide();
    localStorage.setItem("movies", JSON.stringify(movieStorage));
    localStorage.setItem("Restaurants", JSON.stringify(restaurantStorage));
  });
}
saveCuisine();

// $(".savedDate" + i).append($("<div>").text("For Rent"))
// $(".savedDate" + i).append($("<a>").attr(movieStorage[i][movieStorage[i].length -8]).text(movieStorage[i][movieStorage[i].length -7]).addClass("yam"))
// $(".savedDate" + i).append($("<a>").attr(movieStorage[i][movieStorage[i].length -6]).text(movieStorage[i][movieStorage[i].length -5]).addClass("tech"))
// $(".savedDate" + i).append($("<a>").attr(movieStorage[i][movieStorage[i].length -4]).text(movieStorage[i][movieStorage[i].length -3]).addClass("tix"))
// $(".savedDate" + i).append($("<a>").attr(movieStorage[i][movieStorage[i].length -2]).text(movieStorage[i][movieStorage[i].length -1]).addClass("tox"))

for (var i = restaurantStorage.length - 1; i >= 0; i--) {
  var savedCard = $("<div>")
    .addClass("card")
    .addClass("savedDate" + i);
  console.log(restaurantStorage[i]);
  savedCard.append(
    $("<p>")
      .text("Name: " + restaurantStorage[i][0])
      .addClass("name card-display")
  );
  savedCard.append(
    $("<p>")
      .text("Cuisine: " + restaurantStorage[i][1])
      .addClass("type card-display")
  );
  // savedCard.append(
  //   $("<p>")
  //     .text("City: " + restaurantStorage[i][2])
  //     .addClass("city")
  // );
  savedCard.append(
    $("<p>")
      .text("Address: " + restaurantStorage[i][3])
      .addClass("address card-display")
  );
  savedCard.append(
    $("<p>")
      .text("Rating: " + restaurantStorage[i][4])
      .addClass("rating card-display")
  );
  savedCard.append(
    $("<a>")
      .text("View Menu")
      .addClass("menu card-display")
      .attr("href", restaurantStorage[i][5])
      .attr("target", "_blank")
  );
  // savedCard.append($("<img>").attr("src", restaurantStorage[i][6]).addClass("image"))
  savedCard.append(
    $("<p>").text(restaurantStorage[i][7]).addClass("number card-display")
  );
  var savedMovie = $("<div>").addClass("savedDate" + i);
  savedMovie.append(
    $("<img>")
      .attr("height", "200vw")
      .attr("src", "https://image.tmdb.org/t/p/w500" + movieStorage[i][0])
      .addClass("poster card-display")
  );
  savedMovie.append(
    $("<p>")
      .text("Title: " + movieStorage[i][1])
      .addClass("title card-display")
  );
  savedMovie.append(
    $("<p>")
      .text("Synopsis: " + movieStorage[i][2])
      .addClass("synops card-display")
      .append($("<hr>"))
  );
  // savedMovie.append(
  //   $("<p>")
  //     .text("Rating: " + movieStorage[i][3])
  //     .addClass("rating")
  // );
  savedCard.prepend(savedMovie);
  // savedDiv.prepend(savedMovie)
  // savedContainer.prepend(savedDiv)
  savedDiv.prepend(savedCard);
  savedContainer.prepend(savedDiv);
}

// for ( var i = movieStorage.length -1 ; i >= 0; i--){

//     if (movieStorage[i].length > 1 ){          //////////////////////////////////////added to prevent error.....if creates error okay to remove..........
//     var savedMovie = $("<div>")
//     .addClass("savedDate" + i)
//   // savedCard.css("display", "flex");
//   // savedCard.css("justify-content", "center");
//   savedMovie.append($("<img>").attr("height", "200vw").attr("src", "https://image.tmdb.org/t/p/w500" + movieStorage[i][0]).addClass("poster"))
//   savedMovie.append($("<div>").text(movieStorage[i][1]).addClass("title"));
//   savedMovie.append($("<div>").text(movieStorage[i][2]).addClass("synops"));
//   savedMovie.append($("<div>").text(movieStorage[i][3]).addClass("rating"));
//   // savedCard.append(savedMovie)
//   savedDiv.prepend(savedMovie)
//   // savedContainer.prepend(savedDiv)
// }
// }

//////////////////// CLEAR BUTTON FUNCTION SAVED.HTML //////////////////
function clearHistory() {
  clearButton.on("click", function () {
    console.log("hi");
    savedDiv.empty();
    localStorage.clear();
  });
}
clearHistory();
