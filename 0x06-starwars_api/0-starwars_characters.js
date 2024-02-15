#!/usr/bin/node

const request = require('request');
const movieId = process.argv[2];

function getMovieCharacters (movieId) {
  const filmsUrl = 'https://swapi-api.alx-tools.com/api/films';

  request.get(filmsUrl, (_, response, body) => {
    if (response.statusCode === 200) {
      const filmsData = JSON.parse(body);
      const movieData = filmsData.results.find(
        (film) => film.episode_id.toString() === movieId
      );

      if (movieData) {
        const charactersUrls = movieData.characters;
        const characters = [];

        for (const charUrl of charactersUrls) {
          request.get(charUrl, (_, response, body) => {
            if (response.statusCode === 200) {
              const characterData = JSON.parse(body);
              characters.push(characterData.name);
              if (characters.length === charactersUrls.length) {
                printCharacters(characters, movieData.title);
              }
            } else {
              console.log(`Error: ${response.statusCode}`);
            }
          });
        }
      } else {
        console.log(`Movie ID ${movieId} not found.`);
      }
    } else {
      console.log(`Error: ${response.statusCode}`);
    }
  });
}

function printCharacters (characters, movieTitle) {
  for (const character of characters) {
    console.log(character);
  }
}

if (movieId) {
  getMovieCharacters(movieId);
} else {
  console.log('Usage: node 0-starwars_characters.js [Movie ID]');
}
