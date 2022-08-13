exports.up = function (knex) {
  return knex.schema
    .withSchema("dbo")
    .createTable("deliveries", (table) => {
      table.increments("id").notNullable().primary();
      table.string("status").notNullable();
      table.text("start_time").notNullable();
      table.integer("end_time").nullable();
      table.integer("time_slot_id").nullable();
      table.timestamps(true, true)
    })
    .createTable("empty_time_slots", (table) => {
      table.increments("id").notNullable().primary();
      table.text("start_time").notNullable();
      table.integer("end_time").nullable();
      table.timestamps(true, true)
    })
    .createTable("supported_addresses", (table) => {
      table.integer("time_slot_id").notNullable();
      table.string("supported_address").notNullable();
      table.timestamps(true, true);
    });
};

exports.down = function (knex) {
  return knex.schema.withSchema("dbo").dropTableIfExists("deliveries","empty_time_slots","supported_addresses");
};
