exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
    table.increments()
    table.string('name').notNullable()
    table
      .string('email')
      .unique()
      .notNullable()
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users')
}
