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
    
    .createTable('jobs', table => {
        table.increments().notNullable();
        table.string('job_name');
        table
            .integer('cat_id').notNullable()
            .references('id').inTable('categories');
    })

    .createTable('advertisements', table => {
        table.increments().primary();
        table.string('title').notNullable();
        table.string('description').unique().notNullable();
        table.boolean('available').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        table.string('user_id').notNullable();
        table.foreign('user_id').references('id').inTable('users');
        table
            .integer('job_id').notNullable()
            .references('id').inTable('jobs');
      });
}


exports.down = function(knex) {
    return knex.schema.dropTable('advertisements').dropTable('users').dropTable('jobs').dropTable('categories')
}
