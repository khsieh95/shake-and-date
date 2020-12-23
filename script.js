// API Key: dc7d76692b192b772ecce4d938dfa475 for tmdb

// THIS IS A AN API WITH THE LIST OF GENRES AND THEIR CODES. WE NEED THE CODES TO BE PLACED INTO THE BELOW FUNCTION WHEN THE RESPECTIVE BUTTON IS CLICKED


// function listOfGenres(){
// var genreList = "https://api.themoviedb.org/3/genre/movie/list?api_key=dc7d76692b192b772ecce4d938dfa475&language=en-US" 
// $.ajax({
//     url: genreList,
//     method: "GET"
// }).then(function(genres){
//     for (var i = 0; i < genres.genres.length; i++){
//     console.log(genres.genres[i].name)
//     $("<button>").text(genres.genres[i].name)
//     $(".container").append($("<button>").attr("data-genre", genres.genres[i].id).text(genres.genres[i].name))
//     }

// })
// }
// listOfGenres()
// THIS EVENTLISTENER PULLS A RANDOM MOVIE OUT OF A LIST BASED ON GENRE. THE LAST PART OF THE BELOW URL WHERE IT SAYS GENRE IS WHERE THE CODE NEEDS TO GO. Click test button to see console.log. Okay to delte Test button. Only their for testing.
$(".test").on("click", function(event){

  var genre = $(event.target).attr("data-set")
  var movieList = "https://api.themoviedb.org/3/discover/movie?api_key=dc7d76692b192b772ecce4d938dfa475&language=en-US&sort_by=vote_count.desc&include_adult=false&include_video=false&page=1&with_genres=" + genre  
  
  $.ajax({
      url: movieList,
      method: "GET"
  }).then(function(movies){
   var randomMovie = Math.floor(Math.random() * 19)
   var movieId = movies.results[randomMovie].id
   
   ///calls streem function with movieId as variable
  streem(movieId)
  })
  
  
  })
  
  
  
  // Function For Streeming Data//Insert movieId where x is.
  function streem(x){
  var streemLocation = "https://api.themoviedb.org/3/movie/" + x + "?api_key=dc7d76692b192b772ecce4d938dfa475&language=en-US&append_to_response=watch%2Fproviders" 
  $.ajax({
      url: streemLocation,
      method: "GET"
  }).then(function(streeming){
      console.log(streeming)
      var poster = streeming.poster_path // For poster
      var title = streeming.title //For title
      var synops = streeming.overview //For Synopsys
      var voterRate = streeming.vote_average // For voteer rating
  
  
      $(".movie").text("Title: " + title)
      $(".movie").append($("<img>").attr("src", "https://image.tmdb.org/t/p/w500" + poster))
      $("img").attr("height", "120vw")
      
      $(".movie").append(synops)
      $(".movie").append("Stars: " + voterRate)
     
      function perscription (){
      var subscription = streeming["watch/providers"].results.US.flatrate
      for (var i = 0; i < subscription.length; i++)
      $("<link>").text(subscription[i].provider_name)
      $(".movie").append($("link"))
      }
      var rent = streeming["watch/providers"].results.US.rent
      
      perscription()
      
  })
  }
  
  
  
  
  
  