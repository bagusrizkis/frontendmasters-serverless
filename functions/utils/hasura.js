const fetch = require("node-fetch");

async function query({ query, variables = {} }) {
  const result = await fetch(process.env.HASURA_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Hasura-Admin-Secret": process.env.HASURA_ADMIN_SECRET,
    },
    body: JSON.stringify({ query, variables }),
  }).then((resp) => resp.json());

  // TODO show helpfull info if there's an error
  //   result.errors
  return result.data;
}

exports.query = query;
