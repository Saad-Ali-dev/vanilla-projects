const APIKEY = "0f80e0ce0113ccbb7bbd8f2a9c8ab106";
const APIURL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${APIKEY}&page=1`;
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =`https://api.themoviedb.org/3/search/movie?&api_key=${APIKEY}&query=`;

const main = document.getElementById("main");
const form = document.getElementById("form");
const searchInput = document.getElementById('search');

// initially get fav movies
getMovies(APIURL);

async function getMovies(url) {
        const resp = await fetch(url);
        const respData = await resp.json();
    
        console.log(respData);
    
        showMovies(respData.results);
}

function showMovies(movies){
    main.innerHTML = '';

    movies.forEach((movie) => {
        const {poster_path, title, vote_average, overview} = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
        <img src="${IMGPATH + poster_path}" alt="${title}">
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getClassByRate(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
            <h3>Overview</h3>
            ${overview}
        </div>
        `;
        main.appendChild(movieEl);
    });
}

function getClassByRate(vote) {
    if (vote >= 8) {
        return "green";
    } else if (vote >= 5) {
        return "orange";
    } else {
        return "red";
    }
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const search = searchInput.value;

    if (search) {
        getMovies(SEARCHAPI + search);

        searchInput.value = "";
    }
});