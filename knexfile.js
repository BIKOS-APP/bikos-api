// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: "db-bikos",
      user: "postgres",
      password: "eric1230"
    },
    migrations: {
      tableName: 'knex_migrations',
      directory:'./src/database/migrations'
    },
    seeds:{
      directory:'./src/database/seeds'
    }
  }
  };
