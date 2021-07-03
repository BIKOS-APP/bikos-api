exports.up = function(knex) {

    return knex.schema
    
    .createTable('users', table => {
        table.string('id').primary();
        table.string('name').notNullable();
        table.string('email').unique().notNullable();
        table.string('whatsapp').notNullable();
      })
    
    .createTable('categories', table => {
        table.increments('id').primary();
        table.string('category').notNullable();
      })
      
    .createTable('advertisements', table => {
        table.increments('id').primary();
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.boolean('available').notNullable().defaultTo(true);
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.string('city').notNullable();
        table.string('state').notNullable();
        table.string('announcer').notNullable();
        table.foreign('announcer').references('id').inTable('users');
        table.string('provider');
        table.foreign('provider').references('id').inTable('users');
        table.integer('cat_id').notNullable()
            .references('id').inTable('categories');    
      })
      
    .createTable('candidates', table => {
      table.increments('id').primary();
      table.string('user_id').notNullable();
      table.foreign('user_id').references('id').inTable('users');
      table.integer('ads_id').references('id').inTable('advertisements');
      table.timestamp('application_date').defaultTo(knex.fn.now());
    });
}

exports.down = function(knex) {
    return knex.schema.dropTable('candidates').dropTable('advertisements').dropTable('users').dropTable('categories')
}
