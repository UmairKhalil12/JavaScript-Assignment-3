(async function () {
    const Response = await fetch("./data.json");
    const Movies = await Response.json();

    console.log(Movies);

    let genre = document.getElementById("genre");
    let year = document.getElementById("year");
    let language = document.getElementById("language");
    let rating = document.getElementById("rating");

    const btnElement = document.getElementById("chk-btn");



    // ---------------------------------------------------------------------- // 

    function retrieve() {

        const genreValue = genre.value.toLowerCase();
        const yearValue = year.value.toString();
        const languageValue = language.value.toLowerCase();
        const ratingValue = rating.value.toLowerCase();


        console.log(genreValue);
        console.log(yearValue);
        console.log(languageValue);
        console.log(ratingValue);



        const results = Movies.filter(function (movies) {


            let genresString = movies.genres.toString().toLowerCase();
            // let date = movies.release_date.substring(0, 4);
            let date = movies.release_date.split("-");

            
            if (genresString.includes(genreValue) &&
                date.includes(yearValue) &&
                movies.original_language.toLowerCase().includes(languageValue) &&
                movies.certification.toLowerCase().includes(ratingValue) ) {
                return true;
            }
            else {
                return false;
            }

        })

        console.log(results);

        let placeHolder = document.querySelector("#data-output");
        let out = "";
        let rank = 0;
        for (let movie of results) {
            rank++;
            time = (movie.runtime / 60).toFixed(2);
            out += ` <tr>  
                       <td> ${movie.id}</td>
                       <td> ${rank} </td>  
                       <td> <img  class="image-table" src ="https://image.tmdb.org/t/p/w45${movie.poster_path}"/> &nbsp; <b>${movie.title}</b> <br /> ${movie.original_language} &nbsp;  ${movie.certification} &nbsp; ${movie.genres} &nbsp; . ${time}hrs </td> 
                       <td> ${movie.release_date} </td> 
                     </tr>
            
            
            `
        }
        placeHolder.innerHTML = out;


    }



    btnElement.addEventListener("click", retrieve);


})();