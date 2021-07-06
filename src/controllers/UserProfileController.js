const connection = require('../database/connection');


module.exports = {
    
    async find(req, res){

        const id = req.headers.authorization;

        const user = await connection('users')
        .select('*')
        .where('id', id);

        if (!user) {
            return res.status(400).json({error: 'No user found with this ID'})
        }

        return res.json(user)

    },

    async update(req, res, next){
        try {
            const id = req.headers.authorization;
            const {name, email, whatsapp} = req.body
            
            await connection('users')
            .update({ name, email, whatsapp})
            .where('id', id)

            return res.send()

        } catch (error) {
            next(error)
        }

    }
}