exports.up = function(knex) {
  return knex.schema.createTable('things', table => {
    table
      .string('id')
      .primary()
      .unique()
      .notNullable()
    table.string('subreddit')
    table.string('selftext')
    table.string('author_fullname')
    table.string('title')
    table.string('subreddit_name_prefixed')
    table.string('name')
    table.string('category')
    table.integer('score')
    table.string('thumbnail')
    table.boolean('over_18')
    table.string('author')
    table.string('permalink')
    table.string('url')
    table.timestamp('created_utc')
    table.boolean('surfaced').default(false)
    table
      .integer('user_id')
      .unsigned()
      .notNullable()
      .references('users.id')
      .onDelete('CASCADE')
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users')
}
