exports.up = knex => {
  return knex.schema.createTable('cars', tbl => {
    tbl.increments();

    tbl
      .string('vin', 128)
      .unique()
      .notNullable();

    tbl.string('make', 128).notNullable();

    tbl.string('model', 128).notNullable();

    tbl.decimal('mileage').notNullable();

    tbl.string('transmission', 128);

    tbl.string('status', 128);
  });
};

exports.down = knex => {
  return knex.schema.dropTableIfExists('cars');
};
