const knex = require("knex")(require("../knexfile"));

const getUserByUsername = async (username) => {
  try {
    const response = await knex("users").where({ user_name: username }).first();

    // should return whatever is found, including undefined
    return response;
  } catch (err) {
    return console.error("Internal server error", err);
  }
};

module.exports = getUserByUsername;
