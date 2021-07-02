const { default: knex } = require('knex');
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
            .join('users','users.id', '=', 'candidates.user_id')
            .where({ads_id})
            .select([
                'users.name',
                'candidates.application_date'
            ]);
        
            return res.json(candidates)    
        } catch (error) {
            next(error)
        }
        
    },

    async delete(req, res, next){
        try{ 
            
            const {ads_id} = req.params;

            const user_id = req.headers.authorization;

            const candidate = await connection('candidates')
            .where('ads_id', ads_id)
            .select('user_id')
            .first();

            if (candidate.user_id != user_id) {
                return res.status(401).json({error: 'Operation not permitted.'})
            }

            await connection('candidates').where('ads_id', ads_id).andWhere('user_id', user_id).delete();

            return res.status(204).send();
        } catch(error){
            next(error)
        }
    }
}