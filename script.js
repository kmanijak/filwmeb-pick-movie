// ==UserScript==
// @name         Movie of the day
// @namespace    https://raw.githubusercontent.com/kmanijak/filmweb-pick-movie
// @version      0.2
// @updateURL    https://raw.githubusercontent.com/kmanijak/filmweb-seen-movies-hider/master/script.js
// @description  Choose randomly the movie to watch
// @author       Karol Manijak
// @match        http://www.filmweb.pl/ranking/*
// @grant        GM_addStyle
// ==/UserScript==

GM_addStyle(
    `.header {
        margin: 20px 0 12px 0;
        font-size: 1.3rem;
    }`
);

(function() {
    'use strict';
    const getNotSeenMovies = () => Array.prototype.filter.call(movies, movie => (
        window.getComputedStyle(movie.querySelector('.ifw-flag')).color !== 'rgb(255, 196, 4)'
    ));
    const movies = document.querySelectorAll('.item.place');
    const notSeenMovies = getNotSeenMovies();
    if (notSeenMovies.length) {
        const randomMovie = notSeenMovies[Math.floor(Math.random() * notSeenMovies.length)];
        randomMovie.style.borderColor = '#eab30b';
        const poster = randomMovie.querySelector('.filmPoster__image');
        const src = poster.getAttribute('data-src');
        if (src) {
            poster.setAttribute('src', src);
        }

        const anchorPlace = document.querySelector('.ranking__user-see-info');

        const header = document.createElement('h5');
        header.innerHTML = 'Nie wiesz co obejrzeć? Propozycja na dziś to'
        header.className = 'header';
        anchorPlace.appendChild(header);
        anchorPlace.appendChild(randomMovie);
    }
})();
