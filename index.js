const searchBox  = document.querySelector('.search');
const main = document.getElementById('main');
const searchButton =  document.getElementById('button');

var data;


function empty(){
        var div = document.createElement('div');
        div.classList.add('empty');
        div.innerHTML = (` <h1>Search Your Favourite Movies !</h1>
        `);
        main.appendChild(div);
}

empty();

// this funcion make the request to OMDB api and get the response and appned the result on screen
function fetchMovie(){
    main.innerHTML = ""; // this will remove previous result from
    var xhrReuest = new XMLHttpRequest();
    var title = searchBox.value;
    xhrReuest.onload = function(){
        // console.log(xhrReuest.response);
         data = JSON.parse(xhrReuest.response);
        console.log(data);
        // we are createing new element and setting its inner HTML as our response results
        var container  = document.createElement('div');
        container.classList.add('container');

        
        container.innerHTML = (`
                
                    <div class="movie">
                        <a href = "movie.html" id = "next-page-link"> 
                            <img src="${data.Poster}" id="link">
                            </a>
                            <div class="movie-info">
                                <h3> ${data.Title} </h3>
                                <span class= "${getColor(data.imdbRating)}">${data.imdbRating}</span>
                            </div>

                            <div class="overview">
                                <h3> Overview </h3>
                                 
                                ${data.Plot}
                            </div>
                       
                    </div> 
                   
                `)
            // creating button for adding movie to favourite
            button=document.createElement("button");
            button.innerHTML = "Add To Favorites";
            button.classList.add('add-to-fav-btn')
            button.id= data.imdbID;
            button.setAttribute("onclick", "updateStorage(this.id)" );// it will save movie id in local storage

            container.appendChild(button);
                
      main.appendChild(container); // appending newly created container to main


      // this for opening movie page
      if(main.innerHTML != ""){
        container.addEventListener('click', function(){ //when we click on movie poster it will redirect us to movie details page
           localStorage.setItem("movie", data.imdbID); // when we click on poster we are storing movie id in a local storage so we can use this id 
                                                     //to make new request to api using id
        })
     }
    }

    xhrReuest.open('get',' https://www.omdbapi.com/?t=' + title +'&apikey=9e78a89' );  // this will fetch movie by title
    xhrReuest.send();
}
    
searchButton.addEventListener('click', fetchMovie); // when we click on search it fetch movie from api
   

//when we click on favrourites button this function will create array in local storage and add movie ID in array
function updateStorage(value){

    let movies;
    movies = localStorage.getItem('movies') ? JSON.parse(localStorage.getItem('movies')):[]; // we created one array in a local storage
    movies.push(value);
    localStorage.setItem("movies", JSON.stringify(movies)); // adding movies in a array in string formate
}



    // this function changes color of imdb rating as per rating class
    function getColor(rating) {
        if(rating>= 8){
            return 'green'
        }else if(rating >= 5){
            return "orange"
        }else{
            return 'red'
        }
    }
     

