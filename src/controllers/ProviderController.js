const connection = require('../database/connection')

module.exports = {
    async update(req, res){
        try {
            const announcer = req.headers.authorization;
            const available = false;
            const {id} = req.params;
            const {provider} = req.params;    

            await connection('advertisements')
            .update({ available, provider })
            .where({ id })

            return res.send()

        } catch (error) {
            next(error)
        }
        
    }
}