const movies = require("../data/movies.json");

exports.handler = ({ queryStringParameters }) => {
  const { id } = queryStringParameters;
  const movie = movies.find((m) => m.id === id);

  if (!movie) {
    return {
      statusCode: 404,
      body: "Not Found",
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(movie),
  };
};
