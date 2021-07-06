const connection = require('../database/connection');

module.exports = {
    async index(req, res){
        const categories = await connection('categories')
        .select('*')

        res.json(categories)
    }
}