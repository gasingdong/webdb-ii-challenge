exports.up = knex => {
  return knex.schema.createTable('sales', tbl => {
    tbl.increments();

    tbl
      .integer('car_id')
      .references('id')
      .inTable('cars')
      .notNullable();

    tbl.decimal('amount').notNullable();

    tbl.string('date', 128);
  });
};

exports.down = knex => {
  return knex.schema.dropTableIfExists('sales');
};
