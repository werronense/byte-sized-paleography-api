const textsData = require("../seeds-data/texts");
const usersData = require("../seeds-data/users");

exports.seed = async function (knex) {
  await knex("users_texts").del();
  await knex("texts").del();
  await knex("users").del();

  await knex("texts").insert(textsData);
  await knex("users").insert(usersData);
};
