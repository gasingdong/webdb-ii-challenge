exports.seed = knex => {
  // Deletes ALL existing entries
  return knex('sales')
    .truncate()
    .then(() => {
      // Inserts seed entries
      return knex('sales').insert([
        {
          car_id: 2,
          amount: 291422,
        },
        {
          car_id: 1,
          amount: 29014,
          date: '2019-07-01',
        },
      ]);
    });
};
