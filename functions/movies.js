require("dotenv").config();
const { URL } = require("url");
const fetch = require("node-fetch");
const { query } = require("./utils/hasura");

exports.handler = async () => {
  const { movies } = await query({
    query: `query {
        movies {
          id
          poster
          tagline
          title
        }
      }`,
  });
  const api = new URL("http://www.omdbapi.com/");

  // add the secret api key to the query string
  api.searchParams.set("apikey", process.env.OMDB_API_KEY);

  const promise = movies.map((movie) => {
    //   use the movie's IMDb ID to look up detail
    api.searchParams.set("i", movie.id);

    return fetch(api)
      .then((resp) => resp.json())
      .then((data) => {
        const scores = data.Ratings;

        return {
          ...movie,
          scores,
        };
      });
  });

  const moviesWithRatings = await Promise.all(promise);

  return {
    statusCode: 200,
    body: JSON.stringify(moviesWithRatings),
  };
};
