#!/usr/bin/node
/*
    Star Wars Characters
*/

const request = require('request');

function makeRequest(url) {
  return new Promise((resolve, reject) => {
    request(url, (error, response, body) => {
      if (error) {
        reject(error);
      } else {
        resolve(JSON.parse(body));
      }
    });
  });
}

async function main() {
  if (process.argv.length < 3) {
    console.log('Usage: Movie ID is required');
    return;
  }

  const movieID = Number(process.argv[2]);
  if (!movieID) {
    console.log('Movie ID must be a number');
    return;
  }

  const movieUrl = `https://swapi-api.alx-tools.com/api/films/${movieID}/`;

  try {
    const film = await makeRequest(movieUrl);
    try {
      for (const url of film.characters) {
        const character = await makeRequest(url);
        console.log(character.name);
      }
    } catch (error) {
      throw new Error(error);
    }
  } catch (error) {
    throw new Error(error);
  }
}

main();
