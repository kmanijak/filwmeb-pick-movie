// ==UserScript==
// @name         Movie of the day
// @namespace    https://raw.githubusercontent.com/kmanijak/filmweb-pick-movie
// @version      0.4
// @updateURL    https://raw.githubusercontent.com/kmanijak/filmweb-seen-movies-hider/master/script.js
// @description  Choose randomly the movie to watch
// @author       Karol Manijak
// @match        https://www.filmweb.pl/ranking/*
// @grant        GM_addStyle
// ==/UserScript==

GM_addStyle(
    `.header {
        margin: 40px 0 12px 0;
        font-size: 1.3rem;
    }
    .refresher {
        border: 1px solid #eab30b;
        padding: 4px 12px;
        margin-top: -4px;
    }`
);

const getMovies = () => document.querySelectorAll('.item.place');
const getRandomMovie = movies => movies[Math.floor(Math.random() * movies.length)];
const getNotSeenMovies = movies => Array.prototype.filter.call(movies, movie => (
        window.getComputedStyle(movie.querySelector('.ifw-flag')).color !== 'rgb(255, 194, 0)'
    ));
const styleMovieElement = movieElement => {
    movieElement.style.borderColor = '#eab30b';
    const poster = movieElement.querySelector('.filmPoster__image');
    const src = poster.getAttribute('data-src');
    if (src) {
        poster.setAttribute('src', src);
    }
    movieElement.classList.add('random-movie');
    return movieElement;
}

const getRandomMovieNode = notSeenMovies => {
    const randomMovie = getRandomMovie(notSeenMovies);
    return styleMovieElement(randomMovie);
}

const createHeader = () => {
    const header = document.createElement('h5');
    header.innerHTML = 'Nie wiesz co obejrzeć? Propozycja na dziś to:'
    header.className = 'header';
    return header;
}

const createRefresher = onclick => {
    const refresher = document.createElement('button');
    refresher.innerHTML = 'Wylosuj inny 🍿'
    refresher.className = 'refresher';
    refresher.onclick = onclick;
    return refresher;
}

(function() {
    'use strict';
    const movies = getMovies();
    const notSeenMovies = getNotSeenMovies(movies);

    if (notSeenMovies.length) {
        const replaceMovie = () => {
            const oldMovie = document.querySelector('.random-movie');
            const newMovie = getRandomMovieNode(notSeenMovies);
            oldMovie.replaceWith(newMovie);
        }

        const movie = getRandomMovieNode(notSeenMovies);
        const anchorPlace = document.querySelector('.ranking__user-see-info');
        const header = createHeader();
        const refresher = createRefresher(replaceMovie);

        anchorPlace.appendChild(header);
        anchorPlace.appendChild(movie);
        anchorPlace.appendChild(refresher);
    }
})();
