exports.up = function (knex) {
  return knex.schema
    .createTable("users", (table) => {
      table.increments("id").primary();
      table.string("user_name").notNullable().unique();
      table.string("email").notNullable().unique();
      table.string("password", 1000).notNullable();
      table.integer("score").unsigned().defaultTo(0);
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.boolean("is_admin").notNullable().defaultTo(false);
    })
    .createTable("texts", (table) => {
      table.increments("id").primary();
      table.string("image_url").notNullable().unique();
      table.string("transcription").notNullable();
      table.integer("point_value").unsigned().notNullable();
    })
    .createTable("users_texts", (table) => {
      table.increments("id").primary();
      table
        .integer("user_id")
        .unsigned()
        .references("users.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .integer("text_id")
        .unsigned()
        .references("texts.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTable("users_texts")
    .dropTable("users")
    .dropTable("texts");
};
