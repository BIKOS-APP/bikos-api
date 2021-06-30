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

    .createTable('candidates', table => {
      table.increments('id').primary();
      table.string('user_id').notNullable();
      table.foreign('user_id').references('id').inTable('users');
      table.timestamp('application_date').defaultTo(knex.fn.now());
    })

    .createTable('advertisements', table => {
        table.increments().primary();
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.boolean('available').notNullable().defaultTo(true);
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.string('user_id').notNullable();
        table.foreign('user_id').references('id').inTable('users');
        table.integer('cat_id').notNullable()
            .references('id').inTable('categories');
        table.integer('candidate_id').references('id').inTable('candidates')            
                        
      });
}

exports.down = function(knex) {
    return knex.schema.dropTable('advertisements').dropTable('candidates').dropTable('users').dropTable('categories')
}
