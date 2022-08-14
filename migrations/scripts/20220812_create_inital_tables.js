exports.up = function (knex) {
  return knex.schema
    .withSchema("dbo")
    .createTable("deliveries", (table) => {
      table.increments("id").notNullable().primary();
      table.string("status").notNullable();
      table.integer("time_slot_id").nullable();
      table.timestamps(true, true);
    })
    .createTable("occupied_time_slots", (table) => {
      table.increments("id").notNullable().primary();
      table.string("start_time").notNullable();
      table.string("status").notNullable();
      table.string("end_time").nullable();
      table.integer("user_id").notNullable();
      table.integer("business_id").notNullable();
      table.timestamps(true, true);
    })
    .createTable("supported_addresses", (table) => {
      table.integer("time_slot_id").notNullable();
      table.string("supported_address").notNullable();
      table.timestamps(true, true);
    });
};

exports.down = function (knex) {
  return knex.schema
    .withSchema("dbo")
    .dropTableIfExists("knex_migrations")
    .dropTableIfExists("knex_migrations_lock")
    .dropTableIfExists("deliveries")
    .dropTableIfExists("occupied_time_slots")
    .dropTableIfExists("supported_addresses");
};
