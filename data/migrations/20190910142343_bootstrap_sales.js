exports.up = knex => {
  return knex.schema.createTable('sales', tbl => {
    tbl.increments();

    tbl
      .integer('car_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('cars')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    tbl.decimal('amount').notNullable();

    tbl.string('date', 128);
  });
};

exports.down = knex => {
  return knex.schema.dropTableIfExists('sales');
};
