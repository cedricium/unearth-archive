exports.seed = function(knex) {
  return knex('users').insert([
    {
      id: 'jk23d',
      username: 'test_user',
      email: 'test@example.com',
      frequency: 'weekly',
      has_synced_with_reddit: true,
      sync_status: 'successful',
    },
  ])
}
