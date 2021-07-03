const connection = require('../database/connection')

module.exports = {
    async index(req, res){
        const {announcer} = req.params;
    
        const advertisement = await connection('advertisements')
        .where({announcer})
        .join('users','users.id', '=', 'advertisements.user_id')
        .join('categories','categories.id', '=', 'advertisements.cat_id')
        .select([
            'advertisements.id',
            'advertisements.title',
            'advertisements.description',
            'advertisements.city',
            'advertisements.state',
            'advertisements.available',
            'advertisements.created_at',
            'categories.category'
        ]);

        return res.json(advertisement);
    },

    async create(req, res, next){
        try{
            const {title, description, city, state, cat_id} = req.body
            const announcer = req.headers.authorization

            await connection('advertisements').insert({
                    title,
                    description,
                    city,
                    state,
                    announcer,
                    cat_id
                });

            return res.status(201).send()
        } catch(error){
            next(error)
        }
    },

    async delete(req, res){
       
        const announcer = req.headers.authorization;
        const {id} = req.params;

        const advertisement = await connection('advertisements')
        .where({id})
        .select('user_id')
        .first();

        if (advertisement.announcer != announcer) {
            return res.status(401).json({error: 'Operation not permitted.'})
        }

        await connection('advertisements').where('id', id).delete();

        return res.status(204).send();
    },

    async update(req, res, next){
        try {
            const announcer = req.headers.authorization;
            const {title, description, job_id} = req.body
            const { id } = req.params
            
            await connection('advertisements')
            .update({ title, description, announcer, job_id })
            .where({ id })

            return res.send()

        } catch (error) {
            next(error)
        }
    }
}