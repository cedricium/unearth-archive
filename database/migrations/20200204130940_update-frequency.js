/**
 * Big shout-out to Matthew Holloway (@holloway on GitHub) for function below.
 *
 * Due to Knex restrictions, there was no "nice" way of updating enum values
 * in a Postgres database due to their constraints. The below function bypasses
 * this issue using creating a `Knex.raw` statement which deletes the old
 * constraint then creates a new one with the altered results. And it works like
 * a charm ✨.
 *
 * References: https://github.com/knex/knex/issues/1699#issuecomment-402603481
 */
const formatAlterTableEnumSql = (tableName, columnName, enums) => {
  const constraintName = `${tableName}_${columnName}_check`
  return [
    `ALTER TABLE ${tableName} DROP CONSTRAINT IF EXISTS ${constraintName};`,
    `ALTER TABLE ${tableName} ADD CONSTRAINT ${constraintName} CHECK (${columnName} = ANY (ARRAY['${enums.join(
      "'::text, '",
    )}'::text]));`,
  ].join('\n')
}

exports.up = function(knex) {
  return knex.raw(
    formatAlterTableEnumSql('users', 'frequency', [
      'daily',
      'weekly',
      'monthly',
      'unsubscribe',
    ]),
  )
}

exports.down = function(knex) {
  return knex.raw(
    formatAlterTableEnumSql('users', 'frequency', [
      'daily',
      'weekly',
      'monthly',
    ]),
  )
}
