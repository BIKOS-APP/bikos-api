const connection = require('../database/connection');


module.exports = {
    
    async index(req, res){

        const {id} = req.params;

        const user = await connection('users')
        .where('id', id)
        .select('*');

        if (!user) {
            return res.status(400).json({error: 'No user found with this ID'})
        }

        return res.json(user)

    }
}