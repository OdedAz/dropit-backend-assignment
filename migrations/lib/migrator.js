const config = require('../../lib/services/config')

const schema = 'dbo'

module.exports.migrate = async () => {
  const client = require('knex')(config.db)
  console.info('Starting migration.')
  await client.raw(`CREATE SCHEMA IF NOT EXISTS ${schema}`)
  await client.migrate.latest({
    schemaName: schema,
    directory: './migrations/scripts/'

  })
  await client.destroy()

  console.info('Migration done.')
}
