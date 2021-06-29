
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('jobs').del()
    .then(function () {
      // Inserts seed entries
      return knex('jobs').insert([
        {job_name: "DJ", cat_id: 14},
        {job_name: "Bartender", cat_id: 14},
        {job_name: "Informática", cat_id:16},
        {job_name: "Ar condicionado", cat_id: 16}
      ]);
    });
};
