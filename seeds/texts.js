const textsData = require("../seeds-data/texts");

exports.seed = async function (knex) {
  await knex("users_texts").del();
  await knex("texts").del();
  await knex("users").del();

  await knex("texts").insert(textsData);
};
