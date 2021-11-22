const main = document.getElementById('fav-main');

function displayStorage(){
    
    let movieItems = localStorage.getItem("movies");
    if(movieItems){
        let storageItems = JSON.parse(localStorage.getItem('movies'));
        storageItems.forEach(id => {
           loadFavrouriteMovies(id);
        });
    }
}

var data;

// this funcion make the request to OMDB api and get the response and appned the result on screen
function loadFavrouriteMovies(id){
    main.innerHTML = ""; 
    var xhrReuest = new XMLHttpRequest();
    xhrReuest.onload = function(){
        // console.log(xhrReuest.response);
         data = JSON.parse(xhrReuest.response);
            console.log(data);
        // we are createing new element and setting its inner HTML as our response results
        var container  = document.createElement('div');
        container.classList.add('container');
        container.innerHTML = (`
                        <div class="fav-movie" id= ${data.imdbID}>
                        <a href = "movie.html" id = "next-page-link"> 
                            <img src="${data.Poster}" id="link">
                            <a>
                            <div class="fav-movie-info">
                                <h3> ${data.Title} </h3>
                            <span class="${getColor(data.imdbRating)}">${data.imdbRating}</span>
                            </div>

                            <div class="fav-overview">
                                <h3>Overview</h3>
                                ${data.Plot}
                            </div>
                        </div>
                `)

            
            button=document.createElement("button");
            button.innerHTML = "Remove";
            button.classList.add('remove-fav')
            button.id= data.imdbID;
            button.setAttribute("onclick", "removeMovie(this.id)" );// it will remove  movie id from local storage

            container.appendChild(button);
                
          main.appendChild(container); // appending newly created container to main


      // this for opening movie page
        if(main.innerHTML != ""){
            container.addEventListener('click', function(){ //when we click on movie poster it will redirect us to movie details page
            localStorage.setItem("movie", data.imdbID); // when we click on poster we are storing movie id in a local storage so we can use this id                                            //to make new request to api using id
            })
        }
    }

    xhrReuest.open('get',' https://www.omdbapi.com/?i=' + id +'&apikey=9e78a89', true);  // this will fetch movie by title
    xhrReuest.send();
}

// we will call displayStorage function when page is reloaded
document.addEventListener("DOMContentLoaded", displayStorage);


//this functions removes movies from favourits dynamically
function removeMovie(id){
    
    for (let i = main.childNodes.length - 1; i >= 0; i--) {
      main.removeChild(main.childNodes[i]);
      editStorage(id); // it will remove movie from loacal storage
      displayStorage() // remaining movies will be loaded on page
     }

    
}

// this function removes movies from local storage
function editStorage(movie){
    let alarms_list = JSON.parse(localStorage.getItem('movies')); //get deleted movies from local storage
    let index = alarms_list.indexOf(movie);
    alarms_list.splice(index,1);
    localStorage.removeItem('movies');

    localStorage.setItem('movies', JSON.stringify(alarms_list)); // it will restore remaining items in local storage

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
 
// when no movies added on page then it will show massage
function empty(){
    var div = document.createElement('div');
    div.classList.add('empty');
    div.innerHTML = (` <h1>Oops!!! You haven't added any Movies to Favourites !</h1>
    `);
    main.appendChild(div);
}

empty();