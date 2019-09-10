exports.seed = knex => {
  // Deletes ALL existing entries
  return knex('cars')
    .truncate()
    .then(() => {
      // Inserts seed entries
      return knex('cars').insert([
        {
          vin: '2FZXEZYB9YAF88688',
          make: 'Testla',
          model: '2019 T1000',
          mileage: 19284,
        },
        {
          vin: '1BAABCSHXXF098488',
          make: 'Bonda',
          model: '2010 F0',
          mileage: 100223,
          transmission: 'auto',
          status: 'salvage',
        },
      ]);
    });
};
