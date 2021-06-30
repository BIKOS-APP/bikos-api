
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('categories').del()
    .then(function () {
      // Inserts seed entries
      return knex('categories').insert([
        {category: 'Saúde'},
        {category: 'Eventos'},
        {category: 'Educação'},
        {category: 'Manutenção'},
        {category: 'Serviços domésticos'}
      ]);
    });
};
