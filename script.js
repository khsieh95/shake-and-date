// API Key: dc7d76692b192b772ecce4d938dfa475 for tmdb
$(".dropdown-trigger").dropdown();

/////////////////////EVENT LISTENER SELECTS RANDOM GENRE AND PLUGS IT INTO STREEM FUNCTION////////////////////////////
$(".rando").on("click", function () {
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
});
///////////////////Click Event Targets Genre and plugs in streem Function///////////////////////////
$(".dropdown-content").on("click", function (event) {
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
    $(".movie-display").text("Title: " + title);
    $(".movie-display").append(
      $("<img>").attr("src", "https://image.tmdb.org/t/p/w500" + poster)
    );
    $("img").attr("height", "320vw");
    $(".movie-display").append(synops);
    $(".movie-display").append("Stars: " + voterRate);
    /////////////////////NEEDS BUG FIX/////////////////////////////////
    //   var subscription = streeming["watch/providers"].results.US.flatrate
    //   for (var i = 0; i < subscription.length; i++){
    //   $(".movie-display").append($("<a>").text("streem " + subscription[i].provider_name))

    // }
    //   var rent = streeming["watch/providers"].results.US.rent
    //   for (var i = 0; i < rent.length; i++){
    //   $(".movie-display").append($("<a>").text("Available for rent at: " + rent[i].provider_name))
    //   }
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
