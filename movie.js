const main = document.getElementById('movie-main');
const home = document.getElementById('home');
var data;
var id = localStorage.getItem('movie'); // this will fetch the movie id from local storage


// this funcion make the request to OMDB api and get the response and appned the result on screen
function fetchMovie(){
    main.innerHTML = "";
    var xhrReuest = new XMLHttpRequest();

    xhrReuest.onload = function(){
        // console.log(xhrReuest.response);
         data = JSON.parse(xhrReuest.response);
        console.log(data);
        // we are createing new element and setting its inner HTML as our response results
        
        var container = document.createElement('div');
        container.classList.add('container');
        container.innerHTML = (` 
                    <div class="movie-container">
                    <div class="poster">
                        <img src="${data.Poster}" id="link">
                    </div>
                    <div class="movie-details">
                        <div class="movie-info-container">
                            <h1>  ${data.Title} </h1>
                            <span class=${getColor(data.imdbRating)}> <strong>IMDB : </strong> ${data.imdbRating}</span>
                            <p> <strong>Released : </strong>  ${data.Released}</p>
                            <p><strong>Language : </strong>${data.Language}</p> 
                            <p><strong>Duration : </strong>${data.Runtime}</p>
                        </div>

                        <div class="movie-overview">
                            <h3>Overview</h3>
                           <p> ${data.Plot} </p>
                        </div>
                    </div>
                
                </div>
                `)
                
      main.appendChild(container); // appending newly created container to main
    } 

    xhrReuest.open('get',' https://www.omdbapi.com/?i=' + id +'&apikey=9e78a89' ); // this will fetch movie by ID
    xhrReuest.send();
}
    
   fetchMovie();

   
// when we click on home icon we will go back to home page

home.addEventListener('click', function(){
    localStorage.removeItem('movie'); // it will remove movie id from local storage 
})




    function getColor(rating) {
        if(rating>= 8){
            return 'green'
        }else if(rating >= 5){
            return "orange"
        }else{
            return 'red'
        }
    }
     