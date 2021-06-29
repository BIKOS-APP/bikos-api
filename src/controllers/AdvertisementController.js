const { default: knex } = require('knex');
const connection = require('../database/connection');

module.exports = {

    async index(req, res, next){
        try {

            const user_id = req.headers.authorization;
            
            const {page = 1} = req.query;
            
            const query = connection('advertisements')
            .join('users','users.id', '=', 'advertisements.user_id')
            .join('jobs','jobs.id', '=', 'advertisements.job_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'advertisements.title',
                'advertisements.description',
                'advertisements.available',
                'advertisements.created_at',
                'advertisements.updated_at',
                'users.name',
	            'jobs.job_name'
            ]);

            const countObj = connection('advertisements').count()

            if(user_id){
                query
                .where('user_id', user_id);

                countObj.where({user_id})
            }

            const [count] = await countObj
            
            res.header('X-Total-Count', count["count"])

            const results = await query

            return res.json(results);

        } catch (error) {
            next(error)
        }
    },


    async create(req, res, next){
        try {
            const {title, description, job_id} = req.body
            const user_id = req.headers.authorization;

            await connection('advertisements').insert({
                title,
                description,
                user_id,
                job_id
            })
            
            return res.status(201).send()
        } catch (error) {
            next(error)
        }
    },

    async delete(req, res){
        const {id} = req.params;
        const user_id = req.headers.authorization;

        const advertisement = await connection('advertisements')
        .where('id', id)
        .select('user_id')
        .first();

        if (advertisement.user_id != user_id) {
            return res.status(401).json({error: 'Operation not permitted.'})
        }

        await connection('advertisements').where('id', id).delete();

        return res.status(204).send();
    },

    async update(req, res, next){
        try {
            const user_id = req.headers.authorization;
            const {title, description, job_id} = req.body
            const { id } = req.params
            
            
            await connection('advertisements')
            .update({ title, description, user_id, job_id })
            .where({ id })

            return res.send()

        } catch (error) {
            next(error)
        }

    
    }
}