const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    async index(req, res){
        const users = await connection('users').select('*');
        return res.json(users);
    },

    async create(request, response) {
        const {name, email, whatsapp} = request.body;

        const id = crypto.randomBytes(4).toString('HEX');

        await connection('users').insert({
            id,
            name,
            email,
            whatsapp
        });
        
        return response.json({id});
    }
}