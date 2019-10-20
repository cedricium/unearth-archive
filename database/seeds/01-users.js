exports.seed = function(knex) {
  return knex('users').insert([
    {
      id: 1,
      name: 'Cedricium',
      email: 'amaya.cedric@gmail.com',
    },
  ])
}
