const connection = require('../database/connection')


module.exports = {

    async create(req, res, next){
        try {
            const user_id = req.headers.authorization;
            const {ads_id} = req.params;

            await connection('candidates').insert({
                user_id,
                ads_id    
            });

            return res.status(201).send()
        } catch (error) {
            next(error)
        }
    },

    async index(req, res, next){
        try {
            const {ads_id} = req.params;

            const candidates = await connection('candidates')
            .where({ads_id})
            .select('*');
            
            return res.json(candidates)    
        } catch (error) {
            next(error)
        }
        
    },

    async delete(req, res, next){
        try{ 
        
            const user_id = req.headers.authorization;
            const ads_id = req.params;

            const candidate = await connection('candidates')
            .where('ads_id', ads_id)
            .select('user_id')
            .first();

            if (candidate.user_id != user_id) {
                return res.status(401).json({error: 'Operation not permitted.'})
            }

            await connection('candidates').where('ads_id', ads_id);

            return res.status(204).send();
        } catch(error){
            next(error)
        }
    }
}